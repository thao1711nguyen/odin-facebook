import { Link, Form, useNavigate, useOutletContext } from "react-router-dom"
import style from './login.module.css'
import { useState, useRef} from "react"
import axios from "axios"
import Error from "../Error"


export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {setToken} = useOutletContext()
    const [error, setError] = useState(null)
    const formRef = useRef(null)
    const navigate = useNavigate()
    const img = "https://plus.unsplash.com/premium_photo-1666787742869-54bd5c564d47?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    function login(e) {
        e.preventDefault()
        // send data to the backend 
        // parse the response and then redirect to approriate page
        const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;
        axios.post(`${apiUrl}/login`, formRef.current) 
            .then((response) => {
                localStorage.setItem('token', response.data.token)
                setToken(response.data.token)
                navigate("/")
            }).catch((error) => {
                setUsername("")
                setPassword("")
                if(error.response.status == 401) {
                    setError("Incorrect username or password, please try again!")
                } else {
                    setError(error.response.data.error)
                }
            })
            
    }



    return(
        <div className={style.container}>
            
            <div className={style.leftContainer}>
                <img src={img} />
            </div>
            <div className={style.rightContainer}>
                <h2>Login</h2>
                { error && <Error requestError={error}/>}
                <Form method="post" className={style.form} ref={formRef} >
                    <div>
                        <label htmlFor="username">Username</label>
                        <input name="user[name]" type="text" value={username} id="username" onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input name="user[password]" type="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button onClick={login} className={style.button}>Submit</button>
                </Form>
                <p>Do not have an account yet? <Link to="/signup">Sign up</Link></p>
            </div>

        </div>
    )
}

