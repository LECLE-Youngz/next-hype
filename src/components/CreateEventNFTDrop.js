import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNftDrop } from "../helpers/social";

const CreateEventNFTDrop = () => {
	const navigate = useNavigate();
	const [params, setParams] = useState({
		maxSupply: 0,
		require: 0,
		subscriptionId: 0,
	});
	const [creating, setCreating] = useState(false);

	const summit = async () => {
		setCreating(true);
		const res = await createNftDrop(params);
		setCreating(false);
		navigate("/event");
	};

	const inputClass = {
		false: "bg-white border-gray-900 text-gray-900",
		true: "bg-gray-200 text-gray-900 border-gray-200",
	};

	useEffect(() => {
		if (params.maxSupply === 0) {
			setParams({ ...params, maxSupply: "" });
		}
		if (params.require === 0) {
			setParams({ ...params, require: "" });
		}
		if (params.subscriptionId === 0) {
			setParams({ ...params, subscriptionId: "" });
		}
	}, [params]);

	return (
		<div className="flex flex-col justify-between">
			<div className="flex justify-between">
				<h1 className="text-4xl text-gray-900">
					# Ongoing <span className="twinkle-text">events</span>{" "}
				</h1>
				<button
					className="bg-white border border-gray-900 hover:bg-gray-900 inline-block text-gray-900 hover:text-gray-100 px-5 py-3 h-min self-center text-2xl"
					onClick={summit}
				>
					Summit
				</button>
			</div>
			<div className="flex justify-between gap-1 mx-10 mt-10 mb-8">
				<p className="border-b truncate w-full border-gray-900 text-2xl font-extralight">
					## create a event (nft prop task)
				</p>
			</div>

			<div className="grid place-items-center mt-10">
				<div className="grid gap-5 w-1/3 my-auto self-center">
					<div className="">
						<div className="text-xs self-center mb-2">
							{"<!-- "}number of nft you would supply for the{" "}
							<span className="font-semibold">mystery box</span>
							{" -->"}
						</div>

						<input
							onChange={(e) =>
								setParams({ ...params, maxSupply: e.target.value })
							}
							className={`${inputClass[params.maxSupply === ""]
								} w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center `}
							type="number"
							placeholder="### max supply"
							defaultValue={params.header}
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
							<span className="font-semibold">unrevealedURI</span>
							{" -->"}
						</div>

						<input
							onChange={(e) =>
								setParams({ ...params, subscriptionId: e.target.value })
							}
							className={`${inputClass[params.subscriptionId === ""]
								} w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center `}
							type="string"
							placeholder="### unrevealedURI"
							defaultValue={params.description}
						/>
					</div>
					<div className="">
						<div className="text-xs self-center mb-2">
							{"<!-- "}name of nft{" "}
							<span className="font-semibold">mystery box</span>.{" -->"}
						</div>

						<input
							onChange={(e) =>
								setParams({ ...params, require: e.target.value })
							}
							className={`${inputClass[params.require === ""]
								} w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center `}
							type="string"
							placeholder="### name"
							defaultValue={params.description}
						/>
					</div>
					<div className="">
						<div className="text-xs self-center mb-2">
							{"<!-- "}symbol of nft{" "}
							<span className="font-semibold">mystery box</span>.{" -->"}
						</div>

						<input
							onChange={(e) =>
								setParams({ ...params, require: e.target.value })
							}
							className={`${inputClass[params.require === ""]
								} w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center `}
							type="string"
							placeholder="### symbol"
							defaultValue={params.description}
						/>
					</div>
					<div className="">
						<div className="text-xs self-center mb-2">
							{"<!-- "}symbol of nft{" "}
							<span className="font-semibold">mystery box</span>.{" -->"}
						</div>

						<input
							onChange={(e) =>
								setParams({ ...params, require: e.target.value })
							}
							className={`${inputClass[params.require === ""]
								} w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center `}
							type="number"
							placeholder="### maxMintPerUser"
							defaultValue={params.description}
						/>
					</div>
					<div className="">
						<div className="text-xs self-center mb-2">
							{"<!-- "}symbol of nft{" "}
							<span className="font-semibold">mystery box</span>.{" -->"}
						</div>

						<input
							onChange={(e) =>
								setParams({ ...params, require: e.target.value })
							}
							className={`${inputClass[params.require === ""]
								} w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center `}
							type="number"
							placeholder="### fee"
							defaultValue={params.description}
						/>
					</div>
					<div className="">
						<div className="text-xs self-center mb-2">
							{"<!-- "}symbol of nft{" "}
							<span className="font-semibold">mystery box</span>.{" -->"}
						</div>

						<input
							onChange={(e) =>
								setParams({ ...params, require: e.target.value })
							}
							className={`${inputClass[params.require === ""]
								} w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center `}
							type="string"
							placeholder="### whitelistRoot"
							defaultValue={params.description}
						/>
					</div>

					<div className="">
						<div className="text-xs self-center mb-2">
							{"<!-- "}symbol of nft{" "}
							<span className="font-semibold">mystery box</span>.{" -->"}
						</div>

						<input
							onChange={(e) =>
								setParams({ ...params, require: e.target.value })
							}
							className={`${inputClass[params.require === ""]
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
