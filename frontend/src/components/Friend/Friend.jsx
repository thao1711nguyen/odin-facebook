import axios from "axios"
import PropTypes from "prop-types"
import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import Error from "../Error"
import style from "./style/friend.module.css"
export default function Friend({user, fs, list, setList}) {
    const [error, setError] = useState(null)
    const {token, apiUrl} = useOutletContext()
    const name = fs.username == user.name ? fs.friend_name : fs.username
    function remove() {
        axios.delete(`${apiUrl}/friendships/${fs.id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(() => {
            alert(`You just unfriend ${name}`)
            const newList = list.filter((fsh) => fsh.id != fs.id)
            setList(newList)
        }).catch((error) => {
            setError(error)
        })
    }
    return(
        <div className={style.container}>
            {error && <Error requestError={error} />}
            <div className={style.name}>{name}</div>
            <button type="button" onClick={remove}>Unfriend</button>
        </div>
    )
}

Friend.propTypes = {
    user: PropTypes.object.isRequired, 
    fs: PropTypes.object.isRequired, 
    list: PropTypes.array, 
    setList: PropTypes.func
}