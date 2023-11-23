import { useEffect, useState } from 'react';
import { getInfoUser } from '../storage/local';
import NFTSelector from './NFTSelector';
import { LiaUndoAltSolid } from "react-icons/lia";
import GenerationData from './GenerationData';
import { createPost, getPosts } from '../helpers/social';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ updatePosts }) => {
    const [account, setAccount] = useState(null)

    const [postParams, setPostParams] = useState({
        header: "",
        description: "",
        text: "",
        nft: null,
        data: null,
        nsfwContent: false,
        exclusiveContent: false,
        tags: null,
    })

    const [nftSelectorPopup, setNFTSelectorPopup] = useState(false)
    const [metaPopup, setMetaPopup] = useState(false)
    const [creating, setCreating] = useState(false)

    useEffect(() => {
        const user = getInfoUser().user
        setAccount(user);
    }, [])

    const setNFTAndData = (nft, data) => {
        setPostParams({ ...postParams, nft, data })
    }

    const navigate = useNavigate()

    const post = async () => {
        setCreating(true)
        const tags = postParams.tags !== null ? postParams.tags.split(" ") : []
        const res = await createPost(postParams.header, postParams.description, postParams.text, postParams.nft.id, tags)
        const newPosts = await getPosts()
        updatePosts(newPosts)
        navigate(`/social/${res.id}`)
    }

    const inputClass = {
        false: "bg-white border-gray-900 text-gray-900",
        true: "bg-gray-200 text-gray-900 border-gray-200",
    }

    const previewSizeClass = (ratio) => ratio === 1 || isNaN(ratio) ? "w-[20rem] h-[20rem]" : ratio > 1 ? "w-[20rem] h-[32rem]" : "w-[32rem] h-[20rem]"

    if (creating) {
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
            {
                nftSelectorPopup &&
                <NFTSelector userId={account.id} setNFTAndData={setNFTAndData} setNFTSelectorPopup={setNFTSelectorPopup} />
            }
            {
                metaPopup &&
                <GenerationData data={postParams.data} setMetaPopup={setMetaPopup} />
            }
            <div className="flex justify-between">
                <h1 className="text-4xl text-gray-900"># Join the{' '}
                    <span className="twinkle-text">
                        community
                    </span>{' '}</h1>
                <button className="bg-white border border-gray-900 hover:bg-gray-900 inline-block text-gray-900 hover:text-gray-100 px-5 py-3 h-min self-center text-2xl" onClick={post}>
                    Summit
                </button>
            </div>
            <div className="flex justify-between gap-1 mx-10 mt-10 mb-8">
                <p className="border-b truncate w-1/2 border-gray-900 text-2xl font-extralight">## share your ideas</p>
                <p className="w-min border-gray-900 text-2xl font-extralight">/</p>
                <p className="border-b truncate w-1/2 border-gray-900 text-2xl font-extralight text-right">## post settings</p>
            </div>
            <div className="grid grid-cols-2 mx-10 gap-10">
                <div className='grid gap-3'>
                    <input onChange={(e) => setPostParams({ ...postParams, header: e.target.value })} className={`${inputClass[postParams.header === '']} w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center `} type="text" placeholder='### title' />

                    <input onChange={(e) => setPostParams({ ...postParams, description: e.target.value })} className={`${inputClass[postParams.description === '']} w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center `} type="text" placeholder='### description' />

                    <p className='mt-3 text-sm text-gray-600'>{'<!-- '} the post content is formatted using
                        <a href='https://www.markdownguide.org/basic-syntax/' className='text-blue-500 hover:text-blue-700'> markdown syntax</a>
                        {' -->'}</p>

                    <textarea className={`${inputClass[postParams.text === '']} w-full h-96 p-3 border cursor-text focus:outline-black flex items-center justify-center `} onChange={(e) => setPostParams({ ...postParams, text: e.target.value })} placeholder='### content' />
                </div>
                <div className='grid grid-cols-2 gap-3'>
                    <div className='flex flex-col'>
                        <div className={`${previewSizeClass(postParams.data?.H / postParams.data?.W)} ${inputClass[postParams.nft == null]} cursor-pointer border-dashed border-gray-400 grid self-center hover:border-gray-900 border-[1.5px]`} onClick={() => setNFTSelectorPopup(true)}>
                            {
                                postParams.nft !== null ? (
                                    <div className="relative group">
                                        <img src={postParams.nft.thumbnail} style={{ width: "100%", height: "100%", objectFit: "cover" }} className="xl" />
                                        <div className="top-0 w-full h-full absolute hidden group-hover:grid bg-white border border-gray-900 group-hover:bg-gray-900 group-hover:bg-opacity-50 text-gray-900 group-hover:text-gray-100 px-5 py-3 self-center text-2xl" >
                                            <LiaUndoAltSolid className='mx-auto self-center' />
                                        </div>
                                    </div>
                                ) :
                                    <div className="relative grid w-full h-full hover:bg-white group">
                                        <p className="text-5xl font-extralight text-gray-400 self-center justify-self-center group-hover:text-gray-900">+</p>
                                    </div>
                            }
                        </div>
                        {
                            postParams.data !== null &&
                            <div className='bg-white border border-gray-900 hover:bg-gray-900 inline-block text-gray-900 hover:text-gray-100 px-5 py-3 h-min self-center text-lg cursor-pointer mt-5' onClick={() => setMetaPopup(true)}>
                                view generate data
                            </div>
                        }
                    </div>
                    <div className='flex flex-col'>
                        <input onChange={(e) => setPostParams({ ...postParams, tags: e.target.value })} className={`${inputClass[postParams.tags === null]} w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center `} type="text" defaultValue={postParams.tags} placeholder='### tags' />
                        <div className="w-full flex">
                            <button onClick={() => setPostParams({ ...postParams, nsfwContent: true })}
                                className={`${inputClass[!postParams.nsfwContent]}  border cursor-pointer none h-12 w-1/2 flex items-center justify-center`}>
                                <p className="text-center w-full">### nsfw</p>
                            </button>
                            <button onClick={() => setPostParams({ ...postParams, nsfwContent: false })}
                                className={`${inputClass[postParams.nsfwContent]}  border cursor-pointer none h-12 w-1/2 flex items-center justify-center`}>
                                <p className="text-center w-full">### safe</p>
                            </button>
                        </div>
                        <div className="w-full flex">
                            <button onClick={() => setPostParams({ ...postParams, exclusiveContent: true })}
                                className={`${inputClass[!postParams.exclusiveContent]}  border cursor-pointer none h-12 w-1/2 flex items-center justify-center`}>
                                <p className="text-center w-full">### exclusive</p>
                            </button>
                            <button onClick={() => setPostParams({ ...postParams, exclusiveContent: false })}
                                className={`${inputClass[postParams.exclusiveContent]}  border cursor-pointer none h-12 w-1/2 flex items-center justify-center`}>
                                <p className="text-center w-full">### public</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePost
