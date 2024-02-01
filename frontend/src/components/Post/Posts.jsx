import { useEffect, useReducer, useState } from "react"
import axios from "axios"
import Post from "./Post"
import Error from "../Error"
import { useOutletContext } from "react-router-dom"
import PostNew from "./PostNew"
import style from "./style/posts.module.css"

function reducer(posts, action) {
    switch(action.type) {
        case 'load posts': {
            return(action.posts)
        }
        case 'new': {
            return([
                ...posts, 
                action.post
            ])
        }
        case 'edit': {
            const newPosts = posts.map((post) => {
                if(post.id == action.post.id) {
                    return action.post
                } else {
                    return post
                }
            })
            return(newPosts)
        }
        case 'delete': {
            const newPosts = posts.filter((post) => post.id != action.id)
            return(newPosts)
        }
    }
}

export default function Posts() {
    const [isLoading, setIsLoading] = useState(true)
    const {token, apiUrl} = useOutletContext()
    const [error, setError] = useState(null)
    const [creating, setCreating] = useState(false)
    const [posts, dispatch] = useReducer(reducer, [])

    useEffect(() => {
        axios.get(`${apiUrl}/posts`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                if(response.status == 200) {
                    dispatch({type: 'load posts', posts: response.data})
                } else {
                    setError(response.data.error)
                }
            }).finally(() => setIsLoading(false))
    }, [apiUrl, token])
   
    return(
        <div className={style.bigContainer}>
            <div className={style.smallContainer}>
                { isLoading && <>...Loading</>  }
                {error && <Error requestError={error} />}
                <button type="button" onClick={() => setCreating(true)}>Create post</button>
                {creating && <PostNew setCreating={setCreating} dispatch={dispatch} />}
                {posts.map((post) => <Post post={post} key={post.id} dispatch={dispatch} />)}
            </div>
        </div>
    )
}