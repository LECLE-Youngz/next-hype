import { useEffect, useState } from 'react'
import { getPromptById } from '../helpers/nft';
import { useNavigate } from 'react-router-dom';
import { parsePrompt } from '../libs/data';

function GenerationData({ id, setMetaPopup, data }) {
    const [meta, setMeta] = useState({})
    const [onQuery, setOnQuery] = useState(true)

    const [copy, setCopy] = useState("click to copy")
    const resetTooltip = () => {
        setTimeout(() => {
            setCopy("click to copy")
        }, 50)
        document.removeEventListener("mouseout", resetTooltip);
    };
    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        setCopy("Copied to clipboard!")
        document.addEventListener("mouseout", resetTooltip);
    }

    const navigate = useNavigate();

    useEffect(() => {
        setOnQuery(true)
        const fetchData = async () => {
            let res
            res = data ?? await getPromptById(id)
            setMeta(res.meta)
            setOnQuery(false)
        }
        fetchData()
    }, [])

    return (
        <div className='fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none'>
            <div className="flex items-center justify-center text-gray-500 md:w-11/12 lg:w-3/4 xl:w-2/3 w-3/4 h-[54rem]">
                <div className="bg-white shadow-xl w-full px-16 py-5 h-3/4">
                    <div className='flex justify-between mt-4 mb-10'>
                        <h3 className="self-center text-4xl text-gray-900 text-center"># Generation data</h3>
                        <button className="bg-white border border-gray-900 hover:bg-gray-900 inline-block text-gray-900 hover:text-gray-100 px-5 py-3 h-min self-center text-2xl" onClick={() => navigate("/generate/", { state: { meta: parsePrompt(meta) } })}>
                            Try this prompt
                        </button>
                    </div>
                    <div className="container mx-auto">
                        {
                            onQuery === true ?
                                <div className='h-[26rem] flex justify-center items-center'>
                                    <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-gray-500'></div>
                                </div>
                                :
                                <div className="ml-10 grid grid-cols-4 gap-x-10 gap-y-5 items-center overflow-y-scroll max-h-[26rem]">
                                    <p className="">## prompt</p>
                                    <p className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full" onClick={() => copyText(meta.prompt)}>
                                        <span className="pointer-events-none absolute right-4 bottom-2 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                            {copy}
                                        </span>
                                        {meta.prompt}
                                    </p>
                                    <p className="">## negative prompt</p>
                                    <p className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full" onClick={() => copyText(meta.negative_prompt)}>
                                        <span className="pointer-events-none absolute right-4 bottom-2 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                            {copy}
                                        </span>
                                        {meta.negative_prompt}
                                    </p>
                                    <p className="">## model</p>
                                    <p className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full" onClick={() => copyText(meta.model)}>
                                        <span className="pointer-events-none absolute right-4 bottom-2 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                            {copy}
                                        </span>
                                        {meta.model}
                                    </p>
                                    <p className="">## vae</p>
                                    <p className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full" onClick={() => copyText(meta.vae)}>
                                        <span className="pointer-events-none absolute right-4 bottom-2 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                            {copy}
                                        </span>
                                        {meta.vae}
                                    </p>
                                    <p className="">## size</p>
                                    <p className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full" onClick={() => copyText(meta.W + "x" + meta.H)}>
                                        <span className="pointer-events-none absolute right-4 bottom-2 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                            {copy}
                                        </span>
                                        {meta.W}x{meta.H}
                                    </p>
                                    <p className="">## revision</p>
                                    <p className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full">
                                        <span className="pointer-events-none absolute right-4 bottom-2 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                            {copy}
                                        </span>
                                        {meta.revision}
                                    </p>
                                    <p className="">## steps</p>
                                    <p className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full" onClick={() => copyText(meta.steps)}>
                                        <span className="pointer-events-none absolute right-4 bottom-2 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                            {copy}
                                        </span>
                                        {meta.steps}
                                    </p>
                                    <p className="">## cfg scale</p>
                                    <p className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full" onClick={() => copyText(meta.guidance_scale)}>
                                        <span className="pointer-events-none absolute right-4 bottom-2 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                            {copy}
                                        </span>
                                        {meta.guidance_scale}
                                    </p>
                                    <p className="">## seed</p>
                                    <p className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full" onClick={() => copyText(meta.seed)}>
                                        <span className="pointer-events-none absolute right-4 bottom-2 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                            {copy}
                                        </span>
                                        {meta.seed}
                                    </p>
                                    <p className="">## nsfw filter</p>
                                    <p className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full">
                                        <span className="pointer-events-none absolute right-4 bottom-2 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                            {copy}
                                        </span>
                                        {meta.safetychecker}
                                    </p>
                                    <p className="">## attention slicing</p>
                                    <p className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full">
                                        <span className="pointer-events-none absolute right-4 bottom-2 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                            {copy}
                                        </span>
                                        {meta.enable_attention_slicing}
                                    </p>
                                    <p className="">## instant response</p>
                                    <p className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full">
                                        <span className="pointer-events-none absolute right-4 bottom-2 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                            {copy}
                                        </span>
                                        {meta.instant_response}
                                    </p>
                                </div>
                        }
                    </div>
                    <div className="py-10 space-y-2 text-gray-600 sm:-mb-8">
                        <p className="text-xs">{'<!-- '}
                            Generation data can be used to reproduce the same image or some similar styles with little adjustments {' -->'}
                        </p>
                        <p className="text-xs">
                            {'<!-- '}
                            Only public data is shown here, unless you must purchase the prompt
                            {' -->'}
                        </p>
                    </div>
                </div>
            </div>
            <div className='h-screen w-screen absolute -z-10' onClick={() => setMetaPopup(false)}></div>
        </div >
    )
}

export default GenerationData
