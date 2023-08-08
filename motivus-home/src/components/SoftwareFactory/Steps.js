import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Box, Divider, Typography } from '@material-ui/core'

import step1 from '../../../static/needs.svg'
import step2 from '../../../static/algorithm.svg'
import step3 from '../../../static/Implementing.svg'
import step4 from '../../../static/validation.svg'

const steps = [
  {
    title: 'Understanding',
    content:
      'Every Data Science task requires a different set of tools and drivers to perform in the best way possible. During this stage we’ll gather all the information we can to understand what is exactly what you need in order to solve your data science problems.',
    image: step1,
  },
  {
    title: 'Design the Algorithm',
    content:
      'Knowing what your objectives are, our team will start programming the functionality of the application. This means designing the algorithm utilizing Motivus infrastructure to ensure its quality. Program all of the functionality of the application. Run with your team to give all knowledge so that you can use it.',
    image: step2,
  },
  {
    title: 'Implementing',
    content:
      'This is the moment in which you take charge of your data. Our team will go step by step through the process of utilizing your application so that you can start extracting quality information from your data resources. Our goal is that you can become an expert in processing your data.',
    image: step3,
  },
  {
    title: 'Validation',
    content:
      'In the last stage we’ll validate that your process achieves the objectives we set out to meet. Validation will also tell us about the long term impact of your software solution, and how it can be upgraded as time goes by.',
    image: step4,
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
          <Typography variant='h3' align='center'>
            Know-How
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
                >
                  {step.content}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
