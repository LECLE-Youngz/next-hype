import { marketplace } from ".";

export const listItem = async (collection, id, price, promptPrice) => {
	const contract = await marketplace();
	const res = await contract
		.listItem(collection, id, price, promptPrice)
		.then((tx) => tx.wait());
	return res;
};

export const buyItem = async (addressCollection, id, amount, value) => {
	const contract = await marketplace();
	console.log(addressCollection, id, amount, value);
	const res = await contract
		.buyItem(addressCollection, id, amount, value)
		.then((tx) => tx.wait());
	console.log("buyItem", res);
	return res;
};

export const buyPrompt = async (addressCollection, id, amount, value) => {
	const contract = await marketplace();
	const res = await contract
		.buyPrompt(addressCollection, id, amount, value)
		.then((tx) => tx.wait());
	return res;
};

export const cancelListing = async (addressCollection, id) => {
	const contract = await marketplace();
	const res = await contract
		.cancelListing(addressCollection, id)
		.then((tx) => tx.wait());
	return res;
};

export const updateListing = async (
	addressCollection,
	id,
	price,
	promptPrice
) => {
	const contract = await marketplace();
	const res = await contract
		.updateListing(addressCollection, id, price, promptPrice)
		.then((tx) => tx.wait());
	return res;
};
