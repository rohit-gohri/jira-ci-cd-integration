import * as core from '@actions/core'
import * as github from '@actions/github'
import createJiraAPI from '../jira/api'
import {setLogger} from '../utils/logger'
import {sendBuildInfo} from './builds'
import {sendDeploymnetInfo} from './deployments'
import {getInputs} from './input'

async function run(): Promise<void> {
  try {
    setLogger(core)
    if (
      github.context.eventName !== 'pull_request' &&
      github.context.eventName !== 'push'
    ) {
      core.info(`Can only be used with "pull_request" and "push" events`)
      return
    }

    const inputs = getInputs()
    const jira = await createJiraAPI(inputs)

    switch (inputs.event) {
      case 'build':
        await sendBuildInfo(jira)
        break
      case 'deployment':
        await sendDeploymnetInfo(jira)
        break
      default:
        throw new Error(`Invalid event_type, "${inputs.event}"`)
    }
    core.setOutput('Done', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
