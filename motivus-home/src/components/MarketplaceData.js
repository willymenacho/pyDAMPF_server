import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AlgorithmCards from './client/AlgorithmCards'
import AlgorithmFilter from './client/AlgorithmFilter'
import { Box, Grid } from '@material-ui/core'
import { container, listItem } from './DropDownAnimation'
import { motion } from 'framer-motion'
import { Algorithm } from '../models'
import { transformAlgorithm } from '../utils'
import useUser from '../hooks/useUser'
import Loading from './Loading'

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: '50px',
    width: '89.75%',
  },
}))

export default function MarketplaceData({ variant }) {
  const classes = useStyles()
  const { isLoading, isGuest } = useUser()

  const [isLoadingAlgorithms, setIsLoadingAlgorithms] = useState(true)
  const [algorithms, setAlgorithms] = React.useState([])

  const getAlgorithmData = async () => {
    try {
      const algoritms_ = await Algorithm.all()
      setAlgorithms(algoritms_.map(transformAlgorithm))
    } catch (e) {
      //
    } finally {
      setIsLoadingAlgorithms(false)
    }
  }
  React.useEffect(() => {
    getAlgorithmData()
  }, [isGuest])

  return isLoading || isLoadingAlgorithms ? (
    <Loading component />
  ) : (
    <React.Fragment>
      <Box
        display='flex'
        flexDirection='column'
        alignItems={variant === 'home' ? 'center' : 'flex-start'}
      >
        <AlgorithmFilter variant={variant} data={algorithms} />

        <Grid
          container
          className={classes.gridContainer}
          component={motion.div}
          variants={container}
          initial='hidden'
          animate='show'
        >
          {algorithms.map((a, k) => (
            <Grid
              item
              key={`marketplace-algorithm-card-${k}`}
              xs={12}
              component={motion.div}
              variants={listItem}
            >
              <AlgorithmCards variant={variant} {...a} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </React.Fragment>
  )
}
