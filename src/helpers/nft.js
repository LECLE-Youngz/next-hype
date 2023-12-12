import { getTotalToken, safeMint, approve } from "../scripts/collection";
import {
	buyItem,
	buyPrompt,
	cancelListing,
	listItem,
	updateListing,
} from "../scripts/marketplace";
import axios from "axios";
import { getInfoUser } from "../storage/local";
import { name, symbol } from "../scripts/generative";
import { getAccessToken } from "./user";
import { deployGenerativeToken } from "../scripts/generativeFactory";
import { allowance } from "../scripts/usd";
import { parsePrice, parseAmount } from "../libs/blockchain";
import { Big } from "bigdecimal.js";

export const buyNFT = async (
	userId,
	id,
	addressCollection,
	price,
	isAvax = true
) => {
	const access_token = await getAccessToken();

	let success;

	if (isAvax) {
		await buyItem(addressCollection, id, "0", { value: price.avax }).then(
			(res) => (success = res.status === 1)
		);
		if (!success) return success;
		await axios
			.put(
				`${process.env.REACT_APP_API_ENDPOINT}/socials/increase-nft/${userId}`,
				{
					nftId: id,
					addressCollection,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${access_token}`,
					},
				}
			)
			.catch((e) => {
				// success = false;
			});
	} else {
		
		await allowance(
			process.env.REACT_APP_MARKETPLACE_ADDRESS,
			Big(price.usd).divide(1e6).toBigInt().toString()
		).then(async (res) => {

			console.log("USD: ", Big(price.usd).multiply(1e6).toBigInt().toString())
			console.log("USD: ", Big(price.usd).divide(1e6).toBigInt().toString())
			console.log("USD: ", Big(price.usd).toBigInt().toString()
			)

			if (res.status === 1) {
				await buyItem(addressCollection, id, Big(price.usd).multiply(1e6).toBigInt().toString(), { value: "0" }).then(
					(res) => (success = res.status === 1)
				);
				if (!success) return success;
				await axios
					.put(
						`${process.env.REACT_APP_API_ENDPOINT}/socials/increase-nft/${userId}`,
						{
							nftId: id,
							addressCollection,
						},
						{
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${access_token}`,
							},
						}
					)
					.catch((e) => {
						// success = false;
					});
			}
		});
	}

	return success;
};

export const buyNFTPrompt = async (
	userId,
	id,
	addressCollection,
	promptPrice,
	isAvax = true
) => {
	const access_token = await getAccessToken();
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

	if (success) {
		await axios
			.put(
				`${process.env.REACT_APP_API_ENDPOINT}/socials/increase-prompt/${userId}`,
				{
					nftId: id,
					addressCollection,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${access_token}`,
					},
				}
			)
			.catch((e) => {
				// success = false;
			});
	}

	return success;
};

export const mintNFT = async (data, metadata) => {
	let access_token = await getAccessToken();
	let userAddress = getInfoUser().key.ethAddress;

	const notMint = ["lucky", "mystery", "drop"];
	let generative =
		data.collection === process.env.REACT_APP_COLLECTION_ADDRESS
			? null
			: data.collection;

	let nftId;

	if (!notMint.includes(data.type)) {
		nftId = await getTotalToken(generative).then((res) => res);

		const res1 = await safeMint(
			userAddress,
			`${process.env.REACT_APP_API_ENDPOINT}/nfts/collection/${data.collection}/nft/${nftId}`,
			generative,
			data.e
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
	} else {
		nftId = 100000;
	}

	let success = true;

	console.log({
		id: Number(nftId),
		name: data.name,
		description: data.description,
		image: data.image,
		type: data.type,
		addressCollection: data.collection,
		meta: metadata,
	});

	await axios
		.post(
			`${process.env.REACT_APP_API_ENDPOINT}/nfts/`,
			{
				id: Number(nftId),
				name: data.name,
				description: data.description,
				image: data.image,
				type: data.type,
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

export const getNFTsByOwner = async () => {
	const access_token = await getAccessToken();
	let nfts;

	await axios
		.get(`${process.env.REACT_APP_API_ENDPOINT}/nfts/owner`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		})
		.then((res) => {
			nfts = res.data;
		})
		.catch((error) => {
			console.log(error);
			nfts = [];
		});

	return nfts;
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

export const editPrices = async (ids, price, promptPrice) => {
	let success;

	if (price === "0") {
		for (let i = 0; i < ids.length; i++) {
			await cancelListing(ids[i].address, ids[i].id).then(
				(res) => (success = res.status === 1)
			);
		}
	} else {
		for (let i = 0; i < ids.length; i++) {
			if (ids[i].price === "0") {
				await approve(ids[i].id, ids[i].address).then(async (res) => {
					if (res.status === 1) {
						await listItem(ids[i].address, ids[i].id, price, promptPrice).then(
							(res) => (success = res.status === 1)
						);
					}
				});
			} else {
				await updateListing(ids[i].address, ids[i].id, price, promptPrice).then(
					(res) => (success = res.status === 1)
				);
			}
		}
	}
	return success;
};

export const transferToAddress = async (ids, to, isWithdraw) => {
	let success = true;

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

export const getExclusiveNFTs = async (userId) => {
	const access_token = await getAccessToken();

	let nfts;

	await axios
		.get(`${process.env.REACT_APP_API_ENDPOINT}/enfts/collection/${userId}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		})
		.then((res) => {
			nfts = res.data;
		})
		.catch((error) => (nfts = []));

	return nfts;
};

export const getLinkedPosts = async (id, collection) => {
	let posts = await axios
		.get(
			`${process.env.REACT_APP_API_ENDPOINT}/nfts/post/${id}/collection/${collection}`
		)
		.then((res) => (res = res.data))
		.catch((error) => {
			console.log(error);
		});

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

export const getNumMysteryNFTs = async () => {
	let count;

	const userId = getInfoUser().user.id;

	await axios
		.get(
			`${process.env.REACT_APP_API_ENDPOINT}/nfts/count/user/${userId}/type/mystery`
		)
		.then((res) => {
			count = res.data;
		})
		.catch((error) => {
			count = {
				address: null,
				count: 0,
			};
		});

	return count;
};

export const getNumLuckyNFTs = async () => {
	let count;

	const userId = getInfoUser().user.id;

	await axios
		.get(
			`${process.env.REACT_APP_API_ENDPOINT}/nfts/count/user/${userId}/type/lucky`
		)
		.then((res) => {
			count = res.data;
		})
		.catch((error) => {
			count = 0;
		});

	return count;
};

export const getNumDropNFTs = async () => {
	let count;

	const userId = getInfoUser().user.id;

	await axios
		.get(
			`${process.env.REACT_APP_API_ENDPOINT}/nfts/count/user/${userId}/type/drop`
		)
		.then((res) => {
			count = res.data;
		})
		.catch((error) => {
			count = 0;
		});

	return count;
};
