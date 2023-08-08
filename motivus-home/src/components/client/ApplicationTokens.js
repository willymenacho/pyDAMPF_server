import { ApplicationToken } from '../../models'
import withTokenImplementation from '../../hoc/withTokenImplementation'

export default withTokenImplementation({
  model: ApplicationToken,
  sectionName: 'application-token',
  entity: 'Application Token',
  description:
    'Application tokens lets you provide access to algorithms and computing capabilities to your drivers using the Motivus Cluster.',
})
