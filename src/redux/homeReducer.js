import { homeAPI } from "../components/API/API"
const SET_IMAGES = "SET_IMAGES"
const SET_POSTS = "SET_POSTS"
const SET_LINK = "SET_LINK"
let initialState = {
    usersPosts: [
        {
            "data": {
                "postText": "",
                "link": ""
            },
            "id": 0
        }
    ],
    myPosts: [
        {
            "data": {
                "postText": "",
                "link": ""
            },
            "id": 0
        }
    ],
    myLink: false,
}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IMAGES:
            return {
                ...state, usersPosts: action.posts
            }
        case SET_POSTS:
            return {
                ...state, myPosts: action.image
            }
        case SET_LINK:
            return {
                ...state, myLink: action.link
            }
        default:
            return state;
    }
}
export const setImagesAC = (posts) => ({ type: SET_IMAGES, posts })
export const setPostsAC = (image) => ({ type: SET_POSTS, image })
export const setMyLinkAC = (link) => ({ type: SET_LINK, link })

export const setImagesThunk = () => {
    return (dispatch) => {
        homeAPI.getImages().then(data => {
            dispatch(setImagesAC(data))
        })
    }
}
export const setPostsImagesThunk = () => {
    return (dispatch) => {
        homeAPI.getMyPosts().then(data => {
            dispatch(setPostsAC(data))
        })
    }
}
export const getMyPostLinkThunk = (image) => {
    return (dispatch) => {
        homeAPI.getMyPostLink(image).then(data => {
            dispatch(setMyLinkAC(data.image.url))
        })
    }
}
export const sendMyPostDataThunk = (data) => {
    return (dispatch) => {
        homeAPI.sendMyPost(data).then(data => {
            dispatch(setMyLinkAC(null))
            homeAPI.getMyPosts().then(data => {
                dispatch(setPostsAC(data))
            })
        })
    }
}
export const deleteMyPostDataThunk = (id) => {
    return (dispatch) => {
        homeAPI.deleteMyPost(id).then(data => {
            homeAPI.getMyPosts().then(data => {
                dispatch(setPostsAC(data))
            })
        })
    }
}
export default homeReducer;