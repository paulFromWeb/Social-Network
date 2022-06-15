
import HomePosts from './HomePosts';
import { connect } from 'react-redux';
import { setImagesThunk } from '../../../redux/homeReducer';
import { useEffect } from 'react';
import { getFriendsThunk } from '../../../redux/usersReducer.js'

const HomePostsContainer = (props) => {
    useEffect(() => {
        if (props.friends.length === 0) {
            props.getFriendsThunk()
        }
        props.setImagesThunk()
    }, [])
    useEffect(() => {
    }, [props.friends.length])
    return <HomePosts {...props} />
}
const mapStateToProps = (state) => {
    return {
        posts: state.homePage.posts,
        friends: state.usersPage.friends,
        usersPosts: state.homePage.usersPosts
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getFriendsThunk: () => {
            dispatch(getFriendsThunk())
        },
        setImagesThunk: () => {
            dispatch(setImagesThunk())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePostsContainer);