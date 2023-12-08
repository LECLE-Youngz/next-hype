import { exclusiveFactory } from ".";

export const deployExclusiveToken = async (premiumAddress) => {
	const contract = await exclusiveFactory();
	const res = await contract
		.deployExclusiveToken(
			"Exclusive Token",
			"EXC",
			"https://ipfs.io/ipfs/QmYuKY45Aq87LeL1R5dhb1hqHLp6ZFbJaCP8jxqKM1MX6y/babe_ruth_1.json",
			premiumAddress
		)
		.then((tx) => tx.wait());

	return res;
};
