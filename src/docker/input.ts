import {getLogger} from '../utils/logger'
import {IntegrationInputs} from '../utils/types'
import {validateInputs, processEnvironmentTpe} from '../utils/validator'

const defaultEnv = 'Unknown'

export function getEnvironment(): {
  displayName: string
  type: 'unmapped' | 'development' | 'testing' | 'staging' | 'production'
} {
  const label =
    process.env.CI_ENVIRONMENT_NAME ||
    process.env.DRONE_DEPLOY_TO ||
    process.env.BUILD_ENVIRONMENT ||
    defaultEnv

  const type:
    | 'unmapped'
    | 'development'
    | 'testing'
    | 'staging'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | 'production' = process.env.BUILD_ENVIRONMENT_TYPE as any

  const slug = (
    process.env.CI_ENVIRONMENT_TIER ||
    process.env.CI_ENVIRONMENT_SLUG ||
    label
  ).toLowerCase()

  return {
    displayName: label,
    type: processEnvironmentTpe(slug, type),
  }
}

export function getInputs(): IntegrationInputs {
  const logger = getLogger()

  const jiraInstance = process.env.JIRA_INSTANCE as string
  logger.info(`Connecting to Jira Instance "${jiraInstance}"...`)

  const clientId = process.env.JIRA_CLIENT_ID as string
  const clientSecret = process.env.JIRA_CLIENT_SECRET as string
  logger.info(`Connecting via Oauth`)

  let event: 'build' | 'deployment' =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    process.env.JIRA_EVENT_TYPE as any

  const environment = getEnvironment()

  logger.info(
    `Environment is "${environment.displayName}" (${environment.type})...`,
  )

  // If we have env then it probably is a deployment rather than a build
  if (environment.displayName !== defaultEnv) {
    event = event || 'deployment'
  } else {
    event = event || 'build'
  }

  const inputs = {
    jiraInstance,
    clientId,
    clientSecret,
    event,
  }

  validateInputs(inputs)
  return inputs
}
