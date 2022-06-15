

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addMessageAC, deleteMessageThunk, getAllDialogsThunk, getAllMessagesWithFriendThunk, sendMessageThunk } from '../../../../../redux/dialogsReducer.js';
import { getProfileThunk } from '../../../../../redux/profileReducer.js';
import Message from './Message';


const MessageContainer = (props) => {
    let { userId } = useParams();
    const [pageNumber, setPageNumber] = useState(1)
    useEffect(() => {
        props.getProfileThunk(props.userId)
        if (props.messages.length === 0 || props.dialogs.length === 0) {
            // props.getAllMessagesWithFriendThunk(userId, pageNumber)
        }
    }, [])
    useEffect(() => {
        props.getAllDialogsThunk()
        if (pageNumber === 1) {
            props.getAllMessagesWithFriendThunk(userId, pageNumber)
        }
    }, [props.messages.length])
    return <Message {...props} setPageNumber={setPageNumber} paramsUserId={userId} user={props.dialogs.filter(item => item.id === +userId)[0]} />
}

const mapStateToProps = (state) => {
    return {
        dialogs: state.messagesPage.dialogs,
        messages: state.messagesPage.messages,
        totalCount: state.messagesPage.totalCount,
        login: state.auth.login,
        userId: state.auth.userId,
        userIdMe: state.auth.userId,
        user2: state.profilePage.user,
        userName: state.profilePage.user.fullName,
        myProfile: state.profilePage.user,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addMessage(message) {
            dispatch(addMessageAC(message))
        },
        sendMessageThunk(userId, message) {
            dispatch(sendMessageThunk(userId, message))
        },
        getAllMessagesWithFriendThunk(userId, i) {
            dispatch(getAllMessagesWithFriendThunk(userId, i))
        },
        getAllDialogsThunk() {
            dispatch(getAllDialogsThunk())
        },
        getProfileThunk: (userId) => {
            dispatch(getProfileThunk(userId))
        },
        deleteMessageThunk: (messageId) => {
            dispatch(deleteMessageThunk(messageId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer);