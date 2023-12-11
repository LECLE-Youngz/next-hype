import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPurchasingEvent } from "../helpers/social";
import { getNumMysteryNFTs } from "../helpers/nft";

const CreateEventPurchase = () => {
	const navigate = useNavigate();
	const [params, setParams] = useState({
		maxSupply: 0,
		require: 0,
		subscriptionId: 0,
		unrevealUri: "",
	});
	const [creating, setCreating] = useState(false);

	const submit = async () => {
		setCreating(true);

		const res = await createPurchasingEvent(params);
		setCreating(false);
		navigate("/event");
	};

	const inputClass = {
		false: "bg-white border-gray-900 text-gray-900",
		true: "bg-gray-200 text-gray-900 border-gray-200",
	};

	useEffect(() => {
		const fetchData = async () => {
			const numNft = await getNumMysteryNFTs();
			setParams({ ...params, maxSupply: numNft });
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (params.require === 0) {
			setParams({ ...params, require: "" });
		}
		if (params.subscriptionId === 0) {
			setParams({ ...params, subscriptionId: "" });
		}
	}, [params]);

	const valid = () =>
		params.maxSupply !== 0 && params.require && params.subscriptionId;

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
					## create a mystery event (purchase task)
				</p>
			</div>

			<div className="grid place-items-center mt-10">
				<div className="grid gap-5 w-1/3 my-auto self-center">
					<div className="">
						<div className="text-xs self-center mb-2">
							{"<!-- "}the masking uri of the{" "}
							<span className="font-semibold">mystery nft</span>
							{" -->"}
						</div>
						<input
							onChange={(e) =>
								setParams({ ...params, unrevealUri: e.target.value })
							}
							className={`${
								inputClass[params.unrevealUri === ""]
							} w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center `}
							type="string"
							placeholder="### unreveal uri"
							defaultValue={params.unrevealUri}
						/>
					</div>

					<div className="">
						<div className="text-xs self-center mb-2">
							{"<!-- "}number of nft you would supply for the{" "}
							<span className="font-semibold">mystery box</span>
							{" -->"}
						</div>

						<div
							className={`${
								inputClass[params.maxSupply === 0]
							} w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center`}
						>
							<p className="text-left w-full">
								{params.maxSupply === 0
									? "please create nfts for the mystery token first"
									: params.maxSupply}
							</p>
						</div>
					</div>

					<div className="">
						<div className="text-xs self-center mb-2">
							{"<!-- "}number of nft purchase required to unlock the{" "}
							<span className="font-semibold">mystery box</span>.{" -->"}
						</div>

						<input
							onChange={(e) =>
								setParams({ ...params, require: e.target.value })
							}
							className={`${
								inputClass[params.require === ""]
							} w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center `}
							type="number"
							placeholder="### require"
							defaultValue={params.description}
						/>
					</div>

					<div className="">
						<div className="text-xs self-center mb-2">
							{"<!-- "}navigate to{" "}
							<a
								href="https://functions.chain.link/"
								target="_blank"
								rel="noreferrer"
								className="text-blue-700 hover:text-blue-800 hover:underline"
							>
								chainlink functions
							</a>
							, then follow the instructions to obtain the{" "}
							<span className="font-semibold">subscription id</span>
							{" -->"}
						</div>

						<input
							onChange={(e) =>
								setParams({ ...params, subscriptionId: e.target.value })
							}
							className={`${
								inputClass[params.subscriptionId === ""]
							} w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center `}
							type="number"
							placeholder="### subscription id"
							defaultValue={params.description}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateEventPurchase;
