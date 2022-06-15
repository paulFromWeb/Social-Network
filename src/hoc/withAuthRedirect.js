import { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";


let mapStateToPropsForRedirect = (state) => {
    return {
        login: state.auth.login
    }
}
export const withAuthRedirectHOC = (Componenta) => {
    class RedirectComponent extends Component {
        render() {
            return this.props.login ? <Componenta {...this.props} /> : <Navigate to="/login" />
        }
    }
    let ConnectedAuthRedirect = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedAuthRedirect
}

