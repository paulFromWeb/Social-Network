import { dialogsAPI } from "../components/API/API";

const ADD_MESSAGE = "ADD_MESSAGE";
const GET_DIALOGS = "GET_DIALOGS";
const GET_MESSAGES = "GET_MESSAGES";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
let initialState = {
    dialogs: [
        {
            "id": 22433, "userName": "123misha", "hasNewMessages": false, "lastDialogActivityDate": "2022-04-10T07:23:29.317", "lastUserActivityDate": "2022-03-24T14:42:50.427", "newMessagesCount": 0,
            "photos": { "small": "https://social-network.samuraijs.com/activecontent/images/users/22433/user-small.jpg?v=1", "large": "https://social-network.samuraijs.com/activecontent/images/users/22433/user.jpg?v=1" }
        }],
    messages: [],
    totalCount: null

}
const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, { message: action.message, class: "fromMe" }]
            };
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.totalCount
            };
        case GET_DIALOGS:
            return {
                ...state,
                dialogs: [...action.dialogs]
            };
        case GET_MESSAGES:
            return {
                ...state,
                messages: action.messages
            };
        default:
            return state;
    }
}
export const addMessageAC = (message) => ({ type: ADD_MESSAGE, message })
export const setTotalCountAC = (totalCount) => ({ type: SET_TOTAL_COUNT, totalCount })
export const getDialogsAC = (dialogs) => ({ type: GET_DIALOGS, dialogs })
export const getAllMessagesAC = (messages) => ({ type: GET_MESSAGES, messages })

export const getAllMessagesWithFriendThunk = (userId, i) => {
    let messages = []
    return async (dispatch) => {
        await dialogsAPI.getAllMessagesWithFriend(userId, i).then((data) => {
            dispatch(setTotalCountAC(data.totalCount))
            messages.unshift(...data.items)
        })
        if (messages.length !== 0) {
            dispatch(getAllMessagesAC(messages))
        }
    }
}
export const sendMessageThunk = (userId, message) => {
    return (dispatch) => {
        dialogsAPI.sendMessage(userId, message).then((data) => {
            dialogsAPI.getAllMessagesWithFriend(userId, 1)
        })
    }
}
export const deleteMessageThunk = (messageId) => {
    return (dispatch) => {
        dialogsAPI.deleteMessage(messageId).then((data) => {
        })
    }
}
export const getAllDialogsThunk = () => {
    return (dispatch) => {
        dialogsAPI.getAllDialogs().then((data) => {
            dispatch(getDialogsAC(data))
        })
    }
}
export default dialogsReducer;