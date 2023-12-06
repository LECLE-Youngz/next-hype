import { premium } from ".";

export const subscribe = async (plan, address, value) => {
	const contract = await premium(address);

	const res = await contract.subscribe(plan, value).then((tx) => tx.wait());

	return res;
};

export const getSubscriptionPlan = async (plan, address) => {
	const contract = await premium(address);

	const res = await contract.getSubscriptionPlan(plan);

	return res;
};
