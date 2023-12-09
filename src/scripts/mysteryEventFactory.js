import { mysteryEventFactory } from ".";

export const deployMysteryEvent = async (
	name,
	symbol,
	unrevealedURI,
	premiumNFT,
	_nftPurchasedRequired,
	maxSupply,
	baseURI,
	clSubscriptionId
) => {
	const contract = await mysteryEventFactory();
	const res = await contract
		.deployMysteryEvent(
			name,
			symbol,
			unrevealedURI,
			premiumNFT,
			_nftPurchasedRequired,
			maxSupply,
			baseURI,
			clSubscriptionId
		)
		.then((tx) => tx.wait());

	return res;
};
