import { mysteryEventFactory } from ".";

export const deployMysteryBox = async (
	name,
	symbol,
	unrevealedURI,
	premiumNFT,
	_nftPurchasedRequired,
	maxSupply,
	baseURI,
	clSubscriptionId
) => {
	const contract = await mysteryBoxFactory();
	const res = await contract
		.deployMysteryBox(
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
