
import { useEffect, useState } from "react"
import ProfileInfo from "./ProfileInfo"
import { addProfileAC, getProfileThunk, setCitiesThunk, setStatusThunk, toggleIsFetchingAC, updateStatusThunk, } from "../../../redux/profileReducer.js"
import { connect } from "react-redux"
import { withAuthRedirectHOC } from '../../../hoc/withAuthRedirect'
import { logoutAPIThunk } from '../../../redux/authReducer.js'
import { followUserThunk, getFriendsThunk, isFollowThunk, unfollowUserThunk } from '../../../redux/usersReducer.js'
import { getFollowingInProgress } from '../../../redux/usersSelectors'
import { useParams } from 'react-router-dom'
import { deleteMyPostDataThunk, getMyPostLinkThunk, sendMyPostDataThunk, setImagesThunk, setMyLinkAC, setPostsImagesThunk } from "../../../redux/homeReducer"

const ProfileContainer = (props) => {
    let { userId } = useParams();
    useEffect(() => {
        if (props.user.userId !== props.authorizedUserId) {
            props.isFollowThunk(userId)
        }
        props.setImagesThunk()
        if (!userId) {
            userId = props.authorizedUserId
            if (!userId) {
                props.history.push("/login")
            }
        }
        if (props.friends.length === 0) {
            props.getFriendsThunk()
        }
        if (props.cities.length === 0) {
            props.setCitiesThunk()
        }
        if (props.user.aboutMe === "") {
            props.getProfileThunk(userId)
        }
        if (!props.status) {
            props.setStatusThunk(userId)
        }
        props.setPostsImagesThunk()
    }, []);
    useEffect(() => {
        props.isFollowThunk(userId)
    }, [props.isFollow]);

    useEffect(() => {
        if (!userId) {
            userId = props.authorizedUserId
        }
        props.getProfileThunk(userId)
        props.setStatusThunk(userId)
    }, [userId]);
    const [isFetching, setFetching] = useState(props.myLink ? true : false)
    const getPhotoLink = (image) => {
        props.getMyPostLinkThunk(image)
        if (props.myLink) {
            setFetching(false)
        }
    }
    return (
        <ProfileInfo {...props} userId={userId} getPhotoLink={getPhotoLink} isFetching={isFetching} setFetching={setFetching} />
    )
}
let AuthRedirectComponent = withAuthRedirectHOC(ProfileContainer)

const mapStateToProps = (state) => {

    return {
        user: state.profilePage.user,
        cities: state.profilePage.cities,
        friends: state.usersPage.friends,
        friendsTotalCount: state.usersPage.friendsTotalCount,
        authorizedUserId: state.auth.userId,
        status: state.profilePage.status,
        isFetching: state.profilePage.isFetching,
        usersFollowing: state.usersPage.users.filter(item => item.followed === true),
        followingInProgress: getFollowingInProgress(state),
        isFollow: state.usersPage.isFollow,
        myPosts: state.homePage.myPosts,
        usersPosts: state.homePage.usersPosts,
        myLink: state.homePage.myLink,
        isFetching: state.homePage.isFetching,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addProfile: (profile) => {
            dispatch(addProfileAC(profile))
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingAC(isFetching))
        },
        getProfileThunk: (userId) => {
            dispatch(getProfileThunk(userId))
        },
        setStatusThunk: (userId) => {
            dispatch(setStatusThunk(userId))
        },
        setCitiesThunk: () => {
            dispatch(setCitiesThunk())
        },
        updateStatusThunk: (status) => {
            dispatch(updateStatusThunk(status))
        },
        logoutAPIThunk: () => {
            dispatch(logoutAPIThunk())
        },
        getFriendsThunk: () => {
            dispatch(getFriendsThunk())
        },
        isFollowThunk: (userId) => {
            dispatch(isFollowThunk(userId))
        },
        followUserThunk: (userId) => {
            dispatch(followUserThunk(userId))
        },
        unfollowUserThunk: (userId) => {
            dispatch(unfollowUserThunk(userId))
        },
        setPostsImagesThunk: () => {
            dispatch(setPostsImagesThunk())
        },
        getMyPostLinkThunk: (image) => {
            dispatch(getMyPostLinkThunk(image))
        },
        sendMyPostDataThunk: (data) => {
            dispatch(sendMyPostDataThunk(data))
        },
        deleteMyPostDataThunk: (id) => {
            dispatch(deleteMyPostDataThunk(id))
        },
        setImagesThunk: () => {
            dispatch(setImagesThunk())
        },
        setMyLinkAC: (link) => {
            dispatch(setMyLinkAC(link))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
