import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import User from "./User"
import style from "./style/searchBar.module.css"
export default function SearchBar() {
    const [list, setList] = useState([])
    const {data} = useOutletContext()
    const {friShips, requests, users, user} = data
    const frIds = friShips.map((fr) => user.id == fr.user_id ? fr.friend_id : fr.user_id)
    const receiverIds = requests.sent_requests.map((req) => req.receiver_id )
    const senderIds = requests.received_requests.map((req) => req.sender_id)
    const originList = users.filter((u) => u.id != user.id && !receiverIds.includes(u.id) && !senderIds.includes(u.id) && !frIds.includes(u.id))
    function search(e) {
        let newList = []
        if(e.target.value != "") {
            const query = e.target.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
            const pattern = new RegExp(query)
            newList = originList.filter((u) => {
                return pattern.test(u.name)})
        }
        setList(newList)
    }
    
    return(
        <div className={style.container}>
            <input type="search" onChange={search} placeholder="type a username" />
            <div className={style.list}>
                {list.map((u) => <User key={u.id} user={u} list={list} setList={setList} />)}
            </div>
        </div>
    )
}