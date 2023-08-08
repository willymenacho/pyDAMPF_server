import React, { useState, useContext } from 'react'
import { User } from '../models'
import axios from 'axios'
import UserContext from '../contexts/User'

function useUser() {
  const { user, setUser } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(!user.id)
  const [isGuest, setIsGuest] = useState(false)

  const getUserFromToken = async (token) => {
    try {
      console.log('useuser_token', token)
      axios.defaults.headers.common = {
        Authorization: `Bearer ${token}`,
      }
      const user_ = await User.current(token)
      if (user_) {
        setUser(user_)
        window.localStorage.setItem('user_data', JSON.stringify(user_))
        setIsGuest(false)
      } else {
        setIsGuest(true)
      }
    } catch (e) {
      delete axios.defaults.headers.common['Authorization']
      window.localStorage.removeItem('token')
      setIsGuest(true)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    if (!user.id) {
      const token = window.localStorage.getItem('token')
      if (token) {
        getUserFromToken(token)
      } else {
        setIsLoading(false)
        setIsGuest(true)
      }
    }
  }, [user.id])

  return { user, isLoading, isGuest, setUser }
}

export default useUser
