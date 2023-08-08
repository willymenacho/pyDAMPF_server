import React, { useContext } from 'react'
import ContactToggle from '../contexts/ContactToggle'
import Scientist from '../images/scientist.png'
import ScientistLamp from '../images/scientist-lamp.png'
import algoritmChar from '../images/algorithmDeveloper.png'
import algoritm from '../images/algorithmDeveloper-net.png'
import WebDeveloperChar from '../images/webDevloper.png'
import WebDeveloperGraph from '../images/webDevloper-grpah.png'
import punk from '../images/punk.png'
import punkDolar from '../images/punk-dolar.png'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { navigate } from 'gatsby-link'

//const [, setOpenContact] = React.useContext(ContactToggle)

export const charactersList = [
  {
    title: ' distribute my algorithm',
    description: '',
    textButton: 'marketplace',
    actionButton: () => navigate('/marketplace#benefit'),
    character: { image: algoritmChar },
    item: {
      image: algoritm,
      h: '130px',
      hM: '100px',
      mb: '45px',
      mbM: '60px',
      mr: '10px',
    },
    Description: () => {
      const useStyles = makeStyles((theme) => ({
        bodyText: {
          color: 'white',
          fontSize: '1.15rem',
        },
      }))
      const classes = useStyles()
      const theme = useTheme()
      return (
        <Typography variant='body2' className={classes.bodyText}>
          Distribute your algorithms in the motivus marketplace, and obtain all
          these{' '}
          <b>
            benefits: <i>distribution, selling and hosting.</i>
          </b>
        </Typography>
      )
    },
  },

  {
    title: ' process data!',
    textButton: 'learn how',
    actionButton: () => navigate('/documentation'),
    character: { image: Scientist },
    item: {
      image: ScientistLamp,
      h: '110px',
      hM: '100px',
      mr: '15px',
      mb: '115px',
      mbM: '115px',
    },
    Description: () => {
      const useStyles = makeStyles((theme) => ({
        bodyText: {
          color: 'white',
          fontSize: '1.15rem',
        },
      }))
      const classes = useStyles()
      const theme = useTheme()
      return (
        <Typography variant='body2' className={classes.bodyText}>
          Program your own drivers to work with the Motivus cluster and{' '}
          <b>
            start processing <i>your data now.</i>
          </b>
        </Typography>
      )
    },
  },
  /*{
    title: ' monetize my website',
    description:
      'Host the Motivus FloatingTool on your website and get paid whenever users process through it.',
    textButton: 'soon',
    actionButton: () => null,
    character: { image: WebDeveloperChar },
    item: {
      image: WebDeveloperGraph,
      h: '100px',
      hM: '100px',
      mr: '80px',
      mb: '90px',
      mbM: '75px',
    },
    Description: () => {
      const useStyles = makeStyles((theme) => ({
        bodyText: {
          color: 'white',
          fontSize: '1.15rem',
        },
      }))
      const classes = useStyles()
      const theme = useTheme()
      return (
        <Typography variant='body2' className={classes.bodyText}>
          Host the{' '}
          <b>
            <i>Motivus FloatingTool</i> on your website and get paid
          </b>{' '}
          whenever users process through it.
        </Typography>
      )
    },
  },
  {
    title: ' share my computer power',
    description:
      'Share your computer power with researchers all around the world and get paid.',
    textButton: 'Share',
    actionButton: () => window.Motivus.openFloatingTool(),
    character: {
      image: punk,
      h: '220px',
      hM: '172.8px',
      w: '300px',
      wM: '200px',
      mr: '-80px',
      //mrM: '-45px',
      mb: '-20px',
    },
    item: {
      image: punkDolar,
      h: '110px',
      hM: '110px',
      mr: '30px',
      mb: '110px',
      mbM: '60px',
    },
    Description: () => {
      const useStyles = makeStyles((theme) => ({
        bodyText: {
          color: 'white',
          fontSize: '1.15rem',
        },
      }))
      const classes = useStyles()
      const theme = useTheme()
      return (
        <Typography variant='body2' className={classes.bodyText}>
          <b>Share your computer power</b> with researchers all around the world
          and{' '}
          <b>
            <i>get paid</i>
          </b>
          .
        </Typography>
      )
    },
  },*/
]
