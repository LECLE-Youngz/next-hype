import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNftDrop } from "../helpers/social";
import { getNumDropNFTs } from "../helpers/nft";
import { parseAmount } from "../libs/blockchain";


const CreateEventNFTDrop = () => {
	const navigate = useNavigate();
	const [params, setParams] = useState({
		unrevealedURI: "",
		maxMintPerUser: 0,
		fee: 0,
		whitelistRoot: "",
		vrfSubscriptionId: ""
	});
	const [creating, setCreating] = useState(false);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const numNft = await getNumDropNFTs();
			setParams({ ...params, maxSupply: numNft });
		};
		fetchData();
	}, []);

	const submit = async () => {
		setCreating(true);
		const res = await createNftDrop(params);
		setSuccess(res);
		setCreating(false);
	};

	const inputClass = {
		false: "bg-white border-gray-900 text-gray-900",
		true: "bg-gray-200 text-gray-900 border-gray-200",
	};

	useEffect(() => {
		if (params.unrevealedURI === 0) {
			setParams({ ...params, unrevealedURI: "" });
		}
		if (params.maxMintPerUser === 0) {
			setParams({ ...params, maxMintPerUser: 1 });
		}
		if (params.fee === 0) {
			setParams({ ...params, fee: 0.1 });
		}
		if (params.whitelistRoot === 0) {
			setParams({ ...params, whitelistRoot: "" });
		}
		if (params.vrfSubscriptionId === 0) {
			setParams({ ...params, vrfSubscriptionId: "" });
		}
	}, [params]);

	const valid = () =>
		params.maxSupply !== 0 && params.vrfSubscriptionId;

	if (creating) {
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
			<div className="flex justify-between">
				<h1 className="text-4xl text-gray-900">
					# Ongoing <span className="twinkle-text">events</span>{" "}
				</h1>
				<button
					className="bg-white border border-gray-900 hover:bg-gray-900 inline-block text-gray-900 hover:text-gray-100 px-5 py-3 h-min self-center text-2xl disabled:pointer-events-none"
					onClick={submit}
					disabled={!valid()}
				>
					Submit
				</button>
			</div>
			<div className="flex justify-between gap-1 mx-10 mt-10 mb-8">
				<p className="border-b truncate w-full border-gray-900 text-2xl font-extralight">
					## create nft drop event
				</p>
			</div>

			<div className="grid place-items-center mt-10">
				<div className="grid gap-5 w-1/3 my-auto self-center">
					<div className="">
						<div className="text-xs self-center mb-2">
							{"<!-- "}number of nft you would supply for the{" "}
							<span className="font-semibold">NFT Drop</span>
							{" -->"}
						</div>

						<div
							className={`${inputClass[params.maxSupply === 0]
								} w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center`}
						>
							<p className="text-left w-full">
								{params.maxSupply === 0
									? "please create nfts for the drop token first"
									: params.maxSupply}
							</p>
						</div>
					</div>

					<div className="">
						<div className="text-xs self-center mb-2">
							{"<!-- "}unrevealedURI of nft{" "}
							<span className="font-semibold">mystery box</span>.{" -->"}
						</div>

						<input
							onChange={(e) =>
								setParams({ ...params, unrevealedURI: e.target.value })
							}
							className={`${
								inputClass[params.unrevealedURI === ""]
							} w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center `}
							type="string"
							placeholder="### unrevealedURI"
							defaultValue={params.description}
						/>
					</div>

					<div className="">
						<div className="text-xs self-center mb-2">
							{"<!-- "} NFT fee for each token in the {" "}
							<span className="font-semibold"> NFT Drop </span>.{" -->"}
						</div>

						<input
							onChange={(e) =>
								setParams({ ...params, fee: parseAmount(e.target.value) })
							}
							className={`${
								inputClass[params.fee === ""]
							} w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center `}
							type="number"
							placeholder="### fee"
							defaultValue={params.fee}
						/>
					</div>
					<div className="">
						<div className="text-xs self-center mb-2">
							{"<!-- "} Max NFT amount minted per user in this {" "}
							<span className="font-semibold"> NFT Drop </span>.{" -->"}
						</div>

						<input
							onChange={(e) =>
								setParams({ ...params, maxMintPerUser: e.target.value })
							}
							className={`${
								inputClass[params.fee === ""]
							} w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center `}
							type="number"
							placeholder="### maxMintPerUser"
							defaultValue={params.maxMintPerUser}
						/>
					</div>
					<div className="">
						<div className="text-xs self-center mb-2">
							{"<!-- "} whitelistRoot store subscribers who can Private Mint this {" "}
							<span className="font-semibold">NFT Drop</span> first.{" -->"}
						</div>

						<input
							onChange={(e) =>
								setParams({ ...params, whitelistRoot: e.target.value })
							}
							className={`${
								inputClass[params.whitelistRoot === ""]
							} w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center `}
							type="string"
							placeholder="### whitelistRoot"
							defaultValue={params.whitelistRoot}
						/>
					</div>

					<div className="">
						<div className="text-xs self-center mb-2">
							{"<!-- "}navigate to{" "}
							<a
								href="https://vrf.chain.link/fuji"
								target="_blank"
								rel="noreferrer"
								className="text-blue-700 hover:text-blue-800 hover:underline"
							>
								chainlink VRF
							</a>
							, then follow the instructions to obtain the{" "}
							<span className="font-semibold">subscriptionId</span>
							{" -->"}
						</div>

						<input
							onChange={(e) =>
								setParams({ ...params, vrfSubscriptionId: e.target.value })
							}
							className={`${
								inputClass[params.vrfSubscriptionId === ""]
							} w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center `}
							type="string"
							placeholder="### vrfSubscriptionId"
							defaultValue={params.vrfSubscriptionId}
						/>
					</div>
				</div>
			</div>
			{success ?
				<div id="toast-success" class="fixed top-20 right-10">
					<div class="flex items-center w-auto p-4 mb-4 text-gray-500 bg-gray-800 rounded-lg shadow dark:text-gray-400 dark:bg-white" role="alert">
						<div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
							<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							<span class="sr-only">Check icon</span>
						</div>
						<div class="ms-3 text-sm font-normal text-gray-900">{success ? success : "Success"}</div>
						<button type="button"
							onClick={() => setSuccess(false)}
							class="ms-auto -mx-1.5 -my-1.5 bg-gray-800 text-gray-500 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-white dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
							<span class="sr-only">Close</span>
							<svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
							</svg>
						</button>
					</div>
				</div>
				: null
			}
		</div>
	);
};

export default CreateEventNFTDrop;
