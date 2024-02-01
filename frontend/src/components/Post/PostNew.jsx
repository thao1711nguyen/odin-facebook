import axios from 'axios'
import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Error from '../Error'
import style from "./style/postNew.module.css"
export default function PostNew({setCreating, dispatch}) {
    const {apiUrl, token} = useOutletContext()
    const formRef = useRef()
    const [error, setError] = useState(null)
    function savePost() {
        axios.post(`${apiUrl}/posts`, formRef.current, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if(response.status == 201) {
                setCreating(false)
                dispatch({type: 'new', post: response.data})
                
            } else {
                setError(response.data.error)
            }
        })
    }
    return(
        <div className={style.container}>
            {error && <Error requestError={error} />}
            <form ref={formRef}>
                <textarea name="post[content]" cols="25" rows="5" placeholder="What's on your mind?"></textarea>
                <div className={style.btnContainer}>
                    <button type='button' onClick={savePost}>Save</button>
                    <button type='button' onClick={() => setCreating(false)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

PostNew.propTypes = {
    setCreating: PropTypes.func.isRequired, 
    dispatch: PropTypes.func.isRequired, 
}