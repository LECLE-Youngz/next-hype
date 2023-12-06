import { generative } from ".";

export const getTotalToken = async (address) => {
	const contract = await generative(address);
	const res = await contract.getTotalToken();
	return res;
};

export const safeMint = async (address, to, uri) => {
	const contract = await generative(address);
	const res = await contract.safeMint(to, uri).then((tx) => tx.wait());
	return res;
};

export const approve = async (address, id) => {
	const contract = await generative(address);
	const res = await contract
		.approve(process.env.REACT_APP_MARKETPLACE_ADDRESS, id)
		.then((tx) => tx.wait());
	return res;
};

export const name = async (address) => {
	const contract = await generative(address);
	const res = await contract.name();
	return res;
};

export const symbol = async (address) => {
	const contract = await generative(address);
	const res = await contract.symbol();
	return res;
};
