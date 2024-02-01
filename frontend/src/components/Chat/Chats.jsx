import { useOutletContext } from "react-router-dom"
import Messages from "./Message/Messages"
import { useState } from "react"
import SearchBar from "./SearchBar"
import style from "./style/chats.module.css"
export default function Chats() {
    const [activeCh, setActiveCh] = useState(null)
    const {data} = useOutletContext()
    const {chats, user} = data
    function setChat(chat) {
        setActiveCh(chat.id)
    }
    function find() {
        setActiveCh(null)
    }
    return(
        <div className={style.container}>
            <div className={style.btnContainer}>
                <button type="button" onClick={find} className={style.createBtn}>Create</button>
                {chats && 
                    <div>
                        {chats.map((chat) => {
                            const name = chat.friendship.user.name == user.name ? chat.friendship.friend.name : chat.friendship.user.name
                            return(
                                <button key={chat.id} type="button" onClick={() => setChat(chat)}>{name}</button>
                            )})
                        }

                    </div>
                }

            </div>
            {activeCh && <Messages chatId={activeCh} setActiveCh={setActiveCh} />}
            {!activeCh && <SearchBar setActiveCh={setActiveCh} />}
        </div>
    )
}