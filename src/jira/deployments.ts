import {Jira} from './api'
import {getLogger} from '../utils/logger'
import {ValidState} from '../utils/types'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function sendDeploymnetInfo(
  jira: Jira,
  {
    name,
    commit,
    state,
    issueKeys,
    buildUrl,
    pipelineId,
    buildNumber,
  }: {
    name: string
    commit: string
    state: ValidState
    issueKeys: string[]
    buildUrl: string
    pipelineId: string
    buildNumber: number
  },
) {
  const now = Date.now()
  const logger = getLogger()

  if (!issueKeys.length) {
    logger.info('No issue keys found to send "deployment" event for')
    return
  }

  logger.info('Sending "deployment" event')
  const response = await jira.submitDeployments(
    {},
    {
      deployments: [
        {
          schemaVersion: '1.0',
          pipeline: {
            id: pipelineId,
            url: buildUrl,
            displayName: name,
          },
          deploymentSequenceNumber: buildNumber,
          // TODO: Add env
          environment: {
            displayName: '',
            id: '',
            type: 'unmapped',
          },
          updateSequenceNumber: now,
          displayName: name,
          description: `${name} triggered for commit ${commit}`,
          url: buildUrl,
          state,
          lastUpdated: new Date(now).toISOString(),
          issueKeys,
        },
      ],
    },
  )
  logger.debug(`Deployment Response:\n${JSON.stringify(response, null, 2)}`)

  if (response.rejectedDeployments?.length) {
    throw new Error(
      `Invalid deployment generated:\n ${JSON.stringify(
        response.rejectedDeployments,
        null,
        2,
      )}`,
    )
  }
  return response.acceptedDeployments?.[0]
}
