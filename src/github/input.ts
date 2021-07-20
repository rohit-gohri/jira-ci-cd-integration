import * as core from '@actions/core'
import {getLogger} from '../utils/logger'
import {IntegrationInputs} from '../utils/types'
import {validateInputs} from '../utils/validator'

export function getInputs(): IntegrationInputs {
  const logger = getLogger()

  const jiraInstance: string = core.getInput('jira_instance')
  logger.info(`Connecting to Jira Instance "${jiraInstance}"...`)

  const clientId: string = core.getInput('client_id')
  const clientSecret: string = core.getInput('client_secret')
  logger.info(`Connecting via "${clientId}"`)

  const event: 'build' | 'deployment' =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (core.getInput('event_type') as any) || 'build'

  const inputs = {
    jiraInstance,
    clientId,
    clientSecret,
    event,
  }

  validateInputs(inputs)
  return inputs
}