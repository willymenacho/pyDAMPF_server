import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../layouts/layout'
import SEO from '../components/seo'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import _ from 'lodash'
import useMediaQuery from '@material-ui/core/useMediaQuery'

/*---icons---*/
import HttpIcon from '@material-ui/icons/Http'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import RedditIcon from '@material-ui/icons/Reddit'
import GitHubIcon from '@material-ui/icons/GitHub'
import { CenterFocusStrong } from '@material-ui/icons'
import Fade from '@material-ui/core/Fade'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { container, listItem } from '../components/DropDownAnimation'
import { motion } from 'framer-motion'
import { check } from 'prettier'

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
  },

  root: {
    backgroundImage: 'url("paper.gif")',
  },

  cardGrid: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    margin: 'auto',
    width: 'auto',
  },
  card: {
    height: '100%',
    display: 'flex',
    width: 'auto',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  cardMedia: {
    paddingTop: '0%', // 16:9
    height: '400px',
  },
  description: {
    display: 'flex',
    background: 'white',
    alignItems: 'center',
    padding: '15px',
    zIndex: 5,
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  backgroundImg: {
    flexGrow: 2,
  },
  name: {
    color: theme.palette.secondary.main,
    fontSize: '1.15rem',
  },
  position: {
    fontFamily: 'Roboto Mono',
    textTransform: 'uppercase',
    color: '#fff',
    fontWeight: '300',
    fontSize: '0.9rem',
  },
  info: {
    backgroundColor: '#242424',
    //backgroundColor: '#2C2771',
  },
  white: {
    color: '#fff',
  },
}))

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const SocialNetworks = ({ networks }) => (
  <div>
    {!_.isEmpty(networks) ? (
      networks.map(({ icon, url }) => {
        switch (icon) {
          case 'github':
            return (
              <Link target='_blank' rel='noopener' href={url} key={url}>
                <GitHubIcon fontSize='large' color='secondary' />
              </Link>
            )
          case 'linkedin':
            return (
              <Link target='_blank' rel='noopener' href={url} key={url}>
                <LinkedInIcon fontSize='large' color='secondary' />
              </Link>
            )
          case 'web':
            return (
              <Link target='_blank' rel='noopener' href={url} key={url}>
                <HttpIcon fontSize='large' color='secondary' />
              </Link>
            )
          case 'reddit':
            return (
              <Link target='_blank' rel='noopener' href={url} key={url}>
                <RedditIcon fontSize='large' color='secondary' />
              </Link>
            )
        }
      })
    ) : (
      <p>hola mundo</p>
    )}
  </div>
)

function HumanCard(props) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const [checked, setChecked] = React.useState(false)

  function toggleChecked() {
    setChecked((prev) => !prev)
  }

  const { data } = props

  return (
    <Grid
      item
      key={data.node.id}
      xs={12}
      sm={6}
      md={4}
      lg={4}
      xl={4}
      component={motion.div}
      variants={listItem}
    >
      <Box
        //border='1px solid red'
        flexDirection='column'
        height='450px'
        display='flex'
        justifyContent='center'
        alignItems='center'
        //onHover={toggleChecked}
        //whileHover={() => toggleChecked}
        onMouseEnter={() => setChecked(true)}
        onMouseLeave={() => setChecked(false)}
        onTap={matches ? null : toggleChecked}
        component={motion.div}
        style={{
          backgroundImage: `url(${data.node.photography.asset.url})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          //backgroundColor: `${theme.palette.secondary.light}`,
          backgroundBlendMode: 'multiply',
        }}
      >
        {/*<GatsbyImage
          className={classes.backgroundImg}
          image={data.node.photography.asset.gatsbyImageData}
        />*/}
        <Box
          height='450px'
          width='100%'
          //className={classes.filter}
          display='flex'
          flexDirection='column'
          justifyContent='flex-end'
        >
          <Box
            className={classes.info}
            p='12.5px'
            component={motion.div}
            animate={{
              height: checked ? 450 : 70,
            }}
            transition={{ duration: 0.5 }}
            display='flex'
            flexDirection='column'
          >
            <Box>
              <Typography variant='h4' className={classes.name}>
                <b>
                  <i>{data.node.name}</i>
                </b>
              </Typography>
              <Typography
                variant='h6'
                className={classes.position}
                gutterBottom
              >
                {data.node.role}
              </Typography>
            </Box>
            {checked && (
              <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Typography variant='body2' className={classes.white}>
                  {data.node.description}
                </Typography>
              </Box>
            )}
            {checked && (
              <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                //border='1px solid green'
                display='flex'
                flexDirection='row'
                flexGrow={2}
                justifyContent='flex-end'
                alignItems='flex-end'
                p={0}
              >
                {!_.isNull(true) ? (
                  <SocialNetworks networks={data.node.networks} />
                ) : (
                  <span></span>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Grid>
  )
}

export default function Aboutpage({ data, ...props }) {
  const classes = useStyles()

  return (
    <Layout {...props}>
      <SEO title='About us' />
      <CssBaseline />
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container maxWidth='lg'>
          <Typography
            component='h1'
            variant='h2'
            align='center'
            color='primary'
            gutterBottom
          >
            Motivus Team
          </Typography>
          <Typography
            variant='h5'
            align='center'
            color='textSecondary'
            paragraph
          >
            Our team is made up of smart and curious human beings that love to
            interact with technology, get to know them a little bit more by
            hovering over their profiles.
          </Typography>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth='lg'>
        {/* End hero unit */}
        <Grid
          container
          spacing={4}
          component={motion.div}
          variants={container}
          initial='hidden'
          animate='show'
        >
          {data.allSanityHuman.edges
            .sort(function (x, y) {
              return x.node.name.localeCompare(y.node.name)
            })
            .map((card) => (
              <HumanCard data={card}></HumanCard>
            ))}
        </Grid>
      </Container>
    </Layout>
  )
}

export const humanQuery = graphql`
  query AboutQuery {
    allSanityHuman(filter: { released: { eq: true } }) {
      edges {
        node {
          id
          role
          released
          photography {
            asset {
              gatsbyImageData
              url
            }
          }
          name
          description
          role
          networks {
            icon
            url
          }
        }
      }
    }
  }
`

/*<Card
        className={classes.card}
        //onMouseEnter={() => setChecked(true)}
        //onMouseLeave={() => setChecked(false)}
      >
        <CardMedia
          onClick={toggleChecked}
          className={classes.cardMedia}
          component={() => (
            <GatsbyImage
              image={data.node.photography.asset.gatsbyImageData}
            ></GatsbyImage>
          )}
          title={data.node.name}
        ></CardMedia>
        <Box className={classes.description}>
          <Typography color='primary' align='justify'>
            {data.node.description}
          </Typography>
          </Box>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant='h5' component='h2'>
            {data.node.name}
          </Typography>
          <Typography variant='subtitle1' color='secondary'>
            {data.node.role}
          </Typography>
        </CardContent>
        <CardActions>
          {!_.isNull(true) ? (
            <SocialNetworks networks={data.node.networks} />
          ) : (
            <span></span>
          )}
        </CardActions>
      </Card>
      
      */
