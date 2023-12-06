import {
	generativeFactory,
	transferNFTs,
	updatePromptPrices,
	updateTokenPrices,
	withdrawNFTs,
} from "../scripts";
import { getTotalToken, safeMint, approve } from "../scripts/collection";
import { buyItem, buyPrompt, listItem } from "../scripts/marketplace";
import axios from "axios";
import { getInfoUser } from "../storage/local";
import { name, symbol } from "../scripts/generative";
import { getAccessToken } from "./user";
import { deployGenerativeToken } from "../scripts/generativeFactory";

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

export const buyNFTPrompt = async (
	id,
	addressCollection,
	promptPrice,
	isAvax = true
) => {
	let success;

	if (isAvax) {
		await buyPrompt(addressCollection, id, "0", {
			value: promptPrice.avax,
		}).then((res) => (success = res.status === 1));
	} else {
		await buyPrompt(addressCollection, id, promptPrice.usd, {
			value: "0",
		}).then((res) => (success = res.status === 1));
	}

	return success;
};

export const mintNFT = async (data, metadata) => {
	let access_token = await getAccessToken();
	let userAddress = getInfoUser().key.ethAddress;
	let generative =
		data.collection === process.env.REACT_APP_COLLECTION_ADDRESS
			? null
			: data.collection;

	let nftId = await getTotalToken(generative).then((res) => res);

	console.log(nftId);

	const res1 = await safeMint(
		userAddress,
		`${process.env.REACT_APP_API_ENDPOINT}/nfts/${nftId}/collection/${data.collection}`,
		generative
	);
	if (res1.status !== 1) return false;

	if (data.price !== "0") {
		const res2 = await approve(nftId, generative);
		if (res2.status !== 1) return false;

		const res3 = await listItem(
			data.collection,
			nftId,
			data.price,
			data.promptPrice
		);
		if (res3.status !== 1) return false;
	}

	let success = true;

	await axios
		.post(
			`${process.env.REACT_APP_API_ENDPOINT}/nfts/`,
			{
				id: Number(nftId),
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
		.catch((e) => {
			success = false;
			console.log(e);
		});

	return success;
};

export const getPrompts = async () => {
	let prompts;
	const access_token = await getAccessToken();
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
	const access_token = await getAccessToken();
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
			console.log(error);
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
		const access_token = await getAccessToken();

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
	let posts = await axios
		.get(
			`${process.env.REACT_APP_API_ENDPOINT}/nfts/post/${id}/collection/${collection}`
		)
		.then((res) => (res = res.data))
		.catch((error) => (posts = []));

	return posts;
};

export const getCollections = async (address) => {
	let collections = await axios
		.get(
			`${process.env.REACT_APP_API_ENDPOINT}/nfts/collection/${address ?? ""}`
		)
		.then((res) => (res = res.data))
		.catch((error) => {
			console.log(error);
			collections = [];
		});

	return collections;
};

export const getUserCollections = async () => {
	const access_token = await getAccessToken();

	let collections = await axios
		.get(`${process.env.REACT_APP_API_ENDPOINT}/nfts/owner/collection`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		})
		.then((res) => (res = res.data))
		.catch((error) => {
			console.log(error);
		});

	return collections;
};

export const getCollectionInfo = async (address) => {
	let info = {
		name: null,
		symbol: null,
		nft: null,
		owner: null,
	};

	if (address === process.env.REACT_APP_COLLECTION_ADDRESS) {
		info.name = "NEXTHYPE";
		info.symbol = "NET";
		info.owner = null;
		info.nft = null;
	} else {
		info.name = await name(address);
		info.symbol = await symbol(address);
		await axios
			.get(`${process.env.REACT_APP_API_ENDPOINT}/nfts/collection/${address}`)
			.then((res) => {
				info.owner = res.data.user;
				info.nft = res.data.nft;
			})
			.catch((error) => {
				info.owner = null;
				info.nft = null;
			});
	}

	return info;
};

export const createCollection = async (name, symbol) => {
	let success = await deployGenerativeToken(name, symbol).then(
		(res) => res.status === 1
	);

	return success;
};
