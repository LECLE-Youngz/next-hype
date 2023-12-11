import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNftDrop } from "../helpers/social";
import { getNumDropNFTs } from "../helpers/nft";

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
		navigate("/event");
	};

	const inputClass = {
		false: "bg-white border-gray-900 text-gray-900",
		true: "bg-gray-200 text-gray-900 border-gray-200",
	};

	useEffect(() => {
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
							className={`${
								inputClass[params.maxSupply === 0]
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
							{"<!-- "}symbol of nft{" "}
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
								setParams({ ...params, fee: e.target.value })
							}
							className={`${
								inputClass[params.fee === ""]
							} w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center `}
							type="number"
							placeholder="### fee"
							defaultValue={params.description}
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
							defaultValue={params.description}
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
							defaultValue={params.description}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateEventNFTDrop;
