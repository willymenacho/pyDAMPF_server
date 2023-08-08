import React from 'react'
import { navigate } from 'gatsby'
import useUser from '../../hooks/useUser'
import LoadingComponent from '../StaticLoading'

const loginPath = '/account/login'
const homePath = '/account/my-algorithms'

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  console.log('on privateroute')
  const { user, isGuest, isLoading } = useUser()

  React.useEffect(() => {
    if (isGuest && location.pathname !== loginPath) {
      navigate(loginPath)
    } else if (user.id && location.pathname === loginPath) {
      navigate(homePath)
    }
  }, [user.id, location.pathname, isGuest])

  return isLoading ? <LoadingComponent fullscreen /> : <Component {...rest} />
}

export default PrivateRoute
