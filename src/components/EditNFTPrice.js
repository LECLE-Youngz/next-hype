import { useEffect, useState } from "react";
import { editPrices } from "../helpers/nft";
import { parseAmount } from "../libs/blockchain";

function EditNFTPrice({ nfts, setEditPricePopup }) {
	const [onSummit, setOnSummit] = useState(false);
	const [onSuccess, setOnSuccess] = useState(null);
	const [price, setPrice] = useState({ price: 0, promptPrice: 0 });

	const summit = async () => {
		setOnSummit(true);

		const res = await editPrices(
			nfts.map((nft) => {
				return { id: nft.id, address: nft.addressCollection };
			}),
			price.price === null ? "0" : parseAmount(price.price),
			price.promptPrice === null ? "0" : parseAmount(price.promptPrice)
		);

		setOnSuccess(res);
		setOnSummit(false);
	};

	useEffect(() => {
		if (price === "") {
			setPrice(null);
		}
	}, [price]);

	const inputClass = {
		false: "bg-white border-gray-500 text-gray-500",
		true: "bg-gray-200 text-gray-500 border-gray-300",
	};

	useEffect(() => {
		if (price.price === "") {
			setPrice({ ...price, price: null });
		}
		if (price.promptPrice === "") {
			setPrice({ ...price, promptPrice: null });
		}
	}, [price.price, price.promptPrice]);

	useEffect(() => {
		if (price.price === 0) {
			setPrice({ ...price, promptPrice: 0 });
		}
	}, [price.price]);

	const valid = () => price.price !== null && price.promptPrice !== null;

	return (
		<div className="fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none">
			<div className="flex items-center justify-center text-gray-500 md:w-8/12 lg:w-6/12 xl:w-4/12">
				<div className="bg-white shadow-xl w-full px-16 py-5">
					<h3 className="self-center text-4xl mt-4 mb-5 text-gray-900">
						# Edit NFTs' Price
					</h3>
					<div class="mt-10 container mx-auto">
						<div className="grid space-y-5">
							<div className="flex justify-between items-center">
								<input
									type="number"
									placeholder="## price"
									className={`${
										inputClass[price.price === null || price.price === 0]
									}  w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center`}
									onChange={(e) =>
										setPrice({ ...price, price: e.target.value })
									}
									value={price.price === 0 ? "" : price.price}
									disabled={price.price === 0}
								/>
								<p className="text-lg mx-6">AVAX</p>
							</div>
							<div className="flex justify-between items-center">
								<button
									className={`${
										inputClass[price.price === 0]
									} border cursor-pointer none h-12 w-1/2 flex items-center justify-center`}
									onClick={() => setPrice({ ...price, price: null })}
									defaultValue={price.price !== 0}
								>
									available for sale
								</button>
								<button
									className={`${
										inputClass[price.price !== 0]
									} border cursor-pointer none h-12 w-1/2 flex items-center justify-center`}
									onClick={() => setPrice({ ...price, price: 0 })}
									defaultValue={price.price === 0}
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
											price.promptPrice === null || price.promptPrice === 0
										]
									}  w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center`}
									onChange={(e) =>
										setPrice({
											...price,
											promptPrice: e.target.value,
										})
									}
									value={price.promptPrice === 0 ? "" : price.promptPrice}
									disabled={price.promptPrice === 0}
								/>
								<p className="text-lg mx-6">AVAX</p>
							</div>
							<div className="flex justify-between items-center">
								<button
									className={`${
										inputClass[price.promptPrice === 0]
									} border cursor-pointer none h-12 w-1/2 flex items-center justify-center`}
									onClick={() => setPrice({ ...price, promptPrice: null })}
									defaultValue={price.promptPrice !== 0}
								>
									commercialize data
								</button>
								<button
									className={`${
										inputClass[price.promptPrice !== 0]
									} border cursor-pointer none h-12 w-1/2 flex items-center justify-center`}
									onClick={() => setPrice({ ...price, promptPrice: 0 })}
									defaultValue={price.promptPrice === 0}
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
											<p>{onSuccess === null ? "Summit" : "Failed!"}</p>
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
				onClick={() => !onSummit && setEditPricePopup(false)}
			></div>
		</div>
	);
}

export default EditNFTPrice;
