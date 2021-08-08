import {IntegrationInputs} from './types'

const validEvents = ['build', 'deployment']

export function validateInputs(inputs: IntegrationInputs): void {
  if (!inputs.jiraInstance) {
    throw new Error(`Missing input: JIRA_INSTANCE`)
  }

  if (!inputs.clientId || !inputs.clientSecret) {
    throw new Error(`Missing inputs: JIRA_CLIENT_ID or JIRA_CLIENT_SECRET`)
  }

  if (!validEvents.includes(inputs.event)) {
    throw new Error(
      `Invalid input: JIRA_EVENT_TYPE. Expected one of "${validEvents}", received "${inputs.event}".`,
    )
  }
}

const validEnvTypes = ['development', 'testing', 'staging', 'production']

export function processEnvironmentTpe(
  slug: string,
  type: string,
): 'unmapped' | 'development' | 'testing' | 'staging' | 'production' {
  if (!type) {
    if (slug.includes('prod') || slug.includes('production')) {
      type = 'production' as const
    } else if (
      slug.includes('stage') ||
      slug.includes('staging') ||
      slug.includes('stg')
    ) {
      type = 'staging' as const
    } else if (slug.includes('test') || slug.includes('testing')) {
      type = 'testing' as const
    } else if (
      slug.includes('dev') ||
      slug.includes('develop') ||
      slug.includes('development')
    ) {
      type = 'development' as const
    }
  }

  return (validEnvTypes.includes(type) ? type : 'unmapped') as
    | 'unmapped'
    | 'development'
    | 'testing'
    | 'staging'
    | 'production'
}
