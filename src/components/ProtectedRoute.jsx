import { Navigate } from "react-router-dom"

const ProtectedRouteElement = ({element: Component, ...props})=>{
  {console.log('lalal', Element)}
  return  (
    props.loggedIn ? <Component {...props}/> : <Navigate to='/sign-in' replace/>
  )
}

export default ProtectedRouteElement