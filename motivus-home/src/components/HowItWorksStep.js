import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Box, Divider, Typography } from '@material-ui/core'

import step1 from '../../static/Problem.svg'
import step2 from '../../static/colaboration.svg'
import step3 from '../../static/result.svg'

const steps = [
  {
    title: 'Problem',
    george:
      'Let’s say George, a protein researcher, has a data science problem that needs a high performance computing solution. He can’t afford a supercomputer or other cloud computing services.',
    andrew:
      'Andrew, a stay at home dad, is looking for new ways to make money while taking care of his kids.',
    image: step1,
  },
  {
    title: 'Enter Motivus',
    george:
      'George is able to solve his data science problem by using not only Andrew’s processing power, but also the power of thousands of other computers spread around the world.',
    andrew:
      'Andrew is able to use his computer to rent part of its processing power to George. The more Andrew let’s George use his computer resources, the more money he makes.',
    image: step2,
  },
  {
    title: 'Outcome',
    george:
      'George walks out of Motivus with 3D models of proteins that will help him create a vaccine.',
    andrew:
      'At the same time, Andrew logs out with some extra earnings that will allow him to buy his daughter a new toy. Both George and Andrew’s data and privacy are safe thanks to Motivus’ technology.',
    image: step3,
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '30px',
  },
  girdElement: {
    padding: '20px',
  },
  reverseRow: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
}))

export default function Steps() {
  const classes = useStyles()
  //console.log(step1)

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item sm={12} className={classes.girdElement}>
          <Typography variant='h3' align='center' color='primary'>
            How It Works
          </Typography>
        </Grid>
        {steps.map((step, index) => (
          <Grid
            item
            container
            alignItems='center'
            className={index % 2 === 0 ? classes.reverseRow : {}}
          >
            <Grid item sm={12} md={6} className={classes.girdElement}>
              <img alt={step.title} src={step.image} width='600px'></img>
            </Grid>
            <Grid item sm={12} md={6} className={classes.girdElement}>
              <Box p={1.5}>
                <Typography variant='h5' color='secondary' align='left'>
                  Step{index + 1}
                </Typography>
                <Typography variant='h4' color='primary' align='left'>
                  {step.title}
                </Typography>
              </Box>
              <Divider></Divider>
              <Box p={1.5}>
                <Typography
                  variant='body1'
                  align='justify'
                  color='textSecondary'
                  gutterBottom
                >
                  {step.george}
                </Typography>
                <Typography
                  variant='body1'
                  align='justify'
                  color='textSecondary'
                  gutterBottom
                >
                  {step.andrew}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
