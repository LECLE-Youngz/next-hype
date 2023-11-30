import React, { useEffect, useState } from 'react'
import { getCollectionName, getNFTsFromCollection, getSymbol, getUserCollections } from '../helpers/nft'
import { parseAddress } from '../libs/blockchain'

const CollectionSelector = ({ setCollectionSelectorPopup }) => {
    const [collections, setCollections] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const collection = await getUserCollections()
            for (let i = 0; i < collection.length; i++) {
                const name = await getCollectionName(collection[i])
                const nfts = await getNFTsFromCollection(collection[i])
                const symbol = await getSymbol(collection[i])
                collection[i] = {
                    address: collection[i],
                    nfts: nfts,
                    name: name,
                    symbol: symbol
                }
            }
            setCollections(collection)
        }
        fetchData()
    }, [])


    return (
        <div className='fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none'>
            <div className="flex items-center justify-center text-gray-500 md:w-11/12 lg:w-3/4 xl:w-1/2 w-3/4">
                <div className="bg-white shadow-xl w-full px-16 py-5 relative">
                    <h3 className="self-center text-4xl mt-4 mb-5 text-gray-900"># Choose NFT</h3>
                    <div className="my-10 container mx-auto">
                        {
                            collections === null ?
                                <div className="self-center mx-auto animate-spin rounded-full h-16 w-16 border-b-2 border-gray-500"></div>
                                :
                                collections.length === 0 ?
                                    <div className="text-center">
                                        <p className="pt-5 text-2xl font-semibold leading-normal mb-2 text-gray-500">
                                            You don't own any collections yet.
                                        </p>
                                    </div>
                                    :
                                    <div className="overflow-y-auto mt-3 max-h-[26rem]">
                                        <div className="flex items-center px-5 py-2 bg-gray-100 text-gray-600 rounded shadow-md">
                                            <span className="text-center w-[25%]">
                                                <span className="text-xs text-gray-600 font-bold">Address</span>
                                            </span>
                                            <span className="text-center w-[25%]">
                                                <span className="text-xs text-gray-600 font-bold">Name</span>
                                            </span>
                                            <span className="text-center w-[25%]">
                                                <span className="text-xs text-gray-600 font-bold">Symbol</span>
                                            </span>
                                            <span className="text-center w-[25%]">
                                                <span className="text-xs text-gray-600 font-bold">Number of NFTs</span>
                                            </span>
                                        </div>
                                        {
                                            collections.map((collection, index) => (
                                                <div className="cursor-pointer h-16 hover:bg-gray-200 bg-white shadow flex p-5 items-center mt-5 rounded">
                                                    <div className="text-center w-[25%]">
                                                        <span className="text-sm text-gray-800">{parseAddress(collection.address)}</span>
                                                    </div>
                                                    <div className="text-center w-[25%]">
                                                        <span className="text-sm text-gray-600">{collection.name}</span>
                                                    </div>
                                                    <div className="text-center w-[25%]">
                                                        <span className="text-gray-600 text-sm">{collection.symbol}</span>
                                                    </div>
                                                    <div className="text-center w-[25%]">
                                                        <span className="text-gray-600 text-sm">{collection.nfts.length}</span>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                        }
                    </div>
                </div>
            </div>
            <div className='h-screen w-screen absolute -z-10' onClick={() => setCollectionSelectorPopup(false)}></div>
        </div >
    )
}

export default CollectionSelector