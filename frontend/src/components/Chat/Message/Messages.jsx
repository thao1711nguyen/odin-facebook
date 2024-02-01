import PropTypes from "prop-types"
import { useOutletContext } from "react-router-dom"
import axios from "axios"
import { useRef, useState } from "react"
import Error from "../../Error"
import style from "../style/messages.module.css"
export default function Messages({chatId}) {
    const [error, setError] = useState(null)
    const {apiUrl, token, data} = useOutletContext()
    const [content, setContent] = useState("")
    const formRef = useRef()
    const {user, chats} = data
    const chat = chats.find((chat) => chat.id == chatId)
    function remove() {
        axios.delete(`${apiUrl}/chats/${chat.id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).catch((error) => {
            setError(error)
        })
    }
    function send() {
        axios.post(`${apiUrl}/chats/${chat.id}/messages`, formRef.current, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(() => {
            setContent("")
        }).catch((error) => {
            setError(error.response.data.error)
        })
    }
    return(
        <div className={style.container}>
            {chat && 
                <div className={style.smallContainer}>
                    <button className={style.deleteBtn} type="button" onClick={remove}>Delete</button>
                    {error && <Error requestError={error} />}
                    <div className={style.messContainer}>
                        {chat && chat.messages && 
                            <div className={style.messages}>
                                {chat.messages.map((mess, idx) => {
                                    return(
                                        <div key={mess.id} className={style.message}>
                                            {(idx == 0 || (idx > 0 && chat.messages[idx-1].sender_id != mess.sender_id)) &&
                                                <div className={style.sender}>{mess.sender.name}:</div>
                                            }
                                            <div className={style.content}>{mess.content}</div>
                                        </div>
                                    )})}
                            </div>
                        }
                        
                        <form ref={formRef} className={style.incomingMess}>
                            <input type="hidden" name="message[sender_id]" value={user.id} />
                            <input type="hidden" name="message[receiver_id]" value={user.id == chat.friendship.user_id ? chat.friendship.friend_id : chat.friendship.user_id} />
                            <textarea cols="27" rows="3" name="message[content]" value={content} onChange={(e) => setContent(e.target.value)} onKeyDown={(e) => {
                                if(e.key == "Enter") {
                                    e.preventDefault()
                                    send()
                                }
                            }}></textarea>
                            
                            <button className={style.sendBtn} onClick={send} type="button">Send</button>
                        </form>
                    </div>

                </div>
            }
        </div>
    )
}

Messages.propTypes = {
    chatId: PropTypes.number.isRequired, 
}