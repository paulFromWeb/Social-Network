import styles from "./Login.module.css"
import username from "../../img/username.png"
import password from "../../img/password.png"
import { Form, Field } from 'react-final-form'
import MyButton from "../UI/button/MyButton"
import React from "react"


const Login = ({ loginAPIThunk }) => {
    return (
        <div className={styles.wrapper}>
            <p>Login</p>
            <LoginForm loginAPIThunk={loginAPIThunk} />
            <div className={styles.info}>
                <div>Don't have account? <span>SIGN UP</span></div>
            </div>
        </div>
    )
}

const MyField = ({ name, img, type, text, className, span }) => {
    return (
        <Field name={name}>
            {field => (
                <div className={className}>
                    <img src={img} alt="" />
                    {span ? <span> <input {...field.input} type={type} />{text}</span> :
                        <input {...field.input} type={type} />
                    }
                    {field.meta.touched && field.meta.error && (
                        <span className="error">{field.meta.error}</span>
                    )}
                </div>
            )}
        </Field>
    )
}

const LoginForm = (props) => {
    const submit = (values) => {
        props.loginAPIThunk(values.email, values.password, values.rememberMe)
    }
    return (
        <Form
            initialValues={{
            }}
            onSubmit={values => {
                submit(values)
            }}>
            {({ handleSubmit, form }) => (
                <form className={styles.main} onSubmit={handleSubmit}>
                    <div className={styles.input}>
                        <p className={styles.label}>Username</p>
                        <MyField name="email" img={username} type={"text"} className={styles.inputBlock}></MyField>
                    </div>
                    <div className={styles.input}>
                        <p className={styles.label}>Password</p>
                        <MyField name="password" img={password} type={"password"} className={styles.inputBlock}></MyField>
                    </div>
                    <MyField name="rememberMe" className={styles.checkbox} img={null} type={"checkbox"} text="Remember me" span={true}></MyField>
                    <div className={styles.login}>
                        <MyButton className={styles.button}>Log in</MyButton>
                    </div>
                </form>
            )}
        </Form>
    )
}
export default Login;