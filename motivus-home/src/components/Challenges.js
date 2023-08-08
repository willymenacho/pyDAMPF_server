import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { navigate } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import MobileStepper from '@material-ui/core/MobileStepper'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import entrekid from '../images/entrekids.png'
import mBackground from '../images/motivusBackground.jpg'
import companyChallenge from '../images/companyChallenge.jpg'
import developerChallenge from '../images/developerChallenge.jpg'
import CardButton from '../components/client/CardButton'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const tutorialSteps = [
  {
    label: 'Motivus for Developers',
    imgPath: developerChallenge,
    path: '/contact',
    body:
      'Participate in the challenges and start new ventures opportunities by developing algorithms for companies.',
  },
  {
    label: 'Motivus for companies',
    imgPath: companyChallenge,
    path: '/contact',
    body:
      'Create a challenge for the motivus community and turn your data into value through algorithms that improve business performance',
  },
]

const useStyles = makeStyles((theme) => ({
  secondary: {
    color: theme.palette.secondary.main,
  },
  divider: {
    background: theme.palette.secondary.main,
  },
  white: {
    color: '#FFFFFF',
  },
  nonItalic: {
    textDecoration: 'none',
    fontStyle: 'normal',
  },
  mono: {
    fontFamily: 'Roboto Mono',
    textTransform: 'uppercase',
    fontWeight: '300',
    fontStyle: 'normal',
  },
  startButton: {
    borderRadius: '0px',
    boxShadow: 'none',
  },
  backgroundImg: {
    objectFit: 'cover',
    backgroundColor: '#000000',
    backgroundBlendMode: 'luminosity',
    backgroundPosition: 'center',
    filter: 'contrast(135%)',
  },
  overlay: {
    background: 'rgba(0,0,0,0.2)',
  },
  textBlock: {
    background: 'rgba(20, 20, 20, 0.85)',
    filter: 'none',
  },
  laydown: {
    fontSize: '1.3rem',
  },
}))

export default function Challenges() {
  const classes = useStyles()
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = tutorialSteps.length
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step) => {
    setActiveStep(step)
  }

  return (
    <Box padding={matches ? '0px' : '10px'} mb='150px'>
      <Typography variant='h1' color='primary' gutterBottom>
        Join our developer challenge
      </Typography>
      <Box mb='30px'>
        <Typography variant='body2' className={classes.laydown} gutterBottom>
          We invite you to solve business problems through algorithms.{' '}
          <b>
            Let's work together and be one of the first to port an algorithm to
            the marketplace{' '}
            <i>
              <span className={classes.secondary}>and benefit from it</span>
            </i>
          </b>
          , more information:
        </Typography>
      </Box>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                display='flex'
                width='100%'
                height={matches ? '550px' : '650px'}
                className={classes.backgroundImg}
                //backgroundImage={step.imgPath}
                style={{
                  backgroundImage: `url(${step.imgPath})`,
                  backgroundSize: matches ? '100%' : 'auto 100%',
                }}
              >
                <Box
                  display='flex'
                  width='100%'
                  height='100%'
                  className={classes.overlay}
                  alignItems='flex-end'
                >
                  <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent={matches ? 'space-between' : 'flex-start'}
                    padding='15px'
                    width='100%'
                    height={matches ? '250px' : '360px'}
                    className={classes.textBlock}
                    //border='1px solid green'
                  >
                    <span className={classes.white}>
                      <Typography variant='h4'>
                        <b>
                          <i>{step.label}</i>
                        </b>
                      </Typography>
                    </span>
                    <DividerNew />

                    <Box
                      display='flex'
                      flexGrow={2}
                      height='max-content'
                      flexDirection={matches ? 'row' : 'column-reverse'}
                      justifyContent={'space-between'}
                      alignItems='flex-start'
                      //border='1px solid red'
                    >
                      <Box display='flex' height='100%' alignItems='flex-end'>
                        <CardButton
                          arrow={true}
                          themeDark='dark'
                          size={matches ? 'large' : null}
                          actionButton={() => navigate(`${step.path}`)}
                        >
                          {'Apply'}
                        </CardButton>
                      </Box>
                      <Box width={matches ? '50%' : 'auto'}>
                        <Typography variant='body1' align='justify'>
                          <span className={classes.white}>{step.body}</span>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position='static'
        variant='dots'
        activeStep={activeStep}
        nextButton={
          <Button
            size='small'
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            color='secondary'
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size='small'
            onClick={handleBack}
            disabled={activeStep === 0}
            color='secondary'
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  )
}

function DividerNew() {
  const classes = useStyles()
  return <Box height='2px' my='12px' width='100%' className={classes.divider} />
}
