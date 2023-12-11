import { treasuryFactory } from ".";

export const deployLuckyTreasury = async (
    luckyNFT, netToken, luckyPoint, rewardAmount
) => {
    const contract = await treasuryFactory();
    const res = await contract
        .deployLuckyTreasury(luckyNFT, netToken, luckyPoint, rewardAmount)
        .then((tx) => tx.wait());

    return res;
};
