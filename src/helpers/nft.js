import { approve, buyPrompt, createToken, executeSale, listItem, safeMint, tokenId, transferNFTs, updatePromptPrices, updateTokenPrices, withdrawNFTs } from "../scripts";
import axios from "axios";
import { getInfoUser } from "../storage/local";

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
    let access_token = getInfoUser().tokens.access_token;
    let userAddress = getInfoUser().key.ethAddress
    let nftId = await tokenId().then(res => (res + 1n).toString())

    const res1 = await safeMint(`${process.env.REACT_APP_API_ENDPOINT}/nfts/${nftId}`)
    if (res1.status !== 1) return false

    if (data.price !== "0") {
        const res2 = await approve(nftId)
        if (res2.status !== 1) return false

        const res3 = await listItem(nftId, data.price, data.promptPrice)
        if (res3.status !== 1) return false
    }

    let success = true

    await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/nfts`,
        {
            id: 10,
            name: data.name,
            image: data.image,
            price: data.price,
            promptPrice: data.promptPrice,
            promptBuyer: [],
            promptAllower: [userAddress],
            addressCollection: data.collection,
            meta: metadata,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        }
    ).catch(() => { success = false })

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