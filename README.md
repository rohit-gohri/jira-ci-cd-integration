<p align="center">
  
  [![Github Release](https://img.shields.io/github/v/release/rohit-gohri/jira-ci-cd-integration?style=flat-square)](https://github.com/rohit-gohri/jira-ci-cd-integration/releases)
  
  <a href="https://github.com/rohit-gohri/jira-ci-cd-integration/actions"><img alt="action status" src="https://github.com/rohit-gohri/jira-ci-cd-integration/workflows/build-test/badge.svg"></a>

</p>

# Jira CI/CD Integration

Integrate your CI/CD pipeline information into the Jira Builds/Deployments Panel.

> Only supports Jira Cloud. Does not support Jira Server (hosted)

![Builds Panel Preview](./docs/builds-panel.png)

## Prerequisites

### Generate Credentials

Generate new OAuth Credentials and copy

**See:** <https://support.atlassian.com/jira-cloud-administration/docs/integrate-with-self-hosted-tools-using-oauth/>

![OAuth Creds Screen](./docs/oauth-creds.png)

## Usage With Github Actions

### Add OAuth Creds as secrets to Github

**See:** <https://docs.github.com/en/actions/reference/encrypted-secrets>

- Add Client ID as `JIRA_CLIENT_ID`
- Add Client Secret as `JIRA_CLIENT_SECRET`

![Github Secrets](./docs/github-secrets.png)

### Update Github Workflow

#### Use in Builds Pipeline

```yaml
- name: Jira Integration
  if: ${{ always() }}
  uses: rohit-gohri/jira-ci-cd-integration@v0
  with:
    event_type: build
    state: ${{ job.status }}
    jira_instance: companyname # Subdomain for Jira Cloud
    client_id: ${{ secrets.JIRA_CLIENT_ID }}
    client_secret: ${{ secrets.JIRA_CLIENT_SECRET }}
```

#### Use in Deployment Pipeline

```yaml
- name: Jira Integration
  if: ${{ always() }}
  uses: rohit-gohri/jira-ci-cd-integration@v0
  with:
    event_type: deployment
    state: ${{ job.status }}
    issue: JCI-3, JCI-6 # Comma separated list of issues being deployed/released
    jira_instance: companyname # Subdomain for Jira Cloud
    client_id: ${{ secrets.JIRA_CLIENT_ID }}
    client_secret: ${{ secrets.JIRA_CLIENT_SECRET }}
```

#### Options

##### jira_instance

##### client_id

##### client_secret

##### event_type (optional)

"build" or "deployment", default is "build"

##### state (optional)

"successful"/"success", "failed", or "canceled" default is "successful"

##### issue (optional)

Will be parsed from branch name automatically if absent. Or you can provide it according to your own logic.
