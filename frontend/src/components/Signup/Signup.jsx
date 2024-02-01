import { Link, Form, useNavigate } from "react-router-dom"
import style from './signup.module.css'
import { useRef, useState } from "react"
import axios from "axios"
import Error from "../Error"
export default function Signup() {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [passwordConfirm, setPasswordConfirm] = useState(null)
    const [error, setError] = useState(null)
    const formRef = useRef(null)
    const navigate = useNavigate()
    const img = "https://images.unsplash.com/photo-1705960467825-5420aa333231?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    function confirmPassword() {
        if(password !== passwordConfirm) {
            setError('password confirmation does not match!')
        } else {
            return true
        }

    }
    function submit(e) {
        e.preventDefault()
        if(confirmPassword()) {
            const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;
            axios.post(`${apiUrl}/users`, formRef.current) 
                .then((response) => {
                    if(response.status == 201) {
                        navigate("/login")
                    } else if (response.data.error) {
                        setUsername('')
                        setPassword('')
                        setPasswordConfirm('')
                        setError(response.data.error)
                    }
                })
                .catch((err) => {
                    setError(err.response.data)
                })
        } 
    }
    return(
        <div className={style.container}>
            <div className={style.leftContainer}>
                <img src={img}/>
            </div>
            <div className={style.rightContainer}>
                <h2>Sign up</h2>
                { error && <Error requestError={error} />}
                <Form ref={formRef} method="post" className={style.form}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="user[name]" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="user[password]" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password-confirmation">Password confirmation</label>
                        <input type="password" id="password-confirmation" value={passwordConfirm} name="user[password_confirmation]" onChange={(e) => setPasswordConfirm(e.target.value)}/>
                    </div>
                    <button className={style.button} onClick={submit}>Submit</button>
                </Form>
                <p>Already had an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}

