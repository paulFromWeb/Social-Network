import spinner from "../../img/spinner.svg"
import styles from "./Users.module.css"
import { NavLink } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import React, { useMemo, useState, FC } from "react";
import MyButton from "../UI/button/MyButton";
import UsersButtons from "../UI/button/UsersButtons";


const Users = ({ totalUsersCount, pageSize, followUser, unfollowUser, getFriendsThunk, currentPage,
    changeCurrentPages, users, isFetching, followingInProgress, ...props }) => {
    let buttonsNumber = totalUsersCount / pageSize
    let buttons = [];
    for (let i = 1; i <= buttonsNumber; i++) {
        buttons.push(i)
    }
    let [myUsers, setUsers] = useState([...users])
    const follow = (userId) => {
        followUser(userId)
        getFriendsThunk(userId)
    }
    const unfollow = (userId) => {
        unfollowUser(userId)
        getFriendsThunk(userId)
    }
    const [selectedSort, setSelectedSort] = useState('choose')
    const sortPosts = (sort) => {
        setSelectedSort(sort)
        if (sort === "users") {
            setUsers(users)
        }
        else if (sort === "choose") {
            setUsers([])
        }
        else if (sort === "friends") {
            setUsers(users.filter(user => user.followed === true))
        }
        else if (sort === "byName") {
            setUsers([...users].sort((a, b) => a.name.localeCompare(b.name)))
        }
    }
    const [queryValue, setQueryValue] = useState('')
    useMemo(() => {
        setUsers(users.filter(user => user.name.toLowerCase().includes(queryValue.toLowerCase()) ? user : null))
    }, [queryValue])

    return (
        < div className={styles.wrapper} >
            <div>
                <Header link={null} title="" selectedSort={selectedSort} sortPosts={sortPosts} setQueryValue={setQueryValue} />
            </div>
            <UsersButtons selectedSort={selectedSort} changeCurrentPages={changeCurrentPages} currentPage={currentPage} className={styles.pagination} buttons={buttons} />
            {selectedSort !== "choose" ?
                myUsers.map((elem, index) => {
                    if (index >= (currentPage - 1) * 10 && index <= (currentPage * 10) - 1) {
                        return < div className={styles.user} key={elem.id} >
                            <div className={styles.photo}>
                                <NavLink to={"/profile/" + elem.id} className={styles.navLink} ><img src={elem.photos.small} alt="" /></NavLink>
                            </div>
                            {
                                isFetching ? <img src={spinner} alt="" /> : <div className={styles.mainInfo}>
                                    <NavLink to={"/profile/" + elem.id} className={styles.navLink} ><div className={styles.name}>{elem.name.slice(0, 21)}</div></NavLink>
                                    <div className={styles.userStatus}>{elem.status.length > 50 ? elem.status.substr(0, 50) : elem.status}</div>
                                    <div className={styles.mainInfo_Footer}>
                                    </div>
                                </div>
                            }
                            {
                                elem.followed ?
                                    <MyButton disabled={followingInProgress.some(id => id === elem.id)}
                                        className={styles.buttonUnfollow} onClick={() => unfollow(elem.id)}>-Unfollow</MyButton>
                                    : <MyButton disabled={followingInProgress.some(id => id === elem.id)}
                                        className={styles.button} onClick={() => follow(elem.id)}>+Follow</MyButton>
                            }
                        </div>
                    }
                    if (selectedSort !== "friends" && users.length === 0) {
                        return <h1>You dont have any friends yet</h1>
                    }
                })
                : ""
            }
            <UsersButtons selectedSort={selectedSort} changeCurrentPages={changeCurrentPages} currentPage={currentPage} className={styles.pagination} buttons={buttons} />
            <Footer />
        </ div >
    )
}
export default Users;