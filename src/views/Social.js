import { useEffect, useState } from "react";
import { getPosts } from "../helpers/social";
import PostPreview from "../components/PostPreview";
import Post from "../components/Post";
import { Link } from "react-router-dom";

export default function Social({ chosenPost, chosenTag }) {
    const [search, setSearch] = useState("")
    const [posts, setPosts] = useState([])
    const [tags, setTags] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const posts = await getPosts()

            if (chosenTag) {
                setPosts(posts.filter(post => post.tags.includes(chosenTag)))
            } else {
                setPosts(posts)
            }

            setTags({})
            posts.forEach(post => {
                post.tags.forEach(tag => {
                    if (!tags[tag]) {
                        tags[tag] = 1
                    } else {
                        tags[tag] += 1
                    }
                })
            })
            setTags(tags)
        }

        fetchData()
    })

    return (
        <div className="flex flex-col justify-between">
            <h1 className="text-4xl text-gray-900"># Join the{' '}
                <span className="twinkle-text">
                    community
                </span>{' '}</h1>
            <div className="flex justify-between gap-1 mx-10 mt-10 mb-8">
                {chosenPost ?
                    <>
                        <p className="truncate border-b w-1/4 border-gray-900 text-2xl font-extralight">## demo</p>
                        <p className="truncate w-min border-gray-900 text-2xl font-extralight">/</p>
                        <p className="truncate border-b w-1/2 border-gray-900 text-2xl font-extralight text-right flex">
                            <p className="text-center px-5 appearance-none rounded-full flex-1 outline-none text-gray-600 w-full">## post view</p>
                        </p>
                        <p className="truncate w-min border-gray-900 text-2xl font-extralight">/</p>
                        <p className="truncate border-b w-1/4 border-gray-900 text-2xl font-extralight text-right flex">
                            <p className="text-right px-5 appearance-none rounded-full flex-1 outline-none text-gray-600 w-full">## post detail</p>
                            <Link type="submit" className="bg-white border-t border-x border-gray-900 hover:bg-gray-900 inline-block text-gray-900 hover:text-gray-100 px-3 text-xl" aria-label="search" to={`/social`}>
                                back
                            </Link>
                        </p>
                    </>
                    :
                    <>
                        <p className="truncate border-b w-1/4 border-gray-900 text-2xl font-extralight">## choose your tags</p>
                        <p className="truncate w-min border-gray-900 text-2xl font-extralight">/</p>
                        <p className="truncate border-b w-3/4 border-gray-900 text-2xl font-extralight text-right flex">
                            <input className="text-right appearance-none rounded-full flex-1 outline-none text-gray-600 w-full pr-1" placeholder="## find posts" type="text" required="" onChange={(e) => setSearch(e.target.value)} />
                        </p>
                    </>
                }
            </div>
            <div className="grid grid-cols-4 mx-10 gap-10">
                {
                    chosenPost ?
                        <>
                            <div className="flex flex-col">
                                <img className="w-full h-fit" src={chosenPost.nft.thumbnail} alt="post" />
                            </div>
                            <div className="flex col-span-3">
                                <Post {...chosenPost} />
                            </div>
                        </>
                        :
                        <>
                            <div className="flex flex-wrap gap-3 h-min">
                                {
                                    Object.keys(tags).map(tag =>
                                        <Link className={`${chosenTag === tag ? "bg-gray-900 text-gray-100" : "text-gray-900 hover:text-gray-100 hover:bg-gray-900 "} group cursor-pointer border border-gray-900 py-2 px-4 h-min`}
                                            to={`/social/${chosenTag === tag ? "" : tag}`}
                                        >
                                            {
                                                chosenTag === tag ?
                                                    <div className="btn-group relative w-full">
                                                        <span className="group-hover:invisible visible">{tag} &nbsp;|&nbsp; {tags[tag]}</span>
                                                        <span className="group-hover:block hidden absolute top-0 w-full">{tag} &nbsp;|&nbsp; x</span>
                                                    </div>
                                                    :
                                                    <span className="">{tag} &nbsp;|&nbsp; {tags[tag]}</span>
                                            }
                                        </Link>
                                    )
                                }
                            </div>
                            <div className="col-span-3 flex flex-wrap gap-y-6 justify-between">
                                {
                                    posts.filter(post =>
                                        post.header.toLowerCase().includes(search.toLowerCase()) ||
                                        post.description.toLowerCase().includes(search.toLowerCase()) ||
                                        post.text.toLowerCase().includes(search.toLowerCase())
                                    ).map(post =>
                                        <div
                                            className="grid border w-[49%] border-gray-200 hover:border-gray-900">
                                            <PostPreview {...post} />
                                        </div>
                                    )
                                }
                            </div>
                        </>
                }
            </div>
        </div>
    );
}