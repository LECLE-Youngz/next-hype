import { collection } from "."

export const getTotalToken = async () => {
    const contract = await collection();
    const res = await contract.getTotalToken();
    return res;
}

export const safeMint = async (uri) => {
    const contract = await collection();
    const res = await contract.safeMint(uri).then(tx => tx.wait());
    return res;
}

export const approve = async (id) => {
    const contract = await collection();
    const res = await contract.approve(
        process.env.REACT_APP_MARKETPLACE_ADDRESS,
        id
    ).then(tx => tx.wait());
    return res;
}