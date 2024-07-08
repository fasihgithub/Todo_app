import { Navigate, Outlet} from "react-router-dom"

const PrivateComp = () => {
    const user = localStorage.getItem('User')
  return user ? <Outlet/> : <Navigate to='/' />
}

export default PrivateComp
