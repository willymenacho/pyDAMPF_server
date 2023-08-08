import React from 'react'

import { Link } from 'gatsby'
import {
  nav,
  navList,
  navItemver,
  activeNavItemver,
} from '../../styles/clientNav.module.css'

import { accountRoutes } from '../Routes'

export default function Nav() {
  return (
    <nav className={nav}>
      <ul className={navList}>
        {accountRoutes.map(({ name, route, partialy }) => (
          <li key={`mobile-route-${route}`}>
            <Link
              className={navItemver}
              activeClassName={activeNavItemver}
              partiallyActive={partialy}
              to={route}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
