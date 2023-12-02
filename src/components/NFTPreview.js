import React, { useState } from 'react'
import NFTDetail from './NFTDetail'

function NFTPreview({ image, name, id, owner, description, price, promptPrice, promptBuyer, promptAllower, addressCollection, block, className }) {
    const [nftDetailPopup, setNFTDetailPopup] = useState(false)

    return (
        <>
            {!block && nftDetailPopup && <NFTDetail image={image} name={name} id={id} owner={owner} description={description} price={price} promptPrice={promptPrice} promptBuyer={promptBuyer} promptAllower={promptAllower} addressCollection={addressCollection} setNFTDetailPopup={setNFTDetailPopup} />}

            <div className={className} onClick={() => setNFTDetailPopup(true)}>
                <img src={image} className="w-[20rem] h-auto object-cover " alt="..." />
                <div className="absolute bg-opacity-30 bg-gray-900 bottom-0 flex group-hover:bg-opacity-90 inset-x-0 items-center justify-between p-4 text-white sm:px-6">
                    <h2 className="font-semibold">{name}</h2>
                </div>
            </div>
        </>
    )
}

export default NFTPreview
