import { useEffect, useState } from "react";
import { getCollectionInfo } from "../helpers/nft";
import { Link } from "react-router-dom";
import { collection } from "../scripts";

const Collection = ({ addressCollection }) => {
	const [collection, setCollection] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const res = await getCollectionInfo(addressCollection);
			setCollection(res);
		};
		fetchData();
	}, []);

	if (collection?.owner === null) {
		return null;
	}

	return (
		<div className="m-3 w-[20rem]">
			<div className="bg-white overflow-hidden border border-gray-200 hover:border-gray-900 px-3 pt-3 text-gray-500">
				{collection == null ? (
					<div className="w-full h-[26.5rem] flex justify-center items-center">
						<div className="animate-spin rounded-full self-center h-16 w-16 border-t-2 border-b-2 border-gray-300"></div>
					</div>
				) : (
					<>
						<div className="block relative object-cover w-[18.5rem] h-[18.5rem]">
							{collection.nft.length === 0 ? (
								<div className="h-full text-center text-gray-500 text-2xl grid">
									<span className="self-center">No NFTs</span>
								</div>
							) : collection.nft.length < 4 ? (
								<img
									src={collection.nft[0].image}
									className="h-full w-full object-cover"
									alt="..."
								/>
							) : (
								<div className="h-full grid grid-cols-2 grid-rows-2 gap-1">
									<img
										src={collection.nft[0].image}
										className="h-full w-full object-cover"
										alt="..."
									/>
									<img
										src={collection.nft[1].image}
										className="h-full w-full object-cover"
										alt="..."
									/>
									<img
										src={collection.nft[2].image}
										className="h-full w-full object-cover"
										alt="..."
									/>
									<div className="relative h-full w-full">
										{collection.nft.length === 4 ? null : (
											<div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
												<span className="text-white text-xl">
													{collection.nft.length - 4} more
												</span>
											</div>
										)}
										<img
											src={collection.nft[3].image}
											className="h-full w-full object-cover"
											alt="..."
										/>
									</div>
								</div>
							)}
						</div>
						<div className="my-auto h-[8rem] grid">
							<div className="mx-4 flex items-center justify-between self-center py-2">
								<div className="text-xl flex w-full justify-between">
									<p className="text-gray-900 truncate">{collection.name}</p>
									<p className="ml-auto text-gray-500 truncate">
										({collection.symbol})
									</p>
								</div>
							</div>
							<hr className="border-gray-200 h-1" />
							<div className="h-full pb-3 flex justify-between w-full">
								<div className="self-center group">
									<Link
										to={"/profile/" + collection.owner.id}
										className="text-gray-800 group-hover:text-gray-500 flex items-center space-x-2 text-xs"
									>
										<img
											src={collection.owner.picture}
											className="border h-10 border-gray-200 group-hover:border-gray-900 rounded-none"
											alt="..."
										/>
										<span>{collection.owner.name}</span>
									</Link>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Collection;
