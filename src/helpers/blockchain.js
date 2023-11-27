import { getInfoUser } from "../storage/local";


export const getUserCollection = async () => {
    const userAddress = getInfoUser().key.ethAddress;

    let res = []

    return [...res, {
        name: "NEXTHYPE Collection",
        address: process.env.REACT_APP_COLLECTION_ADDRESS
    }]
}