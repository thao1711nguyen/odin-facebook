import axios from "axios"
import PropTypes from "prop-types"
import { useRef, useState } from "react"
import { useOutletContext } from "react-router-dom"
import Error from "../Error"
import style from "./style/user.module.css"
export default function User({user, list, setList}) {
    const {token, data, apiUrl} = useOutletContext()
    const [error, setError] = useState(null)
    const formRef = useRef()
    const curU = data.user
    function add() {
        axios.post(`${apiUrl}/friend_requests`, formRef.current, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(() => {
            alert(`You just sent ${user.name} a friend request!`)
            const newList = list.filter((u) => u.id != user.id)
            setList(newList)
        }).catch((error) => {
            setError(error)
        })
    }
    return(
        <div className={style.container}>
            {error && <Error requestError={error} />}
            <div className={style.name}>{user.name}</div>
            <form ref={formRef}>
                <input type="hidden" name="friend_request[sender_id]" value={curU.id} />
                <input type="hidden" name="friend_request[receiver_id]" value={user.id} />
                <button type="button" onClick={add}>add</button>
            </form>
        </div>
    )
}
User.propTypes = {
    user: PropTypes.object.isRequired, 
    list: PropTypes.array.isRequired, 
    setList: PropTypes.func.isRequired
}