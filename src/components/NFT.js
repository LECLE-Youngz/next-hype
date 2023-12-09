import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	AiOutlineVerticalAlignBottom,
	AiOutlineSmile,
	AiOutlineCheck,
} from "react-icons/ai";
import GenerationData from "./GenerationData";
import { getInfoUser } from "../storage/local";
import DataPurchase from "./DataPurchase";
import NFTPurchase from "./NFTPurchase";
import { parsePrice } from "../libs/blockchain";
import NFTDetail from "./NFTDetail";

function NFT({
	image,
	name,
	id,
	owner,
	meta,
	description,
	price,
	promptPrice,
	promptBuyer,
	promptAllower,
	addressCollection,
}) {
	const [metaPopup, setMetaPopup] = useState([false]);
	const [dataPurchasePopup, setDataPurchasePopup] = useState(false);
	const [nftPurchasePopup, setNFTPurchasePopup] = useState(false);
	const [nftDetailPopup, setNFTDetailPopup] = useState(false);
	const [account, setAccount] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const user = await getInfoUser();
			setAccount(user);
		};
		fetchData();
	}, []);

	if (account === null) {
		return (
			<div className="fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none">
				<div className="h-full w-full flex items-center justify-center">
					<div className="animate-spin rounded-full self-center h-16 w-16 border-t-2 border-b-2 border-gray-300"></div>
				</div>
			</div>
		);
	}

	return (
		<>
			{metaPopup[0] && (
				<GenerationData
					id={id}
					data={meta ? { meta } : null}
					addressCollection={addressCollection}
					setMetaPopup={setMetaPopup}
				/>
			)}
			{dataPurchasePopup && (
				<DataPurchase
					id={id}
					promptPrice={promptPrice}
					name={name}
					ownerName={owner.name}
					userId={owner.id}
					addressCollection={addressCollection}
					setDataPurchasePopup={setDataPurchasePopup}
				/>
			)}
			{nftPurchasePopup && (
				<NFTPurchase
					id={id}
					price={price}
					name={name}
					ownerName={owner.name}
					userId={owner.id}
					addressCollection={addressCollection}
					setNFTPurchasePopup={setNFTPurchasePopup}
				/>
			)}
			{nftDetailPopup && (
				<NFTDetail
					image={image}
					name={name}
					id={id}
					owner={owner}
					description={description}
					price={price}
					meta={meta}
					promptPrice={promptPrice}
					promptBuyer={promptBuyer}
					promptAllower={promptAllower}
					addressCollection={addressCollection}
					setNFTDetailPopup={setNFTDetailPopup}
				/>
			)}
			<div className="m-3 w-[20rem]">
				<div className="bg-white overflow-hidden border border-gray-200 hover:border-gray-900 px-3 pt-3 text-gray-500">
					<div className="block relative object-cover w-[18.5rem] h-[18.5rem]">
						<img
							onClick={() => setNFTDetailPopup(true)}
							src={image}
							className="hover:opacity-90 h-full w-full object-cover"
							alt="..."
							style={{
								objectFit: "cover",
								backgroundSize: "cover",
								backgroundClip: "cover",
							}}
						/>
						{!promptPrice || promptPrice.avax === "0" ? (
							<div
								className="group absolute bg-green-500 bottom-0 right-0 gap-2 inline-flex items-center text-white px-3 h-12 text-2xl cursor-pointer"
								onClick={() => setMetaPopup([true])}
							>
								<span className="group-hover:block hidden text-sm">
									generation data is shown publicly
								</span>
								<AiOutlineSmile />
							</div>
						) : promptBuyer?.includes(account.key.ethAddress.toLowerCase()) ||
						  promptAllower?.includes(account.key.ethAddress.toLowerCase()) ? (
							<div
								className="group absolute bg-red-500 bottom-0 right-0 gap-2 inline-flex items-center text-white px-3 h-12 text-2xl cursor-pointer"
								onClick={() => setMetaPopup([true])}
							>
								<span className="group-hover:block hidden text-sm">
									you have access to this generation data
								</span>
								<AiOutlineCheck />
							</div>
						) : (
							<div
								className="group absolute bg-gray-900 border-gray-100 drop-shadow-xl bottom-0 right-0 gap-2 inline-flex items-center text-white px-3 h-12 text-2xl cursor-pointer"
								onClick={() => setDataPurchasePopup(true)}
							>
								<span className="group-hover:block hidden text-sm">
									purchase this generation data
								</span>
								<AiOutlineVerticalAlignBottom />
							</div>
						)}
					</div>

					<div className="my-auto h-[8rem] grid">
						<div className="mx-4 flex items-center justify-between self-center py-2">
							<h3 className="text-xl grid">
								<p className="text-gray-900 truncate">{name}</p>
							</h3>
						</div>
						<hr className="border-gray-200 h-1" />
						<div className="h-full pb-3 flex justify-between w-full">
							<div className="self-center group">
								<Link
									to={"/profile/" + owner.id}
									className="text-gray-800 group-hover:text-gray-500 flex items-center space-x-2 text-xs"
								>
									<img
										src={owner.picture}
										className="border h-10 border-gray-200 group-hover:border-gray-900 rounded-none"
										alt="..."
									/>
									<span>{owner.name}</span>
								</Link>
							</div>
							{price.avax !== "0" && (
								<button
									className="group border px-3 hover:bg-gray-900 hover:text-gray-100 h-10 self-center hover:border-gray-900 cursor-pointer disabled:pointer-events-none"
									onClick={() => setNFTPurchasePopup(true)}
									disabled={owner.id === account.user.id}
								>
									<span className="self-center text-sm text-right flex items-center gap-1">
										{parsePrice(price.avax)}
									</span>
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default NFT;
