import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import { Box } from '@material-ui/core'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const reference = [
  {
    label: 'ARN Folding',
    citation:
      'Motivus was exactly what I needed, they were able to implement my code in a friendly way, so that anyone that has a scientific data problem can ingest a sequence and work with it in the platform',
    author: 'Simón Poblete',
  },
  {
    label: 'cristianaguirre.com',
    citation:
      // eslint-disable-next-line quotes
      "The solution was very specific to our needs. The team showed an incredible work ethic, listening to our requirements and applying the changes needed to fulfill the client's needs. Motivus showed seriousness, responsability and comitment to the work",
    author: 'Cristián Aguirre',
  },
]

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '100%',
    flexGrow: 1,
    marginTop: 50,
  },

  citation: {
    fontFamily: 'Roboto',
    fontSize: '1.8rem',
    fontStyle: 'italic',
    fontWeight: '100',
  },
}))

function SwipeableTextMobileStepper() {
  const classes = useStyles()
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)

  const handleStepChange = (step) => {
    setActiveStep(step)
  }

  return (
    <div className={classes.root}>
      <Typography variant='h5' color='primary' align='center' gutterBottom>
        Happy clients:
      </Typography>
      <Box mt={2}>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          interval={15000}
        >
          {reference.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box maxWidth='960px' margin='auto'>
                  <Typography
                    align='center'
                    className={classes.citation}
                    gutterBottom
                  >
                    "{step.citation}"
                  </Typography>
                  <Box
                    display='flex'
                    flexDirection='row'
                    justifyContent='flex-end'
                    alignItems='center'
                  >
                    <Typography variant='h6' color='textSecondary'>
                      {step.author},&nbsp;
                    </Typography>
                    <Typography variant='h5' color='secondary'>
                      {step.label}
                    </Typography>
                  </Box>
                </Box>
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
      </Box>
    </div>
  )
}

export default SwipeableTextMobileStepper
