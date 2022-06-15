import styles from "./ProfileInfo.module.css"
import twitter from '../../../img/twitter.png'
import youtube from '../../../img/youtube.png'
import setting2 from '../../../img/setting2.png'
import setting from '../../../img/Setting.png'
import icn from '../../../img/icn.png'
import plus from '../../../img/plus.png'
import plus2 from '../../../img/plus2.png'
import close from '../../../img/close.png'
import heart from '../../../img/heart.png'
import heartA from '../../../img/heartA.png'
import comments from '../../../img/comments.png'
import { Form, Field } from 'react-final-form'
import spinner from '../../../img/spinner.svg'
import instagram from '../../../img/instagram.png';
import github from '../../../img/github.png';
import vk from '../../../img/vk.png';
import facebook from '../../../img/facebook.png';
import Footer from "../../Footer/Footer"
import ProfileStatusWithHook from "./ProfileStatusWithHook"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import { AddLike } from "../../../shared/AddLike"

const ProfileInfo = (props) => {
    const myPosts = props.authorizedUserId !== props.user.userId ? props.usersPosts : props.myPosts
    const follow = (userId) => {
        props.followUserThunk(userId)
        props.getFriendsThunk(userId)
        props.isFollowThunk(userId)
    }
    const unfollow = (userId) => {
        props.unfollowUserThunk(userId)
        props.getFriendsThunk(userId)
        props.isFollowThunk(userId)
    }
    const logout = () => {
        props.logoutAPIThunk()
    }
    const [visible, setVisible] = useState(true)
    const [addPostVisible, setAddPostVisible] = useState(false)
    const [postState, setPostState] = useState('')
    const [idPost, setIdVisiblePost] = useState(0)
    const [isModalOpen, setModalOpen] = useState(false)
    const [addIndicator, setIndicator] = useState(props.myLink ? true : false)
    const [svg, setSvg] = useState(false)

    const submit = (values) => {
        if (props.myLink) {
            setSvg(true)
            let options = { day: 'numeric', month: 'long', year: "numeric", }
            const date2 = (new Date().toLocaleDateString("en-US", options))
            let data = {
                postText: values.postText,
                link: props.myLink,
                date: date2
            }
            props.sendMyPostDataThunk(data)
            setPostState('')
            setAddPostVisible(false)
            props.setFetching(true)
            setIndicator(false)
            setSvg(false)
        }
    }
    const [liked, changeLiked] = useState(false)
    let [numberLike, changeNumberLikes] = useState(new String(props.userId).slice(2, 4))
    if (!props.user) {
        return (
            <div>
                <img src={spinner}></img>
            </div>
        )
    }
    const getImgLink = (e) => {
        props.getPhotoLink(e.target.files[0])
        props.setFetching(false)
        setIndicator(true)
    }
    const deletePost = (id) => {
        props.deleteMyPostDataThunk(id)
    }
    const contactsValues = Object.values(props.user.contacts)
    const contactsArr = Object.keys(props.user.contacts)
    return (
        <div className={styles.wrapper} >
            {props.authorizedUserId === props.user.userId ? <div className={styles.links}><NavLink to="/settings">  {props.authorizedUserId === props.user.userId ? <img className={styles.icon2} src={setting2} alt="" /> : ''}</NavLink>
                {props.authorizedUserId === props.user.userId ? <img className={styles.icon} onClick={logout} src={setting} alt="" /> : ''}
            </div> : ""}
            <div className={styles.header} style={{
                backgroundImage: `url(" ${props.user.photos.large}")`, backgroundSize: '100% 60%', backgroundRepeat: 'no-repeat'
            }} >
            </div>
            <div className={styles.main}>
                <div className={styles.info}>
                    <div className={styles.name}>{props.user.fullName.slice(0, 20)}</div>
                    <div className={styles.nikname}>
                        <ProfileStatusWithHook status={props.status} updateStatus={props.updateStatusThunk} authorizedUserId={props.authorizedUserId} userId={props.user.userId} />
                    </div>
                    <div className={styles.connect}>
                        {props.user.userId !== props.authorizedUserId ? props.isFollow ?
                            <button className={styles.button} onClick={() => unfollow(props.user.userId)}>-Unfollow</button>
                            : <button className={styles.button} onClick={() => follow(props.user.userId)}>+Follow</button> : " "
                        }
                        {props.user.userId !== props.authorizedUserId ? <NavLink to={"/messages/" + props.user.userId} ><div className={styles.connectIcon}><img src={icn} alt="" /></div></NavLink> : ''}
                        <div className={styles.social}>
                            <div><span className={styles.number}>{props.userId !== props.authorizedUserId ? (props.userId + "").slice(-2) : (props.authorizedUserId + '').slice(-2)}</span> Followers</div>
                            <div><span className={styles.number}>{props.user.userId !== props.authorizedUserId ? (+((props.userId + "").slice(-2)) + 5) * 3 : props.friendsTotalCount}</span> Following</div>
                        </div>
                    </div>
                    <div className={styles.tabInfoContent}>
                        <div className={styles.infoAbout}>
                            <div className={styles.title}>
                                <p onClick={() => setVisible(true)} className={visible ? styles.activeTitle : ""}>Info</p>
                                <p onClick={() => setVisible(false)} className={!visible ? styles.activeTitle : ""}>Feed</p>
                            </div>
                            {visible ? <>{props.user.aboutMe ? <p > <span className={styles.subtitle}> About me</span> <span>{props.user.aboutMe}</span> </p> : ""}
                                <p><span className={styles.subtitle}> Job</span> <span>{props.user.lookingForAJob ? `${"I am looking for a job.Write to me. " + props.user.lookingForAJobDescription}` : "Job not needed yet"}</span></p>
                                <p><span className={styles.subtitle}> My city</span> <span>{props.userId ? props.cities[props.userId[4]] : props.cities[(props.authorizedUserId + "")[4]]}</span> </p>
                                <div className={styles.socialContacts}>
                                    {contactsArr.map((elem, i) => {
                                        if (props.user.contacts[elem] !== null && props.user.contacts[elem] !== "") {
                                            if (elem === "website" || elem === "mainLink") {
                                                return null
                                            }
                                            let src;
                                            if (elem === "twitter") {
                                                src = twitter;
                                            } else if (elem === "youtube") {
                                                src = youtube;
                                            } else if (elem === "vk") {
                                                src = vk;
                                            } else if (elem === "facebook") {
                                                src = facebook;
                                            } else if (elem === "github") {
                                                src = github;
                                            } else if (elem === "instagram") {
                                                src = instagram;
                                            }
                                            return (
                                                <a href={contactsValues[i]}><div className={styles.facebook} key={i}>
                                                    <div>
                                                        <img src={src} alt="" />
                                                        <p>{contactsArr[i].toUpperCase()}: <span className={styles.nik}>{((contactsValues[i].replace("https://", ""))).slice(0, 20)}</span></p>
                                                    </div>
                                                </div></a>
                                            )
                                        }
                                        else {
                                            return ""
                                        }
                                    })}
                                </div>
                            </>
                                :
                                <div className={styles.feeds}>
                                    <div className={styles.addPost}>
                                        {props.authorizedUserId !== props.user.userId ? "" : <img src={addPostVisible ? plus2 : plus} onClick={() => setAddPostVisible(!addPostVisible)} alt="" />}
                                    </div>
                                    {addPostVisible ? <Form
                                        initialValues={{}}
                                        onSubmit={values => {
                                            submit(values)
                                        }}
                                        validate={values => {
                                        }}>
                                        {({ handleSubmit, form }) => (
                                            <form onSubmit={handleSubmit}>
                                                <div className={styles.input}>
                                                    <p className={styles.label}></p>
                                                    <Field name="postText">
                                                        {field => (
                                                            <div className={styles.inputBlock}>
                                                                <textarea {...field.input} placeholder="Create new post..." autoFocus type="text"></textarea>
                                                                <div className={styles.feedsButtons}>
                                                                    <div>
                                                                        {addIndicator ? <p>1</p> : ""}
                                                                        <input className={styles.fileInput} {...props.input} onChange={getImgLink} type="file" />
                                                                    </div>
                                                                    <button
                                                                        className={props.isFetching ? styles.buttonDisabled : styles.button} type="submit" >{svg ? <img src={spinner} alt="" /> : "Save"}</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Field>
                                                </div>
                                            </form>
                                        )}
                                    </Form> : <div className={styles.posts}>
                                        {myPosts.map((post, i) => {
                                            return <>
                                                <div key={i}>
                                                    {props.user.userId !== props.authorizedUserId ? "" : <img src={close} className={styles.close} alt="" onClick={() => deletePost(post.id)} />}
                                                    <img src={post.data.link} id={post.id} alt="" onClick={() => {
                                                        setIdVisiblePost(post.id)
                                                        setModalOpen(true)
                                                    }} />
                                                </div>
                                            </>
                                        })}
                                    </div>}
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {isModalOpen ?
                    <div className={styles.modal} onClick={() => setModalOpen(false)} >
                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} >
                            <img src={myPosts.filter(post => post.id === idPost)[0].data.link}
                                id={myPosts.filter(post => post.id === idPost)[0].id} alt="" />
                            <div className={styles.modalIcons} >
                                <div>
                                    <img alt="" src={liked ? heartA : heart}
                                        onClick={() => AddLike(liked, changeLiked, numberLike, changeNumberLikes)} />
                                    <span> {numberLike}</span>
                                </div>
                                <div>
                                    <span>0 comments </span>
                                    <img src={comments} alt="" />
                                </div>
                            </div>
                            <p className={styles.modalName}>{props.user.fullName} | {myPosts.filter(post => post.id === idPost)[0].data.date}</p>
                            <p className={styles.modalTitle}>{myPosts.filter(post => post.id === idPost)[0].data.postText}</p>
                        </div>
                    </div> : ""}
            </div>
            <Footer />
        </div>
    )
}
export default ProfileInfo;