import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SiBitcoinsv } from 'react-icons/si'
import { AiOutlineVerticalAlignBottom, AiOutlineSmile, AiOutlineCheck } from 'react-icons/ai'
import GenerationData from './GenerationData'
import { getInfoUser } from '../storage/local'
import DataPurchase from './DataPurchase'
import { btcLogo, rskLogo } from '../data'
import NFTPurchase from './NFTPurchase'

function NFT({ thumbnail, name, id, owner, price, promptPrice, promptBuyer, description, onSale }) {
    const [metaPopup, setMetaPopup] = useState(false)
    const [dataPurchasePopup, setDataPurchasePopup] = useState(false)
    const [nftPurchasePopup, setNFTPurchasePopup] = useState(false)
    const [account, setAccount] = useState({})

    useEffect(() => {
        setAccount(getInfoUser().user)
    }, [])

    return (
        <>
            {metaPopup && <GenerationData id={id} setMetaPopup={setMetaPopup} />}
            {dataPurchasePopup && <DataPurchase id={id} promptPrice={promptPrice} name={name} ownerName={owner.name} userId={owner.id} setDataPurchasePopup={setDataPurchasePopup} />}
            {nftPurchasePopup && <NFTPurchase id={id} price={price} name={name} ownerName={owner.name} userId={owner.id} setNFTPurchasePopup={setNFTPurchasePopup} />}
            <div className="m-3 w-[20rem]">
                <div className="bg-white overflow-hidden border border-gray-200 hover:border-gray-900 px-3 pt-3 text-gray-500">
                    <div className="block relative object-cover w-[18.5rem] h-[18.5rem]">
                        <img
                            src={thumbnail}
                            className="hover:opacity-90 h-full w-full object-cover"
                            alt="..."
                            style={{ objectFit: 'cover', backgroundSize: 'cover', backgroundClip: 'cover' }}
                        />
                        {promptPrice === 0 ?
                            <div className="group absolute bg-green-500 bottom-0 right-0 gap-2 inline-flex items-center text-white px-3 h-12 text-2xl cursor-pointer" onClick={() => setMetaPopup(true)}>
                                <span className="group-hover:block hidden text-sm">Generation data is shown publicly</span>
                                <AiOutlineSmile />
                            </div>
                            : promptBuyer.includes(account?.address?.eth) ?
                                <div className="group absolute bg-red-500 bottom-0 right-0 gap-2 inline-flex items-center text-white px-3 h-12 text-2xl cursor-pointer" onClick={() => setMetaPopup(true)}>
                                    <span className="group-hover:block hidden text-sm">You have access to this generation data</span>
                                    <AiOutlineCheck />
                                </div>
                                : <div className="group absolute bg-gray-900 border-gray-100 drop-shadow-xl bottom-0 right-0 gap-2 inline-flex items-center text-white px-3 h-12 text-2xl cursor-pointer" onClick={() => setDataPurchasePopup(true)}>
                                    <span className="group-hover:block hidden text-sm">Purchase this generation data</span>
                                    <AiOutlineVerticalAlignBottom />
                                </div>
                        }
                    </div>

                    <div className="mx-4 my-auto h-[8rem] grid">
                        <div className="flex items-center justify-between self-center h-[3.5rem]">
                            <h3 className="text-xl">
                                <p className="text-gray-900">{name}</p>
                            </h3>
                        </div>
                        <hr className="-mx-4 border-gray-200 h-[0.5rem]" />
                        <div className="flex flex-col items-center h-[4rem] place-content-center ">
                            <div className='flex items-center justify-between w-full'>
                                <div className='group'>
                                    <Link to={"/profile/" + owner.id} className="group-hover:text-gray-500 inline-flex italic items-center space-x-2 text-xs">
                                        <img src={owner.picture} className="border-2 group-hover:border-gray-500 border-white rounded-full" alt="..." width="36" height="36" />
                                        <span>{owner.name}</span>
                                    </Link>
                                </div>
                                {
                                    price != 0 && <button className="group cursor-pointer disabled:pointer-events-none" onClick={() => setNFTPurchasePopup(true)} disabled={owner.id === account.id}>
                                        <span className="group-hover:text-gray-500 text-lg text-right flex items-center gap-1">{price}
                                            <SiBitcoinsv />
                                        </span>
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NFT
