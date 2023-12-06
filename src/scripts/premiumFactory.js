import { premiumFactory } from ".";

export const deployPremiumToken = async (plans) => {
	const contract = await premiumFactory();
	const res = await contract
		.deployPremiumToken(
			"https://ipfs.io/ipfs/QmYuKY45Aq87LeL1R5dhb1hqHLp6ZFbJaCP8jxqKM1MX6y/babe_ruth_1.json",
			plans
		)
		.then((tx) => tx.wait());

	return res;
};
