import { useEffect, useState } from "react";
import { getCollections, getNFTs } from "../helpers/nft";
import CollectionPreview from "../components/CollectionPreview";
import Collection from "../components/Collection";
import CreateEvent from "../components/CreateEvent";
import { getEvents } from "../helpers/social";
import EventPreview from "../components/EventPreview";
import { Link } from "react-router-dom";
import { mysteryBoxABI } from "../scripts/MysteryBox.sol/MysteryBox.json";

export default function DropNft() {
    const containerStyle = {
        backgroundImage: 'url("https://source.unsplash.com/random/?blockchain")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '65vh',
        width: '50vw',
        borderRadius: '3rem',
        marginRight: '10rem',

    };
    const dynamicText = "0.01";
    const maxMint = "1";

    const [params, setParams] = useState({
        numNFTs: 1,
        dynamicText: "",
        maxMint: 0
    });

    useEffect(() => {
        if (params.numNFTs === 0) {
            setParams({ ...params, numNFTs: "" });
        }
        if (params.dynamicText === 0) {
            setParams({ ...params, dynamicText: "" });
        }
        if (params.maxMint === 0) {
            setParams({ ...params, maxMint: "" });
        }
    }, [params]);

    const inputClass = {
        false: "bg-white border-gray-900 text-gray-900",
        true: "bg-gray-200 text-gray-900 border-gray-200",
    };

    return (
        <div className="flex flex-col justify-between">
            <div className="flex justify-between">
                <h1 className="text-4xl text-gray-900">
                    # Ongoing <span className="twinkle-text">Drop</span>{" "}
                </h1>
            </div>

            <div className="container mx-auto mt-10 flex">
                {/* Container with background image */}
                <div className="p-8 text-white" style={containerStyle}>
                    {/* Your content goes here */}
                    {/* <h1 className="text-4xl font-bold mb-4">Your Content</h1> */}
                    {/* ... other content ... */}
                </div>

                {/* <button
					className="bg-white border border-gray-900 hover:bg-gray-900 inline-block text-gray-900 hover:text-gray-100 px-5 py-3 h-min self-center text-2xl"
					onClick={() => setCreateEvent(true)}
				>
					Create event
				</button> */}
                {/* 1/4 Buttons */}
                <div className=" w-1/4 p-8 flex flex-col self-start">
                    <div className="block top-40 border-black border rounded p-4 text-center">
                        <p className="text-xl font-semibold mb-2">NFT Price</p>
                        <p className="text-lg">{dynamicText} AVAX/1</p>
                        <p className="text-lg mt-1"> Max NFT/User: {maxMint}</p>
                    </div>
                    <div className="">
                        <div className="text-xs self-center mb-2">
                            {"<!-- "} number of nft you want to buy for this {" "}
                            <span className="font-semibold">NFT Drop</span>.{" -->"}
                        </div>

                        <input
                            onChange={(e) =>
                                setParams({ ...params, numNFTs: e.target.value })
                            }
                            className={`${inputClass[params.numNFTs === ""]
                                } w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center `}
                            type="number"
                            placeholder="### NFT amount"
                            defaultValue={params.numNFTs}
                        />
                    </div>
                    <div className="text-xs self-center mb-2">
                        {"<!-- "} Only whitelisted subscribers allowed to buy NFTs Drop while in {" "}
                        <span className="font-semibold">private minting</span>
                        {" -->"}
                    </div>
                    <button
                        className="bg-white border border-gray-900 hover:bg-gray-900 inline-block text-gray-900 hover:text-gray-100 px-5 py-3 h-min self-center text-2xl mt-4 w-full"
                        onClick={console.log("hi")}
                    >
                        Private Mint
                    </button>
                    <div className="text-xs self-center mb-2 mt-4">
                        {"<!-- "} Anyone can buy NFTs drop during {" "}
                        <span className="font-semibold"> public minting</span>
                        {" -->"}
                    </div>
                    <button
                        className="bg-white border border-gray-900 hover:bg-gray-900 inline-block text-gray-900 hover:text-gray-100 px-5 py-3 h-min self-center text-2xl mt-4 w-full"
                        onClick={console.log("hi")}
                    >
                        Public Mint
                    </button>
                </div>
            </div>
        </div>


    );
}
