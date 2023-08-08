import { Box, Typography } from '@material-ui/core'
import { motion } from 'framer-motion'
import React from 'react'
import motivusLogo from '../../static/motivus-icon.png'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: '50px',
    width: '89.75%',
  },
  secondaryColor: {
    color: theme.palette.secondary.main,
  },
  animationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
    //border: '1px solid red',
  },
  textColor: {
    color: '#343434',
  },
  fixedLoader: {
    background: '#fff',
    zIndex: '20',
  },
}))

const bounceAniamtion = {
  bounce: {
    y: [0, 90, 100],
    scaleX: [1, 1.1, 1.2],
    scaleY: [1, 0.9, 0.8],
    transition: {
      duration: 0.4,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeIn',
    },
  },
}

const rotationAnimation = {
  rotation: {
    rotate: [-0, -90, -180, -270, -360],
    //scale: [1, 1.1, 1, 1.1, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

const opacityAnimation = {
  opacity: {
    opacity: [0, 1, 0, 1, 0, 1, 1, 0, 0],
    //scale: [1, 1.1, 1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

export default function Loading({ fullscreen }) {
  const classes = useStyles()
  return fullscreen ? (
    <Box
      display='flex'
      width='100%'
      position='fixed'
      height='100%'
      top='0px'
      left='0px'
      justifyContent='center'
      flexDirection='column'
      alignItems='center'
      className={classes.fixedLoader}
    >
      <LoadingAnimation />
    </Box>
  ) : (
    <Box
      width='100%'
      //border='1px solid green'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <LoadingAnimation component />
    </Box>
  )
}

function LoadingAnimation({ component }) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Box mb={component ? '0px' : '80px'}>
        <motion.div
          className={classes.animationContainer}
          variants={component ? rotationAnimation : bounceAniamtion}
          animate={component ? 'rotation' : 'bounce'}
        >
          <img
            src={motivusLogo}
            width={component ? '90' : ' 200px'}
            height={component ? '90' : ' 200px'}
          />
        </motion.div>
      </Box>
      <Typography
        variant={component ? 'h4' : 'h3'}
        gutterBottom
        className={classes.textColor}
      >
        <i>
          Loading
          <motion.span
            variants={opacityAnimation}
            animate='opacity'
            className={classes.secondaryColor}
          >
            ...
          </motion.span>
        </i>
      </Typography>
    </React.Fragment>
  )
}
