import React from 'react'
import { Algorithm, AlgorithmUser } from '../../models'
import { transformAlgorithm } from '../../utils'
import NewAlgorithm from './new-algorithm'
import Loading from '../Loading'

export default function EditAlgorithm({ id }) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [algorithm, setAlgorithm] = React.useState({})

  const getAlgorithmData = async () => {
    try {
      const [algorithm_, users] = await Promise.all([
        Algorithm.get(id),
        AlgorithmUser.all(id),
      ])
      setAlgorithm({ ...algorithm_, users })
    } catch (e) {
      //
    } finally {
      setIsLoading(false)
    }
  }

  const refreshUsers = async () => {
    try {
      const users = await AlgorithmUser.all(id)
      setAlgorithm((a) => ({ ...a, users }))
    } catch (e) {
      //
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    getAlgorithmData()
  }, [])

  return isLoading ? (
    <Loading />
  ) : (
    <NewAlgorithm update algorithm={algorithm} refreshData={refreshUsers} />
  )
}
