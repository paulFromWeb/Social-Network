import { authAPIThunk } from "./authReducer"
import { getAllDialogsThunk } from "./dialogsReducer";

const SET_INITIALIZED = "SET_INITIALIZED";
let initialState = {
    initialized: false
}
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}
export const setInitializedAC = () => ({ type: SET_INITIALIZED })

export const setInitializedThunk = () => {
    return (dispatch) => {
        if (!initialState.initialized) {
            let initialReturn = dispatch(authAPIThunk());
            let initialReturn2 = dispatch(getAllDialogsThunk());
            Promise.all([initialReturn, initialReturn2]).then(() => {
                dispatch(setInitializedAC())
            })
        }
    }
}
export default appReducer;