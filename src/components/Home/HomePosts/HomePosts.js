import hacker from '../../../img/hacker.png';
import styles from "./HomePosts.module.css"
import heart from "./../../../img/heart.png"
import heartA from "./../../../img/heartA.png"
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { AddLike } from '../../../shared/AddLike';

const Post = (props) => {
    const [liked, changeLiked] = useState(false)
    let [numberLike, changeNumberLikes] = useState(new String(props.id).slice(2, 4))
    return (
        <div className={styles.onePost} key={props.usersPosts.id}>
            <div className={styles.title}>
                <div className={styles.user}>
                    <div className={styles.userPhoto}>
                        <NavLink to={"/profile/" + props.id} ><img src={props.photos.small ? props.photos.small : hacker} alt="" /></NavLink>
                    </div>
                    <NavLink to={"/profile/" + props.id} ><div className={styles.userName}>{props.name}</div></NavLink>
                </div>
            </div>
            <div className={styles.description}>{props.usersPosts.data.postText}</div>
            <div className={styles.postImg}>
                <img src={props.usersPosts.data.link} alt="" />
            </div>
            <div className={styles.postInfo}>
                <div className={styles.likes} >
                    <span>{numberLike}</span>
                    <img alt="" src={liked ? heartA : heart}
                        onClick={() => AddLike(liked, changeLiked, numberLike, changeNumberLikes)} />
                </div>
            </div>
        </div>
    )
}

const HomePosts = (props) => {
    return (
        <div className={styles.post} >
            {props.friends.map((elem, i) => {
                if (i < 10) {
                    return Post({ ...elem, addLike: props.addLike, deleteLike: props.deleteLike, usersPosts: props.usersPosts[i] })
                }
            })}
        </div>
    )
}
export default HomePosts;