import {getLogger} from '../utils/logger'
import {IntegrationInputs} from '../utils/types'
import {validateInputs} from '../utils/validator'

export function getInputs(): IntegrationInputs {
  const logger = getLogger()

  const jiraInstance = process.env.JIRA_INSTANCE as string
  logger.info(`Connecting to Jira Instance "${jiraInstance}"...`)

  const clientId = process.env.JIRA_CLIENT_ID as string
  const clientSecret = process.env.JIRA_CLIENT_SECRET as string
  logger.info(`Connecting via Oauth`)

  const event: 'build' | 'deployment' =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.env.JIRA_EVENT_TYPE as any) || 'build'

  const inputs = {
    jiraInstance,
    clientId,
    clientSecret,
    event,
  }

  validateInputs(inputs)
  return inputs
}
