import { useState } from "react"
import { useOutletContext, Navigate } from "react-router-dom"
import Friend from "./Friend"
import SearchBar from "./SearchBar"
import style from "./style/friends.module.css"
export default function Friends() {
    const [action, setAction] = useState(null)
    const [list, setList] = useState([])
    const {data, token} = useOutletContext()
    const {friShips, user} = data
    return(
        <>
            {!token && <Navigate to="/login" replace={true} />}
            <div className={style.container}>
            <div className={style.btnContainer}>
                <button type="button" onClick={() => setAction("all")}>All friends</button>
                <button type="button" onClick={() => setAction("find")}>Find</button>
            </div>
            <div className={style.content}>
                {action == "all" && 
                    <div className={style.fs}>
                        {friShips.map((fs) => <Friend key={fs.id} fs={fs} user={user}  />)}
                    </div>
                }
                {action == "find" && 
                    <div className={style.search}>
                        <SearchBar friShips={friShips} user={user} setList={setList}/>
                        <div className={style.friendList}>
                            {list.map((fs) => <Friend key={fs.id} user={user} fs={fs} list={list} setList={setList} />)}
                        </div>
                    </div>
                }
            </div>
        </div>
        </>
        
    )
}