import { Box, Typography } from '@material-ui/core'
import { motion } from 'framer-motion'
import React from 'react'
import emptyAlgorithm from '../images/AlgorithmEmpty.png'
import { makeStyles } from '@material-ui/core/styles'

export default function NoAlgorithms() {
  return (
    <React.Fragment>
      <Box
        mt='50px'
        display='flex'
        width='100%'
        justifyContent='flex-start'
        alignItems='center'
        //border='1px solid red'
      >
        <Box maxWidth='580px'>
          <img src={emptyAlgorithm} />
        </Box>
      </Box>
    </React.Fragment>
  )
}
