import React, { useEffect, useState } from 'react'
import { getCollectionName, getNFTsFromCollection, getSymbol } from '../helpers/nft'
import { parseAddress } from '../libs/blockchain'

const CollectionPreview = ({ addressCollection }) => {
    const [collection, setCollection] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const name = await getCollectionName(addressCollection)
            const nfts = await getNFTsFromCollection(addressCollection)
            const symbol = await getSymbol(addressCollection)
            const collection = {
                nfts: nfts,
                name: name,
                symbol: symbol
            }

            console.log(collection)
            setCollection(collection)
        }

        fetchData()
    }, [])

    if (collection === null) {
        return (
            <div className='h-56 w-full flex justify-center'>
                <div className='animate-spin self-center rounded-full w-10 h-10 border-b-2 border-gray-500'></div>
            </div>
        )
    }

    return (
        <div className='w-full'>
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
            <div className="cursor-pointer h-16 hover:bg-gray-200 bg-white shadow flex p-5 items-center mt-3 rounded">
                <div className="text-center w-[25%]">
                    <span className="text-sm text-gray-800">{parseAddress(addressCollection)}</span>
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
        </div>
    )
}

export default CollectionPreview
