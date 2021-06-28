/* eslint-disable no-case-declarations */
import envCi, {GitLabEnv} from '@relative-ci/env-ci'
import createJiraAPI from '../jira/api'
import {sendBuildInfo} from '../jira/builds'
import {sendDeploymnetInfo} from '../jira/deployments'
import {getLogger, setLogger} from '../utils/logger'
import {getInputs} from './input'
import {getBranchName, getIssueKeys, getState} from './utils'

async function run(): Promise<void> {
  try {
    setLogger(console)
    const logger = getLogger()
    // Using this type as this has the most supported fields
    const env = envCi() as GitLabEnv
    const inputs = getInputs()
    const jira = await createJiraAPI(inputs)

    const state = getState()
    const branchName = getBranchName()
    const issueKeys = await getIssueKeys()

    switch (inputs.event) {
      case 'build':
        const build = await sendBuildInfo(jira, {
          name: process.env.BUILD_NAME || env.name,
          state,
          commit: env.commit,
          branchName,
          issueKeys,
          buildUrl: env.buildUrl,
          repoUrl: env.slug,
          buildNumber: Number(env.build),
          pipelineId: `${env.slug}-${env.service}`,
        })
        logger.info('Response', build)
        break
      case 'deployment':
        const deployment = await sendDeploymnetInfo(jira, {
          name: process.env.BUILD_NAME || env.name,
          state,
          commit: env.commit,
          issueKeys,
          buildUrl: env.buildUrl,
          buildNumber: Number(env.job),
          pipelineId: env.build,
        })
        logger.info('Response', deployment)
        break
      default:
        throw new Error(`Invalid event_type, "${inputs.event}"`)
    }
    logger.info('Done', new Date().toTimeString())
  } catch (error) {
    console.error(error, 'Failed')
  }
}

run()
