import { collection, exclusive, generative } from ".";

export const getTotalToken = async (address) => {
	if (address == null) {
		const contract = await collection();
		const res = await contract.getTotalToken();
		return res;
	} else {
		const contract = await generative(address);
		const res = await contract._nextTokenId();
		return res;
	}
};

export const safeMint = async (to, uri, address, e) => {
	if (address == null) {
		const contract = await collection();
		const res = await contract.safeMint(uri).then((tx) => tx.wait());
		return res;
	} else if (e) {
		const contract = await exclusive(address);
		const res = await contract.safeMint(to, uri).then((tx) => tx.wait());
		return res;
	} else {
		const contract = await generative(address);
		const res = await contract.safeMint(to, uri).then((tx) => tx.wait());
		return res;
	}
};

export const approve = async (id, address) => {
	if (address == null) {
		const contract = await collection();
		const res = await contract
			.approve(process.env.REACT_APP_MARKETPLACE_ADDRESS, id)
			.then((tx) => tx.wait());
		return res;
	} else {
		const contract = await generative(address);
		const res = await contract
			.approve(process.env.REACT_APP_MARKETPLACE_ADDRESS, id)
			.then((tx) => tx.wait());
		return res;
	}
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
