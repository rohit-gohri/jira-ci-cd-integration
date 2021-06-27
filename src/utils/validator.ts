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
