import { profileAPI } from "../components/API/API";
const ADD_PROFILE = "ADD_PROFILE";
const SET_STATUS = "SET_STATUS";
const SET_CITIES = "SET_CITIES";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
    user: {
        aboutMe: "",
        contacts: { instagram: "", youtube: "", github: "" },
        fullName: "",
        lookingForAJob: true,
        lookingForAJobDescription: "",
        photos: { small: '', large: '' },
        userId: null
    },
    isFetching: true,
    status: "",
    cities: [],
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PROFILE:
            return {
                ...state,
                user: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status,
            }
        case SET_CITIES:
            return {
                ...state,
                cities: action.cities,
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            }
        default:
            return state;
    }
}

export const addProfileAC = (profile) => ({ type: ADD_PROFILE, profile })
export const setStatusAC = (status) => ({ type: SET_STATUS, status })
export const setCitiesAC = (cities) => ({ type: SET_CITIES, cities })
export const toggleIsFetchingAC = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })

export const getProfileThunk = (userId) => {
    return (dispatch) => {
        dispatch(toggleIsFetchingAC(true))
        profileAPI.getProfile(userId).then(data => {
            dispatch(addProfileAC(data))
            dispatch(toggleIsFetchingAC(false))
        })
    }
}
export const setStatusThunk = (userId) => {
    return (dispatch) => {
        dispatch(toggleIsFetchingAC(true))
        profileAPI.setStatus(userId).then(data => {
            dispatch(setStatusAC(data))
            dispatch(toggleIsFetchingAC(false))
        })
    }
}
export const setCitiesThunk = () => {
    return (dispatch) => {
        dispatch(toggleIsFetchingAC(true))
        profileAPI.getCity().then(data => {
            dispatch(setCitiesAC(data))
            dispatch(toggleIsFetchingAC(false))
        })
    }
}
export const setUserDataThunk = (data) => {
    return (dispatch) => {
        dispatch(toggleIsFetchingAC(true))
        profileAPI.setUserData(data).then(data => {
            dispatch(toggleIsFetchingAC(false))
        })
    }
}
export const setPhotoThunk = (image) => {
    return (dispatch) => {
        dispatch(toggleIsFetchingAC(true))
        profileAPI.setPhoto(image).then(data => {
            dispatch(toggleIsFetchingAC(false))
        })
    }
}
export const updateStatusThunk = (status) => {
    return (dispatch) => {
        dispatch(toggleIsFetchingAC(true))
        profileAPI.updateStatus(status).then(data => {
            if (data.resultCode === 0) {
                dispatch(setStatusAC(status))
                dispatch(toggleIsFetchingAC(false))
            }
        })
    }
}
export default profileReducer;