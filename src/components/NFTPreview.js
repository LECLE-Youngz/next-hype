import React from 'react'

function NFTPreview({ thumbnail, name, id, owner, price, promptPrice, promptBuyer, description, onSale }) {
    return (
        <div className="block group mx-auto relative w-[20rem] h-[20rem] cursor-pointer">
            <img src={thumbnail} className="w-[20rem] h-auto object-cover " alt="..." />
            <div className="absolute bg-opacity-30 bg-gray-900 bottom-0 flex group-hover:bg-opacity-90 inset-x-0 items-center justify-between p-4 text-white sm:px-6">
                <h2 className="font-semibold">{name}</h2>
            </div>
        </div>
    )
}

export default NFTPreview
