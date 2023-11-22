import { buyPrompt, createToken, executeSale, getCurrentToken, transferNFTs, updatePromptPrices, updateTokenPrices, withdrawNFTs } from "../scripts";
import axios from "axios";
import { getInfoUser } from "../storage/local";
import { updateRanking, getRanking } from "./social";

export const buyNFT = async (id, price, idUserSold) => {
    let success

    await executeSale(id, price).then(res => success = res.status === 1)

    if (success) {
        const buyerId = getInfoUser().data.id;

    }
    return success
}

export const buyNFTPrompt = async (id, promptPrice, idUserSold) => {
    let success

    await buyPrompt(id, promptPrice).then(res => success = res.status === 1)

    if (success) {
        const buyerId = getInfoUser().data.id;
    }
    return success
}

export const mintNFT = async (data, metadata) => {
    let success

    if (data.isRootStock) {
        let nftId
        await getCurrentToken().then(res => nftId = (res + 1n).toString())

        await createToken(data.thumbnail, data.price, data.promptPrice).then(res => success = res.status === 1)

        if (success) {
            await axios.post(
                `${process.env.REACT_APP_API_ENDPOINT}/storages`,
                {
                    nftId: nftId,
                    name: data.name,
                    thumbnail: data.thumbnail,
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            ).catch((error) => { success = false; console.log(error) })

            await axios.post(
                `${process.env.REACT_APP_API_ENDPOINT}/metadatas`,
                { id: nftId, meta: metadata },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            ).catch((error) => { success = false; console.log(error) })
        }
    } else {
        let address = getInfoUser().key.data.btcAddress
        let response

        await axios.post(
            `${process.env.REACT_APP_BTC_ENDPOINT}/inscribeOrd`,
            {
                address: address,
                imageLink: data.thumbnail,
            },
            {
                headers: {}
            }
        )
            .then(res => { response = res.data; success = true; console.log(res) })
            .catch(error => { success = false; console.log(error) })

        if (success) {
            let nftId = response.inscription

            await axios.post(
                `${process.env.REACT_APP_API_ENDPOINT}/ordinals`,
                {
                    nftId: nftId,
                    owner: address,
                    price: 0,
                    promptPrice: 0,
                    promptBuyer: [address],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getInfoUser().tokens.access_token}`,
                    }
                }
            ).catch(() => { success = false })

            if (success) {
                await axios.post(
                    `${process.env.REACT_APP_API_ENDPOINT}/storages`,
                    {
                        nftId: nftId,
                        name: data.name,
                        thumbnail: data.thumbnail,
                    },
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }
                ).catch(() => { success = false })

                await axios.post(
                    `${process.env.REACT_APP_API_ENDPOINT}/metadatas`,
                    { id: nftId, meta: metadata },
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }
                ).catch(() => { success = false })
            }
        }
    }

    return success
}

export const getPrompts = async () => {
    let prompts
    const access_token = getInfoUser().tokens.access_token;
    await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/data/owner`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            }
        }
    )
        .then(res => { prompts = res.data })
        .catch(error => { prompts = [] })

    return prompts
}

export const getPromptById = async (id) => {
    let prompt
    const access_token = getInfoUser().tokens.access_token;
    await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/data/${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            }
        }
    )
        .then(res => { prompt = res.data })
        .catch(error => { prompt = null })

    return prompt
}

export const editPrices = async (ids, price) => {
    let success
    await updateTokenPrices(ids, price).then(res => success = res.status === 1)
    return success
}

export const editPromptPrices = async (ids, promptPrice) => {
    let success
    await updatePromptPrices(ids, promptPrice).then(res => success = res.status === 1)
    return success
}

export const transferToAddress = async (ids, to, isRootStock, isWithdraw) => {
    let success = true
    if (isRootStock) {
        if (isWithdraw) {
            await withdrawNFTs(ids, to).catch(() => { success = false })
        } else {
            await transferNFTs(ids, to).catch(() => { success = false })
        }
    } else {
        const access_token = getInfoUser().tokens.access_token;

        await Promise.all(ids?.map(async (id) => {
            await axios.post(
                `${process.env.REACT_APP_BTC_ENDPOINT}/transferOrd`,
                {
                    ordId: id,
                    address: to,
                },
                {
                    headers: {}
                }
            ).catch(() => { success = false })

            if (success) {
                await axios.put(
                    `${process.env.REACT_APP_API_ENDPOINT}/ordinals`,
                    {
                        nftId: id,
                        owner: to
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${access_token}`,
                        }
                    }
                ).catch(() => { success = false })

            }
        }))
    }
    return success
}

export const getNFTs = async (queryParams) => {
    let nfts

    await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/nfts`)
        .then(res => { nfts = res.data })
        .catch(error => nfts = []);

    Object.keys(queryParams).forEach(key => {
        if (queryParams[key] !== null) {
            nfts = nfts.filter(nft => nft[key] === queryParams[key])
        }
    })

    return nfts
}