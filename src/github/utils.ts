import * as core from '@actions/core'
import * as github from '@actions/github'
import type {PullRequestEvent, PushEvent} from '@octokit/webhooks-types'
import {getLogger} from '../utils/logger'
import {ValidState} from '../utils/types'
import {jiraIssueRegexp} from '../jira/regex'

export function getBranchName(): string | undefined {
  let branchName: string | undefined

  if (github.context.ref.startsWith('refs/heads')) {
    branchName = github.context.ref.split('/')[2]
  } else if (github.context.ref.startsWith('refs/pull')) {
    branchName = process.env.GITHUB_HEAD_REF
  }

  getLogger().debug(`BranchName: ${branchName}`)

  return branchName
}

export function getState(): ValidState {
  const state: 'success' | ValidState =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (core.getInput('state') as any) || 'successful'

  return state === 'success' ? 'successful' : state
}

/**
 * @see https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#push
 * @returns will give latest commit message if ̉push event
 */
export async function getCommitMessage(): Promise<string | undefined> {
  const token = core.getInput('token')
  let commitMessage = github.context.payload.head_commit?.message

  if (github.context.eventName === 'push') {
    const pushPayload = github.context.payload as PushEvent

    // if head_commit not available
    if (!commitMessage) {
      const latestCommit = pushPayload.commits.pop()
      commitMessage = latestCommit?.message
    }
  }
  // if PR
  if (!commitMessage && token && github.context.eventName === 'pull_request') {
    const prEvent = github.context.payload as PullRequestEvent
    const {head} = prEvent.pull_request
    const res = await github.getOctokit(token).rest.git.getCommit({
      commit_sha: head.sha,
      repo: head.repo.name,
      owner: head.repo.owner.login,
    })
    commitMessage = res.data.message
  }

  getLogger().debug(`CommitMessage: ${commitMessage}`)

  return commitMessage
}

export async function getIssueKeys(): Promise<string[]> {
  const branchName = getBranchName()
  const commitMessage = await getCommitMessage()

  const fromInput = core.getInput('issue')?.match(jiraIssueRegexp) ?? []

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
