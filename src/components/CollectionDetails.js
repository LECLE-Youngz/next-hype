import React from "react";
import NFTPreview from "./NFTPreview";

const CollectionDetails = ({ nft, owner, address, name, symbol }) => {
	return (
		<div className="fixed top-0 right-0 z-20 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none">
			<div className="overflow-y-auto flex items-center justify-center text-gray-500 md:w-11/12 lg:w-3/4 xl:w-2/3 w-3/4">
				<div className="max-h-[80vh] overflow-y-auto bg-white shadow-xl w-full px-16 py-5 relative">
					<div className="flex justify-between mt-5">
						<h3 className="self-center text-4xl text-gray-900">
							# Collection Detail
						</h3>
						<div className="flex items-center space-x-2">
							{nft.length > 0 ? (
								<NFTPreview nft={nft} />
							) : (
								<div className="group border px-3 self-center disabled:pointer-events-none">
									<span className="self-center text-xl px-5 py-2 text-right flex items-center">
										this nft is not listed
									</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CollectionDetails;
