import { useState } from "react";
import { buyNFT } from "../helpers/nft";
import { parsePrice } from "../libs/blockchain";

function NFTPurchase({
	id,
	name,
	price,
	ownerName,
	userId,
	addressCollection,
	isAvax = true,
	setNFTPurchasePopup,
}) {
	const [onSummit, setOnSummit] = useState(false);
	const [onSuccess, setOnSuccess] = useState(null);

	const summit = async () => {
		setOnSummit(true);

		const res = await buyNFT(userId, id, addressCollection, price, isAvax);

		setOnSuccess(res);
		setOnSummit(false);
	};

	return (
		<div className="fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none">
			<div className="flex items-center justify-center text-gray-500 md:w-8/12 lg:w-6/12 xl:w-5/12">
				<div className="bg-white shadow-xl w-full px-16 py-5 h-3/4">
					<h3 className="self-center text-4xl mt-4 mb-5 text-gray-900">
						# Purchase NFT
					</h3>
					<div class="container mx-auto">
						<p className="font-semibold ml-10 text-gray-500">
							you are about to purchase the
							<span className="font-semibold twinkle-text"> {name} </span>
							<span className="font-semibold">nft</span>
						</p>
						<div className="grid grid-cols-3 gap-4 mt-10 mx-10">
							<p className="text-lg text-gray-500 font-semibold">## id</p>
							<p className="col-span-2 text-lg text-gray-700 font-semibold">
								{id}
							</p>
							<p className="text-lg text-gray-500 font-semibold">## nanme</p>
							<p className="col-span-2 text-lg text-gray-700 font-semibold">
								{name}
							</p>
							<p className="text-lg text-gray-500 font-semibold">
								## transfer to
							</p>
							<p className="col-span-2 text-lg text-gray-700 font-semibold">
								{ownerName}
							</p>
							<p className="text-lg text-gray-500 font-semibold">
								## nft price
							</p>
							<p className="col-span-2 text-lg text-gray-700 font-semibold">
								{isAvax
									? parsePrice(price.avax) + " avax"
									: parsePrice(price.usd) + " usd"}
							</p>
						</div>
						<div className="container mx-auto grid gap-2 mt-10 w-1/2">
							<button
								className="group border py-4 px-8 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors ease-in-out duration-500 disabled:pointer-events-none"
								onClick={() => summit()}
								disabled={onSummit || onSuccess}
							>
								<div className="relative flex items-center space-x-4 justify-center">
									{!onSummit && !onSuccess ? (
										<p className="block w-max text-gray-900 text-lg transition duration-300 group-hover:text-gray-100">
											{onSuccess === null ? "Purchase" : "Failed!"}
										</p>
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
								</div>
							</button>
						</div>
					</div>
					<div className="py-10 space-y-2 text-gray-600 sm:-mb-8">
						<p className="text-xs">
							{"<!-- "}nft purchase{" "}
							<span className="underline underline-offset-2">does include</span>{" "}
							the generation data{" -->"}
						</p>
						<p className="text-xs">
							{"<!-- "}your charge will be{" "}
							<span className="underline underline-offset-2">higher than</span>{" "}
							the price shown up due to the network fee{" -->"}
						</p>
					</div>
				</div>
			</div>
			<div
				className="h-screen w-screen absolute -z-10"
				onClick={() => !onSummit && setNFTPurchasePopup(false)}
			></div>
		</div>
	);
}

export default NFTPurchase;
