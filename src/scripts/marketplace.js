import { marketplace } from '.';


export const listItem = async (id, price, promptPrice) => {
    const contract = await marketplace();
    const res = await contract.listItem(
        process.env.REACT_APP_COLLECTION_ADDRESS,
        id,
        price,
        promptPrice
    ).then(tx => tx.wait());
    return res;
}

export const buyItem = async (id, amount, token) => {
    const contract = await marketplace();
    const res = await contract.buyItem(id, token, { value: amount }).then(tx => tx.wait());
    return res;
}