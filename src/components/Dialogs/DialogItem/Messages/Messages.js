import hacker from '../../../../img/hacker.png';
import styles from "./Messages.module.css"
import { NavLink } from 'react-router-dom';

const Messages = (props) => {
    let str = props.lastDialogActivityDate.slice(props.lastDialogActivityDate.indexOf('T') + 1, props.lastDialogActivityDate.indexOf('.') - 3)
    let str2 = str.split(":")[1]
    str = (+(str.split(":")[0]) + 8)
    if (str > 24 || str === 24) {
        str = `0${str - 24}`
        str = `${str + ':' + "" + str2}`
    } else {
        str = str + ":" + str2
    }
    return (
        <>
            <NavLink to={"/messages/" + props.id} className={styles.navLink} >
                <div to={"/messages/" + props.id} className={props.hasNewMessages ? styles.activeMessage : styles.message} onClick={e => e.stopPropagation()}>
                    <div className={styles.photo}>
                        <NavLink to={"/profile/" + props.id} className={styles.navLink} ><img src={props.photos.small || hacker} alt="" /></NavLink>
                    </div>
                    <div className={styles.mainInfo}>
                        <NavLink to={"/profile/" + props.id}  > <div className={styles.name}>{props.userName}</div></NavLink>
                        <div className={styles.userMessage}>{props.message}</div>
                        <div className={styles.mainInfo_Footer}>
                            <div className={styles.time}>Last active <span> {str} </span></div>
                        </div>
                        {props.hasNewMessages ?
                            <div className={styles.newMessageCounter}>
                                {props.newMessagesCount}
                            </div>
                            : ""}
                    </div>
                </div>
            </NavLink>
        </>
    );
}
export default Messages;