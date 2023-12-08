import { useEffect, useState } from "react";
import { getUsers } from "../helpers/user";
import { getPostsByUser } from "../helpers/social";
import { getInfoUser } from "../storage/local";
import { getExclusiveNFTs } from "../helpers/nft";
import NFT from "./NFT";

const Space = ({ userId }) => {
	const [user, setUser] = useState(null);
	const [account, setAccount] = useState(null);
	const [nfts, setNfts] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			let account = getInfoUser().user;
			setAccount(account);

			let user = await getUsers(userId);
			setUser(user);

			let nfts = await getExclusiveNFTs(userId);
			setNfts(nfts);
		};

		fetchData();
	}, [userId]);

	if (user === null) {
		return (
			<div className="fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none">
				<div className="h-full w-full flex items-center justify-center">
					<div className="animate-spin rounded-full self-center h-16 w-16 border-t-2 border-b-2 border-gray-300"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col justify-between">
			<div className="flex justify-between">
				<h1 className="text-4xl text-gray-900">
					# View the creator's <span className="twinkle-text">space</span>
				</h1>
			</div>
			<div className="flex flex-col mt-10 mx-10 justify-center">
				<img
					src={user.picture}
					className="self-center shadow-xl h-40"
					alt="..."
				/>
				<p className="mt-5 text-4xl mx-auto font-light twinkle-text">
					{user.name}
				</p>
			</div>
			<hr className="grad h-[2px] w-1/2 mx-auto my-10" />
			<div className="flex flex-wrap gap-y-6 justify-center">
				{nfts.length === 0 ? (
					<div className="grid h-96">
						<p className="text-2xl font-light self-center leading-normal my-2 text-gray-500">
							no nfts found
						</p>
					</div>
				) : (
					nfts.map((nft) => <NFT {...nft} />)
				)}
			</div>
		</div>
	);
};

export default Space;
