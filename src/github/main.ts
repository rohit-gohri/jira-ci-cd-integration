/* eslint-disable no-case-declarations */
import * as core from '@actions/core'
import * as github from '@actions/github'
import createJiraAPI from '../jira/api'
import {sendBuildInfo} from '../jira/builds'
import {sendDeploymentInfo} from '../jira/deployments'
import {setLogger} from '../utils/logger'
import {getInputs} from './input'
import {getBranchName, getEnvironment, getIssueKeys, getState} from './utils'

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

    const state = getState()
    const branchName = getBranchName()
    const issueKeys = await getIssueKeys()

    const branchUrl = branchName
      ? `${github.context.serverUrl}/${github.context.repo.owner}/${github.context.repo.repo}/tree/${branchName}`
      : undefined

    const common = {
      name: github.context.workflow,
      state,
      commit: github.context.sha,
      issueKeys,
      buildUrl: `${github.context.serverUrl}/${github.context.repo.owner}/${github.context.repo.repo}/actions/runs/${github.context.runId}`,
      buildNumber: github.context.runNumber,
      pipelineId: github.context.runId.toString(),
    }

    switch (inputs.event) {
      case 'build':
        const build = await sendBuildInfo(jira, {
          ...common,
          branchName,
          branchUrl,
          repoUrl: `${github.context.serverUrl}/${github.context.repo.owner}/${github.context.repo.repo}`,
        })
        core.setOutput('Response', build)
        break
      case 'deployment':
        const deployment = await sendDeploymentInfo(jira, {
          ...common,
          environment: getEnvironment(),
        })
        core.setOutput('Response', deployment)
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
