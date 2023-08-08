import React from 'react'
import { Redirect, Router } from '@reach/router'
import DarkTheme from '../layouts/DarkTheme'

import Login from '../components/account/login'
import Dashboard from '../components/account/dashboard'
import Documentation from '../components/account/documentation'
import Marketplace from '../components/account/marketplace'
import MyAlgorithms from '../components/account/my-algorithms'
import NewAlgorithm from '../components/account/new-algorithm'
import EditAlgorithm from '../components/account/edit-algorithm'
import News from '../components/account/news'
import Settings from '../components/account/settings'
import Wallet from '../components/account/wallet'
import User from '../contexts/User'
import PrivateRoute from '../components/account/PrivateRoute'
import { navigate } from 'gatsby'
import { SnackbarProvider } from 'notistack'
import Algorithm from '../templates/algorithm'

function App() {
  const [user, setUser] = React.useState({})

  return (
    <DarkTheme>
      <SnackbarProvider
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        //classes={{ variantInfo: { backgroundColor: theme.palette.primary.main } }}
      >
        <User.Provider value={{ user, setUser }}>
          <Router>
            <PrivateRoute component={Login} path='/account/login' />
            <PrivateRoute component={Dashboard} path='/account/dashboard' />
            <PrivateRoute
              component={Documentation}
              path='/account/documentation'
            />
            <PrivateRoute component={Marketplace} path='/account/marketplace' />
            <PrivateRoute
              component={Algorithm}
              path='/account/marketplace/:name'
            />
            <PrivateRoute
              component={MyAlgorithms}
              path='/account/my-algorithms'
            />
            <PrivateRoute
              component={NewAlgorithm}
              path='/account/my-algorithms/new'
            />
            <PrivateRoute
              component={EditAlgorithm}
              path='/account/my-algorithms/edit/:id'
            />
            <PrivateRoute component={News} path='/account/news' />
            <PrivateRoute component={Settings} path='/account/settings' />
            <PrivateRoute component={Wallet} path='/account/wallet' />

            <PrivateRoute
              component={() => {
                navigate('/account/login')
                return null
              }}
              path='/account'
              exact
            />
          </Router>
        </User.Provider>
      </SnackbarProvider>
    </DarkTheme>
  )
}

export default App
