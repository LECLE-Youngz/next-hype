import React, { useEffect, useState } from 'react'
import { parsePrice } from '../libs/blockchain'
import DataPurchase from './DataPurchase'
import NFTPurchase from './NFTPurchase'
import { getInfoUser } from '../storage/local'
import DataPreview from './DataPreview'
import { Link } from 'react-router-dom'
import { getPromptById } from '../helpers/nft'

const NFTDetail = ({ image, name, id, owner, price, promptPrice, promptBuyer, promptAllower, setNFTDetailPopup, collectionAddress }) => {
    const [dataPurchasePopup, setDataPurchasePopup] = useState(false)
    const [nftPurchasePopup, setNFTPurchasePopup] = useState(false)
    const [account, setAccount] = useState({})
    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const user = await getInfoUser()
            setAccount(user)
            const data = await getPromptById(id)
            setData(data)
        }
        fetchData()
    }, [])

    if (data === null) {
        return (
            <div className='fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none'>
                <div className='h-full w-full flex items-center justify-center'>
                    <div className="animate-spin rounded-full self-center h-16 w-16 border-t-2 border-b-2 border-gray-300"></div>
                </div>
            </div>
        )
    }

    return (
        <>
            {dataPurchasePopup && <DataPurchase id={id} promptPrice={promptPrice} name={name} ownerName={owner.name} userId={owner.id} setDataPurchasePopup={setDataPurchasePopup} />}
            {nftPurchasePopup && <NFTPurchase id={id} price={price} name={name} ownerName={owner.name} userId={owner.id} setNFTPurchasePopup={setNFTPurchasePopup} />}
            <div className='fixed top-0 right-0 z-20 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none'>
                <div className="flex items-center justify-center text-gray-500 md:w-11/12 lg:w-3/4 xl:w-1/2 w-3/4">
                    <div className="bg-white shadow-xl w-full px-16 py-5 relative">
                        <h3 className="self-center text-4xl mt-4 mb-5 text-gray-900"># NFT Detail</h3>

                        <div className="mx-4 flex items-center justify-between self-center py-2">
                            <h3 className="text-4xl font-light w-full text-center">
                                <p className="text-gray-900 text-center">{name}</p>
                            </h3>
                        </div>
                        <hr className="border-gray-200 h-1 mb-5" />

                        <div className='grid grid-cols-2 container gap-x-5'>
                            <img
                                src={image}
                                className="self-center mx-auto hover:opacity-90 h-[26rem] w-auto object-fit"
                                alt="..."
                                style={{ objectFit: 'cover', backgroundSize: 'cover', backgroundClip: 'cover' }}
                            />
                            {promptPrice === "0" || promptBuyer.includes(account.key.ethAddress) || promptAllower?.includes(account.key.ethAddress) ?
                                <div className="">
                                    <DataPreview data={data} />
                                </div>
                                : <div className="relative cursor-pointer" onClick={() => setDataPurchasePopup(true)}>
                                    <div className='blur-lg'>
                                        <DataPreview />
                                    </div>
                                    <div className="absolute inset-0 b\ flex items-center justify-center">
                                        <p className="text-xl text-gray-900 font-light">purchase to see the generation data</p>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="grid mt-5">
                            <div className='my-5 flex justify-between w-full'>
                                <div className='self-center group text-base'>
                                    <Link to={"/profile/" + owner.id} className="text-gray-800 group-hover:text-gray-500 flex items-center space-x-2">
                                        <img src={owner.picture} className="h-14 border border-gray-200 group-hover:border-gray-900 rounded-none" alt="..." />
                                        <span>{owner.name}</span>
                                    </Link>
                                </div>
                                {
                                    price != 0 ?
                                        <button className="group border px-3 hover:bg-gray-900 hover:text-gray-100 self-center hover:border-gray-900 cursor-pointer disabled:pointer-events-none" onClick={() => setNFTPurchasePopup(true)} disabled={owner.id === account.id}>
                                            <span className="self-center text-base px-5 py-2 text-right flex items-center">buy this nft with {parsePrice(price)} eth
                                            </span>
                                        </button>
                                        :
                                        <div className="group border px-3 self-center disabled:pointer-events-none">
                                            <span className="self-center text-base px-5 py-2 text-right flex items-center">this nft is not listed
                                            </span>
                                        </div>

                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='h-screen w-screen absolute -z-10' onClick={() => setNFTDetailPopup(false)}></div>
            </div>
        </>

    )
}

export default NFTDetail
