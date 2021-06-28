import {Jira} from './api'
import {getLogger} from '../utils/logger'
import {ValidState} from '../utils/types'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function sendBuildInfo(
  jira: Jira,
  {
    name,
    commit,
    state,
    branchName,
    branchUrl,
    issueKeys,
    buildUrl,
    repoUrl,
    pipelineId,
    buildNumber,
  }: {
    name: string
    commit: string
    state: ValidState
    branchName: string | undefined
    branchUrl?: string | undefined
    issueKeys: string[]
    buildUrl: string
    repoUrl: string
    pipelineId: string
    buildNumber: number
  },
) {
  const now = Date.now()
  const logger = getLogger()

  if (!issueKeys.length) {
    logger.info('No issue keys found to send "build" event for')
    return
  }

  logger.info('Sending "build" event')
  const response = await jira.submitBuilds(
    {},
    {
      builds: [
        {
          schemaVersion: '1.0',
          pipelineId,
          buildNumber,
          updateSequenceNumber: now,
          displayName: name,
          description: `${name} triggered for commit ${commit}`,
          url: buildUrl,
          state,
          lastUpdated: new Date(now).toISOString(),
          issueKeys,
          // testInfo: {
          //   totalNumber: 150,
          //   numberPassed: 145,
          //   numberFailed: 5,
          //   numberSkipped: 0,
          // },
          references: [
            {
              commit: {
                id: commit,
                repositoryUri: repoUrl,
              },
              ...(branchName && branchUrl
                ? {
                    ref: {
                      name: branchName,
                      uri: branchUrl,
                    },
                  }
                : null),
            },
          ],
        },
      ],
    },
  )
  logger.debug(`Build Response:\n${JSON.stringify(response, null, 2)}`)

  if (response.rejectedBuilds?.length) {
    throw new Error(
      `Invalid build generated:\n ${JSON.stringify(
        response.rejectedBuilds,
        null,
        2,
      )}`,
    )
  }
  return response.acceptedBuilds?.[0]
}
