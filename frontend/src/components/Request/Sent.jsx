import PropTypes from "prop-types"
import { useOutletContext } from "react-router-dom"
import axios from "axios"
import Error from "../Error"
import { useState } from "react"
import style from "./style/user.module.css"
export default function Sent({req}) {
    const {token, apiUrl} = useOutletContext()
    const [error, setError] = useState(null)
    function remove() {
        axios.delete(`${apiUrl}/friend_requests/${req.id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).catch((err) => {
            if(err.response) {
                setError(err.response.data.error)
            } else if(err.request) {
                setError(err.request)
            } else {
                setError(err.message)
            }
        })
    }
    return(
        <div key={req.id} className={style.container}>
            {error && <Error requestError={error} />}
            <div className={style.name}>{req.receiver.name}</div>
            <button type="button" onClick={remove}>Delete</button>
        </div>

    )
}
Sent.propTypes = {
    req: PropTypes.object.isRequired
}