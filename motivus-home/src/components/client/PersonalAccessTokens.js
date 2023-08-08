import { PersonalAccessToken } from '../../models'
import withTokenImplementation from '../../hoc/withTokenImplementation'

export default withTokenImplementation({
  model: PersonalAccessToken,
  sectionName: 'personal-access-token',
  entity: 'Personal Access Token',
  description:
    'Personal Access tokens allows you to publish your algorithms versions to the Motivus Marketplace using the CLI tool.',
})
