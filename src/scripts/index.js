const { ethers, JsonRpcProvider } = require("ethers");
const marketplaceABI = require("./Marketplace.sol/NftMarketplace.json");
const collectionABI = require("./NexthypeNFT.sol/NEXTHYPE.json");
const factoryABI = require("./GenerativeNFTFactory.sol/GenerativeNFTFactory.json");
const generativeABI = require("./GenerativeNFT.sol/GenerativeNFT.json");

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
}

export const factory = async () => {
    const privateKey = getInfoUser().key.privKey;
    const signer = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(
        process.env.REACT_APP_FACTORY_ADDRESS,
        factoryABI.abi,
        signer
    );

    return contract;
}

export const generative = async (address) => {
    const contract = new ethers.Contract(
        address,
        collectionABI.abi,
        provider
    );

    return contract;
}

export const parseProxiesToArray = obj => Array.isArray(obj) ? obj.map(item => parseProxiesToArray(item)) : obj;

export const getBalance = async (address) => {
    const res = await provider.getBalance(address);
    return ethers.formatEther(res);
}



export const getAllNFTs = async () => {
    const contract = await marketplace();
    const res = await contract.getAllNFTs();
    return parseProxiesToArray(res);
}

export const getMyNFTs = async () => {
    const contract = await marketplace();
    const res = await contract.getMyNFTs();
    return parseProxiesToArray(res);
}

export const getNFTsFromAddress = async (address) => {
    const contract = await marketplace();
    const res = await contract.getNFTsFromAddress(address);
    return parseProxiesToArray(res);
}

export const getMyPrompts = async () => {
    const contract = await marketplace();
    const res = await contract.getMyPrompts();
    return parseProxiesToArray(res);
}


export const createToken = async (tokenURI, price, promptPrice) => {
    const contract = await marketplace();
    const res = await contract.createToken(tokenURI, price, promptPrice).then(tx => tx.wait());
    return res;
}

export const updatePromptPrices = async (ids, newPromptPrice) => {
    const contract = await marketplace();
    const res = await contract.updatePromptPrices(ids, newPromptPrice).then(tx => tx.wait());
    return res;
}

export const updateTokenPrices = async (ids, newPrice) => {
    const contract = await marketplace();
    const res = await contract.updateTokenPrices(ids, newPrice).then(tx => tx.wait());
    return res;
}

export const transferNFTs = async (ids, to) => {
    const contract = await marketplace();
    const res = await contract.transferNFTs(ids, to).then(tx => tx.wait());
    return res;
}

export const withdrawNFTs = async (ids, to) => {
    const contract = await marketplace();
    const res = await contract.withdrawNFTs(ids, to).then(tx => tx.wait());
    return res;
}

export const buyPrompt = async (id, promptPrice) => {
    const contract = await marketplace();
    const res = await contract.buyPrompt(id, { value: promptPrice }).then(tx => tx.wait());
    return res;
}

export const executeSale = async (id, price) => {
    const contract = await marketplace();
    const res = await contract.executeSale(id, { value: price }).then(tx => tx.wait());
    return res;
}

export const bridgeNFT = async (image) => {
    const contract = await marketplace();
    const res = await contract.bridgeNFT(image).then(tx => tx.wait());
    return res;
}

export const burnBridgedToken = async (id) => {
    const contract = await marketplace();
    const res = await contract.burnBridgedToken(id).then(tx => tx.wait());
    return res;
}