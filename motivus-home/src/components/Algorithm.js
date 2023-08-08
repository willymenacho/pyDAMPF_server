import React from 'react'
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles'
import { Box, Button, Typography } from '@material-ui/core'
import StarBadge from '../components/client/StarBadge'
import AlgorithmLinks from '../components/client/AlgorithmLinks'
import AlgorithmCallToAction from '../components/client/AlgorithmCallToAction'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { transformAlgorithm } from '../utils'
import { Algorithm as AlgorithmModel } from '../models'
import useUser from '../hooks/useUser'
import LoadingComponent from '../components/Loading'
import { formatISO, parseJSON } from 'date-fns'
import { navigate } from 'gatsby-link'
import Seo from './seo'

const AntTabs = withStyles((theme) => ({
  root: {
    marginTop: '30px',
  },
  indicator: {
    backgroundColor: theme.palette.secondary.main,
    height: '5px',
  },
}))(Tabs)

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontSize: '1.4rem',
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: ['Asap'].join(','),
    '&:hover': {
      color: theme.palette.secondary.main,
      opacity: 1,
    },
    '&$selected': {
      color: theme.palette.secondary.main,
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: theme.palette.secondary.main,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />)

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  subtitle: {
    fontFamily: 'Roboto Mono',
    fontWeight: '400',
    fontSize: '1.5rem',
    marginRight: '20px',
  },
  description: {
    fontSize: '1.25rem',
    fontWeight: '300',
    marginRight: '20px',
  },
}))

export default function Algorithm({ data, isClientView = false }) {
  const isBrowser = typeof window !== 'undefined'
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const [value, setValue] = React.useState(0)

  const [isLoadingAlgorithm, setIsLoadingAlgorithm] = React.useState(isBrowser)

  const [algorithm, setAlgorithm] = React.useState(data?.algorithm)
  const { isLoading, isGuest } = useUser()

  const getAlgorithmData = async () => {
    try {
      const algoritm_ = await AlgorithmModel.get(algorithm.id)
      setAlgorithm(transformAlgorithm(algoritm_))
    } catch (e) {
      //
    } finally {
      setIsLoadingAlgorithm(false)
    }
  }

  React.useEffect(() => {
    if (isBrowser) {
      getAlgorithmData()
    }
  }, [isGuest])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return isLoading || isLoadingAlgorithm ? (
    <LoadingComponent />
  ) : (
    <React.Fragment>
      <Box
        display='flex'
        flexDirection={matches ? 'row' : 'column-reverse'}
        //height={matches ? 'auto' : '80px'}
        justifyContent='space-between'
        mt='10px'
        //border="1px solid red"
      >
        <Typography variant='h3' color='primary' className={classes.subtitle}>
          {algorithm.author} |{' '}
          {formatISO(parseJSON(algorithm.publishDate), {
            representation: 'date',
          })}
        </Typography>
        {matches && <StarBadge stars={algorithm.stars} />}
      </Box>
      <Box
        display='flex'
        flexDirection={matches ? 'row' : 'column'}
        justifyContent='space-between'
        mt='20px'
        mb='20px'
      >
        <Typography
          variant='body1'
          className={classes.description}
          gutterBottom
        >
          {algorithm.description}
        </Typography>
        <AlgorithmLinks
          web={algorithm.web}
          github={algorithm.github}
          matches={matches}
        />
      </Box>
      <AlgorithmCallToAction
        matches={matches}
        console={`algorithm = {"algorithm": "${algorithm.name}", "algorithm_version": "${algorithm.lastVersion?.name}"}`}
      />
      <Box display='flex' alignItems='center' mt='10px'>
        <Typography variant='body2'>For more information</Typography>
        <Button
          color='secondary'
          onClick={
            isClientView
              ? () => navigate('/account/documentation')
              : () => navigate('/documentation')
          }
        >
          Read here
        </Button>
      </Box>
      <AntTabs
        value={value}
        onChange={handleChange}
        aria-label='ant example'
        variant='scrollable'
      >
        <AntTab label='Readme' {...a11yProps(0)} />
        <AntTab label='Versions' {...a11yProps(1)} />
        <AntTab label='Cost' {...a11yProps(2)} />
        <AntTab label='License' {...a11yProps(3)} />
      </AntTabs>
      <TabPanel value={value} index={0}>
        <ReactMarkdown
          children={algorithm.longDescription}
          remarkPlugins={[remarkGfm]}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant='h5'>Current</Typography>
        {algorithm.lastVersion.name && (
          <VersionInfo {...algorithm.lastVersion} />
        )}
        <Typography variant='h5'>History</Typography>
        {algorithm.versions?.length ? (
          algorithm.versions.map((v) => (
            <VersionInfo {...v} key={`vinfo-${v.id}`} />
          ))
        ) : (
          <Typography variant='body2' color='textPrimary'>
            There are no versions
          </Typography>
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant='h5' gutterBottom>
          {algorithm.cost} Motivus credits /{' '}
          {algorithm.charge_schema === 'PER_EXECUTION'
            ? 'execution'
            : algorithm.charge_schema === 'PER_MINUTE'
            ? 'minute'
            : ''}
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography variant='subtitle1' gutterBottom>
          {algorithm.license}
        </Typography>
      </TabPanel>
    </React.Fragment>
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} mb={matches ? '0px' : '100px'}>
          {children}
        </Box>
      )}
    </div>
  )
}

const VersionInfo = ({ name, inserted_at }) => (
  <Typography variant='body1' gutterBottom>
    version: v{name}____________
    {formatISO(parseJSON(inserted_at), { representation: 'date' })}
  </Typography>
)
