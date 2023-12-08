const { ethers, JsonRpcProvider } = require("ethers");
const marketplaceABI = require("./Marketplace.sol/NftMarketplace.json");
const collectionABI = require("./NexthypeNFT.sol/NEXTHYPE.json");
const generativeFactoryABI = require("./GenerativeNFTFactory.sol/GenerativeNFTFactory.json");
const generativeABI = require("./GenerativeNFT.sol/GenerativeNFT.json");
const premiumFactoryABI = require("./PremiumFactory.sol/PremiumFactory.json");
const premiumABI = require("./PremiumNFT.sol/PremiumNFT.json");
const exclusiveFactoryABI = require("./ExclusiveNFTFactory.sol/ExclusiveNFTFactory.json");
const exclusiveABI = require("./ExclusiveNFT.sol/ExclusiveNFT.json");
const usdABI = require("./USD.json");

const { getInfoUser } = require("../storage/local");

const provider = new JsonRpcProvider(
	"https://api.avax-test.network/ext/bc/C/rpc"
);

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
		process.env.REACT_APP_PREMIUMFACTORY_ADDRESS,
		premiumFactoryABI.abi,
		signer
	);

	return contract;
};

export const premium = async (address) => {
	const privateKey = getInfoUser().key.privKey;
	const signer = new ethers.Wallet(privateKey, provider);
	const contract = new ethers.Contract(address, premiumABI.abi, signer);

	return contract;
};

export const exclusiveFactory = async () => {
	const privateKey = getInfoUser().key.privKey;
	const signer = new ethers.Wallet(privateKey, provider);
	const contract = new ethers.Contract(
		process.env.REACT_APP_EXCLUSIVEFACTORY_ADDRESS,
		exclusiveFactoryABI.abi,
		signer
	);

	return contract;
};

export const exclusive = async (address) => {
	const privateKey = getInfoUser().key.privKey;
	const signer = new ethers.Wallet(privateKey, provider);
	const contract = new ethers.Contract(address, exclusiveABI.abi, signer);

	return contract;
};

export const usd = async () => {
	const privateKey = getInfoUser().key.privKey;
	const signer = new ethers.Wallet(privateKey, provider);

	const proxyContract = new ethers.Contract(
		process.env.REACT_APP_USD_ADDRESS,
		usdABI,
		signer
	);

	return proxyContract;
};

export const getBalance = async (address) => {
	const avax = await provider.getBalance(address);
	const usdc = await usd().then(async (res) => await res.balanceOf(address));

	return {
		avax: ethers.formatEther(avax),
		usdc: ethers.formatUnits(usdc, 6),
	};
};
