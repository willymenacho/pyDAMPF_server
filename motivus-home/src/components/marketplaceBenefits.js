import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Box, Divider, Grid } from '@material-ui/core'
import implementing from '../images/Implementing.svg'
import needs from '../images/needs.png'
import { StaticImage } from 'gatsby-plugin-image'
import { Height } from '@material-ui/icons'
import { Link } from 'gatsby'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const benefits = [
  {
    title: 'Serverless',
    description:
      'You can program your algorithm without worrying about how and where it will run.',
  },
  {
    title: 'Version management',
    description:
      'In Motivus you will be able to manage the different versions of your algorithm with ease.',
  },
  {
    title: 'Showcase for your algorithms',
    description:
      'You will have a virtual space in which you can show your algorithms to the community.',
  },
  {
    title: 'Modular Development',
    description:
      "Create complex solutions using sets of different algorithms, whether you or someone else's.",
  },
]

const useStyles = makeStyles((theme) => ({
  subtitle: {
    fontWeight: 700,
    fontSize: '1.6rem',
  },
  title: {
    fontSize: '2.2rem',
    fontWeight: '400',
  },
  benefitsTitles: {
    fontStyle: 'normal',
  },
  link: {
    fontWeight: '400',
    fontSize: '1.6rem',
    fontStyle: 'normal',
    fontFamily: 'Roboto Mono',
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    '&&:after': {
      content: '"->"',
    },
  },
}))

export default function MarketplaceBenefits() {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const classes = useStyles()

  return (
    <Box mb='80px' mt='40px' id='benefit'>
      <Box width='90%' margin='auto'>
        <Typography variant='h5' color='primary' className={classes.subtitle}>
          Motivus framework
        </Typography>
        <Typography variant='h3' gutterBottom>
          Benefits of creating your algorithms on the Motivus network
        </Typography>
        <Divider />
        <Box mt='30px'>
          <Grid container spacing={matches ? 10 : 0}>
            <Grid item xs={12} sm={6}>
              <Box
                height='380px'
                overflow='hidden'
                display='flex'
                justifyContent='center'
                alignItems='center'
              >
                <StaticImage
                  objectFit='cover'
                  src='../images/Implementing.svg'
                  alt='Motivus marketpace implementing'
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
                height='100%'
              >
                {benefits.map((benefit, i) => (
                  <Box
                    key={`marketplace-benefit-${i}`}
                    my={matches ? '0' : '20px'}
                  >
                    <Typography
                      variant='h5'
                      color='primary'
                      className={classes.benefitsTitles}
                    >
                      {benefit.title}
                    </Typography>
                    <Typography variant='body2'>
                      {benefit.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
          <Box mt='80px'>
            <Typography variant='h5'>For more information visit:</Typography>
            <Box display='flex' flexDirection='column' mt='5px'>
              <Link to='/documentation/' className={classes.link}>
                Motivus Documentation
              </Link>
              <Link to='/contact' className={classes.link}>
                Contact Us
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
