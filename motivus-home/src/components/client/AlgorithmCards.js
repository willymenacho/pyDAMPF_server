import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'
import simonImg from '../../images/Simon-Poblete.jpg'
import cecsImg from '../../images/cecs.png'
import albaImg from '../../images/alba.png'
import motivusImg from '../../images/gatsby-icon.png'
import { navigate } from 'gatsby'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { formatDistance, formatISO, parseJSON } from 'date-fns'

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
  },

  info: {
    fontFamily: 'Roboto Mono',
  },
  author: {
    fontWeight: 'bold',
  },
  publishDate: {
    fontWeight: '400',
  },
  separate: {
    borderColor: theme.palette.secondary.main,
    borderLeft: '4px solid',
  },
  img: {
    width: '25px',
    borderRadius: '100px',
    marginRight: '5px',
  },
  cost: {
    fontFamily: 'Roboto Mono',
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
  },
  stars: {
    fontFamily: 'Roboto Mono',
    fontWeight: 'bold',
  },
  starIcon: {
    fill: theme.palette.calypso.main,
    marginRight: '15px',
  },
}))

export default function AlgorithmCards({
  name,
  author,
  publishDate,
  abstract,
  image,
  cost,
  stars,
  variant,
  charge_schema,
}) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const dark = theme.palette.type

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
          flexDirection={matches ? 'row' : 'column'}
          padding='10px'
          justifyContent='space-between'
          className={classes.root}
          onClick={() =>
            variant === 'home'
              ? navigate(`/marketplace/${name}`)
              : navigate(`/account/marketplace/${name}`)
          }
        >
          <Box>
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='space-between'
            >
              <Typography variant='h5'>{name}</Typography>
              <Box
                display='flex'
                flexDirection='row'
                className={classes.separate}
                pl='6px'
                ml='4px'
              >
                <Box display='flex' flexDirection='column'>
                  <Typography variant='body'>{abstract}</Typography>
                  <Box
                    display='flex'
                    flexDirection='row'
                    alignItems='center'
                    mt='5px'
                  >
                    {<img src={image}></img>}&nbsp;
                    <Typography variant='body1' className={classes.info}>
                      <span className={classes.author}>{author}&nbsp;</span>
                      published{' '}
                      <span className={classes.publishDate}>
                        {formatDistance(parseJSON(publishDate), new Date(), {
                          addSuffix: true,
                        })}
                      </span>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            display='flex'
            flexDirection={matches ? 'column' : 'row'}
            alignItems={matches ? 'flex-end' : 'flex-start'}
            justifyContent={matches ? 'flex-end' : 'space-between'}
            mt={matches ? '0px' : '15px'}
          >
            <Box
              display='flex'
              flexDirection='row'
              justifyContent='center'
              mb='5px'
            >
              <StarIcon className={classes.starIcon} fontSize='small' />
              <Typography variant='body1' className={classes.stars}>
                {stars}
              </Typography>
            </Box>
            <Box display='flex' flexDirection='column' alignItems='flex-end'>
              <Typography variant='body1' className={classes.info}>
                {'Motivus credits / '}
                {charge_schema === 'PER_EXECUTION'
                  ? 'execution'
                  : charge_schema === 'PER_MINUTE'
                  ? 'minute'
                  : ''}
              </Typography>
              <Typography variant='h5' className={classes.cost}>
                {cost}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}
