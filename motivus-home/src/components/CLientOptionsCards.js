import React, { useRef, useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import { motion } from 'framer-motion'
import CardButton from './client/CardButton'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '15px',
    paddingRight: '5px',
    // border: '1px solid green',
  },
  container: {
    display: 'flex',
    width: 'max-content',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: cardHeight + border,
    overflow: 'hidden',
  },
  border: {
    display: 'flex',
    flexShrink: '0',
    width: '160%',
    height: '160%',
    background:
      'linear-gradient(90deg, rgba(38,93,237,1) 30%, rgba(245,78,221,1) 60%)',
  },
  card: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    height: cardHeight,
    background: 'linear-gradient(0deg, #6338b5 10%, #9468e9 100%)',
  },
  titleContainer: {
    marginTop: '10px',
    marginLeft: '-20px',
    background: '#000',
    width: '90%',
    padding: '10px',
    paddingLeft: '40px',
    height: 'max-content',
    zIndex: 1,
  },
  title: {
    fontSize: '1.7rem',
  },
  description: {
    fontSize: '1.1rem',
    color: theme.palette.text.white,
  },
  white: {
    color: 'white',
    fontWeight: '500',
  },
}))

const cardHeight = 400
const border = 4

export default function ClienOptionsCards({
  title,
  Description,
  textButton,
  character,
  item,
  actionButton,
}) {
  const ref = useRef(null)
  const classes = useStyles()
  const theme = useTheme()
  const dark = theme.palette.type
  const [rootWidth, setRootWidth] = useState('')
  const [active, setactive] = useState(false)
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  useEffect(() => {
    setRootWidth(ref.current && ref.current.offsetWidth)
  }, [ref.current])

  return (
    <motion.div
      className={classes.root}
      onHoverStart={() => setactive(true)}
      onHoverEnd={() => setactive(false)}
      whileTap={matches ? 'null' : () => setactive(true)}
      animate={{ y: active ? -10 : 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className={classes.container} ref={ref}>
        <motion.div
          className={classes.border}
          animate={{ rotate: 360 }}
          transition={{ ease: 'linear', duration: 2, repeat: Infinity }}
        ></motion.div>
        <div className={classes.card} style={{ width: rootWidth - border }}>
          <div className={classes.titleContainer}>
            <Typography
              variant='h5'
              component='h2'
              color='secondary'
              className={classes.title}
            >
              <span className={classes.white}>I want to</span>
              {title}
            </Typography>
          </div>
          <Box
            display='flex'
            marginTop='10px'
            marginLeft='20px'
            height='100%'
            flexDirection={'column'}
            //border='1px solid red'
          >
            <Box
              width={'85%'}
              mt='5px'
              display='flex' /*border='1px solid green'*/
            >
              {Description && <Description />}
            </Box>
            <Box display='flex' /*border='2px solid pink'*/ flexGrow='2'>
              <Box
                marginTop='40px'
                /*border='3px solid green'*/
                width='50%'
                flexShrink='0'
              >
                <CardButton
                  arrow={true}
                  themeDark='dark'
                  size={matches ? 'large' : null}
                  actionButton={actionButton}
                >
                  {textButton}
                </CardButton>
              </Box>
              <Box
                display='flex'
                width={matches ? '55%' : '100%'}
                justifyContent={'flex-end'}
                alignItems='flex-end'
                objectFit='cover'
              >
                <Character
                  active={active}
                  matches={matches}
                  character={character}
                  item={item}
                />
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    </motion.div>
  )
}

function Character({ active, matches, character, item }) {
  return (
    <React.Fragment>
      <Box
        height={matches ? item.h : item.hM}
        flexShrink='0'
        marginBottom={matches ? item.mb : item.mbM}
        marginRight={item.mr}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{
          y: active ? -20 : 0,
          opacity: active ? 1 : 0.6,
          scale: active ? 1.1 : 1,
        }}
      >
        <img src={item.image} height='100%' alt='motivus charater idea' />
      </Box>
      <Box
        position='absolute'
        height={
          character.h
            ? matches
              ? character.h
              : character.hM
            : matches
            ? '171.4px'
            : '142.8px'
        }
        width={
          character.w
            ? matches
              ? character.w
              : character.wM
            : matches
            ? '240px'
            : '200px'
        }
        marginRight={matches ? character.mr : character.mrM}
        marginBottom={character.mb && character.mb}
        flexShrink='0'
      >
        <img src={character.image} height='100%' alt='motivus charater' />
      </Box>
    </React.Fragment>
  )
}
