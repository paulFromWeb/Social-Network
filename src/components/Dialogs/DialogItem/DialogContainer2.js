import { useEffect } from 'react';
import DialogItem from './DialogItem';
import { connect } from 'react-redux';
import { withAuthRedirectHOC } from '../../../hoc/withAuthRedirect';
import MessageContainer from './Messages/Message/MessageContainer';
import { useParams } from 'react-router-dom';
import { getAllDialogsThunk, getAllMessagesWithFriendThunk } from '../../../redux/dialogsReducer.js';

const DialogContainer2 = (props) => {
    let { userId } = useParams();
    useEffect(() => {
        props.getAllDialogsThunk()
    }, []);
    if (!userId) {
        return <DialogItem {...props} />
    }
    return <MessageContainer {...props} />
}
const mapStateToProps = (state) => {
    return {
        messages: state.messagesPage.messages,
        dialogs: state.messagesPage.dialogs,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllMessagesWithFriendThunk(userId, i) {
            dispatch(getAllMessagesWithFriendThunk(userId, i))
        },
        getAllDialogsThunk() {
            dispatch(getAllDialogsThunk())
        },
    }
}
let AuthRedirectComponent = withAuthRedirectHOC(DialogContainer2)

export default connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
