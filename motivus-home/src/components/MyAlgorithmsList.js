import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MyAlgorithmCards from './MyAlgorithmCards'
import { Box, Grid } from '@material-ui/core'
import { motion } from 'framer-motion'
import { container, listItem } from './DropDownAnimation'
import { transformAlgorithm } from '../utils'
import { Algorithm } from '../models'
import NoAlgorithms from './NoAlgorithms'
import Loading from './Loading'

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    width: '100%',
  },
}))

export default function MyAlgorithms({ variant }) {
  const classes = useStyles()
  const [algorithms, setAlgorithms] = React.useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getAlgorithmData = async () => {
    try {
      const [owned, maintained] = await Promise.all([
        Algorithm.owned(),
        Algorithm.maintained(),
      ])
      const owned_ = owned.map((a) => ({ ...a, role: 'OWNER' }))
      const maintained_ = maintained.map((a) => ({ ...a, role: 'MAINTAINER' }))
      setAlgorithms([...owned_, ...maintained_].map(transformAlgorithm))
    } finally {
      setIsLoading(false)
    }
  }
  React.useEffect(() => {
    getAlgorithmData()
  }, [])

  return (
    <React.Fragment>
      <Box
        display='flex'
        flexDirection='column'
        alignItems={variant === 'home' ? 'center' : 'flex-start'}
        mb='70px'
      >
        {/*<AlgorithmFilter variant={variant} data={allAlgorithm} /> */}
        {isLoading ? (
          <Loading />
        ) : (
          <Grid
            container
            className={classes.gridContainer}
            component={motion.div}
            variants={container}
            initial='hidden'
            animate='show'
          >
            {algorithms.length ? (
              algorithms.map((a, k) => (
                <Grid
                  item
                  key={`my-algorithm-cards-${k}`}
                  xs={12}
                  component={motion.div}
                  variants={listItem}
                >
                  <MyAlgorithmCards variant={variant} {...a} />
                </Grid>
              ))
            ) : (
              <NoAlgorithms />
            )}
          </Grid>
        )}
      </Box>
    </React.Fragment>
  )
}
