import * as core from '@actions/core'
import * as github from '@actions/github'
import {Jira} from '../jira/api'

export async function sendBuildInfo(jira: Jira): Promise<void> {
  const state: 'successful' | 'success' | 'failed' | 'cancelled' =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (core.getInput('state') as any) || 'successful'

  const now = Date.now()
  const branchName = github.context.ref.split('/')[2]
  const issueKey =
    core.getInput('issue') ||
    branchName.match(/(\w+)-(\d+)/)?.[0] ||
    process.env.JIRA_DEFAULT_TEST_ISSUE

  if (!issueKey) {
    throw new Error(
      `Could not parse issue key from branch name, "${branchName}"`,
    )
  }
  core.info('Sending "build" event')
  const response = await jira.submitBuilds(
    {},
    {
      // providerMetadata: {
      //   product: `https://github.com/rohit-gohri/jira-ci-cd-integration`,
      // },
      builds: [
        {
          schemaVersion: '1.0',
          pipelineId: github.context.runId.toString(),
          buildNumber: github.context.runNumber,
          updateSequenceNumber: now,
          displayName: github.context.workflow,
          description: `${github.context.workflow} triggered by ${github.context.eventName} for commit ${github.context.sha}`,
          url: `${github.context.serverUrl}/${github.context.repo.owner}/${github.context.repo.repo}/actions/runs/${github.context.runId}`,
          state: state === 'success' ? 'successful' : state,
          lastUpdated: new Date(now).toISOString(),
          issueKeys: [issueKey],
          // testInfo: {
          //   totalNumber: 150,
          //   numberPassed: 145,
          //   numberFailed: 5,
          //   numberSkipped: 0,
          // },
          references: [
            {
              commit: {
                id: github.context.sha,
                repositoryUri: `${github.context.serverUrl}/${github.context.repo.owner}/${github.context.repo.repo}`,
              },
              ref: {
                name: branchName,
                uri: `${github.context.serverUrl}/${github.context.repo.owner}/${github.context.repo.repo}/tree/${branchName}`,
              },
            },
          ],
        },
      ],
    },
  )
  core.debug(`Build Response:\n${JSON.stringify(response, null, 2)}`)

  if (response.rejectedBuilds?.length) {
    throw new Error(
      `Invalid build generated:\n ${JSON.stringify(
        response.rejectedBuilds,
        null,
        2,
      )}`,
    )
  }
  core.setOutput('Response', response.acceptedBuilds?.[0])
}
