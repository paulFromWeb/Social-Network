import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.css"
import back from '../../img/back.png';
import back2 from '../../img/back2.png';

import search from '../../img/search.png';
import { useState } from "react";


const Header = (props) => {
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <header className={styles.header}>
            <div className={styles.iconBack}>
                {props.selectedSort ?
                    <>
                        {props.selectedSort !== "choose" ? visible ? <img src={back2} className={styles.back2} onClick={() => {
                            setVisible(!visible)
                            props.setQueryValue('')
                        }
                        } alt="" />
                            : <img className={styles.search} src={search} onClick={() => setVisible(!visible)} alt="" /> : ""}
                        {visible ?
                            <input type="text" placeholder="Enter username..." autoFocus onChange={e => props.setQueryValue(e.target.value)} /> :
                            <select name="" id="" onChange={sort => props.sortPosts(sort.target.value)} value={props.selectedSort} defaultValue="choose">
                                <option value="choose" disabled>Click on Me</option>
                                <option value="users" >All Users</option>
                                <option value="friends">My Friends</option>
                                <option value="byName">By The Name</option>
                            </select>
                        }
                    </>
                    : ""}
                {props.link === null ? "" :
                    <img src={back} alt="" className={styles.back} onClick={goBack} />
                }
                {props.selectedSort ? "" : <div className={styles.title}>{props.title}</div>}
            </div>
        </header >
    )
}
export default Header;