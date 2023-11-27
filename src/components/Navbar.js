import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { avaxLogo, logo } from "../data";
import { getInfoUser, storeInfoUser } from "../storage/local";
import Advanced from "./Advanced";
import ManageNFTs from "./ManageNFTs";
import PurchasedData from "./PurchasedData";
import { getBalance } from "../scripts";
import ManageBookmarks from "./ManageBookmark";

export default function Navbar() {
	let [loginPopup, setLoginPopup] = useState(false);
	let [googleData, setGoogleData] = useState(null);
	let [balance, setBalance] = useState(0);

	useEffect(() => {
		const user = getInfoUser();
		setGoogleData(user);
		if (user != null && Object.keys(user).length !== 0) {
			console.log(user)
			getBalance(user.key.ethAddress).then(res => {
				setBalance(res);
			})
		}
	}, [loginPopup]);

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
	};

	const [manageNFTsPopup, setManageNFTsPopup] = useState(false);
	const manageNFTs = () => {
		setManageNFTsPopup(true);
		setAdvancedPopup(false);
		setPurchasedDataPopup(false);
		setManageBookmarksPopup(false);
	};

	const [purchasedDataPopup, setPurchasedDataPopup] = useState(false);
	const purchasedData = () => {
		setPurchasedDataPopup(true);
		setAdvancedPopup(false);
		setManageNFTsPopup(false);
		setManageBookmarksPopup(false);
	};

	const [manageBookmarksPopup, setManageBookmarksPopup] = useState(false);
	const manageBookmarks = () => {
		setManageBookmarksPopup(true);
		setAdvancedPopup(false);
		setManageNFTsPopup(false);
		setPurchasedDataPopup(false);
	};

	return (
		<>
			{(loginPopup || (!googleData && window.location.pathname !== "/")) && (
				<Login setLoginPopup={setLoginPopup} setGoogleData={setGoogleData} />
			)}
			{advancedPopup && <Advanced userId={googleData.user.id} setAdvancedPopup={setAdvancedPopup} />}
			{manageNFTsPopup && <ManageNFTs userId={googleData.user.id} setManageNFTsPopup={setManageNFTsPopup} />}
			{purchasedDataPopup && <PurchasedData userId={googleData.user.id} setPurchasedDataPopup={setPurchasedDataPopup} />}
			{manageBookmarksPopup && <ManageBookmarks userId={googleData.user.id} setManageBookmarksPopup={setManageBookmarksPopup} />}
			<div className="mx-auto relative z-50">
				<nav className="flex flex-wrap items-center px-4 py-2">
					<Link
						to="/"
						className="gap-2 hover:text-gray-500 inline-flex items-center leading-none mr-4 text-3xl text-black"
					>
						<img src={logo} className="h-8" alt="logo" />
						<span className="hover:cursor-pointer mx-2">NEXT HYPE</span>
						<div className="xl:block hidden border-r border-black border-[0.5] h-12"></div>
						<span className="xl:block hidden ml-2 text-base font-light">two greatest breakthroughs<br />reunited in one platform
						</span>
					</Link>
					<div
						className="flex-1 hidden space-y-2 w-full lg:flex lg:items-center lg:space-x-4 lg:space-y-0 lg:w-auto"
						data-name="nav-menu"
					>
						<div className="flex flex-col ml-auto lg:flex-row mr-10">
							<Link
								to="/generate"
								className="text-lg hover:text-gray-500 transition-colors ease-in-out duration-200 py-2 text-black lg:p-4 xl:px-6"
							>
								Generate
							</Link>
							<Link
								to="/discover"
								className="text-lg hover:text-gray-500 transition-colors ease-in-out duration-200 py-2 text-black lg:p-4 xl:px-6"
							>
								Discover
							</Link>
							<Link
								to="/social"
								className="text-lg hover:text-gray-500 transition-colors ease-in-out duration-200 py-2 text-black lg:p-4 xl:px-6"
							>
								Social
							</Link>
							<Link
								to="/leaderboard"
								className="text-lg hover:text-gray-500 transition-colors ease-in-out duration-200 py-2 text-black lg:p-4 xl:px-6"
							>
								Leaderboard
							</Link>
						</div>
						<div className="w-1/4 flex place-content-end">
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
												<img src={avaxLogo} className="h-6 w-6 rounded-full mr-2" alt="profile" />
												<span className="font-bold text-gray-600 text-sm py-2">
													{parseFloat(balance).toFixed(6)} AVAX
												</span>
											</li>
											<div className="h-[1px] bg-gray-400 my-2"></div>
											<li className="">
												<button
													onClick={() => manageBookmarks()}
													className="hover:bg-gray-900 hover:text-gray-100 py-2 px-4 block blackspace-no-wrap w-full text-left"
												>
													Manage Bookmarks
												</button>
											</li>
											<li className="">
												<button
													onClick={() => manageNFTs()}
													className="hover:bg-gray-900 hover:text-gray-100 py-2 px-4 block blackspace-no-wrap w-full text-left"
												>
													Manage NFTs
												</button>
											</li>
											<li className="">
												<button
													onClick={() => purchasedData()}
													className="hover:bg-gray-900 hover:text-gray-100 py-2 px-4 block blackspace-no-wrap w-full text-left"
												>
													Manage Data
												</button>
											</li>
											<li className="">
												<button
													onClick={() => advanced()}
													className="hover:bg-gray-900 hover:text-gray-100 py-2 px-4 block blackspace-no-wrap w-full text-left"
												>
													Advanced
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
										className="border py-4 px-8 border-black text-black hover:bg-black hover:text-white transition-colors ease-in-out duration-500">
										Join Now
									</button>
								</div>
							)}
						</div>
					</div>
				</nav >
			</div >
		</>
	);
}
