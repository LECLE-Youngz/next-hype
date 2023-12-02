import React, { useEffect, useState } from "react";
import { parsePrice } from "../libs/blockchain";
import DataPurchase from "./DataPurchase";
import NFTPurchase from "./NFTPurchase";
import { getInfoUser } from "../storage/local";
import DataPreview from "./DataPreview";
import { Link } from "react-router-dom";
import {
	getCollectionName,
	getLinkedPosts,
	getPromptById,
} from "../helpers/nft";
import PostPreview from "./PostPreview";
import CollectionPreview from "./CollectionPreview";

const NFTDetail = ({
	image,
	name,
	id,
	owner,
	price,
	description,
	promptPrice,
	promptBuyer,
	promptAllower,
	setNFTDetailPopup,
	addressCollection,
}) => {
	const [dataPurchasePopup, setDataPurchasePopup] = useState(false);
	const [nftPurchasePopup, setNFTPurchasePopup] = useState(false);
	const [account, setAccount] = useState({});
	const [data, setData] = useState(null);
	const [linkedPosts, setLinkedPosts] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const user = await getInfoUser();
			setAccount(user);
			const data = await getPromptById(id, addressCollection);
			setData(data);
			const linkedPosts = await getLinkedPosts(id, addressCollection);
			setLinkedPosts(linkedPosts);
		};
		fetchData();
	}, []);

	if (linkedPosts === null) {
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
			{dataPurchasePopup[0] && (
				<DataPurchase
					id={id}
					promptPrice={promptPrice}
					name={name}
					ownerName={owner.name}
					userId={owner.id}
					addressCollection={addressCollection}
					isAvax={dataPurchasePopup[1]}
					setDataPurchasePopup={setDataPurchasePopup}
				/>
			)}
			{nftPurchasePopup[0] && (
				<NFTPurchase
					id={id}
					price={price}
					name={name}
					ownerName={owner.name}
					userId={owner.id}
					addressCollection={addressCollection}
					isAvax={nftPurchasePopup[1]}
					setNFTPurchasePopup={setNFTPurchasePopup}
				/>
			)}
			<div className="fixed top-0 right-0 z-20 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none">
				<div className="overflow-y-auto flex items-center justify-center text-gray-500 md:w-11/12 lg:w-3/4 xl:w-2/3 w-3/4">
					<div className="max-h-[80vh] overflow-y-auto bg-white shadow-xl w-full px-16 py-5 relative">
						<div className="flex justify-between mt-5">
							<h3 className="self-center text-4xl text-gray-900">
								# NFT Detail
							</h3>
							<div className="flex items-center space-x-2">
								{price.avax != 0 ? (
									<button
										className="group border px-3 hover:bg-gray-900 hover:text-gray-100 self-center hover:border-gray-900 cursor-pointer disabled:pointer-events-none"
										onClick={() => setNFTPurchasePopup([true, true])}
										disabled={owner.id === account.user.id}
									>
										<span className="self-center text-xl px-5 py-2 text-right flex items-center">
											{owner.id === account.user.id
												? "this nft is yours"
												: parsePrice(price.avax) + " avax"}
										</span>
									</button>
								) : (
									<div className="group border px-3 self-center disabled:pointer-events-none">
										<span className="self-center text-xl px-5 py-2 text-right flex items-center">
											this nft is not listed
										</span>
									</div>
								)}
								{price.usd != 0 && owner.id !== account.user.id && (
									<button
										className="group border px-3 hover:bg-gray-900 hover:text-gray-100 self-center hover:border-gray-900 cursor-pointer disabled:pointer-events-none"
										onClick={() => setNFTPurchasePopup([true, false])}
										disabled={owner.id === account.user.id}
									>
										<span className="self-center text-xl px-5 py-2 text-right flex items-center">
											{parsePrice(price.usd) + " usd"}
										</span>
									</button>
								)}
							</div>
						</div>

						<div className="mb-3 mx-4 mt-2 flex items-center justify-between self-center py-2">
							<h3 className="w-full text-center flex flex-col">
								<p className="text-gray-900 text-4xl font-light ">{name}</p>
								<hr className="border-gray-200 h-1 my-3" />
								<p className="text-gray-500 text-xl font-light">
									{description}
								</p>
							</h3>
						</div>

						<div className="grid grid-cols-2 container gap-x-5">
							<img
								src={image}
								className="self-center mx-auto hover:opacity-90 h-[26rem] w-auto object-fit"
								alt="..."
								style={{
									objectFit: "cover",
									backgroundSize: "cover",
									backgroundClip: "cover",
								}}
							/>
							{promptPrice.avax === "0" ||
							promptBuyer?.includes(account.key.ethAddress.toLowerCase()) ||
							promptAllower?.includes(account.key.ethAddress.toLowerCase()) ? (
								<div className="">
									<DataPreview data={data} />
								</div>
							) : (
								<div className="relative">
									<div className="blur-lg">
										<DataPreview />
									</div>
									<div className="absolute inset-0 flex items-center justify-center">
										<p className="grid text-xl text-gray-900 font-light">
											purchase to see the generation data
											<div className="flex justify-center mt-5 space-x-2">
												<button
													className="group border px-3 hover:bg-gray-900 hover:text-gray-100 self-center hover:border-gray-900 cursor-pointer"
													onClick={() => setDataPurchasePopup([true, true])}
												>
													<span className="self-center text-base px-5 py-2 text-right flex items-center">
														{parsePrice(promptPrice.avax) + " avax"}
													</span>
												</button>
												<button
													className="group border px-3 hover:bg-gray-900 hover:text-gray-100 self-center hover:border-gray-900 cursor-pointer"
													onClick={() => setDataPurchasePopup([true, false])}
												>
													<span className="self-center text-base px-5 py-2 text-right flex items-center">
														{parsePrice(promptPrice.usd) + " usd"}
													</span>
												</button>
											</div>
										</p>
									</div>
								</div>
							)}
						</div>
						<div className="grid mx-4 mt-7 mb-2">
							<div className="flex justify-between w-full">
								<div className="self-center group text-base">
									<Link
										to={"/profile/" + owner.id}
										className="text-gray-800 group-hover:text-gray-500 flex items-center space-x-2"
									>
										<img
											src={owner.picture}
											className="h-14 border border-gray-200 group-hover:border-gray-900 rounded-none"
											alt="..."
										/>
										<span>{owner.name}</span>
									</Link>
								</div>
							</div>
							<div className="my-5 w-full mt-10 space-y-5">
								<div className="self-center group text-base">
									<span className="text-2xl font-extralight">
										<span className="text-gray-800">
											## collection information
										</span>
									</span>
								</div>
								<CollectionPreview addressCollection={addressCollection} />
							</div>
							{linkedPosts.length > 0 && (
								<div className="my-5 grid justify-between w-full">
									<div className="self-center group text-base">
										<span className="text-2xl font-extralight">
											<span className="text-gray-800">## linked to posts</span>
										</span>
									</div>
									<div className="mt-5 col-span-3 flex flex-wrap gap-y-6 justify-evenly">
										{linkedPosts.map((post, index) => (
											<div className="grid border w-[31rem] h-56 border-gray-200 hover:border-gray-900">
												<PostPreview postId={post.id} />
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				<div
					className="h-screen w-screen absolute -z-10"
					onClick={() => setNFTDetailPopup(false)}
				></div>
			</div>
		</>
	);
};

export default NFTDetail;
