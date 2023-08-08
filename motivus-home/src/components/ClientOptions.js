import React from 'react'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import StarIcon from '@material-ui/icons/StarBorder'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Theme2 from './StyleTheme'
import { FormatItalic, PlayCircleFilledWhite } from '@material-ui/icons'
import ContactToggle from '../contexts/ContactToggle'
import { Link, navigate } from 'gatsby'
import ReactPlayer from 'react-player/youtube'
import epicRNA from '../../static/rnaEpic.jpg'
import sharePower from '../../static/sharePower.svg'
import scientist from '../../static/scientist.svg'
import script from '../../static/script.svg'
import ClienOptionsCards from './CLientOptionsCards'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(0, 0, 6),
  },
  cardDistribution: {
    padding: '10px',
  },
  cardside: {
    padding: '10px',

    background: 'linear-gradient(0deg, #6338b5 10%, #9468e9 100%)',
  },
  cardmid: {
    padding: '10px',

    background: 'linear-gradient(0deg, #6338b5 10%, #9468e9 100%)',
  },
  cardHeader: {
    fontFamily: 'Asap, san serif',
    fontWeight: '500',
    fontStyle: 'italic',
    fontSize: '1.7rem',
    color: 'white',
  },
  colorTitle: {
    color: theme.palette.secondary.light,
    fontWeight: '700',
  },

  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },

  test: {
    color: theme.palette.primary.light,
  },
  bold: {
    fontWeight: 400,
    color: theme.palette.secondary.main,
  },
  button: {
    fontFamily: 'asap',
    fontSize: ' 1.1rem',
    fontWeight: '600',
  },
}))

const getTiers = (onClickEmbed, onClickProcess, onClickShare) => [
  {
    title: ' monetize my website',
    description: [
      'Host the Motivus FloatingTool on your website and get paid whenever users process through it.',
    ],
    position: 'side',
    buttonText: 'Coming soon',
    // buttonText: 'Host the Floating Tool',
    buttonVariant: 'outlined',
    image: script,
    onClick: onClickEmbed,
  },
  {
    title: ' process data!',
    description: [
      'Program your own drivers to work with the Motivus cluster and start processing.',
      'Want to process data but not sure where to begin? Visit our Software Factory to create a tailored made solution for your business.',
    ],
    position: 'mid',
    buttonText: 'Contact us',
    buttonVariant: 'contained',
    image: scientist,
    onClick: onClickProcess,
  },
  {
    title: ' share my computer power',
    description: [
      'Share your computer power with researchers all around the world and get paid.',
    ],
    position: 'side',
    buttonText: 'Start sharing',
    buttonVariant: 'outlined',
    image: sharePower,
    onClick: onClickShare,
  },
]

export default function Intro() {
  const [, setOpenContact] = React.useContext(ContactToggle)
  const classes = useStyles()
  const tiers = getTiers(
    () =>
      setTimeout(() => {
        // navigate('/blog/hola-mundo')
      }, 200),
    () => setOpenContact(true),
    // eslint-disable-next-line no-undef
    () => window.Motivus.openFloatingTool(),
  )

  return (
    <Theme2>
      {/* Hero unit */}
      <Container component='main' className={classes.heroContent}>
        <Box justifyContent='center' flexDirection='column' display='flex'>
          {/*<ReactPlayer
            url='https://youtu.be/-AtRjZfEQ94'
            width='854px'
            height='480px'
            controls
            config={{
              youtube: {
                embedOptions: { controls: 1 },
              },
            }}
          />*/}
          <Typography variant='h3' color='primary' align='center' gutterBottom>
            Welcome to the <b>Motivus RNA Epic</b>!
          </Typography>
          <Typography variant='body2' align='center' gutterBottom>
            Hey there! The Motivus RNA Epic is finally underway, people. This is
            HUGE news! As of January 2022, we are modeling an RNA virus using
            the Motivus distributed computing infrastructure. Read more about it{' '}
            <b>
              <Link to='/blog/welcome-rna-epic'>here</Link>
            </b>{' '}
            and become part of this exhilarating venture.
          </Typography>
          <img src={epicRNA}></img>
        </Box>
        <br />
        <br />
        <Typography
          variant='h3'
          align='center'
          color='Primary'
          component='subtitle'
          display='block'
          gutterBottom
        >
          Join the revolution in distributed computing!
        </Typography>

        <Typography
          variant='body2'
          align='center'
          color='textPrimary'
          component='subtitle'
          display='block'
          gutterBottom
        >
          Motivus is a collaborative
          <span className={classes.bold}>
            {' '}
            High Performance Computing Network.
          </span>{' '}
          With our framework you can process big volumes of data, and also earn
          extra income by renting your computer power to process data.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth='lg' component='main'>
        <Grid container alignItems='center'>
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={4}
              md={4}
              className={classes.cardDistribution}
            >
              <Card
                boxShadow={3}
                className={
                  tier.position === 'mid' ? classes.cardmid : classes.cardside
                }
              >
                <Typography
                  align='center'
                  className={classes.cardHeader}
                  gutterBottom
                >
                  I want to
                  <span className={classes.colorTitle}>{tier.title}</span>
                </Typography>

                <CardContent>
                  <img src={tier.image} alt={tier.image}></img>
                  <div className={classes.cardPricing}>
                    {/*<Typography component="h2" variant="h3" color="textPrimary">
                     ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      /mo
                    </Typography>*/}
                  </div>

                  {tier.description.map((line) => (
                    <p
                      style={{
                        hyphens: 'auto',
                        textJustify: 'auto',
                        color: 'white',
                        fontSize: '1rem',
                        fontFamily: 'roboto, san-serof',
                        fontWeight: '300',
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    onClick={tier.onClick}
                    className={classes.button}
                    color='secondary'
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Theme2>
  )
}
