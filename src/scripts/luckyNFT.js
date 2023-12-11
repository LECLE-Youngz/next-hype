import { luckyNFT } from ".";

export const drawLottery = async (user, address) => {
	console.log(address);
	const contract = await luckyNFT(address);
	const res = await contract.drawLottery(user).then((tx) => tx.wait());

	return res;
};
