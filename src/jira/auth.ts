import fetch from 'isomorphic-fetch'
import {getLogger} from '../utils/logger'

/**
    curl --request POST \
    --url 'https://api.atlassian.com/oauth/token' \
    --header 'Content-Type: application/json' \
    --data '{
        "audience": "api.atlassian.com", 
        "grant_type":"client_credentials",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET
    }'
 * @see https://developer.atlassian.com/cloud/jira/software/integrate-jsw-cloud-with-onpremises-tools/#authorizing-your-integration
 */
export async function getJWT(
  clientId: string,
  clientSecret: string,
): Promise<string> {
  const res = await fetch('https://api.atlassian.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      audience: 'api.atlassian.com',
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  })
  if (res.status >= 400) {
    throw new Error(
      `Auth Error! Response ${res.status}:\n ${JSON.stringify(
        await res.text(),
        null,
        2,
      )}`,
    )
  }
  const {access_token} = await res.json()
  return access_token
}

/**
 * @param jiraInstance
 * @returns
 * @see https://developer.atlassian.com/cloud/jira/software/integrate-jsw-cloud-with-onpremises-tools/#making-api-calls
 */
export async function getCloudId(jiraInstance: string): Promise<string> {
  try {
    const res = await fetch(
      `https://${jiraInstance}.atlassian.net/_edge/tenant_info`,
    )
    const json: {cloudId: string} = await res.json()

    return json.cloudId
  } catch (err) {
    getLogger().info(
      err,
      'Could not get cloudId, check "jiraInstance" is correct',
    )
    throw err
  }
}
