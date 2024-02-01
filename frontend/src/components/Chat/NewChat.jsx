import PropTypes from "prop-types"
import { useRef, useState } from "react"
import { useOutletContext } from "react-router-dom"
import axios from "axios"
import Error from "../Error"
import style from "./style/newChat.module.css"
export default function NewChat({fs, user, setActiveCh}) {
    const {apiUrl, token} = useOutletContext()
    const formRef = useRef()
    const [error, setError] = useState(null)
    const fname = fs.username == user.name ? fs.friend_name : fs.username
    const fId = fs.user_id == user.id ? fs.friend_id : fs.user_id
    function create() {
        axios.post(`${apiUrl}/chats`, formRef.current, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            setActiveCh(res.data.id)
        }).catch((error) => {
            setError(error.response.data.error)
        })
    }
    return(
        <div className={style.container}>
            {error && <Error requestError = {error} />}
            <form ref={formRef}>
                <input type="hidden" name="chat[friend_id]" value={fId} />
                <button type="button" onClick={create}>{fname}</button>
            </form>
        </div>
        )

}
NewChat.propTypes = {
    fs: PropTypes.object.isRequired, 
    user: PropTypes.object.isRequired, 
    setActiveCh: PropTypes.func.isRequired, 
}
