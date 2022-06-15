import React, { Component, FC } from "react";
import { connect } from "react-redux";
import { setCurrentPageAC, getUsersThunk, followUserThunk, unfollowUserThunk, getFriendsThunk } from "../../redux/usersReducer";
import Users from "./Users";
import { getCurrentPage, getFetching, getFollowingInProgress, getTotalUsersCount, getUsers, getUsersNew, pageSize } from "../../redux/usersSelectors";
import { useEffect } from "react"

const UsersContainerAPI = ({ pageSize, users, friends, totalUsersCount, currentPage, isFetching, getFriendsThunk, ...props }) => {
    useEffect(() => {
        if (users.length === 0) {
            props.getUsersThunk(null, pageSize)
        }
    }, [])
    useEffect(() => {
        props.getUsersThunk(null, pageSize)
    }, [friends.length])
    const changeCurrentPages = (pageNumber) => {
        props.setCurrentPage(pageNumber)
    }
    const followUser = (userId) => {
        props.followUserThunk(userId)
    }
    const unfollowUser = (userId) => {
        props.unfollowUserThunk(userId)
    }
    return (
        <Users pageSize={pageSize}
            totalUsersCount={totalUsersCount}
            currentPage={currentPage}
            isFetching={isFetching}
            followingInProgress={props.followingInProgress}
            users={users}
            changeCurrentPages={changeCurrentPages}
            followUser={followUser}
            unfollowUser={unfollowUser}
            getFriendsThunk={getFriendsThunk} />
    )
}

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: pageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        usersNew: getUsersNew(state),
        isFetching: getFetching(state),
        followingInProgress: getFollowingInProgress(state),
        friends: state.usersPage.friends
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentPage: (number) => {
            dispatch(setCurrentPageAC(number))
        },
        getUsersThunk: (currentPage, pageSize) => {
            dispatch(getUsersThunk(currentPage, pageSize))
        },
        followUserThunk: (userId) => {
            dispatch(followUserThunk(userId))
        },
        unfollowUserThunk: (userId) => {
            dispatch(unfollowUserThunk(userId))
        },
        getFriendsThunk: () => {
            dispatch(getFriendsThunk())
        }
    }
}
const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersContainerAPI);
export default UsersContainer;