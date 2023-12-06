import { generativeFactory } from ".";

export const deployGenerativeToken = async (name, symbol) => {
	const contract = await generativeFactory();
	const res = await contract
		.deployGenerativeToken(name, symbol)
		.then((tx) => tx.wait());

	return res;
};
