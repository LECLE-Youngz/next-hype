const { ethers, JsonRpcProvider } = require("ethers");
const marketplaceABI = require("./Marketplace.sol/NftMarketplace.json");
const collectionABI = require("./NexthypeNFT.sol/NEXTHYPE.json");
const { getInfoUser } = require("../storage/local");

const provider = new JsonRpcProvider(process.env.REACT_APP_FUJI_RPC);

const getMarketplaceContract = async (owner) => {
    const privateKey = owner ? process.env.REACT_APP_KEY : getInfoUser().key.privKey;
    const signer = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(
        process.env.REACT_APP_MARKETPLACE_ADDRESS,
        marketplaceABI.abi,
        signer
    );

    return contract;
};

const getCollectionContract = async (owner) => {
    const privateKey = owner ? process.env.REACT_APP_KEY : getInfoUser().key.privKey;
    const signer = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(
        process.env.REACT_APP_COLLECTION_ADDRESS,
        collectionABI.abi,
        signer
    );

    return contract;
}

const parseProxiesToArray = obj => Array.isArray(obj) ? obj.map(item => parseProxiesToArray(item)) : obj;

export const getBalance = async (address) => {
    const res = await provider.getBalance(address);
    return ethers.formatEther(res);
}

export const tokenId = async () => {
    const contract = await getCollectionContract();
    const res = await contract.tokenId();
    return res;
}

export const safeMint = async (uri) => {
    const contract = await getCollectionContract();
    const res = await contract.safeMint(uri).then(tx => tx.wait());
    return res;
}

export const approve = async (id) => {
    const contract = await getCollectionContract();
    const res = await contract.approve(
        process.env.REACT_APP_MARKETPLACE_ADDRESS,
        id
    ).then(tx => tx.wait());
    return res;
}

export const listItem = async (id, price, promptPrice) => {
    const contract = await getMarketplaceContract();
    const res = await contract.listItem(
        process.env.REACT_APP_COLLECTION_ADDRESS,
        id,
        price,
        promptPrice
    ).then(tx => tx.wait());
    return res;
}






export const getAllNFTs = async () => {
    const contract = await getMarketplaceContract();
    const res = await contract.getAllNFTs();
    return parseProxiesToArray(res);
}

export const getMyNFTs = async () => {
    const contract = await getMarketplaceContract();
    const res = await contract.getMyNFTs();
    return parseProxiesToArray(res);
}

export const getNFTsFromAddress = async (address) => {
    const contract = await getMarketplaceContract();
    const res = await contract.getNFTsFromAddress(address);
    return parseProxiesToArray(res);
}

export const getMyPrompts = async () => {
    const contract = await getMarketplaceContract();
    const res = await contract.getMyPrompts();
    return parseProxiesToArray(res);
}


export const createToken = async (tokenURI, price, promptPrice) => {
    const contract = await getMarketplaceContract();
    const res = await contract.createToken(tokenURI, price, promptPrice).then(tx => tx.wait());
    return res;
}

export const updatePromptPrices = async (ids, newPromptPrice) => {
    const contract = await getMarketplaceContract();
    const res = await contract.updatePromptPrices(ids, newPromptPrice).then(tx => tx.wait());
    return res;
}

export const updateTokenPrices = async (ids, newPrice) => {
    const contract = await getMarketplaceContract();
    const res = await contract.updateTokenPrices(ids, newPrice).then(tx => tx.wait());
    return res;
}

export const transferNFTs = async (ids, to) => {
    const contract = await getMarketplaceContract();
    const res = await contract.transferNFTs(ids, to).then(tx => tx.wait());
    return res;
}

export const withdrawNFTs = async (ids, to) => {
    const contract = await getMarketplaceContract();
    const res = await contract.withdrawNFTs(ids, to).then(tx => tx.wait());
    return res;
}

export const buyPrompt = async (id, promptPrice) => {
    const contract = await getMarketplaceContract();
    const res = await contract.buyPrompt(id, { value: promptPrice }).then(tx => tx.wait());
    return res;
}

export const executeSale = async (id, price) => {
    const contract = await getMarketplaceContract();
    const res = await contract.executeSale(id, { value: price }).then(tx => tx.wait());
    return res;
}

export const bridgeNFT = async (image) => {
    const contract = await getMarketplaceContract();
    const res = await contract.bridgeNFT(image).then(tx => tx.wait());
    return res;
}

export const burnBridgedToken = async (id) => {
    const contract = await getMarketplaceContract();
    const res = await contract.burnBridgedToken(id).then(tx => tx.wait());
    return res;
}