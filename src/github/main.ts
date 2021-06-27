import * as core from '@actions/core'
import * as github from '@actions/github'
import createJiraAPI from '../jira/api'
import {sendBuildInfo} from './builds'
import {sendDeploymnetInfo} from './deployments'

async function run(): Promise<void> {
  // const now = Date.now()
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
      logger: core,
    })
    core.info(`Found cloudId: "${jira.cloudId}"`)

    const event: 'build' | 'deployment' =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (core.getInput('event_type') as any) || 'build'

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
        await sendBuildInfo(jira)
        break
      case 'deployment':
        await sendDeploymnetInfo(jira)
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
