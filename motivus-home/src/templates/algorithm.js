import React, { useState } from 'react'
import Layout from '../layouts/ClientLayout'
import Title from '../components/client/Title'
import { graphql } from 'gatsby'
import AlgorithmRender from '../components/Algorithm'
import { transformAlgorithm } from '../utils'
import LoadingComponent from '../components/StaticLoading'
import useUser from '../hooks/useUser'
import { Algorithm } from '../models'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import Seo from '../components/seo'

export default function AlgorithmTemplate({ name, ...props }) {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const { isLoading } = useUser()
  const [isLoadingAlgorithm, setIsLoadingAlgorithm] = useState(true)

  const [algorithm, setAlgorithm] = React.useState({})

  const getAlgorithmData = async () => {
    try {
      const algoritm_ = await Algorithm.find(name)
      setAlgorithm(transformAlgorithm(algoritm_))
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoadingAlgorithm(false)
    }
  }
  React.useEffect(() => {
    getAlgorithmData()
  }, [])

  return isLoading || isLoadingAlgorithm ? (
    <LoadingComponent fullscreen />
  ) : (
    <Layout {...props}>
      <Seo
        title={algorithm.name}
        description={`${algorithm.description} by ${algorithm.author}`}
      />
      <Box px={matches ? '0px' : '15px'}>
        <Title text={algorithm.name} />
        <AlgorithmRender data={{ algorithm }} {...props} isClientView={true} />
      </Box>
    </Layout>
  )
}
