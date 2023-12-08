import { useEffect, useState } from "react";
import { getInfoUser } from "../storage/local";
import { avaxLogo } from "../data";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { getBalance } from "../scripts";
const { ethers } = require("ethers");

function Advanced({ setAdvancedPopup }) {
	const [keys, setKeys] = useState(null);
	const [expanded, setExpanded] = useState(false);
	const [show, setShown] = useState(false);

	useEffect(() => {
		const keysData = getInfoUser().key;
		setKeys(keysData);
	}, []);

	const [copy, setCopy] = useState("Click to copy");
	const resetTooltip = () => {
		setTimeout(() => {
			setCopy("Click to copy");
		}, 50);
		document.removeEventListener("mouseout", resetTooltip);
	};
	const copyText = (text) => {
		navigator.clipboard.writeText(text);
		setCopy("Copied to clipboard!");
		document.addEventListener("mouseout", resetTooltip);
	};

	return (
		<div className="fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none">
			<div className="flex items-center justify-center text-gray-500 md:w-11/12 lg:w-3/4 xl:w-2/5">
				<div className="bg-white shadow-xl w-full px-10 py-5 relative">
					<h3 className="self-center text-4xl mt-4 mb-5 text-gray-900">
						# Wallet
					</h3>
					<div className="py-5 mx-10">
						<div className="flex items-center flex-col gap-5">
							<div className="flex items-center space-x-2 w-full">
								<div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
									<img src={avaxLogo} alt="" className="w-10 h-10" />
								</div>
								{keys !== null && (
									<div className="flex flex-col w-full">
										<div className="relative flex items-center justify-between w-full">
											<div className="group flex items-center">
												<p
													className="rounded-lg cursor-pointer px-2 py-0.5 text-left font-semibold group-hover:bg-gray-200"
													onClick={() => copyText(keys.ethAddress)}
												>
													{keys.ethAddress.slice(0, 20) +
														"..." +
														keys.ethAddress.slice(-10)}
												</p>
												<span className="absolute top-8 pointer-events-none transition-opacity opacity-0 group-hover:opacity-100 bg-opacity-0 group-hover:bg-gray-900 text-white ml-2 rounded-lg px-2 text-sm py-0.5">
													{copy}
												</span>
											</div>
											{expanded ? (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-6 w-6 text-right cursor-pointer text-gray-500 hover:text-gray-700"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													onClick={() => {
														setExpanded(false);
														setShown(false);
													}}
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M5 15l7-7 7 7"
													/>
												</svg>
											) : (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-6 w-6 text-right cursor-pointer text-gray-500 hover:text-gray-700"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													onClick={() => {
														setExpanded(true);
														setShown(false);
													}}
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M19 9l-7 7-7-7"
													/>
												</svg>
											)}
										</div>
										{expanded && (
											<div className="flex items-center justify-between">
												{expanded && (
													<div className="relative group flex items-center">
														<p
															className="hover:bg-gray-200 px-2 py-0.5 rounded-lg cursor-pointer text-xs text-gray-500"
															onClick={() => copyText(keys.privKey)}
														>
															{show ? keys.privKey : "*".repeat(64)}
														</p>
														<span className="absolute top-6 pointer-events-none transition-opacity opacity-0 group-hover:opacity-100 bg-opacity-0 group-hover:bg-gray-900 text-white ml-2 rounded-lg px-2 text-sm py-0.5">
															{copy}
														</span>
													</div>
												)}
												{show ? (
													<AiFillEye
														className="cursor-pointer h-6 w-6 text-gray-500 hover:text-gray-700"
														onClick={() => setShown(false)}
													/>
												) : (
													<AiFillEyeInvisible
														className="cursor-pointer h-6 w-6 text-gray-500 hover:text-gray-700"
														onClick={() => setShown(true)}
													/>
												)}
											</div>
										)}
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="pt-5 space-y-2 text-gray-600 mb-5">
						<p className="text-xs">
							{"<!-- "}Your
							<span className="font-semibold">LINK</span> keys which is
							associated with this account is shown up here.
							{" -->"}
						</p>
						<p className="text-xs">
							{"<!-- "}
							<span className="font-bold">Protect your private keys</span> by
							all means if you don't want to lose the NFTs.{" -->"}
						</p>
					</div>
				</div>
			</div>
			<div
				className="h-screen w-screen absolute -z-10"
				onClick={() => setAdvancedPopup(false)}
			></div>
		</div>
	);
}

export default Advanced;
