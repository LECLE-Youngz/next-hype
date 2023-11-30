import { useEffect, useState } from "react";

import NFT from "../components/NFT";
import { getNFTs } from "../helpers/nft";

export default function Discover() {
	const [queryParams, setQueryParams] = useState({
		userId: null,
		listing: null,
		isRootStock: null,
		privateMeta: null,
	})
	const [nfts, setNFTs] = useState([])
	const [onQuery, setOnQuery] = useState(true)
	const [search, setSearch] = useState("")

	console.log(nfts)

	useEffect(() => {
		const fetchData = async () => {
			setOnQuery(true);
			try {
				const res = await getNFTs(queryParams);

				if (search !== "") {
					const newNFTs = res.filter(nft => nft.name.toLowerCase().includes(search.toLowerCase()));
					setNFTs(newNFTs);
				} else {
					setNFTs(res);
				}
			} catch (error) {
				console.error('Error fetching and formatting NFTs:', error);
			} finally {
				setOnQuery(false);
			}
		};

		fetchData();
	}, [queryParams, search]);

	if (onQuery) {
		return (
			<div className='fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none'>
				<div className='h-full w-full flex items-center justify-center'>
					<div className="animate-spin rounded-full self-center h-16 w-16 border-t-2 border-b-2 border-gray-300"></div>
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col justify-between">
			<h1 className="text-4xl text-gray-900"># Explore our{' '}
				<span className="twinkle-text">
					exhibition
				</span>{' '}</h1>
			<div className="flex justify-between gap-1 mx-10 mt-10 mb-8">
				<p className="truncate border-b w-1/2 border-gray-900 text-2xl font-extralight">## specify your generation parameters below</p>
				<p className="truncate w-min border-gray-900 text-2xl font-extralight">/</p>
				<p className="truncate border-b w-1/2 border-gray-900 text-2xl font-extralight text-right flex">
					<input className="text-right pr-1 appearance-none rounded-full flex-1 outline-none text-gray-600 w-full" placeholder="## find your next nfts" type="text" required="" onChange={(e) => setSearch(e.target.value)} />
				</p>
			</div>
			<div className="flex flex-wrap gap-y-6 justify-center">
				{
					nfts.length === 0 ?
						<div className="grid h-96">
							<p className="text-2xl font-light self-center leading-normal my-2 text-gray-500">
								no nfts found
							</p>
						</div>
						:
						nfts.map((nft) => (
							<NFT {...nft} />
						))
				}
			</div>
		</div>
	);
}