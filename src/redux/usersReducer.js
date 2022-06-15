import { usersAPI } from "../components/API/API"
const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"
const SET_FRIENDS = "SET_FRIENDS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"
const IS_FOLLOW = "IS_FOLLOW";

let initialState = {
    users: [],
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    friends: [],
    friendsTotalCount: null,
    isFollow: false
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(elem => {
                    if (elem.id === action.id) {
                        return { ...elem, followed: true }
                    }
                    return elem;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(elem => {
                    if (elem.id === action.id) {
                        return { ...elem, followed: false }
                    }
                    return elem;
                })
            }
        case SET_USERS:
            let newUsers = [...state.users]
            let newUsersFromAPI = [...action.users]
            for (const { id } of newUsers) {
                newUsersFromAPI.forEach(item => {
                    if (item.id === id) {
                        newUsersFromAPI = newUsersFromAPI.filter(elem => {
                            return elem.id != item.id
                        })
                    }
                })
            }
            return {
                ...state,
                users: [...state.users, ...newUsersFromAPI]
            }
        case SET_FRIENDS:
            return {
                ...state,
                friends: [...action.friends],
                friendsTotalCount: action.friendsTotalCount
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.number
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.number
            }
        case IS_FOLLOW:
            return {
                ...state,
                isFollow: action.isFollow,
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId]
                    : [state.followingInProgress.filter(id => id !== action.userId)],
            }
        default:
            return state;
    }
}
export const followAC = (id) => ({ type: FOLLOW, id })
export const unfollowAC = (id) => ({ type: UNFOLLOW, id })
export const setUsersAC = (users) => ({ type: SET_USERS, users })
export const setFriendsAC = (friends, friendsTotalCount) => ({ type: SET_FRIENDS, friends, friendsTotalCount })
export const isFollowAC = (isFollow) => ({ type: IS_FOLLOW, isFollow })
export const setCurrentPageAC = (number) => ({ type: SET_CURRENT_PAGE, number })
export const setTotalUsersCountAC = (number) => ({ type: SET_TOTAL_USERS_COUNT, number })
export const toogleIsFetchingAC = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toogleIsFollowingProgressAC = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

export const getUsersThunk = (numberPage, pageSize) => {
    let currentPage = 10;
    return (dispatch) => {
        dispatch(toogleIsFetchingAC(true))
        let arr = []
        let i = 0;
        let getData = async () => {
            while (arr.length <= 200) {
                let data = await usersAPI.getUsers(currentPage + i, pageSize)
                arr = arr.concat(data.items.filter(item => item.status != null && item.photos.small != null && item.photos.large != null))
                dispatch(setUsersAC(arr));
                dispatch(toogleIsFetchingAC(false))
                dispatch(setTotalUsersCountAC(2000))
                i++
            }
        }
        getData();
        dispatch(toogleIsFetchingAC(false))
    }
}
export const getFriendsThunk = () => {
    let totalCount = 1;
    let friends = []
    let i = 1
    return async (dispatch) => {
        while (totalCount !== friends.length) {
            await usersAPI.getUsersFriends(i).then(data => {
                friends = friends.concat(data.items)
                totalCount = data.totalCount
                i++
            })
        }
        dispatch(setFriendsAC(friends, totalCount))
    }
}
export const followUserThunk = (userId) => {
    return (dispatch) => {
        dispatch(toogleIsFollowingProgressAC(true, userId))
        usersAPI.follow(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(followAC(userId))
                dispatch(toogleIsFollowingProgressAC(false, userId))
            }
        })
    }
}
export const unfollowUserThunk = (userId) => {
    return (dispatch) => {
        dispatch(toogleIsFollowingProgressAC(true, userId))
        usersAPI.unfollow(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(unfollowAC(userId))
                dispatch(toogleIsFollowingProgressAC(false, userId))
            }
        })
    }
}
export const isFollowThunk = (userId) => {
    return (dispatch) => {
        dispatch(toogleIsFollowingProgressAC(true, userId))
        usersAPI.isFollow(userId).then(data => {
            dispatch(isFollowAC(data))
            dispatch(toogleIsFollowingProgressAC(false, userId))
        })
    }
}
export default usersReducer;

