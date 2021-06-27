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
  return (latestCommit as {message: string})?.message
}

export function getIssueKeys(): string[] {
  const branchName = getBranchName()
  getLogger().debug(`BranchName: ${branchName}`)

  const fromBranch =
    core.getInput('issue') ||
    branchName?.match(/(\w+)-(\d+)/)?.[0] ||
    process.env.JIRA_DEFAULT_TEST_ISSUE

  const issueKeys = [fromBranch].filter(Boolean) as string[]
  if (!issueKeys.length) {
    throw new Error(
      `Could not parse any issue keys. Branch name, "${branchName}"`,
    )
  }

  return issueKeys
}
