[![Github Release](https://img.shields.io/github/v/release/rohit-gohri/jira-ci-cd-integration?style=flat)](https://github.com/rohit-gohri/jira-ci-cd-integration/releases)
<a href="https://github.com/rohit-gohri/jira-ci-cd-integration/actions"><img alt="action status" src="https://github.com/rohit-gohri/jira-ci-cd-integration/workflows/build-test/badge.svg"></a>
<a href="https://github.com/rohit-gohri/jira-ci-cd-integration/actions"><img alt="action status" src="https://github.com/rohit-gohri/jira-ci-cd-integration/workflows/release/badge.svg"></a>

# Jira Development Integration

Integrate your CI/CD pipeline's Build and Deployment information into the Jira Development Panel.

![Builds Panel Preview](./docs/builds-panel.png)

> Only supports Jira Cloud. Does not support Jira Server (hosted)

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
    issue: JCI-3, JCI-6 # Comma separated list of issues being deployed/released. You are expected to generate this yourself in a previous step
    jira_instance: companyname # Subdomain for Jira Cloud
    client_id: ${{ secrets.JIRA_CLIENT_ID }}
    client_secret: ${{ secrets.JIRA_CLIENT_SECRET }}
```

## Options

### jira_instance (JIRA_INSTANCE)

Sub Domain of Jira Cloud Instance

### client_id (JIRA_CLIENT_ID)

ClientID of OAuth Creds

### client_secret (JIRA_CLIENT_SECRET)

Client Secret of OAuth Creds

### event_type (JIRA_EVENT_TYPE) (optional)

"build" or "deployment", (default is "build")

### state (optional)

"successful"/"success", "failed", or "canceled" (default is "successful")

### issue (optional)

Will be parsed from branch name automatically if absent. Or you can provide it according to your own logic. Can be multiple issues.

### token (optional)

Github Token to get commit message in Pull Request Events. Since github context doesn't have commit message, we use the Github API to get it from sha.
