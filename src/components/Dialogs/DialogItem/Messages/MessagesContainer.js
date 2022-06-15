import { connect } from "react-redux";
import Messages from "./Messages";

const MessagesContainer = (props) => {
    return <Messages {...props} />
}
const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);