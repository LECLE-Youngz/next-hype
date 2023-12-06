import { usd } from ".";

export const allowance = async (address, amount) => {
	const contract = await usd();
	const res = await contract.approve(address, amount).then((tx) => tx.wait());
	return res;
};
