import styles from "./Settings.module.css"
import { Form, Field } from 'react-final-form'
import back from "./../../img/back.png"
import { NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
import MyButton from "../UI/button/MyButton"

const Settings = (props) => {
    const setPhoto = (e) => {
        props.setPhotoThunk(e.target.files[0])
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.iconBack}>
                <NavLink to={`/profile/` + props.userId} >
                    <img src={back} alt="" />
                </NavLink>
                <p className={styles.title}>Settings</p>
            </div>
            <div className={styles.input}>
                <p className={styles.label}>Change photo</p>
                <div className={styles.inputBlock + " " + styles.inputPhoto}>
                    <img className={styles.myPhoto} src={props.myPhoto} alt="" />
                    <label htmlFor="myfile" className={styles.inputLabel}>Select photo</label>
                    <input type="file" className={styles.my} id="myfile" name={"photo"} onChange={setPhoto} multiple />
                </div>
            </div>
            <SettingsForm setUserDataThunk={props.setUserDataThunk} myProfile={props.myProfile} userId={props.userId} getProfileThunk={props.getProfileThunk} />
        </div>
    )

}
const MyField = ({ name, type, className, placeholder, textarea, onChange, ...props }) => {
    return (
        <Field name={name}>
            {field => (
                <div className={className}>
                    {textarea ? <textarea {...field.input} {...props} type={type} placeholder={placeholder} /> :
                        name !== 'lookingForAJob' ? <input {...field.input} {...props} type={type} placeholder={placeholder} /> :
                            <input {...field.input} {...props} type={type} placeholder={placeholder} onChange={onChange} />
                    }
                    {field.meta.touched && field.meta.error && (
                        <span className="error">{field.meta.error}</span>
                    )}
                </div>
            )}
        </Field>
    )
}

const SettingsForm = (props) => {
    const [checkboxValue, setCheckboxValue] = useState(props.myProfile.lookingForAJob)
    const navigate = useNavigate()
    const submit = (values) => {
        const aboutMe = props.myProfile.aboutMe !== "-" ? props.myProfile.aboutMe : "-";
        const valuesDescr = props.myProfile.lookingForAJobDescription !== "-" ? props.myProfile.lookingForAJobDescription : "-";
        let data = {
            userId: props.userId,
            aboutMe: values.aboutMe ? values.aboutMe : aboutMe,
            contacts: {
                facebook: values.facebook ? values.facebook : props.myProfile.contacts.facebook,
                github: values.github ? values.github : props.myProfile.contacts.github,
                instagram: values.instagram !== "" ? values.instagram : props.myProfile.contacts.instagram,
                mainLink: null,
                twitter: values.twitter ? values.twitter : props.myProfile.contacts.twitter,
                vk: values.vk ? values.vk : props.myProfile.contacts.vk,
                website: null,
                youtube: values.youtube ? values.youtube : props.myProfile.contacts.youtube
            },
            lookingForAJob: checkboxValue,
            lookingForAJobDescription: values.lookingForAJobDescription ? values.lookingForAJobDescription : valuesDescr,
            fullName: values.fullName ? values.fullName : props.myProfile.fullName
        }
        props.setUserDataThunk(data)
        props.getProfileThunk(props.userId)
        navigate(-1)

    }
    let myArr = Object.entries(props.myProfile);
    let myArr2 = Object.entries(props.myProfile.contacts)
    return (
        <>
            <Form
                initialValues={{
                }}
                onSubmit={values => {
                    submit(values)
                }}
                validate={values => {
                }}>
                {({ handleSubmit, form }) => (
                    <form className={styles.main} onSubmit={handleSubmit}>
                        {myArr.map(elem => {
                            if (elem[0] === 'contacts') {
                                return null
                            }
                            else if (elem[0] === 'photos' || elem[0] === 'userId') {
                                return null
                            }
                            else if (elem[0] === 'lookingForAJobDescription') {
                                return (
                                    <div className={styles.input}>
                                        <p className={styles.label}>{elem[0].replace(/([A-Z])/g, ' $1')}</p>
                                        <MyField name={elem[0]} className={styles.inputBlock} textarea={true} type="password" placeholder={elem[1]} />
                                    </div>
                                )
                            }
                            else if (elem[0] === 'aboutMe') {
                                return (
                                    <div className={styles.input}>
                                        <p className={styles.label}>{elem[0].replace(/([A-Z])/g, ' $1')}</p>
                                        <MyField name={elem[0]} className={styles.inputBlock} textarea={true} type="text" placeholder={elem[1]} />
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div className={styles.input}>
                                        <p className={styles.label}>{elem[0].replace(/([A-Z])/g, ' $1')}</p>
                                        {elem[0] === 'lookingForAJob' ?
                                            <MyField name={elem[0]} className={styles.checkbox} type="checkbox" onChange={e => setCheckboxValue(!checkboxValue)} checked={checkboxValue} />
                                            : <MyField name={elem[0]} className={styles.inputBlock} type="text" placeholder={elem[1]} />
                                        }
                                    </div>
                                )
                            }
                        })}
                        {myArr2.map(elem => {
                            if (elem[0] === "website" || elem[0] === "mainLink") {
                                return null
                            }
                            else {
                                return (
                                    <div className={styles.input}>
                                        <p className={styles.label}>{elem[0]}</p>
                                        <MyField name={elem[0]} className={styles.inputBlock} type="text" placeholder={elem[1]} />
                                    </div>
                                )
                            }
                        })}
                        <div className={styles.login}>
                            <MyButton className={styles.button}>Save</MyButton>
                        </div>
                    </form>
                )}
            </Form>
        </>
    )
}


export default Settings;