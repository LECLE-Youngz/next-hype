import { luckyFactory } from ".";

export const deployLuckyToken = async (
	subscriptionId,
	baseURI,
	_premiumNFT
) => {
	const contract = await luckyFactory();
	const res = await contract
		.deployLuckyToken(subscriptionId, baseURI, _premiumNFT)
		.then((tx) => tx.wait());

	return res;
};
