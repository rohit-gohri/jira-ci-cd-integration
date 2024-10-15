import envCi, {GitLabEnv} from 'env-ci'
import {getLogger} from '../utils/logger'
import {ValidState} from '../utils/types'
import {jiraIssueRegexp} from '../jira/regex'

// Using this type as this has the most supported fields
const env = envCi() as GitLabEnv

export function getBranchName(): string | undefined {
  const branchName: string = env.branch

  getLogger().debug(`BranchName: ${branchName}`)

  return branchName
}

export function getState(): ValidState {
  // @ts-expect-error cast type
  const state: 'success' | 'failure' | ValidState =
    process.env.BUILD_STATE ||
    process.env.CI_JOB_STATUS ||
    process.env.DRONE_BUILD_STATUS ||
    'successful'

  if (state === 'success') {
    return 'successful'
  }

  if (state === 'failure') {
    return 'failed'
  }

  return state
}

/**
 * @see https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#push
 * @returns will give latest commit message if ̉push event
 */
export async function getCommitMessage(): Promise<string | undefined> {
  const commitMessage =
    process.env.COMMIT_MESSAGE ||
    // gitlab
    process.env.CI_COMMIT_MESSAGE ||
    // drone
    process.env.DRONE_COMMIT_MESSAGE ||
    // azure
    process.env.BUILD_SOURCEVERSIONMESSAGE ||
    undefined

  getLogger().debug(`CommitMessage: ${commitMessage}`)

  return commitMessage
}

export async function getIssueKeys(): Promise<string[]> {
  const branchName = getBranchName()
  const commitMessage = await getCommitMessage()

  const fromInput = process.env.JIRA_ISSUES?.match(jiraIssueRegexp) ?? []

  const fromBranch = branchName?.match(jiraIssueRegexp) ?? []

  const fromCommit = commitMessage?.match(jiraIssueRegexp) ?? []

  const issueKeys = [...fromInput, ...fromBranch, ...fromCommit].filter(
    (value, index, array) => {
      // Deduplicate and remove nill values
      return value && array.indexOf(value) === index
    },
  )

  if (!issueKeys.length && process.env.JIRA_DEFAULT_TEST_ISSUE) {
    issueKeys.push(process.env.JIRA_DEFAULT_TEST_ISSUE)
  }

  getLogger().debug(`IssueKeys: "${issueKeys}"`)

  return issueKeys
}
