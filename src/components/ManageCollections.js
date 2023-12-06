import React, { useEffect, useState } from "react";
import { getCollectionInfo, getUserCollections } from "../helpers/nft";
import { parseAddress } from "../libs/blockchain";
import CreateCollectionPopup from "./CreateCollectionPopup";

const ManageCollections = ({ setManageCollectionsPopup }) => {
	const [createCollectionPopup, setCreateCollectionPopup] = useState(false);
	const [loading, setLoading] = useState(true);
	const [collections, setCollections] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const res = await getUserCollections();

			for (let i = 0; i < res.length; i++) {
				const collection = await getCollectionInfo(res[i]);
				res[i] = { address: res[i], ...collection };
			}

			console.log(res);

			setCollections(res);
			setLoading(false);
		};
		fetchData();
	}, [createCollectionPopup]);

	if (loading || collections === null) {
		return (
			<div className="fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none">
				<div className="h-full w-full flex items-center justify-center">
					<div className="animate-spin rounded-full self-center h-16 w-16 border-t-2 border-b-2 border-gray-300"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none">
			{createCollectionPopup && (
				<CreateCollectionPopup
					setCreateCollectionPopup={setCreateCollectionPopup}
				/>
			)}
			<div className="flex items-center justify-center text-gray-500 md:w-11/12 lg:w-3/4 xl:w-1/2 w-3/4">
				<div className="bg-white shadow-xl w-full px-16 py-5 relative">
					<div className="flex justify-between">
						<h3 className="self-center text-4xl text-gray-900">
							# Manage collections
						</h3>
						<button
							className="bg-white border border-gray-900 hover:bg-gray-900 inline-block text-gray-900 hover:text-gray-100 px-5 py-3 h-min self-center text-2xl"
							onClick={() => setCreateCollectionPopup(true)}
						>
							create
						</button>
					</div>
					<div className="my-10 container mx-auto">
						{collections === null ? (
							<div className="self-center mx-auto animate-spin rounded-full h-16 w-16 border-b-2 border-gray-500"></div>
						) : collections.length === 0 ? (
							<div className="text-center">
								<p className="text-2xl mb-10 text-gray-500">
									You don't own any collections yet.
								</p>
							</div>
						) : (
							<div className="overflow-y-auto mt-3 max-h-[26rem]">
								<div className="flex items-center px-5 py-2 text-gray-600 border border-gray-900">
									<span className="text-center w-[25%]">
										<span className="text-xs text-gray-600 font-bold">
											Address
										</span>
									</span>
									<span className="text-center w-[25%]">
										<span className="text-xs text-gray-600 font-bold">
											Name
										</span>
									</span>
									<span className="text-center w-[25%]">
										<span className="text-xs text-gray-600 font-bold">
											Symbol
										</span>
									</span>
									<span className="text-center w-[25%]">
										<span className="text-xs text-gray-600 font-bold">
											Number of NFTs
										</span>
									</span>
								</div>
								{collections.map((collection, index) => (
									<>
										<div className="cursor-pointer h-16 hover:bg-gray-200 bg-white flex p-5 items-center mt-2">
											<div className="text-center w-[25%]">
												<span className="text-sm text-gray-800">
													{parseAddress(collection.address)}
												</span>
											</div>
											<div className="text-center w-[25%]">
												<span className="text-sm text-gray-600">
													{collection.name}
												</span>
											</div>
											<div className="text-center w-[25%]">
												<span className="text-gray-600 text-sm">
													{collection.symbol}
												</span>
											</div>
											<div className="text-center w-[25%]">
												<span className="text-gray-600 text-sm">
													{collection.nft.length}
												</span>
											</div>
										</div>
										{index !== collections.length - 1 && (
											<hr className="border-gray-300 my-2" />
										)}
									</>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
			<div
				className="h-screen w-screen absolute -z-10"
				onClick={() => setManageCollectionsPopup(false)}
			></div>
		</div>
	);
};

export default ManageCollections;
