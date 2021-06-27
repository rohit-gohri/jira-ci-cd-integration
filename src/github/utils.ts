import * as core from '@actions/core'
import * as github from '@actions/github'

export function getIssueKey(): string {
  const branchName = github.context.ref
  const issueKey =
    core.getInput('issue') ||
    branchName.match(/(\w+)-(\d+)/)?.[0] ||
    process.env.JIRA_DEFAULT_TEST_ISSUE

  if (!issueKey) {
    throw new Error(
      `Could not parse issue key from branch name, "${branchName}"`,
    )
  }
  return issueKey
}
