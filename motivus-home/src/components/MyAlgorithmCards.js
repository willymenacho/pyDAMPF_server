import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import EditIcon from '@material-ui/icons/Edit'
import LinkIcon from '@material-ui/icons/Link'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import IconButton from '@material-ui/core/IconButton'
import { motion } from 'framer-motion'
import { navigate } from 'gatsby-link'
import PublicIcon from '@material-ui/icons/Public'
import Tooltip from '@material-ui/core/Tooltip'
import LockIcon from '@material-ui/icons/Lock'

const useStyles = makeStyles((theme) => ({
  backgroundDark: {
    background:
      'linear-gradient(-90deg, rgba(38,93,237,1) 0%, rgba(245,78,221,1) 100%)',
  },

  backgroundLight: {
    background:
      'linear-gradient(-90deg, rgba(93,37,202,1) 0%, rgba(231,51,255,1) 100%)',
  },

  root: {
    backgroundColor: theme.palette.background.default,
    cursor: 'pointer',
    transition: 'height 1s ease-in',
  },

  info: {
    fontFamily: 'Roboto Mono',
  },

  separate: {
    borderColor: theme.palette.secondary.main,
    borderLeft: '4px solid',
  },

  publicOrPrivate: {
    fontFamily: 'Roboto Mono',
    fontWeight: '400',
    fontStyle: 'normal',
    textTransform: 'uppercase',
    color: theme.palette.secondary.main,
  },
  stars: {
    fontFamily: 'Roboto Mono',
    fontWeight: 'bold',
  },
  icon: {
    fill: theme.palette.calypso.main,
  },
}))

export default function AlgorithmCards({
  name,
  abstract,
  variant,
  id,
  is_public,
  role,
}) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const dark = theme.palette.type
  const [viewStats, setViewStats] = useState(false)

  return (
    <React.Fragment>
      <Box
        className={
          dark === 'dark' ? classes.backgroundDark : classes.backgroundLight
        }
        display='flex'
        justifyContent='center'
        alignItems='center'
        paddingLeft='1px'
        paddingRight='1px'
        paddingTop='1px'
        paddingBottom='1px'
        marginBottom='30px'
      >
        <Box
          width='100%'
          display='flex'
          flexDirection='column'
          padding='10px'
          justifyContent='space-between'
          className={classes.root}
        >
          <Box
            display='flex'
            flexDirection={matches ? 'row' : 'column-reverse'}
            justifyContent={matches ? 'space-between' : 'flex-start'}
            width='100%'
            //border='1px solid green'
          >
            <Box display='flex'>
              <Box
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
                //border='1px solid blue'
              >
                <Box display='flex' flexDirection='row' alignItems='center'>
                  <Typography variant='h5'>{name} </Typography>
                  &nbsp;
                  <Tooltip
                    title={is_public ? 'Public' : 'Private'}
                    aria-label={is_public ? 'Public' : 'Private'}
                    placement='right'
                  >
                    {is_public ? (
                      <PublicIcon color='primary' />
                    ) : (
                      <LockIcon color='primary' />
                    )}
                  </Tooltip>
                </Box>
                <Box
                  display='flex'
                  flexDirection='row'
                  className={classes.separate}
                  pl='6px'
                  ml='4px'
                >
                  <Box display='flex' flexDirection='column'>
                    <Typography variant='body'>{abstract}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              display='flex'
              flexDirection={matches ? 'column' : 'row'}
              justifyContent='center'
              alignItems='flex-end'
              mb='5px'
              //border='1px solid green'
            >
              <Typography variant='h5' className={classes.publicOrPrivate}>
                {role}
              </Typography>
              <Box
                display='flex'
                flexDirection='row'
                justifyContent='flex-end'
                //border='1px solid red'
                width='100%'
              >
                <IconButton
                  size='small'
                  aria-label='view stats'
                  onClick={() => setViewStats(!viewStats)}
                >
                  <ShowChartIcon className={classes.icon} />
                </IconButton>
                <IconButton
                  disabled={role === 'MAINTAINER'}
                  size='small'
                  aria-label='edit algorithm'
                  onClick={() => navigate(`/account/my-algorithms/edit/${id}`)}
                >
                  <EditIcon className={role === 'OWNER' && classes.icon} />
                </IconButton>
                <IconButton disabled size='small' aria-label='algorithm link'>
                  <LinkIcon /*className={classes.icon}*/ />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Stats view={viewStats} />
        </Box>
      </Box>
    </React.Fragment>
  )
}

function Stats({ view }) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const dark = theme.palette.type
  return (
    <>
      <Box
        width='100%'
        component={motion.div}
        animate={{ height: view ? 'auto' : 0 }}
      >
        <Box
          component={motion.div}
          animate={{
            visibility: view ? 'visible' : 'hidden',
            opacity: view ? 1 : 0,
          }}
        >
          <Box mt='10px'>
            <Typography variant='body1' color='secondary'>
              More information soon...
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}
