import axios from "axios";
import Web3 from 'web3'
import { get } from "lodash";

export const getGoogleToken = async (payload) => {
    try {
        const { data } = await axios.post(process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URL, {
            ...payload,
        });
        return { error: "", data };
    } catch (error) {
        return {
            error: get(error, "response.data.message") || get(error, "response.data.message.0") || get(error, "message", "Unknown"),
        };
    }
};

export const getUsers = async (id) => {
    let users

    await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/users/${id ?? ''}`)
        .then(res => { users = res.data })
        .catch(error => { users = [] });

    return users
}

export const emailToWallet = async (email) => {
    let users

    await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/users/wallet/${email}`)
        .then(res => { users = res.data })
        .catch(error => { users = null });

    return users
}

export const checkAddress = async (address, isRootStock) => {
    if (isRootStock) {
        try {
            await Web3.utils.toChecksumAddress(address)
        }
        catch (e) {
            return false
        }
        finally {
            return true
        }
    } else {
        if (address.length !== 55) {
            return false;
        } if (!address.startsWith("bcrt1p")) {
            return false;
        }

        return true;
    }
}