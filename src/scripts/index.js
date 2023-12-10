const { ethers, JsonRpcProvider } = require("ethers");
const marketplaceABI = require("./Marketplace.sol/NftMarketplace.json");
const collectionABI = require("./NexthypeNFT.sol/NEXTHYPE.json");
const generativeFactoryABI = require("./GenerativeNFTFactory.sol/GenerativeNFTFactory.json");
const generativeABI = require("./GenerativeNFT.sol/GenerativeNFT.json");
const premiumFactoryABI = require("./PremiumFactory.sol/PremiumFactory.json");
const premiumABI = require("./PremiumNFT.sol/PremiumNFT.json");
const exclusiveFactoryABI = require("./ExclusiveNFTFactory.sol/ExclusiveNFTFactory.json");
const exclusiveABI = require("./ExclusiveNFT.sol/ExclusiveNFT.json");
const luckyNFTABI = require("./LuckyNFT.sol/LuckyNFT.json");
const luckyNFTFactoryABI = require("./LuckyNFTFactory.sol/LuckyNFTFactory.json");
const mysteryBoxABI = require("./MysteryBox.sol/MysteryBox.json");
const mysteryDropEventABI = require("./MysteryDropEvent.sol/MysteryDropEvent.json");
const mysteryEventFactoryABI = require("./MysteryEventFactory.sol/MysteryEventFactory.json");
const usdABI = require("./USD.json");
const wNetABI = require("./wNET.json");

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

export const luckyFactory = async () => {
	const privateKey = getInfoUser().key.privKey;
	const signer = new ethers.Wallet(privateKey, provider);
	const contract = new ethers.Contract(
		process.env.REACT_APP_LUCKYFACTORY_ADDRESS,
		luckyNFTFactoryABI.abi,
		signer
	);

	return contract;
};

export const luckyNFT = async (address) => {
	const privateKey = getInfoUser().key.privKey;
	const signer = new ethers.Wallet(privateKey, provider);
	const contract = new ethers.Contract(address, luckyNFTABI.abi, signer);

	return contract;
};

export const mysteryBox = async () => {
	const privateKey = getInfoUser().key.privKey;
	const signer = new ethers.Wallet(privateKey, provider);
	const contract = new ethers.Contract(
		process.env.REACT_APP_MYSTERYBOX_ADDRESS,
		mysteryBoxABI.abi,
		signer
	);

	return contract;
};

export const mysteryEventFactory = async () => {
	const privateKey = getInfoUser().key.privKey;
	const signer = new ethers.Wallet(privateKey, provider);
	const contract = new ethers.Contract(
		process.env.REACT_APP_MYSTERYEVENTFACTORY_ADDRESS,
		mysteryEventFactoryABI.abi,
		signer
	);

	return contract;
};

export const mysteryEvent = async (address) => {
	const privateKey = getInfoUser().key.privKey;
	const signer = new ethers.Wallet(privateKey, provider);
	const contract = new ethers.Contract(
		address,
		mysteryDropEventABI.abi,
		signer
	);

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

export const wNet = async () => {
	const privateKey = getInfoUser().key.privKey;
	const signer = new ethers.Wallet(privateKey, provider);
	console.log(process.env.REACT_APP_WNET_ADDRESS);

	const contract = new ethers.Contract(
		process.env.REACT_APP_WNET_ADDRESS,
		wNetABI,
		signer
	);

	return contract;
};

export const getBalance = async (address) => {
	const avax = await provider.getBalance(address);
	const usdc = await usd().then(async (res) => await res.balanceOf(address));
	const wNet = await wNet().then(async (res) => await res.balanceOf(address));

	return {
		avax: ethers.formatEther(avax),
		usdc: ethers.formatUnits(usdc, 6),
		wNet: ethers.formatUnits(wNet, 18)
	};
};
