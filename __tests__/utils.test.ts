import {jiraIssueRegexp} from '../src/jira/regex'

test('jira regex works', async () => {
  expect('12321 ISSUE-123456 1231'.match(jiraIssueRegexp)).toEqual([
    'ISSUE-123456',
  ])
  expect('ISSUE_1HI-123456'.match(jiraIssueRegexp)).toEqual([
    'ISSUE_1HI-123456',
  ])
  expect('I1-1'.match(jiraIssueRegexp)).toEqual(['I1-1'])
  // jira issue key must have a number after -
  expect('IS-'.match(jiraIssueRegexp)).toEqual(null)
  expect('IS-B'.match(jiraIssueRegexp)).toEqual(null)
  // jira issue key must have at least 2 characters before -
  expect('I-1'.match(jiraIssueRegexp)).toEqual(null)
  // jira issue key must start with a letter
  expect('1234-123456'.match(jiraIssueRegexp)).toEqual(null)
  expect('2022-02'.match(jiraIssueRegexp)).toEqual(null)
  expect('Numbers 12-52'.match(jiraIssueRegexp)).toEqual(null)
})
