import { Navigate } from "react-router-dom"

const ProtectedRouteElement = ({element: Component, ...props}) => {
  console.log('props', props);
  console.log('hui', Component);
  return (
    props.loggedIn ? <Component {...props}/> : <Navigate to="/sign-in" replace/>
  )
}

export default ProtectedRouteElement