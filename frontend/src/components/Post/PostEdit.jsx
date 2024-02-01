import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import axios from 'axios'
import Error from '../Error'
import { useOutletContext } from 'react-router-dom'
import style from "./style/postEdit.module.css"
export default function PostEdit({post, setEditing, dispatch}) {
    const formRef = useRef(null)
    const {token, apiUrl} = useOutletContext()
    const [error, setError] = useState(null)
    const [content, setContent] = useState(post.content)
    
    function save() {
        axios.patch(`${apiUrl}/posts/${post.id}}`, formRef.current, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                if(response.status == 200) {
                    dispatch({type: 'edit', post: response.data})
                    setEditing(false)
                } else {
                    setError(response.data.error)
                }
            })
    }
    return(
        <div className={style.container}>
            { error && <Error requestError={error} />
            }
            <form ref={formRef}>
                <div className={style.content}>
                    <label htmlFor="content">Content</label>
                    <textarea name="post[content]" id="content" cols="25" rows="5" value={content} 
                        onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <div className={style.btnContainer}>
                    <button type='button' onClick={save}>Save</button>
                    <button type='button' onClick={() => setEditing(false) }>Cancel</button>
                </div>
            </form>
        </div>
    )
}
PostEdit.propTypes = {
    post: PropTypes.object.isRequired, 
    setEditing: PropTypes.func.isRequired, 
    dispatch: PropTypes.func.isRequired
}