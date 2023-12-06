const { ethers, JsonRpcProvider } = require("ethers");
const marketplaceABI = require("./Marketplace.sol/NftMarketplace.json");
const collectionABI = require("./NexthypeNFT.sol/NEXTHYPE.json");
const generativeFactoryABI = require("./GenerativeNFTFactory.sol/GenerativeNFTFactory.json");
const generativeABI = require("./GenerativeNFT.sol/GenerativeNFT.json");
const premiumFactoryABI = require("./PremiumFactory.sol/PremiumFactory.json");
const premiumABI = require("./PremiumNFT.sol/PremiumNFT.json");

const { getInfoUser } = require("../storage/local");

const provider = new JsonRpcProvider(process.env.REACT_APP_FUJI_RPC);

export const marketplace = async () => {
	const privateKey = getInfoUser().key.privKey;
	const signer = new ethers.Wallet(privateKey, provider);
	const contract = new ethers.Contract(
		process.env.REACT_APP_MARKETPLACE_ADDRESS,
		marketplaceABI.abi,
		signer
	);

	return contract;
};

export const collection = async () => {
	const privateKey = getInfoUser().key.privKey;
	const signer = new ethers.Wallet(privateKey, provider);
	const contract = new ethers.Contract(
		process.env.REACT_APP_COLLECTION_ADDRESS,
		collectionABI.abi,
		signer
	);

	return contract;
};

export const generativeFactory = async () => {
	const privateKey = getInfoUser().key.privKey;
	const signer = new ethers.Wallet(privateKey, provider);
	const contract = new ethers.Contract(
		process.env.REACT_APP_GENERATIVEFACTORY_ADDRESS,
		generativeFactoryABI.abi,
		signer
	);

	return contract;
};

export const generative = async (address) => {
	const privateKey = getInfoUser().key.privKey;
	const signer = new ethers.Wallet(privateKey, provider);
	const contract = new ethers.Contract(address, generativeABI.abi, signer);

	return contract;
};

export const premiumFactory = async () => {
	const privateKey = getInfoUser().key.privKey;
	const signer = new ethers.Wallet(privateKey, provider);
	const contract = new ethers.Contract(
		process.env.REACT_APP_PREMIUM_FACTORY_ADDRESS,
		premiumFactoryABI.abi,
		signer
	);

	return contract;
};

export const premium = async (address) => {
	const contract = new ethers.Contract(address, premiumABI.abi, provider);

	return contract;
};

export const getBalance = async (address) => {
	const res = await provider.getBalance(address);
	return ethers.formatEther(res);
};

export const getAllNFTs = async () => {};

export const getMyNFTs = async () => {};

export const getNFTsFromAddress = async (address) => {};

export const getMyPrompts = async () => {};

export const createToken = async (tokenURI, price, promptPrice) => {};

export const updatePromptPrices = async (ids, newPromptPrice) => {};

export const updateTokenPrices = async (ids, newPrice) => {};

export const transferNFTs = async (ids, to) => {};

export const withdrawNFTs = async (ids, to) => {};

export const buyPrompt = async (id, promptPrice) => {};

export const executeSale = async (id, price) => {};

export const bridgeNFT = async (image) => {};

export const burnBridgedToken = async (id) => {};
