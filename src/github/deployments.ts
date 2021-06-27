import * as core from '@actions/core'
import * as github from '@actions/github'
import {Jira} from '../jira/api'
import {getIssueKey} from './utils'

export async function sendDeploymnetInfo(jira: Jira): Promise<void> {
  const state: 'successful' | 'failed' =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (core.getInput('state') as any) || 'successful'

  const now = Date.now()
  const issueKey = getIssueKey()

  core.info('Sending "deployment" event')
  const response = await jira.submitDeployments(
    {},
    {
      // providerMetadata: {
      //   product: `https://github.com/rohit-gohri/jira-ci-cd-integration`,
      // },
      deployments: [
        {
          schemaVersion: '1.0',
          pipeline: {
            id: github.context.runId.toString(),
            url: '',
            displayName: '',
          },
          deploymentSequenceNumber: github.context.runNumber,
          environment: {
            displayName: '',
            id: '',
            type: 'unmapped',
          },
          updateSequenceNumber: now,
          displayName: github.context.workflow,
          description: `${github.context.workflow} triggered by ${github.context.eventName} for commit ${github.context.sha}`,
          url: `${github.context.serverUrl}/${github.context.repo.owner}/${github.context.repo.repo}/actions/runs/${github.context.runId}`,
          state,
          lastUpdated: new Date(now).toISOString(),
          issueKeys: [issueKey],
          // testInfo: {
          //   totalNumber: 150,
          //   numberPassed: 145,
          //   numberFailed: 5,
          //   numberSkipped: 0,
          // },
        },
      ],
    },
  )
  core.debug(`Deployment Response:\n${JSON.stringify(response, null, 2)}`)

  if (response.rejectedDeployments?.length) {
    throw new Error(
      `Invalid deployment generated:\n ${JSON.stringify(
        response.rejectedDeployments,
        null,
        2,
      )}`,
    )
  }
  core.setOutput('Response', response.acceptedDeployments?.[0])
}
