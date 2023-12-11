import axios from "axios";
import { getAccessToken, getPremiumAddress } from "./user";
import { deployMysteryEvent } from "../scripts/mysteryEventFactory";
import { deployLuckyToken } from "../scripts/luckyEventFactory";
import { getInfoUser } from "../storage/local";
import { drawLottery } from "../scripts/luckyNFT";
import { deployLuckyTreasury } from "../scripts/treasuryFactory";
import { deployMysteryBox } from "../scripts/mysteryBoxFactory";
import { mysteryBox } from "../scripts";

export const getPosts = async (id) => {
	let posts;

	const access_token = await getAccessToken();

	await axios
		.get(`${process.env.REACT_APP_API_ENDPOINT}/socials/post/${id ?? ""}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		})
		.then((res) => {
			posts = res.data;
		})
		.catch((error) => {
			console.log(error);
		});

	return posts;
};

export const getTags = async () => {
	let tags;

	await axios
		.get(`${process.env.REACT_APP_API_ENDPOINT}/socials/post/tags`)
		.then((res) => {
			tags = res.data;
		})
		.catch((error) => {
			tags = [];
		});

	return tags;
};

export const getPostsByUser = async (id) => {
	let posts;

	await axios
		.get(`${process.env.REACT_APP_API_ENDPOINT}/socials/post/user/${id}`)
		.then((res) => {
			posts = res.data;
		})
		.catch((error) => {
			posts = [];
		});

	return posts;
};

export const getPostsByTag = async (tag) => {
	let posts;

	await axios
		.get(`${process.env.REACT_APP_API_ENDPOINT}/socials/post/tags/${tag}`)
		.then((res) => {
			posts = res.data;
		})
		.catch((error) => {
			posts = [];
		});

	return posts;
};

export const toggleLikePost = async (id) => {
	const access_token = await getAccessToken();

	await axios.put(
		`${process.env.REACT_APP_API_ENDPOINT}/socials/post/${id}/like-or-unlike`,
		{},
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		}
	);
};

export const toggleLikeComment = async (id) => {
	const access_token = await getAccessToken();

	await axios.put(
		`${process.env.REACT_APP_API_ENDPOINT}/socials/post/comment/${id}/like-or-unlike`,
		{},
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		}
	);
};

export const getBookmarks = async (id) => {
	let bookmarks;

	await axios
		.get(`${process.env.REACT_APP_API_ENDPOINT}/socials/post/bookmark/${id}`)
		.then((res) => {
			bookmarks = res.data;
		})
		.catch((error) => {
			bookmarks = [];
		});

	return bookmarks;
};

export const toggleFollowUser = async (id) => {
	const access_token = await getAccessToken();

	await axios.put(
		`${process.env.REACT_APP_API_ENDPOINT}/socials/social-user/${id}/follow-or-unfollow`,
		{},
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		}
	);
};

export const createComment = async (postId, commentId, text) => {
	const access_token = await getAccessToken();

	let data = { text };

	if (commentId) {
		data = { ...data, commentId };
	}

	await axios.post(
		`${process.env.REACT_APP_API_ENDPOINT}/socials/post/${postId}/comment/${commentId ?? ""
		}`,
		data,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		}
	);
};

export const toggleBookmarkPost = async (id) => {
	const access_token = await getAccessToken();

	await axios.put(
		`${process.env.REACT_APP_API_ENDPOINT}/socials/post/${id}/bookmark-or-unbookmark`,
		{},
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		}
	);
};

export const createPost = async (
	postId,
	header,
	description,
	text,
	nftId,
	addressCollection,
	exclusiveContent,
	tags
) => {
	const access_token = await getAccessToken();

	if (postId) {
		await axios.put(
			`${process.env.REACT_APP_API_ENDPOINT}/socials/post/${postId}`,
			{
				header,
				description,
				text,
				nftId,
				addressCollection,
				tags,
				exclusiveContent,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${access_token}`,
				},
			}
		);

		return postId;
	}

	const res = await axios.post(
		`${process.env.REACT_APP_API_ENDPOINT}/socials/post/${postId ?? ""}`,
		{
			header,
			description,
			text,
			nftId,
			addressCollection,
			tags,
			exclusiveContent,
		},
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		}
	);

	return res.data.id;
};

export const updateCollection = async (address, type) => {
	const access_token = await getAccessToken();
	return axios.put(
		`${process.env.REACT_APP_API_ENDPOINT}/nfts/collection/${address}/type/${type}`,
		{},
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		}
	);
};

export const createPurchasingEvent = async ({
	maxSupply,
	require,
	subscriptionId,
	unrevealUri,
}) => {
	let success = false;
	const userId = getInfoUser().user.id;
	const premiumAddress = await getPremiumAddress(userId);

	await deployMysteryEvent(
		"Mystery Event",
		"MYS",
		unrevealUri,
		premiumAddress,
		require,
		maxSupply,
		`https://metadata-storage.azurewebsites.net/api/v1/nfts/collection/${premiumAddress}/nft/`,
		subscriptionId
	).then(async (res) => {
		if (res.status === 1) {
			const address = res.logs[0].address;
			await updateCollection(address, "mystery")
				.then((success = address))
				.catch();
		}
	});

	return success;
};

export const createSubscribingEvent = async ({ subscriptionId }) => {
	const userId = getInfoUser().user.id;

	let success = false;
	const premiumAddress = await getPremiumAddress(userId);

	await deployLuckyToken(
		subscriptionId,
		`https://metadata-storage.azurewebsites.net/api/v1/nfts/collection/${premiumAddress}/nft/`,
		premiumAddress
	).then(async (res) => {
		if (res.status === 1) {

			const address = res.logs[0].address;
			await updateCollection(address, "lucky")
				.then((success = address))
				.catch();
		}
	});

	return success;
};

export const createTreasury = async ({ luckyNFT, luckyPoint, rewardAmount }) => {
	// TODO: get luckyNFT dc khong
	const userId = getInfoUser().user.id;

	let success = false;

	await deployLuckyTreasury(
		luckyNFT,
		process.env.REACT_APP_WNET_ADDRESS,
		luckyPoint,
		rewardAmount
	).then(async (res) => {
		if (res.status === 1) {
			const address = res.logs[0].address;
		}
	});

	return { success };
};


export const createNftDrop = async (
	unrevealedURI,
	maxSupply,
	maxMintPerUser,
	fee,
	whitelistRoot,
	vrfSubscriptionId) => {
	const userId = getInfoUser().user.id;

	let success = false;

	await deployMysteryBox(
		"Mystery Drop",
		"DRP",
		unrevealedURI,
		maxSupply,
		maxMintPerUser,
		fee,
		whitelistRoot,
		vrfSubscriptionId
	).then(async (res) => {
		if (res.status === 1) {
			const address = res.logs[0].address;
			console.log("mysteryBox: ",address)
			await updateCollection(address, "drop")
			.then((success = true))
			.catch();
		}
	});

	return success;
};


export const getEvents = async () => {
	const access_token = await getAccessToken();

	let events;

	await axios
		.get(`${process.env.REACT_APP_API_ENDPOINT}/nfts/event`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		})
		.then((res) => {
			events = res.data;
		})
		.catch((error) => {
			events = [];
		});

	return events;
};

export const claimLucky = async (addressCollection) => {
	const userAddress = getInfoUser().key.ethAddress;

	let success = false;

	await drawLottery(userAddress, addressCollection).then(
		(res) => (success = res.status === 1)
	);

	return success;
};
