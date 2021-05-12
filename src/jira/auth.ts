import {stringify} from 'querystring'
import fetch from 'undici-fetch'

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
    body: stringify({
      audience: 'api.atlassian.com',
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  })
  const json = await res.json()

  return json
}

/**
 * @param jiraInstance
 * @returns
 * @see https://developer.atlassian.com/cloud/jira/software/integrate-jsw-cloud-with-onpremises-tools/#making-api-calls
 */
export async function getCloudId(jiraInstance: string): Promise<string> {
  const res = await fetch(
    `https://${jiraInstance}.atlassian.net/_edge/tenant_info`,
  )
  const json: {cloudId: string} = await res.json()

  return json.cloudId
}