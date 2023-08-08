import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import LineChart from './LineChart'
import TwoLineChart from './TwoLineChart'

const useStyles = makeStyles((theme) => ({
  border: {
    background: theme.palette.background.borderGradient,
  },
  root: {
    height: '500px',
    width: '100%',
    borderRadius: '0px',
    background: theme.palette.background.paperGradient,
  },
  title: {
    background: '#000',
    width: '90%',
    marginTop: '20px',
    marginLeft: '-4px',
    padding: '10px',
  },
  detail: {
    color: theme.palette.secondary.main,
  },
}))

export default function MediaCard({ title, axis, data, data1, data2 }) {
  const classes = useStyles()

  return (
    <Box padding='1px' className={classes.border} boxShadow={1}>
      <Card className={classes.root}>
        <CardContent className={classes.title}>
          <Typography variant='h5' component='h2' color='secondary'>
            {title}
          </Typography>
        </CardContent>

        <Box margin='10px' width='95%' height='300px'>
          {axis === 1 ? (
            <LineChart data={data} />
          ) : (
            <TwoLineChart data1={data1} data2={data2} />
          )}
        </Box>
      </Card>
    </Box>
  )
}
