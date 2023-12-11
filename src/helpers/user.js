import axios from "axios";
import Web3 from "web3";
import { get } from "lodash";
import { getInfoUser, storeInfoUser } from "../storage/local";
import { deployPremiumToken } from "../scripts/premiumFactory";
import { ethers } from "ethers";
import { getSubscriptionPlan, subscribe } from "../scripts/premium";
import { deployExclusiveToken } from "../scripts/exclusiveFactory";
import { setForwarderAddress } from "../scripts/exclusive";

export const getGoogleToken = async (payload) => {
	try {
		const { data } = await axios.post(
			process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URL,
			{
				...payload,
			}
		);
		return { error: "", data };
	} catch (error) {
		return {
			error:
				get(error, "response.data.message") ||
				get(error, "response.data.message.0") ||
				get(error, "message", "Unknown"),
		};
	}
};

export const getAccessToken = async () => {
	const data = getInfoUser();

	if (!data) {
		return null;
	}

	const tokens = data.tokens;

	if (tokens.expiry_date < Date.now()) {
		const response = await axios.post(
			"https://oauth2.googleapis.com/token",
			{
				client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
				client_secret: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET,
				refresh_token: tokens.refresh_token,
				grant_type: "refresh_token",
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${tokens.access_token}`,
				},
			}
		);

		tokens.access_token = response.data.access_token;
		tokens.expiry_date = Date.now() + response.data.expires_in * 1000;
		storeInfoUser({ ...data, tokens });
		return response.data.access_token;
	} else {
		return tokens.access_token;
	}
};

export const getUsers = async (id) => {
	let users;

	await axios
		.get(`${process.env.REACT_APP_API_ENDPOINT}/users/${id ?? ""}`)
		.then((res) => {
			users = res.data;
		})
		.catch((error) => {
			users = [];
		});

	return users;
};

export const emailToWallet = async (email) => {
	let users;

	await axios
		.get(`${process.env.REACT_APP_API_ENDPOINT}/users/wallet/${email}`)
		.then((res) => {
			users = res.data;
		})
		.catch((error) => {
			users = null;
		});

	return users;
};

export const checkAddress = async (address) => {
	try {
		await Web3.utils.toChecksumAddress(address);
	} catch (e) {
		return false;
	} finally {
		return true;
	}
};

export const turnOnCreatorMode = async (plans) => {
	let success = false;

	const exclusiveAddress = await deployPremiumToken(plans).then(
		async (res1) => {
			if (res1.status === 1) {
				const address = await deployExclusiveToken(res1.logs[0].address).then(
					(res2) => {
						success = res2.status === 1;
						return res2.logs[0].address;
					}
				);

				return address;
			}
			success = false;
			return 0;
		}
	);

	return [success, exclusiveAddress];
};

export const forwardAddressRegister = async (forwarderAddress, address) => {
	let success = false;

	await setForwarderAddress(forwarderAddress, address).then((res) => {
		success = res.status === 1;
	});

	return success;
};

export const subscriber = async (user, plan, amount) => {
	let success = false;

	const address = await getPremiumAddress(user);

	await subscribe(plan, address, { value: amount }).then((res) => {
		success = res.status === 1;
	});

	return success;
};

export const getSubscribing = async (user, listUserId) => {
	let success = false;

	const address = await axios
		.get(`${process.env.REACT_APP_API_ENDPOINT}/nfts/subscribing/${user}`, {
			params: {
				listUserId: listUserId,
			},
		})
		.then((res) => res.data);

	await getSubscriptionPlan(0, address).then((res) => {
		success = res.status === 1;
	});

	return success;
};

export const getPremiumAddress = async (userId) => {
	const address = await axios
		.get(`${process.env.REACT_APP_API_ENDPOINT}/nfts/premium/user/${userId}`)
		.then((res) => res.data)
		.catch((error) => {
			return null;
		});

	return address;
};

export const getExclusiveAddress = async () => {
	let userId = getInfoUser().user.id;

	const address = await axios
		.get(`${process.env.REACT_APP_API_ENDPOINT}/nfts/exclusive/user/${userId}`)
		.then((res) => res.data)
		.catch((error) => {
			return null;
		});

	return address;
};

export const getPlans = async (user) => {
	const plans = [];

	const address = await getPremiumAddress(user);

	await getSubscriptionPlan(0, address).then((res) => {
		plans.push(res);
	});
	await getSubscriptionPlan(1, address).then((res) => {
		plans.push(res);
	});
	await getSubscriptionPlan(2, address).then((res) => {
		plans.push(res);
	});

	return plans;
};
