import { useEffect, useState } from 'react'
import { } from '../scripts'
import { getUsers } from '../helpers/user'
import { getPromptById } from '../helpers/nft'
import { parsePrice } from '../libs/blockchain'

function NFTSelector({ userId, setNFTAndData, setNFTSelectorPopup }) {
	const [nfts, setNFTs] = useState([])
	const [onQuery, setOnQuery] = useState(true)

	useEffect(() => {
		setOnQuery(true)

		const fetchData = async () => {
			await getUsers(userId).then(res => {
				setNFTs(res.nft)
			})
			setOnQuery(false)
		}

		fetchData()
	}, [userId])

	const select = async (index) => {
		const nft = nfts[index]
		const data = await getPromptById(nft.id)
		setNFTAndData(nft, data)
		setNFTSelectorPopup(false)
	}


	return (
		<div className='fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none'>
			<div className="flex items-center justify-center text-gray-500 md:w-11/12 lg:w-3/4 xl:w-1/2 w-3/4">
				<div className="bg-white shadow-xl w-full px-16 py-5 relative">
					<h3 className="self-center text-4xl mt-4 mb-5 text-gray-900"># Choose NFT</h3>
					<div className="my-10 container mx-auto">
						{
							onQuery ?
								<div className="self-center mx-auto animate-spin rounded-full h-16 w-16 border-b-2 border-gray-500"></div>
								:
								nfts.length === 0 ?
									<div className="text-center">
										<p className="pt-5 text-2xl font-semibold leading-normal mb-2 text-gray-500">
											You don't own any NFTs yet.
										</p>
									</div>
									:
									<div className="overflow-y-scroll mt-3 max-h-[26rem]">
										<div className="flex items-center px-5 py-2 bg-gray-100 text-gray-600 rounded shadow-md">
											<span className="text-center w-[10%]">
												<span className="text-xs text-gray-600 font-bold">Thumbnail</span>
											</span>
											<span className="text-center w-[10%]">
												<span className="text-xs text-gray-600 font-bold">ID</span>
											</span>
											<span className="text-center w-[40%]">
												<span className="text-xs text-gray-600 font-bold">Name</span>
											</span>
											<span className="text-center w-[20%]">
												<span className="text-xs text-gray-600 font-bold">Price</span>
											</span>
											<span className="text-center w-[20%]">
												<span className="text-xs text-gray-600 font-bold">Data Price</span>
											</span>
										</div>
										{
											nfts.map((nft, index) => (
												<div className="cursor-pointer h-16 hover:bg-gray-200 bg-white shadow flex p-5 items-center mt-5 rounded" onClick={() => select(index)}>
													<img className="w-[10%] h-auto p-2" src={nft.image} alt="image" />
													<div className="text-center w-[10%]">
														<span className="text-sm text-gray-800">{nft.id}</span>
													</div>
													<div className="text-center w-[40%]">
														<span className="text-sm text-gray-600">{nft.name}</span>
													</div>
													<div className="text-center w-[20%]">
														<span className="text-gray-600 text-sm">{nft.price !== "0" ? parsePrice(nft.price) : "Not for sale"}</span>
													</div>
													<div className="text-center w-[20%]">
														<span className="text-gray-600 text-sm">{nft.promptPrice !== "0" ? parsePrice(nft.promptPrice) : "Public data"}</span>
													</div>
												</div>
											))
										}
									</div>
						}
					</div>
				</div>
			</div>
			<div className='h-screen w-screen absolute -z-10' onClick={() => setNFTSelectorPopup(false)}></div>
		</div>
	)
}

export default NFTSelector
