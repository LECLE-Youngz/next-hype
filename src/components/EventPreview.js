import React, { useEffect, useState } from "react";
import Subscribe from "./Subscribe";
import { Link } from "react-router-dom";
import { claimLucky } from "../helpers/social";

const EventPreview = ({
	tag,
	owner,
	fulfill,
	maxSupply,
	require,
	addressCollection,
}) => {
	const header = () => {
		if (tag === "mystery") {
			return `Purchase ${require} nfts to get a mystery nft`;
		} else if (tag === "lucky") {
			return `Subscribe to get a lucky nft`;
		}
	};

	console.log({
		tag,
		owner,
		fulfill,
		maxSupply,
		require,
		addressCollection,
	});

	const [subscribePopup, setSubscribePopup] = useState(false);

	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(true);

	const claim = async () => {
		setLoading(true);
		if (tag === "lucky") {
			const success = await claimLucky(addressCollection);
			setSuccess(success);
		}
		setLoading(false);
	};

	return (
		<div className="group flex justify-between border w-[31rem] relative group py-5">
			{subscribePopup && (
				<Subscribe user={owner} setSubscribePopup={setSubscribePopup} />
			)}
			<Link
				className="mx-4 w-3/4 flex flex-col space-y-3 content-between container"
				to={`/profile/${owner.id}`}
			>
				<div
					className={`grid text-gray-900 hover:text-gray-500 cursor-pointer`}
				>
					<p className="font-serif text-xl font-bold truncate">{header()}</p>
					<p className="text-sm mt-2 font-light">by {owner.name}</p>
				</div>
			</Link>
			<div className="w-1/4 items-center place-items-center flex h-full border-l px-4 ml-4 border-gray-600">
				{loading && !success ? (
					<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
				) : tag === "mystery" ? (
					require <= fulfill ? (
						<p
							className="w-full h-full text-center grid place-content-center hover:text-opacity-50 cursor-pointer text-lg font-light text-green-500"
							onClick={claim}
						>
							claim
						</p>
					) : (
						<Link
							className="w-full h-full text-center grid place-content-center hover:text-opacity-50 cursor-pointer text-lg font-light text-red-500"
							to={`/profile/${owner.id}`}
						>
							{fulfill}/{require}
						</Link>
					)
				) : tag === "lucky" ? (
					fulfill === "yes" ? (
						<p
							className="w-full h-full text-center grid place-content-center hover:text-opacity-50 cursor-pointer text-lg font-light text-green-500"
							onClick={claim}
						>
							claim
						</p>
					) : (
						<p
							className="w-full h-full text-center grid place-content-center hover:text-opacity-50 cursor-pointer text-lg font-light text-red-500"
							onClick={() => setSubscribePopup(true)}
						>
							subscribe
						</p>
					)
				) : (
					<p className="w-full h-full text-center grid place-content-center hover:text-opacity-50 cursor-pointer text-lg font-light text-gray-500">
						claimed
					</p>
				)}
			</div>
		</div>
	);
};

export default EventPreview;
