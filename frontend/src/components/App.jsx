import { Outlet, Link, useNavigate } from "react-router-dom"
import { useEffect, useReducer, useState } from "react"
import {dataReducer} from "./data"
import axios from "axios"
import ActionCable from "actioncable"
import style from "./app.module.css"
export default function App() {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [data, dispatch] = useReducer(dataReducer, {user: {}, users: [], friShips: [], chats: [], requests: []})
    // const [noti, notiDispatch] = useReducer(notiReducer, {fri: 0, req: 0, chat: 0})
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL
    const wsUrl = import.meta.env.VITE_REACT_APP_WS_BASE_URL
    useEffect(() => {
        
        async function request() {
            const userReq = axios.get(`${apiUrl}/user`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const usersReq = axios.get(`${apiUrl}/users`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const friReq = axios.get(`${apiUrl}/friendships`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })  
            const chatsReq = axios.get(`${apiUrl}/chats`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })  
            const reqReq = axios.get(`${apiUrl}/friend_requests`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }) 
            
            
            try {
                const responses = await Promise.all([userReq, usersReq, friReq, chatsReq, reqReq])
                dispatch({
                    type: "all", 
                    data: {
                        user: responses[0].data, 
                        users: responses[1].data, 
                        friShips: responses[2].data, 
                        chats: responses[3].data, 
                        requests: responses[4].data
                    }
                })
            } catch(error) {
                if(error.response.status == 401) {
                    localStorage.removeItem("token")
                    setToken(null)
                    navigate("/login")
                } else {
                    console.log(error)
                }
            }

        }
        request()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])
    
    useEffect(() => {
        if(data.user) {
            const consumer = ActionCable.createConsumer(`${wsUrl}?token=${token}`)
            consumer.subscriptions.create({channel: "RequestsChannel", user: data.user.id}, {
                connected(){
                }, 
                disconnected(){
                }, 
                received(data) {
                    console.log(data)
                    dispatch({
                        type: "req", 
                        data: data
                    })
                    // notiDispatch({
                    //     type: "add", 
                    //     name: "req"
                    // })
                }
            })
            consumer.subscriptions.create({channel: "FriendshipsChannel", user: data.user.id}, {
                connected(){

                }, 
                disconnected(){

                }, 
                received(data) {
                    console.log(data)
                    dispatch({
                        type: "fs", 
                        data: data
                    })
                    // notiDispatch({
                    //     type: "add", 
                    //     name: "fri"
                    // })
                }
            })
            consumer.subscriptions.create({channel: "ChatsChannel", user: data.user.id}, {
                connected(){

                }, 
                disconnected(){
                }, 
                received(data) {
                    console.log(data)
                    dispatch({
                        type: "chat", 
                        data: data
                    })
                    // notiDispatch({
                    //     type: "add", 
                    //     name: "chat"
                    // })
                }
            })
            return(() => {
                consumer.disconnect()
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.user])

    function logout() {
        axios.delete(`${apiUrl}/logout`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(() => {
            localStorage.removeItem("token")
            setToken(null)
            alert("You just logged out")
            navigate("/login")
        }).catch((error) => console.log(error))
    }
    return(
        <div className={style.container}>
            <div className={style.title}>
                <h1>Mini Facebook</h1>

            </div>
            { token &&
                <div className={style.btnContainer}>
                    
                    <nav className={style.nav}>
                        <div>
                            <Link to="posts" className={style.link}>Posts</Link>
                        </div>
                        <div>
                            <Link to="friends" className={style.link}>Friends</Link>

                        </div>
                        <div>
                            <Link to="requests" className={style.link}>Friend requests</Link>

                        </div>
                        <div>
                            <Link to="chats" className={style.link}>Chats</Link>
                        </div>
                    </nav>
                    <div className={style.greet}>
                        {data.user && <p>Hello, {data.user.name}</p> }
                        <button type="button" onClick={logout}>Logout</button>
                    </div>

                </div>
            }
            <div id="content" className={style.childContainer}>
                <Outlet context={{data: data, token: token, setToken: setToken, apiUrl: apiUrl}}/>
            </div>
        </div>
                
            
    )
}