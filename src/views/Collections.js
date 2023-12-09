import { useEffect, useState } from "react";

import { getCollections, getNFTs } from "../helpers/nft";
import CollectionPreview from "../components/CollectionPreview";
import Collection from "../components/Collection";

export default function Collections() {
	const [queryParams, setQueryParams] = useState({
		userId: null,
		listing: null,
		isRootStock: null,
		privateMeta: null,
	});
	const [collections, setCollections] = useState(null);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const res = await getCollections();
			setCollections(res);
		};

		fetchData();
	}, [queryParams, search]);

	if (collections === null) {
		return (
			<div className="fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none">
				<div className="h-full w-full flex items-center justify-center">
					<div className="animate-spin rounded-full self-center h-16 w-16 border-t-2 border-b-2 border-gray-300"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col justify-between">
			<h1 className="text-4xl text-gray-900">
				# Explore other <span className="twinkle-text">collections</span>{" "}
			</h1>
			<div className="flex justify-between gap-1 mx-10 mt-10 mb-8">
				<p className="truncate border-b w-1/2 border-gray-900 text-2xl font-extralight">
					## filter by
				</p>
				<p className="truncate w-min border-gray-900 text-2xl font-extralight">
					/
				</p>
				<p className="truncate border-b w-1/2 border-gray-900 text-2xl font-extralight text-right flex">
					<input
						className="text-right pr-1 appearance-none rounded-full flex-1 outline-none text-gray-600 w-full"
						placeholder="## find your next collections"
						type="text"
						required=""
						onChange={(e) => setSearch(e.target.value)}
					/>
				</p>
			</div>
			<div className="flex flex-wrap gap-y-6 justify-center">
				{collections.length === 0 ? (
					<div className="grid h-96">
						<p className="text-2xl font-light self-center leading-normal my-2 text-gray-500">
							no collections found
						</p>
					</div>
				) : (
					[...collections]
						.reverse()
						.map((collection) => <Collection addressCollection={collection} />)
				)}
			</div>
		</div>
	);
}
