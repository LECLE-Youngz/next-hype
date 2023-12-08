import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import { avaxLogo, logo, usdcLogo } from "../data";
import { getInfoUser, storeInfoUser } from "../storage/local";
import Advanced from "./Advanced";
import ManageNFTs from "./ManageNFTs";
import PurchasedData from "./PurchasedData";
import { getBalance } from "../scripts";
import ManageBookmarks from "./ManageBookmark";
import ManageCollections from "./ManageCollections";

export default function Navbar() {
	let [loginPopup, setLoginPopup] = useState(false);
	let [googleData, setGoogleData] = useState(null);
	let [balance, setBalance] = useState({ avax: 0, usdc: 0 });

	useEffect(() => {
		const fetchData = async () => {
			const user = getInfoUser();
			setGoogleData(user);
			if (user != null && Object.keys(user).length !== 0) {
				await getBalance(user.key.ethAddress).then((res) => {
					setBalance(res);
				});
			}
			if (user === null && window.location.pathname !== "/") {
				navigate("/");
				setLoginPopup(true);
			}
		};
		fetchData();
	}, [loginPopup, window.location.pathname]);

	const logout = () => {
		setAdvancedPopup(false);
		setManageNFTsPopup(false);
		setPurchasedDataPopup(false);
		setManageBookmarksPopup(false);
		storeInfoUser(null);
		setGoogleData(null);
	};

	const [advancedPopup, setAdvancedPopup] = useState(false);
	const advanced = () => {
		setAdvancedPopup(true);
		setManageNFTsPopup(false);
		setPurchasedDataPopup(false);
		setManageBookmarksPopup(false);
		setManageCollectionsPopup(false);
	};

	const [manageNFTsPopup, setManageNFTsPopup] = useState(false);
	const manageNFTs = () => {
		setManageNFTsPopup(true);
		setAdvancedPopup(false);
		setPurchasedDataPopup(false);
		setManageBookmarksPopup(false);
		setManageCollectionsPopup(false);
	};

	const [purchasedDataPopup, setPurchasedDataPopup] = useState(false);
	const purchasedData = () => {
		setPurchasedDataPopup(true);
		setAdvancedPopup(false);
		setManageNFTsPopup(false);
		setManageBookmarksPopup(false);
		setManageCollectionsPopup(false);
	};

	const [manageBookmarksPopup, setManageBookmarksPopup] = useState(false);
	const manageBookmarks = () => {
		setManageBookmarksPopup(true);
		setAdvancedPopup(false);
		setManageNFTsPopup(false);
		setPurchasedDataPopup(false);
		setManageCollectionsPopup(false);
	};

	const [manageCollectionsPopup, setManageCollectionsPopup] = useState(false);
	const manageCollections = () => {
		setManageCollectionsPopup(true);
		setAdvancedPopup(false);
		setManageNFTsPopup(false);
		setPurchasedDataPopup(false);
		setManageBookmarksPopup(false);
	};

	const navigate = useNavigate();

	return (
		<>
			{(loginPopup || (!googleData && window.location.pathname !== "/")) && (
				<Login setLoginPopup={setLoginPopup} setGoogleData={setGoogleData} />
			)}
			{advancedPopup && (
				<Advanced
					userId={googleData.user.id}
					setAdvancedPopup={setAdvancedPopup}
				/>
			)}
			{manageNFTsPopup && (
				<ManageNFTs
					userId={googleData.user.id}
					setManageNFTsPopup={setManageNFTsPopup}
				/>
			)}
			{purchasedDataPopup && (
				<PurchasedData
					userId={googleData.user.id}
					setPurchasedDataPopup={setPurchasedDataPopup}
				/>
			)}
			{manageBookmarksPopup && (
				<ManageBookmarks
					userId={googleData.user.id}
					setManageBookmarksPopup={setManageBookmarksPopup}
				/>
			)}
			{manageCollectionsPopup && (
				<ManageCollections
					userId={googleData.user.id}
					setManageCollectionsPopup={setManageCollectionsPopup}
				/>
			)}
			<div className="mx-auto relative z-50">
				<nav className="flex items-center px-4 py-2">
					<Link
						to="/"
						className="w-full gap-2 hover:text-gray-500 inline-flex items-center leading-none mr-4 text-3xl text-black"
					>
						<img src={logo} className="h-8" alt="logo" />
						<span className="hover:cursor-pointer mx-2">NEXT HYPE</span>
						<div className="xl:block hidden border-r border-black border-[0.5] h-12"></div>
						<span className="xl:block hidden ml-2 text-base font-light">
							two greatest breakthroughs
							<br />
							reunited in one platform
						</span>
					</Link>
					<div className="flex w-full items-center relative">
						<div className="flex space-x-8 flex-row absolute right-[35%]">
							<Link
								to="/generate"
								className="text-lg hover:text-gray-500 transition-colors ease-in-out duration-200 py-2 text-black"
							>
								Generate
							</Link>
							<Link
								to="/discover"
								className="text-lg hover:text-gray-500 transition-colors ease-in-out duration-200 py-2 text-black"
							>
								Discover
							</Link>
							<Link
								to="/collections"
								className="text-lg hover:text-gray-500 transition-colors ease-in-out duration-200 py-2 text-black"
							>
								Collections
							</Link>
							<Link
								to="/events"
								className="text-lg hover:text-gray-500 transition-colors ease-in-out duration-200 py-2 text-black"
							>
								Events
							</Link>
							<Link
								to="/social"
								className="text-lg hover:text-gray-500 transition-colors ease-in-out duration-200 py-2 text-black"
							>
								Social
							</Link>
							<Link
								to="/leaderboard"
								className="text-lg hover:text-gray-500 transition-colors ease-in-out duration-200 py-2 text-black"
							>
								Leaderboard
							</Link>
						</div>
						<div className="flex right-0 w-[30%] absolute">
							{typeof googleData === "object" &&
							googleData !== null &&
							Object.keys(googleData).length !== 0 ? (
								<div className="group relative inline-block ml-auto lg:flex-row">
									<Link
										to={"/profile/" + googleData.user.id}
										className="flex items-center justify-center"
									>
										<img
											src={googleData.user.picture}
											className="h-8 w-8 rounded-full mr-2"
											alt="profile"
										/>
										<span className="text-lg group-hover:text-gray-500 py-2 text-black">
											{googleData.user.name}
										</span>
									</Link>
									<ul className="absolute hidden group-hover:block text-gray-900 w-max  right-0">
										<div className="h-3 invisible"></div>
										<div className=" bg-white drop-shadow-2xl p-2">
											<li className="flex select-none px-4 items-center">
												<img
													src={avaxLogo}
													className="h-6 w-6 rounded-full mr-2"
													alt="profile"
												/>
												<span className="font-bold text-gray-600 text-sm py-2">
													{parseFloat(balance.avax).toFixed(4)} AVAX
												</span>
											</li>
											<li className="flex select-none px-4 items-center">
												<img
													src={usdcLogo}
													className="h-6 w-6 rounded-full mr-2"
													alt="profile"
												/>
												<span className="font-bold text-gray-600 text-sm py-2">
													{parseFloat(balance.usdc).toFixed(4)} USDC
												</span>
											</li>
											<div className="h-[1px] bg-gray-400 my-2"></div>
											<li className="">
												<button
													onClick={() => advanced()}
													className="hover:bg-gray-900 hover:text-gray-100 py-2 px-4 block blackspace-no-wrap w-full text-left"
												>
													Wallet
												</button>
											</li>
											<li className="">
												<button
													onClick={() => manageBookmarks()}
													className="hover:bg-gray-900 hover:text-gray-100 py-2 px-4 block blackspace-no-wrap w-full text-left"
												>
													Bookmarks
												</button>
											</li>
											<li className="">
												<button
													onClick={() => manageCollections()}
													className="hover:bg-gray-900 hover:text-gray-100 py-2 px-4 block blackspace-no-wrap w-full text-left"
												>
													Collections
												</button>
											</li>
											<li className="">
												<button
													onClick={() => manageNFTs()}
													className="hover:bg-gray-900 hover:text-gray-100 py-2 px-4 block blackspace-no-wrap w-full text-left"
												>
													NFTs
												</button>
											</li>
											<li className="">
												<button
													onClick={() => purchasedData()}
													className="hover:bg-gray-900 hover:text-gray-100 py-2 px-4 block blackspace-no-wrap w-full text-left"
												>
													Data
												</button>
											</li>

											<div className="h-[1px] bg-gray-400 my-2"></div>
											<li className="">
												<button
													onClick={() => logout()}
													className=" text-left hover:bg-red-700 py-2 px-4 block blackspace-no-wrap w-full text-red-700 hover:text-gray-100"
												>
													Logout
												</button>
											</li>
										</div>
									</ul>
								</div>
							) : (
								<div className="flex flex-col ml-auto lg:flex-row">
									<button
										onClick={() => setLoginPopup(true)}
										className="border py-4 px-8 border-black text-black hover:bg-black hover:text-white transition-colors ease-in-out duration-500"
									>
										Join Now
									</button>
								</div>
							)}
						</div>
					</div>
				</nav>
			</div>
		</>
	);
}
