import { generative } from '.';

export const name = async (address) => {
    const contract = await generative(address);
    const res = await contract.name();
    return res;
}

export const symbol = async (address) => {
    const contract = await generative(address);
    const res = await contract.symbol();
    return res;
}