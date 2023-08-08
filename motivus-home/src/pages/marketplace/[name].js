import React, { useState } from 'react'
import useUser from '../../hooks/useUser'
import { Algorithm } from '../../models'
import AlgorithmTemplate from '../../templates/homeAlgorithm'
import { transformAlgorithm } from '../../utils'
import LoadingComponent from '../../components/StaticLoading'

function ClientSideAlgorithm({ params: { name }, ...props }) {
  const { isLoading } = useUser()
  const [isLoadingAlgorithm, setIsLoadingAlgorithm] = useState(true)

  const [algorithm, setAlgorithm] = React.useState({})

  const getAlgorithmData = async () => {
    try {
      const algoritm_ = await Algorithm.find(name)
      setAlgorithm(transformAlgorithm(algoritm_))
    } catch (e) {
      //
    } finally {
      setIsLoadingAlgorithm(false)
    }
  }
  React.useEffect(() => {
    getAlgorithmData()
  }, [])

  return isLoading || isLoadingAlgorithm ? (
    <LoadingComponent fullscreen />
  ) : algorithm.id ? (
    <AlgorithmTemplate data={{ algorithm }} {...props} />
  ) : (
    <div>Not found nor authorized</div>
  )
}

export default ClientSideAlgorithm
