import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import CardButton from './CardButton'
import { TimeToLeave } from '@material-ui/icons'
import { GatsbyImage } from 'gatsby-plugin-image'
import CardMedia from '@material-ui/core/CardMedia'
import { navigate } from 'gatsby-link'

const useStyles = makeStyles((theme) => ({
  border: {
    maxWidth: '420px',
    height: '580px',
    borderRadius: '0px 50px',
    background: theme.palette.background.borderGradient,
    marginBottom: '50px',
  },
  root: {
    position: 'relative',
    maxWidth: '418px',
    height: '578px',
    borderRadius: '0px 50px',
    background: theme.palette.background.paperGradient,
  },
  filter: {
    background: theme.palette.background.filter,
    mixBlendMode: 'color',
    zIndex: 1,
  },
  media: {
    height: '250px',
  },
  title: {
    position: 'absolute',
    background: '#000',
    width: '90%',
    bottom: -30,
    zIndex: 2,
    padding: '10px',
  },
  detail: {
    color: theme.palette.secondary.main,
  },
  author: {
    fontWeight: 600,
    marginTop: '5px',
  },
}))

export default function MediaCard({
  title,
  abstract,
  author,
  date,
  image,
  slug,
}) {
  const classes = useStyles()
  const theme = useTheme()
  const dark = theme.palette.type

  return (
    <Box
      className={classes.border}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent
            className={classes.title}
            onClick={() => navigate(`/blog/${slug}`)}
          >
            <Typography variant='h5' component='h2' color='secondary'>
              {title}
            </Typography>
          </CardContent>
          <Box
            position='absolute'
            height='250px'
            width='100%'
            className={classes.filter}
          />
          <GatsbyImage className={classes.media} image={image}></GatsbyImage>
        </CardActionArea>
        <Box marginLeft='10px' marginTop='40px' width='92.5%'>
          <Typography variant='body2' color='textPrimary' component='p'>
            {abstract}
          </Typography>
          <Box display='flex' flexDirection='row'>
            <Typography variant='body2' color='textPrimary' component='p'>
              <span className={classes.detail}>&#9614;</span>{' '}
              <span className={classes.author}>
                {author} {date}
              </span>
            </Typography>
          </Box>
        </Box>
        <Box
          position='absolute'
          left='10px'
          bottom='20px'
          display='flex'
          justifyContent='flex-end'
          width='92.5%'
        >
          <CardButton
            arrow={true}
            actionButton={() => navigate(`/blog/${slug}`)}
          >
            Read Blog
          </CardButton>
        </Box>
      </Card>
    </Box>
  )
}
