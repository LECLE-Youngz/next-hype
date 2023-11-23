import React from 'react'

const DataPreview = ({ data }) => {
    return (
        <div className="container mx-auto">
            <div className="ml-10 grid grid-cols-4 gap-x-10 gap-y-5 items-center overflow-y-scroll max-h-[26rem]">
                <p className="">## prompt</p>
                <p className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full">
                    {data.prompt}
                </p>
                <p className="">## negative prompt</p>
                <p className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full">
                    {data.negative_prompt}
                </p>
                <p className="">## model</p>
                <p className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full">
                    {data.model}
                </p>
                <p className="">## vae</p>
                <p className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full">
                    {data.vae}
                </p>
                <p className="">## size</p>
                <p className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full">
                    {data.W}x{data.H}
                </p>
                <p className="">## revision</p>
                <p className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full">
                    {data.revision}
                </p>
                <p className="">## steps</p>
                <p className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full">
                    {data.steps}
                </p>
                <p className="">## cfg scale</p>
                <p className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full">
                    {data.guidance_scale}
                </p>
                <p className="">## seed</p>
                <p className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full">
                    {data.seed}
                </p>
                <p className="">## nsfw filter</p>
                <p className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full">
                    {data.safetychecker}
                </p>
                <p className="">## attention slicing</p>
                <p className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full">
                    {data.enable_attention_slicing}
                </p>
                <p className="">## instant response</p>
                <p className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full">
                    {data.instant_response}
                </p>
            </div>
        </div>
    )
}

export default DataPreview
