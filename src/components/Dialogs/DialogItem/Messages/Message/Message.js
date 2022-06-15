import styles from "./Message.module.css"
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import send from '../../../../../img/send.png';
import spinner from '../../../../../img/spinner.svg';
import Header from '../../../../Header/Header';
import { Form, Field } from 'react-final-form'
import MyButton from "../../../../UI/button/MyButton";


const DialogPart = (props) => {
    const [isActive, changeActive] = useState(false)
    const classViewed = props.viewed ? '' : styles.notViewed;
    let options = { month: 'long', day: 'numeric' }
    let str = props.addedAt.slice(props.addedAt.indexOf('T') + 1, props.addedAt.indexOf('.') - 3)
    let str2 = str.split(":")[1]
    str = (+(str.split(":")[0]) + 8)

    if (str > 24 || str === 24) {
        str = `0${str - 24}`
        str = `${str}:${str2}`
    } else {
        str = str + ":" + str2
    }
    const deleteMessage = (messageId) => {
        props.deleteMessage(messageId)
    }
    let newDate = []
    props.messages.forEach(elem => {
        newDate.push(new Date(elem.addedAt).toLocaleDateString("en-US", options))
    })
    let arr = [...new Set(newDate)]
    let arr2 = []
    arr.forEach(elem => {
        arr2.push(newDate.indexOf(elem))

    })
    return (
        props.user.id !== props.sender ?
            <>
                {arr2.includes(props.keyNumber) ? <div className={styles.date} >{newDate[props.keyNumber]} </div>
                    : ""}
                <div className={styles.message} >
                    <div onClick={() => changeActive(!isActive)} className={styles.mainInfo + " " + classViewed}>
                        <p className={styles.userName}>{props.myProfile.fullName}{" " + str}</p>
                        <p className={styles.messageBody}>{props.body}</p>
                        {isActive ? <span onClick={() => deleteMessage(props.messageId)}>✖</span> : ""}
                    </div>
                    <div className={styles.photo}>
                        <NavLink to={"/profile/" + props.userIdMe} ><img src={props.myProfile.photos.small} alt="" /></NavLink>
                    </div>
                </div>
            </> :
            <>
                {arr2.includes(props.keyNumber) ? <div className={styles.date} >{newDate[props.keyNumber]} </div> : ""}
                <div className={styles.message}>
                    <div onClick={() => changeActive(!isActive)} className={styles.photo2}>
                        <NavLink to={"/profile/" + props.user.id} ><img src={props.user.photos.small} alt="" /></NavLink>
                    </div>
                    <div className={styles.mainInfo2 + " " + classViewed}>
                        <p className={styles.userName}>{props.user.userName}{" " + str}</p>
                        <p className={styles.messageBody}>{props.body}</p>
                        {isActive ? <span onClick={() => deleteMessage(props.messageId)}>✖</span> : ""}
                    </div>
                </div>
            </>
    )
}

const Message = (props) => {
    const lastElement = useRef()
    const firstElement = useRef()
    const observer2 = useRef()
    const pageNumber = useRef()
    const [svg, setSvg] = useState(false)
    const [svg2, setSvg2] = useState(false)

    const maxNumberPage = useRef();
    maxNumberPage.current = Math.ceil(props.totalCount / 20)
    const watchPrevious = () => {
        setSvg(true)
        setSvg(true)
        if (maxNumberPage.current > pageNumber.current) {
            pageNumber.current = pageNumber.current + 1
            props.setPageNumber(pageNumber.current + 1)
            props.getAllMessagesWithFriendThunk(props.paramsUserId, pageNumber.current)
        }
        setSvg(false)
    }
    useEffect(() => {
        if (observer2.current) observer2.current.disconnect();
        var callback = function (entries, observer) {
            setSvg2(false)
            if (entries[0].isIntersecting) {
                if (pageNumber.current > 1) {
                    if (pageNumber.current !== NaN) {
                        firstElement.current?.scrollIntoView({ behavior: "smooth" })
                        pageNumber.current = pageNumber.current - 1
                        setSvg2(true)
                        props.getAllMessagesWithFriendThunk(props.paramsUserId, pageNumber.current)
                    }
                    if (!entries[0].isIntersecting) {
                        setSvg2(false)
                    }
                }
            };
        }
        observer2.current = new IntersectionObserver(callback, { delay: 2000, trackVisibility: true, rootMargin: '0px 0px 0px 0px' });
        observer2.current.observe(lastElement.current)
    }, [])
    if (!pageNumber.current) {
        pageNumber.current = 1
        props.getAllMessagesWithFriendThunk(props.paramsUserId, pageNumber.current)
    }
    return (
        props.user ? <div className={styles.wrapper}>
            <Header link={'/profile/' + props.paramsUserId} title={props.user.userName ? props.user.userName : "Message"} />
            <div className={styles.messageWrapper}>
                <>
                    {maxNumberPage.current !== pageNumber.current ? <div ref={firstElement} className={styles.previous} onClick={watchPrevious} >{svg ? <img src={spinner} alt="" /> : "Смотреть предыдущие"}</div> : ""}
                    {props.messages.map((elem, i) => (<DialogPart myProfile={props.myProfile} key={i} length={props.messages.length}
                        body={elem.body} messageId={elem.id} deleteMessage={props.deleteMessageThunk} viewed={elem.viewed}
                        addedAt={elem.addedAt ? elem.addedAt : "20:00"} user={props.user}
                        sender={elem.senderId} userIdMe={props.userIdMe} messages={props.messages} keyNumber={i} />))}
                    <div ref={lastElement} style={{ height: 20, background: "transparent", marginTop: 10, textAlign: "center" }}>{svg2 ? <img src={spinner} alt="" /> : ""}</div>
                </>
            </div>
            <MessageForm {...props} />
        </div > :
            <div className={styles.wrapper}>
                <Header link={'/profile/' + props.paramsUserId} title={"Message"} />
                <div className={styles.messageWrapper}>
                    <>
                        {maxNumberPage.current !== pageNumber.current ? <div ref={firstElement} className={styles.previous} onClick={watchPrevious} >{svg ? <img src={spinner} alt="" /> : ""}</div> : ""}

                        <div ref={lastElement} style={{ height: 20, background: "transparent", marginTop: 10, textAlign: "center" }}>{svg2 ? <img src={spinner} alt="" /> : ""}</div>
                    </>
                </div>
                <MessageForm {...props} />
            </div>
    )
}

const MessageForm = (props) => {
    const navigate = useNavigate();
    const goBack = () => navigate('/messages');
    const addNewMessage = (values) => {
        props.sendMessageThunk(props.paramsUserId, values.newMessageBody)
        props.addMessage(values.newMessageBody)
        props.getAllMessagesWithFriendThunk(props.paramsUserId, 1)
        values.newMessageBody = ''
        if (!props.user) {
            props.getAllDialogsThunk()
            goBack()
        }
    }
    return (
        <Form
            initialValues={{
            }}
            onSubmit={values => {
                addNewMessage(values)
            }}
            validate={values => {
            }}>
            {({ handleSubmit, form }) => (
                <form className={styles.addMessage} onSubmit={handleSubmit} onKeyPress={(e) => (e.code === "Enter" ? handleSubmit : "")}>
                    <Field name="newMessageBody" autoFocus={true} className={styles.textarea} placeholder='Reply'>
                        {field => (
                            <textarea {...field.input} type="text" />
                        )}
                    </Field>
                    <MyButton className={styles.button}><img src={send} alt="" /></MyButton>
                </form>
            )}
        </Form>
    )
}
export default Message;