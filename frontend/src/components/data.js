export function dataReducer(data, action) {
    switch(action.type) {
        case "all": {
            return(action.data)
        }
        
        case "chat": {
            switch(action.data.action) {
                case "delete": {
                    const newChs = data.chats.filter((chat) => chat.id != action.data.chat.id)
                    return({
                        ...data, 
                        chats: newChs
                    })
                } 
                case "new": {
                    const newChs = data.chats.concat([action.data.chat])
                    return({
                        ...data, 
                        chats: newChs
                    })
                }
                case "edit": {
                    const newChs = data.chats.map((chat) => {
                        if(chat.id == action.data.chat.id) {
                            return action.data.chat
                        } else {
                            return chat
                        }
                    })
                    return({
                        ...data, 
                        chats: newChs
                    })
                }
            }
            break 
        }
        case "req": {
            switch(action.data.action) {
                case "delete": {
                    switch(action.data.name) {
                        case "sent": {
                            const newReqs = data.requests.sent_requests.filter((req) => req.id != action.data.req.id)
                            return({
                                ...data, 
                                requests: {
                                    ...data.requests, 
                                    sent_requests: newReqs
                                }
                            })
                        }
                        case "received": {
                            const newReqs = data.requests.received_requests.filter((req) => req.id != action.data.req.id)
                            return({
                                ...data, 
                                requests: {
                                    ...data.requests, 
                                    received_requests: newReqs
                                }
                            })
                        }
                    }
                    break
                }
                case "new": {
                    switch(action.data.name) {
                        case "sent": {
                            const newReqs = data.requests.sent_requests.concat([action.data.req])
                            return({
                                ...data, 
                                requests: {
                                    ...data.requests, 
                                    sent_requests: newReqs
                                }
                            })
                        }
                        case "received": {
                            const newReqs = data.requests.received_requests.concat([action.data.req])
                            return({
                                ...data, 
                                requests: {
                                    ...data.requests, 
                                    received_requests: newReqs
                                }
                            })
                        }

                    }
                }
            }
            break
        }
        case "fs": {
            switch(action.data.action) {
                case "new": {
                    const newFss = data.friShips.concat([action.data.fs])
                    return({
                        ...data, 
                        friShips: newFss
                    })
                }
                case "delete": {

                    const newFss = data.friShips.filter((fs) => fs.id != action.data.fs.id)
                    return({
                        ...data, 
                        friShips: newFss
                    })
                }
            }
        }
    }
}
export function notiReducer(noti, action) {
    switch(action.type) {
        case "add": {
            switch(action.name) {
                case "fri": {
                    return({
                        ...noti, 
                        fri: noti.fri + 1
                    })
                }
                case "req": {
                    return({
                        ...noti,
                        request: noti.req + 1
                    })
                }
                case "chat": {
                    return({
                        ...noti, 
                        chat: noti.chat + 1
                    })
                }
            }
            break
        }
        case "erase": {
            switch(action.name) {
                case "fri": {
                    return({
                        ...noti, 
                        fri: 0
                    })
                }
                case "req": {
                    return({
                        ...noti, 
                        req: 0
                    })
                }
                case "chat": {
                    return({
                        ...noti, 
                        chat: 0
                    })
                }
            }
        }
    }
}