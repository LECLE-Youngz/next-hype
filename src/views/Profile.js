import { useEffect, useState } from "react";
import NFT from "../components/NFT";
import { MdOutlineLanguage } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { emailToWallet, getUsers, turnOnCreatorMode } from "../helpers/user";
import { getPosts, getPostsByUser, toggleFollowUser } from "../helpers/social";
import PostPreview from "../components/PostPreview";
import { getInfoUser } from "../storage/local";
import { HiOutlinePlus } from "react-icons/hi2";
import { GoDash } from "react-icons/go";
import Subscribe from "../components/Subscribe";
import ListUser from "../components/ListUser";
import EnableCreatorMode from "../components/EnableCreatorMode";
import { RxEnter } from "react-icons/rx";

function Profile({ userId, userInfo }) {
	const regionNames = new Intl.DisplayNames(["en"], {
		type: "language",
	});

	const [user, setUser] = useState(null);
	const [emailSearch, setEmailSearch] = useState("");
	const [nftSearch, setNFTSearch] = useState("");
	const [postSearch, setPostSearch] = useState("");
	const navigate = useNavigate();
	const [posts, setPosts] = useState(null);
	const [wallet, setWallet] = useState(false);
	const [account, setAccount] = useState(null);
	const [followUpdating, setFollowUpdating] = useState(false);
	const [subscribePopup, setSubscribePopup] = useState(false);
	const [userListPopup, setUserListPopup] = useState([false]);
	const [enableCreatorModePopup, setEnableCreatorModePopup] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const wallet = await emailToWallet(emailSearch);
			setWallet(wallet);
		};
		fetchData();
	}, [emailSearch]);

	useEffect(() => {
		const fetchData = async () => {
			let account = getInfoUser().user;
			setAccount(account);

			let user = userInfo ?? (await getUsers(userId));
			setUser(user);

			let posts = await getPostsByUser(user.id);
			setPosts(posts);
		};

		fetchData();
	}, [userId]);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			let user = await getUsers(userId);
			setUser(user);
			setLoading(false);
		};
		if (followUpdating || subscribePopup === false) {
			fetchData();
		}
	}, [followUpdating, subscribePopup]);

	const toggleFollow = async () => {
		setFollowUpdating(true);
		await toggleFollowUser(user.id);
		setFollowUpdating(false);
	};

	if (user === null || posts === null || loading) {
		return (
			<div className="fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none">
				<div className="h-full w-full flex items-center justify-center">
					<div className="animate-spin rounded-full self-center h-16 w-16 border-t-2 border-b-2 border-gray-300"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col justify-between">
			{subscribePopup && (
				<Subscribe user={user} setSubscribePopup={setSubscribePopup} />
			)}
			{enableCreatorModePopup && (
				<EnableCreatorMode
					setEnableCreatorModePopup={setEnableCreatorModePopup}
				/>
			)}
			{userListPopup[0] && (
				<ListUser
					name={userListPopup[1]}
					ids={userListPopup[2]}
					setListUserPopup={setUserListPopup}
				/>
			)}
			<div className="flex justify-between">
				<h1 className="text-4xl text-gray-900">
					# View our <span className="twinkle-text">creator</span>
				</h1>
				<p className="self-center w-1/2 truncate border-b border-gray-900 text-3xl font-extralight text-right flex">
					<input
						className="text-right pr-1 appearance-none rounded-full flex-1 outline-none text-gray-600 w-full"
						placeholder="# Find user by email"
						type="text"
						required=""
						onChange={(e) => setEmailSearch(e.target.value)}
					/>
					<button
						className="ml-5 bg-white border-t border-x border-gray-900 hover:bg-gray-900 inline-block text-gray-900 hover:text-gray-100 px-3 py-2 text-2xl disabled:pointer-events-none"
						aria-label="search"
						onClick={() => navigate(`/profile/${wallet.id}`)}
						disabled={!emailSearch || !wallet}
					>
						search
					</button>
				</p>
			</div>
			<div className="flex mt-10 mx-10 justify-between">
				<div className="flex w-3/5">
					<img
						src={user.picture}
						className="mr-10 self-center shadow-xl h-40"
						alt="..."
					/>
					<div className="self-center text-center space-y-4">
						<p className="text-4xl mx-auto font-light text-gray-900">
							{user.name}
						</p>
						<div className="flex justify-center">
							{account.id !== user.id ? (
								<div className="flex justify-evenly space-x-5">
									<div className="flex h-12 place-items-center">
										<span
											className="w-36 h-full grid border cursor-pointer text-base  hover:border-gray-900 hover:text-gray-100 hover:bg-gray-900 text-gray-900 border-gray-300"
											onClick={() =>
												setUserListPopup([
													true,
													"Followers",
													user.socialUser.followers,
												])
											}
										>
											<span className="self-center">
												{user.socialUser.followers.length} followers
											</span>
										</span>
										{followUpdating ? (
											<div className="h-full w-12 py-3 border cursor-pointer text-base self-center text-gray-900 border-gray-30 grid">
												<div className="animate-spin rounded-full self-center h-6 w-6 mx-auto border-t border-b border-gray-900"></div>
											</div>
										) : user.socialUser.followers.includes(account.id) ? (
											<GoDash
												onClick={toggleFollow}
												className="h-full w-12 py-3 border cursor-pointer text-base self-center hover:border-gray-900 hover:text-gray-100 bg-gray-300 hover:bg-gray-900 text-gray-900 border-gray-300"
											/>
										) : (
											<HiOutlinePlus
												onClick={toggleFollow}
												className="h-full w-12 py-3 border cursor-pointer text-base self-center hover:border-gray-900 hover:text-gray-100 hover:bg-gray-900 text-gray-900 border-gray-300"
											/>
										)}
									</div>
									<div className="flex h-12 place-items-center w-48 grad">
										{user.socialUser.subscribers !== null && (
											<>
												<div className="relative w-36 h-full">
													<div className="p-[1.5px] absolute inset-0"></div>
													<div
														className="grid absolute m-[1.5px] inset-0 cursor-pointer text-base  bg-white hover:border-gray-900 hover:text-white items-center hover:bg-opacity-0 text-gray-900"
														onClick={() =>
															setUserListPopup([
																true,
																"Subscribers",
																user.socialUser.subscribers,
															])
														}
													>
														<span className="self-center">
															{user.socialUser.subscribers.length} subscribers
														</span>
													</div>
												</div>
												{user.socialUser.subscribers.includes(account.id) ? (
													<RxEnter
														onClick={() =>
															navigate(`/profile/${user.id}/space`)
														}
														className="h-full w-12 py-3 cursor-pointer text-base self-center text-white hover:bg-white hover:bg-opacity-50"
													/>
												) : (
													<HiOutlinePlus
														onClick={() => setSubscribePopup(true)}
														className="h-full w-12 py-3 cursor-pointer text-base self-center text-white hover:bg-white hover:bg-opacity-50"
													/>
												)}
											</>
										)}
									</div>
								</div>
							) : (
								<div className="flex justify-evenly space-x-5">
									<div className="flex h-12 place-items-center">
										<span
											className="w-48 h-full grid border cursor-pointer text-base  hover:border-gray-900 hover:text-gray-100 hover:bg-gray-900 text-gray-900 border-gray-300"
											onClick={() =>
												setUserListPopup([
													true,
													"Followers",
													user.socialUser.followers,
												])
											}
										>
											<span className="self-center">
												{user.socialUser.followers.length} followers
											</span>
										</span>
									</div>
									<div className="flex h-12 place-items-center w-48 grad">
										{user.socialUser.subscribers !== null ? (
											<>
												<div className="relative w-36 h-full">
													<div className="p-[1.5px] absolute inset-0"></div>
													<div
														className="grid absolute m-[1.5px] inset-0 cursor-pointer text-base  bg-white hover:border-gray-900 hover:text-white items-center hover:bg-opacity-0 text-gray-900"
														onClick={() =>
															setUserListPopup([
																true,
																"Subscribers",
																user.socialUser.subscribers,
															])
														}
													>
														<span className="self-center">
															{user.socialUser.subscribers.length} subscribers
														</span>
													</div>
												</div>
												<RxEnter
													onClick={() => navigate(`/profile/${user.id}/space`)}
													className="h-full w-12 py-3 cursor-pointer text-base self-center text-white hover:bg-white hover:bg-opacity-50"
												/>
											</>
										) : (
											<div
												className="relative w-48 h-full"
												onClick={() => setEnableCreatorModePopup(true)}
											>
												<div className="grad p-[1.5px] absolute inset-0"></div>
												<div className="grid absolute m-[1.5px] inset-0 cursor-pointer text-base  bg-white hover:border-gray-900 hover:text-white items-center hover:grad text-gray-900">
													<p className="self-center">Enable creator mode</p>
												</div>
											</div>
										)}
									</div>
								</div>
							)}
						</div>
						<div className="flex justify-evenly">
							<div className="gap-2 flex items-center">
								<HiOutlineMail className="font-bold text-xl text-gray-500" />
								{user.email}
							</div>
							<div className="gap-2 flex items-center">
								<MdOutlineLanguage className="font-bold text-xl text-gray-500" />
								{user.locale ? regionNames.of(user.locale) : "_"}
							</div>
						</div>
					</div>
				</div>
				<div className="w-2/5 grid place-items-center">
					<div className="text-right text-sm leading-8 italic">
						<p className="text-2xl font-light text-gray-900 not-italic">
							## fun fact
						</p>{" "}
						there are{" "}
						<span className="font-medium text-xl text-gray-800">
							{user.socialUser.numNFTSold}
						</span>{" "}
						nfts have been sold and{" "}
						<span className="font-medium text-xl text-gray-800">
							{user.socialUser.numNFTPurchased}
						</span>{" "}
						nfts have been purchased. Also, there are{" "}
						<span className="font-medium text-xl text-gray-800">
							{user.socialUser.numPromptSold}
						</span>{" "}
						prompts have been sold and{" "}
						<span className="font-medium text-xl text-gray-800">
							{user.socialUser.numPromptPurchased}
						</span>{" "}
						prompts have been purchased by {user.name}
					</div>
				</div>
			</div>
			<div className="flex justify-between mx-10 mt-10 mb-8">
				<p className="truncate border-b w-3/5 border-gray-900 text-2xl font-extralight text-right flex">
					<input
						className="pl-1 text-left appearance-none rounded-full flex-1 outline-none text-gray-600 w-full"
						placeholder="## find user's nfts"
						type="text"
						required=""
						onChange={(e) => setNFTSearch(e.target.value)}
					/>
				</p>
				<p className="truncate w-min border-gray-900 text-2xl font-extralight">
					/
				</p>
				<p className="truncate border-b w-2/5 border-gray-900 text-2xl font-extralight text-right flex">
					<input
						className="text-right pr-1 appearance-none rounded-full flex-1 outline-none text-gray-600 w-full"
						placeholder="## find user's posts"
						type="text"
						required=""
						onChange={(e) => setPostSearch(e.target.value)}
					/>
				</p>
			</div>
			<div className="flex mx-10 h-min">
				<div className="flex w-3/5 flex-wrap justify-center">
					{user.nfts.length === 0 ? (
						<div className="w-full flex justify-center h-96">
							<p className="text-4xl font-light self-center text-gray-500">
								no nfts found
							</p>
						</div>
					) : (
						[...user.nfts]
							.reverse()
							.filter((nft) =>
								nft.name.toLowerCase().includes(nftSearch.toLowerCase())
							)
							.map((nft) => <NFT owner={user} {...nft} />)
					)}
				</div>
				<div className="w-2/5 grid h-min mt-3 space-y-6 justify-items-center">
					{posts.length === 0 ? (
						<div className="w-full flex justify-center h-80 pt-10">
							<p className="text-4xl font-light self-center text-gray-500">
								no posts found
							</p>
						</div>
					) : (
						[...posts].reverse().map((post) => <PostPreview postId={post} />)
					)}
				</div>
			</div>
		</div>
	);
}

export default Profile;
