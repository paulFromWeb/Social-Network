import { Component } from "react";
import { connect } from "react-redux";
import { authAPIThunk, loginAPIThunk, } from "../../redux/authReducer";
import Login from "./Login";
import { Navigate } from "react-router-dom";


class LoginContainer extends Component {
    componentDidMount() {
        this.props.authAPIThunk()
    }
    render() {
        return this.props.login ? <Navigate to={'/profile/' + this.props.myId} /> : <Login {...this.props} />
    }
}
const mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        myId: state.auth.userId
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authAPIThunk: () => {
            dispatch(authAPIThunk())
        },
        loginAPIThunk: (email, password, rememberMe) => {
            dispatch(loginAPIThunk(email, password, rememberMe))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);