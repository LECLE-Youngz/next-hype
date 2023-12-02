import {
	buyPrompt,
	collection,
	executeSale,
	transferNFTs,
	updatePromptPrices,
	updateTokenPrices,
	withdrawNFTs,
} from "../scripts";
import { getTotalToken, safeMint, approve } from "../scripts/collection";
import { buyItem, listItem } from "../scripts/marketplace";
import axios from "axios";
import { getInfoUser } from "../storage/local";
import { name, symbol } from "../scripts/generative";

export const buyNFT = async (id, addressCollection, price, isAvax = true) => {
	let success;

	if (isAvax) {
		await buyItem(addressCollection, id, "0", { value: price.avax }).then(
			(res) => (success = res.status === 1)
		);
	} else {
		await buyItem(addressCollection, id, price.usd, { value: "0" }).then(
			(res) => (success = res.status === 1)
		);
	}

	return success;
};

export const buyNFTPrompt = async (id, promptPrice, idUserSold) => {
	let success;

	await buyPrompt(id, promptPrice).then((res) => (success = res.status === 1));

	return success;
};

export const mintNFT = async (data, metadata) => {
	let access_token = getInfoUser().tokens.access_token;
	let userAddress = getInfoUser().key.ethAddress;
	let nftId = await getTotalToken(userAddress).then((res) => res);

	const res1 = await safeMint(
		`${process.env.REACT_APP_API_ENDPOINT}/nfts/${nftId}/collection/${data.collection}`
	);
	if (res1.status !== 1) return false;

	if (data.price !== "0") {
		const res2 = await approve(nftId);
		if (res2.status !== 1) return false;

		const res3 = await listItem(nftId, data.price, data.promptPrice);
		if (res3.status !== 1) return false;
	}

	let success = true;

	await axios
		.post(
			`${process.env.REACT_APP_API_ENDPOINT}/nfts/`,
			{
				id: nftId,
				name: data.name,
				description: data.description,
				image: data.image,
				addressCollection: data.collection,
				meta: metadata,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${access_token}`,
				},
			}
		)
		.catch(() => {
			success = false;
		});

	return success;
};

export const getPrompts = async () => {
	let prompts;
	const access_token = getInfoUser().tokens.access_token;
	await axios
		.get(`${process.env.REACT_APP_API_ENDPOINT}/data/owner`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		})
		.then((res) => {
			prompts = res.data;
		})
		.catch((error) => {
			prompts = [];
		});

	return prompts;
};

export const getPromptById = async (id, collection) => {
	let prompt;
	const access_token = getInfoUser().tokens.access_token;
	await axios
		.get(
			`${process.env.REACT_APP_API_ENDPOINT}/data/${id}/collection/${collection}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${access_token}`,
				},
			}
		)
		.then((res) => {
			prompt = res.data;
		})
		.catch((error) => {
			prompt = null;
		});

	return prompt;
};

export const editPrices = async (ids, price) => {
	let success;
	await updateTokenPrices(ids, price).then(
		(res) => (success = res.status === 1)
	);
	return success;
};

export const editPromptPrices = async (ids, promptPrice) => {
	let success;
	await updatePromptPrices(ids, promptPrice).then(
		(res) => (success = res.status === 1)
	);
	return success;
};

export const transferToAddress = async (ids, to, isRootStock, isWithdraw) => {
	let success = true;
	if (isRootStock) {
		if (isWithdraw) {
			await withdrawNFTs(ids, to).catch(() => {
				success = false;
			});
		} else {
			await transferNFTs(ids, to).catch(() => {
				success = false;
			});
		}
	} else {
		const access_token = getInfoUser().tokens.access_token;

		await Promise.all(
			ids?.map(async (id) => {
				await axios
					.post(
						`${process.env.REACT_APP_BTC_ENDPOINT}/transferOrd`,
						{
							ordId: id,
							address: to,
						},
						{
							headers: {},
						}
					)
					.catch(() => {
						success = false;
					});

				if (success) {
					await axios
						.put(
							`${process.env.REACT_APP_API_ENDPOINT}/ordinals`,
							{
								nftId: id,
								owner: to,
							},
							{
								headers: {
									"Content-Type": "application/json",
									Authorization: `Bearer ${access_token}`,
								},
							}
						)
						.catch(() => {
							success = false;
						});
				}
			})
		);
	}
	return success;
};

export const getNFTs = async (queryParams) => {
	let nfts;

	await axios
		.get(`${process.env.REACT_APP_API_ENDPOINT}/nfts`)
		.then((res) => {
			nfts = res.data;
		})
		.catch((error) => (nfts = []));

	// Object.keys(queryParams).forEach(key => {
	//     if (queryParams[key] !== null) {
	//         nfts = nfts.filter(nft => nft[key] === queryParams[key])
	//     }
	// })

	return nfts;
};

export const getLinkedPosts = async (id, collection) => {
	let posts;

	await axios
		.get(
			`${process.env.REACT_APP_API_ENDPOINT}/nfts/post/${id}/collection/${collection}`
		)
		.then((res) => {
			posts = res.data;
		})
		.catch((error) => (posts = []));

	return posts;
};

export const getNFTsFromCollection = async (address) => {
	const res = [0];

	return res;
};

export const getCollectionName = async (address) => {
	if (address === process.env.REACT_APP_COLLECTION_ADDRESS) return "NEXTHYPE";

	console.log(address, process.env.REACT_APP_COLLECTION_ADDRESS);

	const res = await name(address);

	return res;
};

export const getUserCollections = async (address) => {
	const res = [process.env.REACT_APP_COLLECTION_ADDRESS];

	return res;
};

export const getSymbol = async (address) => {
	if (address === process.env.REACT_APP_COLLECTION_ADDRESS) return "NET";

	const res = await symbol(address);

	return res;
};
