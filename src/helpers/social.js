import axios from "axios";
import { getInfoUser } from "../storage/local";

export const getPosts = async (id) => {
    let posts

    await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/socials/post/${id ?? ''}`)
        .then(res => { posts = res.data })
        .catch(error => { posts = [] })

    return posts
}

export const getTags = async () => {
    let tags

    await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/socials/post/tags`)
        .then(res => { tags = res.data })
        .catch(error => { tags = [] })

    return tags
}

export const getPostsByUser = async (id) => {
    let posts

    await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/socials/post/user/${id}`)
        .then(res => { posts = res.data })
        .catch(error => { posts = [] })

    return posts
}

export const getPostsByTag = async (tag) => {
    let posts

    await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/socials/post/tags/${tag}`)
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

export const getBookmarks = async (id) => {
    let bookmarks

    await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/socials/post/bookmark/${id}`)
        .then(res => { bookmarks = res.data })
        .catch(error => { bookmarks = [] })

    return bookmarks
}

export const toggleFollowUser = async (id) => {
    const access_token = getInfoUser().tokens.access_token;

    await axios.put(
        `${process.env.REACT_APP_API_ENDPOINT}/socials/social-user/${id}/follow-or-unfollow`,
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            }
        }
    )
}

export const createComment = async (postId, commentId, text) => {
    const access_token = getInfoUser().tokens.access_token;

    let data = { text }

    if (commentId) {
        data = { ...data, commentId }
    }

    await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/socials/post/${postId}/comment/${commentId ?? ''}`,
        data,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            }
        }
    )
}

export const toggleBookmarkPost = async (id) => {
    const access_token = getInfoUser().tokens.access_token;

    await axios.put(
        `${process.env.REACT_APP_API_ENDPOINT}/socials/post/${id}/bookmark`,
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            }
        }
    )
}

export const createPost = async (postId, header, description, text, nftId, tags) => {
    const access_token = getInfoUser().tokens.access_token;

    if (postId) {
        await axios.put(
            `${process.env.REACT_APP_API_ENDPOINT}/socials/post/${postId}`,
            {
                header,
                description,
                text,
                nftId,
                tags
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                }
            }
        )

        return postId
    }

    const res = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/socials/post/${postId ?? ''}`,
        {
            header,
            description,
            text,
            nftId,
            tags
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            }
        }
    )

    return res.data.id
}