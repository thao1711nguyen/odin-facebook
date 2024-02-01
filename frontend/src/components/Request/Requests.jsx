import { useState } from "react"
import {useOutletContext } from "react-router-dom"
import Sent from "./Sent"
import Received from "./Received"
import SearchBar from "./SearchBar"
import style from "./style/requests.module.css"
export default function Requests() {
    const [action, setAction] = useState(null)
    const {data} = useOutletContext()
    const sents = data.requests.sent_requests
    const receiveds = data.requests.received_requests
    return(
        <div className={style.container}>
            <div className={style.btnContainer}> 
                <button type="button" onClick={() => setAction("add")}>Add</button>
                <button type="button" onClick={() => setAction("sent")}>Sent requests</button>
                <button type="button" onClick={() => setAction("received")}>Received requests</button>

            </div>
            {action == "add" && <SearchBar />}
            {action == "sent" && 
                <div className={style.sent}>
                    {sents.map((req) => <Sent key={req.id} req={req} />)}
                </div>
            }
            {action == "received" && 
                <div className={style.received}>
                    {receiveds.map((req) => <Received key={req.id} req={req}/>)}
                </div>
            }
        </div>
    )
}