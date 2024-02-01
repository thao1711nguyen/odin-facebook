import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import NewChat from "./NewChat"
import PropTypes from "prop-types"
import style from "./style/searchBar.module.css"
export default function SearchBar({setActiveCh}) {
    const {data} = useOutletContext()
    const {user} = data
    const {friShips, chats} = data
    const [list, setList] = useState([])
    
    const chNames = chats.map((chat) => chat.friendship.user.name == user.name ? chat.friendship.friend.name : chat.friendship.user.name)
    function filter(e) {
        const query = e.target.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        const pattern = new RegExp(`[${query}]`)
        const newList = friShips.filter((fs) => {
            const fname = fs.username == user.name ? fs.friend_name : fs.username 
            return pattern.test(fname) && !chNames.includes(fname)
        })
        setList(newList)
    }
    return(
        <div className={style.container}>
            <input type="search" onChange={filter} placeholder="type a friend's name" />
            <div className={style.list}>
                {list.map((fs) => <NewChat key={fs.id} fs={fs} user={user} setActiveCh={setActiveCh} />)}
            </div>
        </div>
    )
}
SearchBar.propTypes = {
    setActiveCh: PropTypes.func.isRequired,
}