import { useEffect, useState } from "react";
import { getCollections, getNFTs } from "../helpers/nft";
import CollectionPreview from "../components/CollectionPreview";
import Collection from "../components/Collection";
import CreateEvent from "../components/CreateEvent";
import { getEvents } from "../helpers/social";
import EventPreview from "../components/EventPreview";
import { Link } from "react-router-dom";

export default function DropNft() {

    return (
        <div className="flex flex-col justify-between">
            <div className="flex justify-between">
                <h1 className="text-4xl text-gray-900">
                    # Ongoing <span className="twinkle-text">Drop</span>{" "}
                </h1>
                <button
                    className="bg-white border border-gray-900 hover:bg-gray-900 inline-block text-gray-900 hover:text-gray-100 px-5 py-3 h-min self-center text-2xl"
                >
                    Create event
                </button>
            </div>
        </div>
    );
}
