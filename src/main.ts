/* eslint-disable no-case-declarations */
import * as core from '@actions/core'
import * as github from '@actions/github'
import createJiraAPI from './jira/api'

async function run(): Promise<void> {
  try {
    const jiraInstance: string = core.getInput('jira_instance')
    core.info(`Connecting to Jira Instance "${jiraInstance}"...`)
    const clientId: string = core.getInput('client_id')
    const clientSecret: string = core.getInput('client_secret')
    core.info(`Connecting via "${clientId}"`)

    const jira = await createJiraAPI({
      jiraInstance,
      clientId,
      clientSecret,
    })
    core.info(`Found cloudId: "${jira.cloudId}"`)

    const event: 'build' | 'deployment' =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (core.getInput('event_type') as any) || 'build'
    const state: 'successful' | 'failed' =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (core.getInput('state') as any) || 'successful'

    const now = Date.now()
    const branchName = github.context.ref.split('/')[2]
    const issueKey =
      core.getInput('issue') || branchName.match(/(\w+)-(\d+)/)?.[0]

    if (!issueKey) {
      throw new Error(
        `Could not parse issue key from branch name, "${branchName}"`,
      )
    }

    switch (event) {
      case 'build':
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
                url: `${github.context.serverUrl}/${github.context.repo.owner}/${github.context.repo.repo}/runs/${github.context.runId}`,
                state,
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
                      // TODO: slice refs/heads/ from this
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
        core.setOutput('Response', response.acceptedBuilds?.[0].buildNumber)
        break
      case 'deployment':
        core.info('Sending "deployment" event')
        break
      default:
        throw new Error(`Invalid event_type, "${event}"`)
    }
    core.setOutput('Done', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
