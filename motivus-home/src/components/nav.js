import { Link } from 'gatsby'
import React from 'react'
import { Box, Fade } from '@material-ui/core'
import { homeRoutes } from './Routes'

import {
  navItemver,
  activeNavItemver,
  navver,
  navListver,
  navhor,
  navListhor,
  navLihor,
  navItemhor,
  activeNavItemhor,
} from '../styles/nav.module.css'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import ContactUsDrawer from './ContactUsDrawer'

const Nav = ({ openContact, setOpenContact, ...props }) => {
  const [checkedHorizontal, setcheckedHorizontal] = React.useState(true)

  useScrollPosition(
    ({ currPos }) => {
      const navRight = currPos.y < -10
      if (navRight) {
        setcheckedHorizontal(false)
      } else {
        setcheckedHorizontal(true)
      }
    },
    [checkedHorizontal],
  )

  const toggleDrawer = () => {
    setOpenContact(false)
  }

  const openDrawer = () => {
    setOpenContact(true)
  }

  return (
    <div>
      <Box width='100%' display='flex' height='150px' />
      <Fade in={!checkedHorizontal} timeout={500}>
        <nav className={navver}>
          <ul className={navListver}>
            {homeRoutes.map(({ name, route, partialy }) => (
              <li>
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
            <li>
              <div onClick={openDrawer} className={navItemver}>
                CONTACT US
              </div>
            </li>
          </ul>
        </nav>
      </Fade>
      <Fade in={checkedHorizontal} timeout={500}>
        <nav className={navhor}>
          <ul className={navListhor}>
            {homeRoutes.map(({ name, route, partialy }) => (
              <li className={navLihor}>
                <Link
                  className={navItemhor}
                  activeClassName={activeNavItemhor}
                  partiallyActive={partialy}
                  to={route}
                >
                  {name}
                </Link>
              </li>
            ))}
            <li className={navLihor}>
              <div onClick={openDrawer} className={navItemhor}>
                CONTACT US
              </div>
            </li>
          </ul>
        </nav>
      </Fade>
      <ContactUsDrawer
        open={openContact}
        onClose={toggleDrawer}
      ></ContactUsDrawer>
    </div>
  )
}
export default Nav
