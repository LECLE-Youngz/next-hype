import { useEffect, useState } from "react";
import { mintNFT } from "../helpers/nft";
import { parseAddress, parseAmount } from "../libs/blockchain";
import CollectionSelector from "./CollectionSelector";

function Mint({ response, setMintPopup }) {
	const [onSummit, setOnSummit] = useState(false);
	const [onSuccess, setOnSuccess] = useState(null);
	const [chooseCollectionPopup, setChooseCollectionPopup] = useState(false);

	const summit = async () => {
		setOnSummit(true);

		const res = await mintNFT(
			{
				...mintParams,
				price: parseAmount(mintParams.price),
				promptPrice: parseAmount(mintParams.promptPrice),
				collection: mintParams.collection.address,
			},
			response.meta
		);

		setOnSuccess(res);
		setOnSummit(false);
	};

	const setCollection = (collection) => {
		setMintParams({ ...mintParams, collection: collection });
		setChooseCollectionPopup(false);
	};

	const [mintParams, setMintParams] = useState({
		name: "",
		description: "",
		price: null,
		promptPrice: null,
		image: response.output[0],
		collection: null,
	});

	useEffect(() => {
		if (mintParams.price === "") {
			setMintParams({ ...mintParams, price: null });
		}
		if (mintParams.promptPrice === "") {
			setMintParams({ ...mintParams, promptPrice: null });
		}
	}, [mintParams.price, mintParams.promptPrice]);

	useEffect(() => {
		if (mintParams.price === 0) {
			setMintParams({ ...mintParams, promptPrice: 0 });
		}
	}, [mintParams.price]);

	const inputClass = {
		false: "bg-white border-gray-900 text-gray-900",
		true: "bg-gray-200 text-gray-900 border-gray-200",
	};

	const valid = () =>
		mintParams.name !== "" &&
		mintParams.price !== null &&
		mintParams.promptPrice !== null &&
		onSuccess !== false &&
		mintParams.collection !== null &&
		mintParams.description !== "";

	return (
		<div className="fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none">
			{chooseCollectionPopup && (
				<CollectionSelector
					setCollection={setCollection}
					setChooseCollectionPopup={setChooseCollectionPopup}
				/>
			)}
			<div className="flex items-center justify-center text-gray-500 md:w-8/12 lg:w-6/12 xl:w-4/12">
				<div className="bg-white shadow-xl w-full px-16 py-5">
					<h3 className="self-center text-4xl mt-4 mb-5 text-gray-900">
						# Mint NFT
					</h3>
					<div class="container mx-auto">
						<div className="grid space-y-5">
							<input
								type="text"
								placeholder="## name"
								className={`${
									inputClass[mintParams.name === ""]
								}  w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center`}
								onChange={(e) =>
									setMintParams({ ...mintParams, name: e.target.value })
								}
							/>
							<input
								type="text"
								placeholder="## description"
								className={`${
									inputClass[mintParams.description === ""]
								}  w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center`}
								onChange={(e) =>
									setMintParams({ ...mintParams, description: e.target.value })
								}
							/>
							<div
								className={`${
									inputClass[mintParams.collection === null]
								}  w-full h-12 p-3 border  focus:outline-black flex items-center cursor-pointer justify-between`}
								onClick={() => setChooseCollectionPopup(true)}
							>
								{mintParams.collection === null ? (
									<div className="text-gray-400">## collection</div>
								) : (
									<>
										<span className="text-gray-900">
											{mintParams.collection.name}
										</span>
										<span className="text-gray-400">
											{parseAddress(mintParams.collection.address)}
										</span>
									</>
								)}
							</div>
							<div className="flex justify-between items-center">
								<input
									type="number"
									placeholder="## price"
									className={`${
										inputClass[
											mintParams.price === null || mintParams.price === 0
										]
									}  w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center`}
									onChange={(e) =>
										setMintParams({ ...mintParams, price: e.target.value })
									}
									value={mintParams.price === 0 ? "" : mintParams.price}
									disabled={mintParams.price === 0}
								/>
								<p className="text-lg mx-6">AVAX</p>
							</div>
							<div className="flex justify-between items-center">
								<button
									className={`${
										inputClass[mintParams.price === 0]
									} border cursor-pointer none h-12 w-1/2 flex items-center justify-center`}
									onClick={() => setMintParams({ ...mintParams, price: null })}
									defaultValue={mintParams.price !== 0}
								>
									available for sale
								</button>
								<button
									className={`${
										inputClass[mintParams.price !== 0]
									} border cursor-pointer none h-12 w-1/2 flex items-center justify-center`}
									onClick={() => setMintParams({ ...mintParams, price: 0 })}
									defaultValue={mintParams.price === 0}
								>
									not for sale
								</button>
							</div>
							<div className="flex justify-between items-center">
								<input
									type="number"
									placeholder="## generation data price"
									className={`${
										inputClass[
											mintParams.promptPrice === null ||
												mintParams.promptPrice === 0
										]
									}  w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center`}
									onChange={(e) =>
										setMintParams({
											...mintParams,
											promptPrice: e.target.value,
										})
									}
									value={
										mintParams.promptPrice === 0 ? "" : mintParams.promptPrice
									}
									disabled={mintParams.promptPrice === 0}
								/>
								<p className="text-lg mx-6">AVAX</p>
							</div>
							<div className="flex justify-between items-center">
								<button
									className={`${
										inputClass[mintParams.promptPrice === 0]
									} border cursor-pointer none h-12 w-1/2 flex items-center justify-center`}
									onClick={() =>
										setMintParams({ ...mintParams, promptPrice: null })
									}
									defaultValue={mintParams.promptPrice !== 0}
								>
									commercialize data
								</button>
								<button
									className={`${
										inputClass[mintParams.promptPrice !== 0]
									} border cursor-pointer none h-12 w-1/2 flex items-center justify-center`}
									onClick={() =>
										setMintParams({ ...mintParams, promptPrice: 0 })
									}
									defaultValue={mintParams.promptPrice === 0}
								>
									public data
								</button>
							</div>
						</div>
						<div className="flex">
							<button
								className={`${
									onSummit || onSuccess
										? "border-gray-500 cursor-default"
										: "hover:border-gray-500"
								} group h-12 w-40 mt-10 mx-auto border border-gray-900 hover:bg-gray-900 transition duration-300 disabled:cursor-default disabled:pointer-events-none`}
								onClick={() => summit()}
								disabled={!valid() || onSuccess}
							>
								<div className="relative flex items-center space-x-4 justify-center">
									<span className="block text-gray-900 text-sm transition duration-300 group-hover:text-gray-200 sm:text-base">
										{!onSummit && !onSuccess ? (
											<p>{onSuccess === null ? "Mint" : "Failed!"}</p>
										) : !onSuccess ? (
											<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
										) : (
											<svg
												className="h-6 w-6 fill-gray-500"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 50 50"
											>
												<path d="M 41.957031 8.9765625 A 2.0002 2.0002 0 0 0 40.333984 9.8945312 L 21.503906 38.279297 L 9.3261719 27.501953 A 2.0007191 2.0007191 0 1 0 6.6738281 30.498047 L 20.574219 42.796875 A 2.0002 2.0002 0 0 0 23.566406 42.40625 L 43.666016 12.105469 A 2.0002 2.0002 0 0 0 41.957031 8.9765625 z"></path>
											</svg>
										)}
									</span>
								</div>
							</button>
						</div>
					</div>
					<div className="py-10 space-y-2 text-gray-600 sm:-mb-8">
						<p className="text-xs">
							{"<!-- "}Your charge is only for gas fee calculated by the{" "}
							<span className="font-semibold">LINK</span> network{" -->"}
						</p>
						<p className="text-xs">
							{"<!-- "}We do not take any fees from your minting process
							{" -->"}
						</p>
					</div>
				</div>
			</div>
			<div
				className="h-screen w-screen absolute -z-10"
				onClick={() => !onSummit && setMintPopup(false)}
			></div>
		</div>
	);
}

export default Mint;
