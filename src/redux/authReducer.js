import { loginAPI } from "../components/API/API";
const SET_PROFILE = "SET_PROFILE";
let initialState = {
    userId: null,
    email: null,
    login: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                ...action.data
            }
        default:
            return state;
    }
}
export const setProfileAC = (userId, email, login) => ({ type: SET_PROFILE, data: { userId, email, login } })

export const authAPIThunk = () => {
    return (dispatch) => {
        return loginAPI.auth().then(data => {
            let { id, email, login } = data.data
            dispatch(setProfileAC(id, email, login))
        })
    }
}
export const loginAPIThunk = (email, password, rememberMe) => {
    return (dispatch) => {
        loginAPI.login(email, password, rememberMe).then(data => {
            if (data.resultCode === 0) {
                dispatch(authAPIThunk())
            }
        })
    }
}
export const logoutAPIThunk = () => {
    return (dispatch) => {
        loginAPI.logout().then(data => {
            if (data.resultCode === 0) {
                dispatch(setProfileAC(null, null, null))
            }
        })
    }
}
export default authReducer;