import { useRouteError } from "react-router-dom";
import PropTypes from 'prop-types'
export default function Error({requestError}) {
    const routeError = useRouteError()
    let eErrors = []
    if(typeof(requestError) == "object") {
      for(let key in requestError) {
        eErrors.push(`${key} ${requestError[key]}`)
      }
    }
    console.log("request error: ")
    console.log(requestError)
    console.log("route error: ")
    console.log(routeError)
    return (
        <div id="error-page">
          <h3>Oops!</h3>
          <p>Sorry, an unexpected error has occurred.</p>
          {routeError &&
            <p>
            <i>{routeError.statusText || routeError.message}</i>
            </p>
          }
          {requestError && typeof(requestError) == "string" && <p>{requestError}</p> }
          {requestError && Array.isArray(requestError) && requestError.map((e, idx) => <p key={idx}>{e}</p> )} 
          {eErrors.map((e, idx) => <p key={idx}>{e}</p>) }
          
        </div>
        )

}
Error.propTypes = {
  requestError: PropTypes.oneOfType([
    PropTypes.string, 
    PropTypes.array
  ])
}

Error.defaultProps = {
  requestError: null
}