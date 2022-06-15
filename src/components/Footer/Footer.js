import users from '../../img/users.png'
import users2 from '../../img/users2.png'
import home from '../../img/home.png';
import home2 from '../../img/home2.png';
import profile from '../../img/profile.png';
import profile2 from '../../img/profile2.png';
import styles from "./Footer.module.css"
import chat from '../../img/chat.png'
import chat2 from '../../img/chat2.png'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getAllDialogsThunk } from '../../redux/dialogsReducer.js';

const Footer = (props) => {
    useEffect(() => {
        props.getAllDialogsThunk()
    }, [])
    let count = props.newMessages.length
    return (
        <footer className={styles.footer}>
            <nav className={styles.navBar}>
                <NavLink to={'/profile/' + props.authId} className={navData => navData.isActive ? styles.activeImg : styles.img}>
                    {navData => navData.isActive ? <img src={profile2} alt="" /> : <img src={profile} alt="" />}
                </NavLink>
                <NavLink to="/users" className={navData => navData.isActive ? styles.activeImg : styles.img}>
                    {navData => navData.isActive ? <img src={users2} alt="" /> : <img src={users} alt="" />}
                </NavLink>
                <NavLink to="/messages" className={navData => navData.isActive ? styles.activeImg : styles.img}>
                    {navData => navData.isActive ?
                        count > 0 ? <div><img src={chat2} alt="" /> <span>{count}</span></div> : <img src={chat2} alt="" />
                        : count > 0 ? <><img src={chat} alt="" /> <span>{count}</span></> : <img src={chat} alt="" />}
                </NavLink>
                <NavLink to="/home" className={navData => navData.isActive ? styles.activeImg : styles.img}>
                    {navData => navData.isActive ? <img src={home2} alt="" /> : <img src={home} alt="" />}
                </NavLink>
            </nav>
        </footer>
    )
}
const mapStateToProps = (state) => {
    return {
        dialogs: state.messagesPage.dialogs,
        newMessages: state.messagesPage.dialogs.filter(elem => elem.newMessagesCount > 0),
        myUserId: state.auth.userId,
        authId: state.auth.userId
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllDialogsThunk() {
            dispatch(getAllDialogsThunk())
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Footer);