import Settings from "./Settings"
import { connect } from "react-redux"
import { getProfileThunk, setPhotoThunk, setUserDataThunk } from "../../redux/profileReducer.js"
import { authAPIThunk } from "../../redux/authReducer.js"
import { useEffect } from "react"

const SettingsContainer = (props) => {
    useEffect(() => {
        props.authAPIThunk()
        if (!props.me) {
            props.getProfileThunk(props.userId)
        }
    }, [])
    return (
        <Settings {...props} />
    )
}
const mapStateToProps = (state) => {
    return {
        me: state.profilePage.user.userId,
        userId: state.auth.userId,
        myPhoto: state.profilePage.user.photos.small,
        myProfile: state.profilePage.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserDataThunk: (data) => {
            dispatch(setUserDataThunk(data))
        },
        authAPIThunk: () => {
            dispatch(authAPIThunk())
        },
        setPhotoThunk: (image) => {
            dispatch(setPhotoThunk(image))
        },
        getProfileThunk: (userId) => {
            dispatch(getProfileThunk(userId))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);