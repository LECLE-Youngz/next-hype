import { mysteryBoxFactory } from ".";

export const deployMysteryBox = async (
	name,
	symbol,
	unrevealedURI,
	maxSupply,
	maxMintPerUser,
	fee,
	whitelistRoot,
	vrfSubscriptionId
) => {
	const contract = await mysteryBoxFactory();
	const res = await contract
		.deployMysteryBox(name, symbol, unrevealedURI, maxSupply, maxMintPerUser, fee, whitelistRoot, vrfSubscriptionId)
		.then((tx) => tx.wait());

	return res;
};
