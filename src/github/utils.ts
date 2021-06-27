import * as core from '@actions/core'
import * as github from '@actions/github'
import {getLogger} from '../utils/logger'

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

export function getState(): 'successful' | 'failed' | 'cancelled' {
  const state: 'successful' | 'success' | 'failed' | 'cancelled' =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (core.getInput('state') as any) || 'successful'

  return state === 'success' ? 'successful' : state
}

/**
 * @see https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#push
 * @returns will give latest commit message if ̉push event
 */
export function getCommitMessage(): string | undefined {
  const latestCommit = (github.context.payload.commits as unknown[])?.pop()
  const commitMessage = (latestCommit as {message: string})?.message

  getLogger().debug(`CommitMessage: ${commitMessage}`)

  return commitMessage
}

export function getIssueKeys(): string[] {
  const branchName = getBranchName()
  const commitMessage = getCommitMessage()

  const fromInput = core.getInput('issue')

  const fromBranch = branchName?.match(/(\w+)-(\d+)/)?.[0]

  const fromCommit = commitMessage?.match(/(\w+)-(\d+)/)?.[0]

  const issueKeys = [fromInput, fromBranch, fromCommit].filter(
    (value, index, array) => {
      // Deduplicate and remove nill values
      return value != null && array.indexOf(value) === index
    },
  ) as string[]

  if (!issueKeys.length && process.env.JIRA_DEFAULT_TEST_ISSUE) {
    issueKeys.push(process.env.JIRA_DEFAULT_TEST_ISSUE)
  }

  if (!issueKeys.length) {
    throw new Error(
      `Could not parse any issue keys. Branch name, "${branchName}"`,
    )
  }

  getLogger().debug(`IssueKeys: "${issueKeys}"`)

  return issueKeys
}
