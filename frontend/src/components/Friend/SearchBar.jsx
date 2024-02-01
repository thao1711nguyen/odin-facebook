import PropTypes from "prop-types"
// eslint-disable-next-line no-unused-vars
import style from "./style/searchBar.module.css"
export default function SearchBar({friShips, user, setList}) {
 
    function search(e) {
        const query = e.target.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        const pattern = new RegExp(`[${query}]`)
        const newList = friShips.filter((fs) => {
            const name = fs.username == user.name ? fs.friend_name : fs.username
            return pattern.test(name)
        })
        setList(newList)
    }
    return(
        <div>
            <input type="search" placeholder="type friend's name" onChange={search}/>
        </div>
    )
}

SearchBar.propTypes = {
    friShips: PropTypes.array.isRequired, 
    user: PropTypes.object.isRequired, 
    setList: PropTypes.func.isRequired
}