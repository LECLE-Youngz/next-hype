import { marketplace } from ".";

export const listItem = async (id, price, promptPrice) => {
	const contract = await marketplace();
	const res = await contract
		.listItem(process.env.REACT_APP_COLLECTION_ADDRESS, id, price, promptPrice)
		.then((tx) => tx.wait());
	return res;
};

export const buyItem = async (addressCollection, id, amount, value) => {
	const contract = await marketplace();
	console.log(addressCollection, id, amount, value);
	const res = await contract
		.buyItem(addressCollection, id, amount, value)
		.then((tx) => tx.wait());
	return res;
};
