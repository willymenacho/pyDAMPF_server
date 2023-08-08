import React from 'react'
import Typography from '@material-ui/core/Typography'

import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import SecuritySharpIcon from '@material-ui/icons/SecuritySharp'
import GroupSharpIcon from '@material-ui/icons/GroupSharp'
import NaturePeopleRoundedIcon from '@material-ui/icons/NaturePeopleRounded'
import WidgetsRoundedIcon from '@material-ui/icons/WidgetsRounded'
import BubbleChartRoundedIcon from '@material-ui/icons/BubbleChartRounded'
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded'

import { Link } from 'gatsby'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(8, 0, 6),
  },
  head: {
    paddingBottom: '50px',
  },
}))

const featuresContent = [
  {
    name: 'Secure',
    description: (
      <React.Fragment>
        {' '}
        Your data and files are safe.{' '}
        <Link to='/blog/importance-cyber-security-motivus'>
          {' '}
          Read more.{' '}
        </Link>{' '}
      </React.Fragment>
    ),
    icon: <SecuritySharpIcon fontSize='large' />,
  },
  {
    name: 'Collaborative',
    description: 'People working together.',
    icon: <GroupSharpIcon fontSize='large' />,
  },
  {
    name: 'Democratic',
    description: 'Available for everyone.',
    icon: <MenuBookRoundedIcon fontSize='large' />,
  },
  {
    name: 'Green',
    description: 'No need for server farms.',
    icon: <NaturePeopleRoundedIcon fontSize='large' />,
  },
  {
    name: 'Easy',
    description: 'No coding skills needed.',
    icon: <WidgetsRoundedIcon fontSize='large' />,
  },
  {
    name: 'Distributed',
    description: 'Compute anywhere around the world.',
    icon: <BubbleChartRoundedIcon fontSize='large' />,
  },
]

export default function Features() {
  const classes = useStyles()

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.root}>
        <Grid container direction='row' className={classes.head}>
          <Grid item container xs={12} justify='center'>
            <Typography variant='h3' color='primary'>
              {' '}
              Features{' '}
            </Typography>
          </Grid>
        </Grid>
        <Grid id='2' container direction='row' alignItems='center'>
          {featuresContent.map((feature) => (
            <Grid
              id='3'
              container
              xs={12}
              sm={6}
              md={6}
              lg={6}
              style={{ padding: '10px 30px' }}
            >
              <Grid item xs={2} container justify='center'>
                {feature.icon}
              </Grid>
              <Grid item xs={10}>
                <Typography variant='h4'>{feature.name}</Typography>
                <p style={{ hyphens: 'auto', textJustify: 'auto' }}>
                  {feature.description}
                </p>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  )
}
