import PropTypes from "prop-types"
import { useOutletContext } from "react-router-dom"
import axios from "axios"
import { useRef, useState } from "react"
import Error from "../Error"
import style from "./style/user.module.css"
export default function Received({req}) {
    const {apiUrl, token} = useOutletContext()
    const [error, setError] = useState(null)
    const formRef = useRef()
    async function accept() {
        const req1 = axios.delete(`${apiUrl}/friend_requests/${req.id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        const req2 = axios.post(`${apiUrl}/friendships`, formRef.current, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        try {
            await Promise.all([req1, req2])
            alert(`You just become friend with ${req.sender.name}`)
        } catch(err) {
            if(err.response) {
                setError(err.response.data.error)
            } else if(err.request) {
                setError(err.request)
            } else {
                setError(err.message)
            }
        }
    }
    function remove() {
        axios.delete(`${apiUrl}/friend_requests/${req.id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).catch((error) => {
            setError(error.response.data)
        })
    }
    return(
        <div key={req.id} className={style.container}>
            {error && <Error requestError={error} /> }
            <div className={style.name}>{req.sender.name}</div>
            <form ref={formRef}>
                <input type="hidden" name="friendship[friend_id]" value={req.sender_id} />
                <button type="button" onClick={accept}>Accept</button>
            </form>
            <button type="button" onClick={remove}>Delete</button>
        </div>
    )
}
Received.propTypes = {
    req: PropTypes.object.isRequired
}