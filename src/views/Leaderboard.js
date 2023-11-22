import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { getRanking } from "../helpers/social";
import { getUsers } from "../helpers/user";

export default function LeaderBoard() {
    const [users, setUsers] = useState({})
    const [onQuery, setOnQuery] = useState(true)
    const [ranking, setRanking] = useState([])

    // async
    useEffect(() => {
        const fetchData = async () => {
            const rawUsers = await getUsers()
            const users = {}
            rawUsers.forEach(user => { users[user.id] = user })

            const ranking = await getRanking()

            setRanking(ranking)
            setUsers(users)
            setOnQuery(false)
        }

        fetchData()
    }, [])

    const textIndexColor = [
        'text-red-500',
        'text-blue-500',
        'text-yellow-500',
    ]

    return (
        <div className="flex flex-col justify-between">
            <h1 className="text-4xl text-gray-900"># Discover our{' '}
                <span className="twinkle-text">
                    hall of fame
                </span>{' '}</h1>
            <div className="flex justify-between gap-1 mx-10 mt-10 mb-8">
                <p className="border-b truncate pb-1 w-1/4 border-gray-900 text-2xl font-extralight">## top nft sellers</p>
                <p className="w-min border-gray-900 text-2xl font-extralight">/</p>
                <p className="border-b truncate pb-1 w-1/4 border-gray-900 text-2xl font-extralight  text-center">## top data sellers</p>
                <p className="w-min border-gray-900 text-2xl font-extralight">/</p>
                <p className="border-b truncate pb-1 w-1/4 border-gray-900 text-2xl font-extralight  text-center">## top nft buyers</p>
                <p className="w-min border-gray-900 text-2xl font-extralight">/</p>
                <p className="border-b truncate pb-1 w-1/4 border-gray-900 text-2xl font-extralight text-right">## top data buyers</p>
            </div>
            <div>
                <div className="flex justify-between mx-10 gap-x-5">
                    <div className="grid gap-y-3 z-20">
                        {
                            onQuery ?
                                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-500"></div>
                                :
                                ranking?.sort((a, b) => b.numSold - a.numSold).slice(0, 5).map((rank, index) => (
                                    <div className="group relative">
                                        <div className="animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-10 hover:opacity-50 blur transition duration-100 group-hover:opacity-100 group-hover:duration-100"></div>
                                        <Link to={`/profile/${users[rank.id].id}`}>
                                            <div className="relative flex items-center justify-between rounded-lg bg-gray-50 pl-5 py-3 leading-none place-items-center">
                                                <span className="flex items-center space-x-3">
                                                    <p className={`${textIndexColor[index]} text-base font-bold text-gray-500`}>{index + 1}</p>
                                                    <img src={users[rank.id].picture} className={`${textIndexColor[index]} w-12 h-12 rounded-full border-2 border-white border-opacity-0 hover:border-opacity-100`} alt="..." />
                                                    <p className={`${textIndexColor[index]} text-base font-semibold text-gray-500`}>{users[rank.id].name}</p>
                                                </span>
                                                <span className="invisible group-hover:visible pl-3 ml-3 text-gray-400 transition duration-200">
                                                    View&nbsp;&rarr;
                                                </span>
                                                <span className="visible group-hover:invisible pl-3 text-gray-400 transition duration-200 -translate-x-10">
                                                    {rank.numSold}
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                        }
                    </div>
                    <div className="grid gap-y-3 z-20">
                        {
                            onQuery ?
                                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-500"></div>
                                :
                                ranking?.sort((a, b) => b.numPromptSold - a.numPromptSold).slice(0, 5).map((rank, index) => (
                                    <div className="group relative">
                                        <div className="animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-10 hover:opacity-50 blur transition duration-100 group-hover:opacity-100 group-hover:duration-100"></div>
                                        <Link to={`/profile/${users[rank.id].id}`}>
                                            <div className="relative flex items-center justify-between rounded-lg bg-gray-50 pl-5 py-3 leading-none place-items-center">
                                                <span className="flex items-center space-x-3">
                                                    <p className={`${textIndexColor[index]} text-base font-bold text-gray-500`}>{index + 1}</p>
                                                    <img src={users[rank.id].picture} className={`${textIndexColor[index]} w-12 h-12 rounded-full border-2 border-white border-opacity-0 hover:border-opacity-100`} alt="..." />
                                                    <p className={`${textIndexColor[index]} text-base font-semibold text-gray-500`}>{users[rank.id].name}</p>
                                                </span>
                                                <span className="invisible group-hover:visible pl-3 ml-3 text-gray-400 transition duration-200">
                                                    View&nbsp;&rarr;
                                                </span>
                                                <span className="visible group-hover:invisible pl-3 text-gray-400 transition duration-200 -translate-x-10">
                                                    {rank.numPromptSold}
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                        }
                    </div>
                    <div className="grid gap-y-3 z-20">
                        {
                            onQuery ?
                                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-500"></div>
                                :
                                ranking?.sort((a, b) => b.numPurchased - a.numPurchased).slice(0, 5).map((rank, index) => (

                                    <div className="group relative">
                                        <div className="animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-10 hover:opacity-50 blur transition duration-100 group-hover:opacity-100 group-hover:duration-100"></div>
                                        <Link to={`/profile/${users[rank.id].id}`}>
                                            <div className="relative flex items-center justify-between rounded-lg bg-gray-50 pl-5 py-3 leading-none place-items-center">
                                                <span className="flex items-center space-x-3">
                                                    <p className={`${textIndexColor[index]} text-base font-bold text-gray-500`}>{index + 1}</p>
                                                    <img src={users[rank.id].picture} className={`${textIndexColor[index]} w-12 h-12 rounded-full border-2 border-white border-opacity-0 hover:border-opacity-100`} alt="..." />
                                                    <p className={`${textIndexColor[index]} text-base font-semibold text-gray-500`}>{users[rank.id].name}</p>
                                                </span>
                                                <span className="invisible group-hover:visible pl-3 ml-3 text-gray-400 transition duration-200">
                                                    View&nbsp;&rarr;
                                                </span>
                                                <span className="visible group-hover:invisible pl-3 text-gray-400 transition duration-200 -translate-x-10">
                                                    {rank.numPurchased}
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                        }
                    </div>
                    <div className="grid gap-y-3 z-20">
                        {
                            onQuery ?
                                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-500"></div>
                                :
                                ranking?.sort((a, b) => b.numPromptPurchased - a.numPromptPurchased).slice(0, 5).map((rank, index) => (

                                    <div className="group relative">
                                        <div className="animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-10 hover:opacity-50 blur transition duration-100 group-hover:opacity-100 group-hover:duration-100"></div>
                                        <Link to={`/profile/${users[rank.id].id}`}>
                                            <div className="relative flex items-center justify-between rounded-lg bg-gray-50 pl-5 py-3 leading-none place-items-center">
                                                <span className="flex items-center space-x-3">
                                                    <p className={`${textIndexColor[index]} text-base font-bold text-gray-500`}>{index + 1}</p>
                                                    <img src={users[rank.id].picture} className={`${textIndexColor[index]} w-12 h-12 rounded-full border-2 border-white border-opacity-0 hover:border-opacity-100`} alt="..." />
                                                    <p className={`${textIndexColor[index]} text-base font-semibold text-gray-500`}>{users[rank.id].name}</p>
                                                </span>
                                                <span className="invisible group-hover:visible pl-3 ml-3 text-gray-400 transition duration-200">
                                                    View&nbsp;&rarr;
                                                </span>
                                                <span className="visible group-hover:invisible pl-3 text-gray-400 transition duration-200 -translate-x-10">
                                                    {rank.numPromptPurchased}
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                        }
                    </div>
                </div >
            </div>
        </div>
    );
}