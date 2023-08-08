import React from 'react'
import { navigate } from 'gatsby-link'
import withLocation from '../hoc/withLocation'

const isBrowser = typeof window !== 'undefined'

function Auth({ search }) {
  console.log('auth token setting', search.token)
  if (isBrowser) {
    window.localStorage.setItem('token', search.token)
    navigate('/account/login')
  }
  return <React.Fragment>Please wait</React.Fragment>
}

export default withLocation(Auth)
