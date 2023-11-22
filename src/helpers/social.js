import axios from "axios";
import { getInfoUser } from "../storage/local";

export const getRanking = async (id) => {
    let ranking

    await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/users/${id ?? ''}`)
        .then(res => { ranking = res.data })
        .catch(error => console.log(error));

    return ranking
}

export const updateRanking = async (data, idUserSold) => {
    const access_token = getInfoUser().tokens.access_token;

    axios.put(
        `${process.env.REACT_APP_API_ENDPOINT}/rankings`,
        { ...data, idUserSold },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            }
        }
    )
}

export const getPosts = async (id) => {
    let posts

    await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/socials/post/${id ?? ''}`)
        .then(res => { posts = res.data })
        .catch(error => { posts = [] })

    return posts
}

export const toggleLikePost = async (id) => {
    const access_token = getInfoUser().tokens.access_token;

    await axios.put(
        `${process.env.REACT_APP_API_ENDPOINT}/socials/post/${id}/like-or-unlike`,
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            }
        }
    )
}

export const toggleLikeComment = async (id) => {
    const access_token = getInfoUser().tokens.access_token;

    await axios.put(
        `${process.env.REACT_APP_API_ENDPOINT}/socials/post/comment/${id}/like-or-unlike`,
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            }
        }
    )
}

export const toggleFollow = async (id) => {
    const access_token = getInfoUser().tokens.access_token;

    await axios.put(
        `${process.env.REACT_APP_API_ENDPOINT}/social-user/${id}/follow-or-unfollow`,
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            }
        }
    )
}

export const createComment = async (id, text) => {
    const access_token = getInfoUser().tokens.access_token;

    await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/socials/post/${id}/comment`,
        { text },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            }
        }
    )
}