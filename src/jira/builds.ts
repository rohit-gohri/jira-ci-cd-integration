import fetch from 'isomorphic-fetch'

/**
 * @see https://developer.atlassian.com/cloud/jira/software/rest/api-group-builds/#api-builds-0-1-bulk-post
 */
export async function createBuild(
  jwt: string,
  cloudId: string,
): Promise<unknown> {
  const res = await fetch(
    `https://api.atlassian.com/jira/builds/0.1/cloud/${cloudId}/bulk`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        schemaVersion: '1.0',
        properties: {
          repository: process.env.GITHUB_REPOSITORY,
          runId: process.env.GITHUB_RUN_ID,
          action: process.env.GITHUB_ACTION,
          jobId: process.env.GITHUB_JOB,
        },
        providerMetadata: {
          product: `rohit-gohri/jira-github-action`,
        },
        builds: [
          {
            schemaVersion: '1.0',
            pipelineId: process.env.GITHUB_RUN_ID,
            buildNumber: process.env.GITHUB_RUN_NUMBER,
            updateSequenceNumber: Date.now(),
            displayName: process.env.GITHUB_WORKFLOW,
            description: `${process.env.GITHUB_WORKFLOW} triggered by ${process.env.GITHUB_EVENT_NAME} for commit ${process.env.GITHUB_SHA}`,
            url: `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,
            state: `successful`,
            lastUpdated: '2018-01-20T23:27:25.000Z',
            // TODO: Parse from branch name
            issueKeys: [],
            testInfo: {
              totalNumber: 150,
              numberPassed: 145,
              numberFailed: 5,
              numberSkipped: 0,
            },
            references: [
              {
                commit: {
                  id: process.env.GITHUB_SHA,
                  repositoryUri: `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}`,
                },
                ref: {
                  // TODO: slice refs/heads/ from this
                  name: process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF,
                  uri: `${process.env.GITHUB_SERVER_URL}/${
                    process.env.GITHUB_REPOSITORY
                  }/tree/${
                    process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF
                  }`,
                },
              },
            ],
          },
        ],
      }),
    },
  )
  const json: {
    acceptedBuilds: unknown[]
    rejectedBuilds: unknown[]
    unknownIssueKeys: string[]
  } = await res.json()

  return json
}
