import PropTypes from 'prop-types'
import {useState } from 'react'
import PostEdit from './PostEdit'
import axios from 'axios'
import Error from '../Error'
import style from "./style/post.module.css"
import { useOutletContext } from 'react-router-dom'
import { parseJSON, format } from 'date-fns'
export default function Post({post, dispatch}) {
    const [editing, setEditing] = useState(false)
    const {token, apiUrl, data} = useOutletContext()
    const [error, setError] = useState(null)
    const {user} = data
    const convDate = format(parseJSON(post.created_at), "dd/MM/yyyy hh:mma")
    function remove() {
        axios.delete(`${apiUrl}/posts/${post.id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            if(response.status == 200) {
                dispatch({type: 'delete', id: post.id})
            } else {
                setError(response.data.error)
            }
        })
    }
    return(
        <div>
            { error && <Error requestError={error} /> }
            {!editing && 
                <div>
                    <div>
                        <p className={style.author}>Author: {post.user.name}</p>
                        <p className={style.date}>{convDate}</p>
                        <p className={style.content}>{post.content}</p>
                    </div>
                    {user.id == post.user_id && 
                        <div>
                            <button type="button" onClick={() => setEditing(true) }>Edit</button>
                            <button type="button" onClick={remove} >Delete</button>
                        </div>
                    }
                </div> }
            { editing && <PostEdit post={post} dispatch={dispatch} setEditing={setEditing} />}
        </div>
    )
}
Post.propTypes = {
    post: PropTypes.object.isRequired, 
    dispatch: PropTypes.func.isRequired, 
}