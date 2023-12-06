import { useEffect, useState } from "react";
import EditNFTDataPrice from "./EditNFTDataPrice";
import Transfer from "./Transfer";
import { getUsers } from "../helpers/user";
import { parsePrice } from "../libs/blockchain";

function ManageNFTs({ userId, setManageNFTsPopup }) {
	const [nfts, setNFTs] = useState(null);
	const [selected, setSelected] = useState([]);

	const [editPricePopup, setEditPricePopup] = useState(false);
	const [transferPopup, setTransferPopup] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const user = await getUsers(userId);
			setNFTs(user.nfts);
		};

		fetchData();
	}, [userId]);

	useEffect(() => {
		setSelected(Array(nfts?.length).fill(false));
	}, [nfts]);

	if (nfts === null) {
		return (
			<div className="fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none">
				<div className="h-full w-full flex items-center justify-center">
					<div className="animate-spin rounded-full self-center h-16 w-16 border-t-2 border-b-2 border-gray-300"></div>
				</div>
			</div>
		);
	}

	const toggleSelect = (index) => {
		if (index === -1) {
			setSelected(Array(nfts.length).fill(!selected.includes(true)));
		} else {
			let newSelected = [...selected];
			newSelected[index] = !newSelected[index];
			setSelected(newSelected);
		}
	};

	return (
		<div className="fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none">
			{editPricePopup && (
				<EditNFTDataPrice
					nfts={nfts.filter((_, index) => selected[index])}
					setEditPricePopup={setEditPricePopup}
				/>
			)}
			{transferPopup && (
				<Transfer
					nfts={nfts.filter((_, index) => selected[index])}
					setTransferPopup={setTransferPopup}
				/>
			)}
			<div className="flex items-center justify-center text-gray-500 md:w-11/12 lg:w-3/4 xl:w-1/2 w-3/4">
				<div className="bg-white shadow-xl w-full px-16 py-5 relative">
					<h3 className="self-center text-4xl mt-4 mb-5 text-gray-900">
						# Manage NFTs
					</h3>
					<div className="flex absolute top-24 right-16 gap-x-3">
						<button
							className="rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 cursor-pointer px-5 py-2 disabled:pointer-events-none disabled:bg-opacity-50"
							onClick={() => setEditPricePopup(true)}
							disabled={!selected.includes(true)}
						>
							<p className="text-white text-sm font-semibold">
								Edit NFT/Data Price
							</p>
						</button>
						<button
							className="rounded-full bg-fuchsia-600 flex items-center justify-center hover:bg-fuchsia-700 cursor-pointer px-5 py-2 disabled:pointer-events-none disabled:bg-opacity-50"
							onClick={() => setTransferPopup(true)}
							disabled={!selected.includes(true)}
						>
							<p className="text-white text-sm font-semibold">
								Transfer/Withdraw
							</p>
						</button>
					</div>
					<div className="mt-20 container mx-auto">
						{nfts.length === 0 ? (
							<div className="text-center">
								<p className="text-2xl mb-10 text-gray-500">
									You don't own any NFTs yet.
								</p>
							</div>
						) : (
							<div className="overflow-y-auto mt-5 max-h-[26rem]">
								<div className="flex items-center px-5 py-2 text-gray-600 border border-gray-900">
									<div className="w-[10%]">
										<div
											className="mx-auto w-5 h-5 border-2 border-gray-300 flex items-center justify-center checked:bg-gray-800 cursor-pointer"
											onClick={() => toggleSelect(-1)}
											checked={selected.includes(true)}
										>
											{selected.includes(true) && (
												<div className="check w-3 h-3 bg-gray-800"></div>
											)}
										</div>
									</div>
									<span className="text-center w-[10%]">
										<span className="text-xs text-gray-600 font-bold">
											Thumbnail
										</span>
									</span>
									<span className="text-center w-[10%]">
										<span className="text-xs text-gray-600 font-bold">ID</span>
									</span>
									<span className="text-center w-[30%]">
										<span className="text-xs text-gray-600 font-bold">
											Name
										</span>
									</span>
									<span className="text-center w-[20%]">
										<span className="text-xs text-gray-600 font-bold">
											Price
										</span>
									</span>
									<span className="text-center w-[20%]">
										<span className="text-xs text-gray-600 font-bold">
											Data Price
										</span>
									</span>
								</div>
								{nfts.map((nft, index) => (
									<>
										<div
											className="cursor-pointer h-16 hover:bg-gray-200 bg-white flex p-5 items-center mt-2"
											onClick={() => toggleSelect(index)}
										>
											<div className="w-[10%]">
												<div
													className="mx-auto w-5 h-5 border-2 border-gray-300 flex items-center justify-center checked:bg-gray-600"
													onClick={() => toggleSelect(index)}
													checked={selected[index]}
												>
													{selected[index] && (
														<div className="w-3 h-3 bg-gray-600"></div>
													)}
												</div>
											</div>
											<img
												className="w-[10%] h-auto p-2"
												src={nft.image}
												alt="image"
											/>
											<div className="text-center w-[10%]">
												<span className="text-sm text-gray-800">{nft.id}</span>
											</div>
											<div className="text-center w-[30%]">
												<span className="text-sm text-gray-600">
													{nft.name}
												</span>
											</div>
											<div className="text-center w-[20%]">
												<span className="text-gray-600 tex	t-sm">
													{nft.price.avax !== "0"
														? parsePrice(nft.price.avax)
														: "Not for sale"}
												</span>
											</div>
											<div className="text-center w-[20%]">
												<span className="text-gray-600 text-sm">
													{nft.promptPrice.avax !== "0"
														? parsePrice(nft.promptPrice.avax)
														: "Public data"}
												</span>
											</div>
										</div>
										{index !== nft.length - 1 && (
											<hr className="border-gray-300 my-2" />
										)}
									</>
								))}
							</div>
						)}
					</div>
					<div className="py-10 space-y-2 text-gray-600 sm:-mb-8">
						<p className="text-xs">
							{"<!-- "}Actions to your owned NFTs is accessed from here.{" -->"}
						</p>
						<p className="text-xs">
							{"<!-- "}Any action will all need to send a transaction to the
							blockchain.{" -->"}
						</p>
					</div>
				</div>
			</div>
			<div
				className="h-screen w-screen absolute -z-10"
				onClick={() => setManageNFTsPopup(false)}
			></div>
		</div>
	);
}

export default ManageNFTs;
