<p align="center">
  <a href="https://github.com/rohit-gohri/jira-ci-cd-integration/actions"><img alt="action status" src="https://github.com/rohit-gohri/jira-ci-cd-integration/workflows/build-test/badge.svg"></a>
</p>

# Jira CI/CD Integration

## Prerequisite

### Generate Credentials

See <https://support.atlassian.com/jira-cloud-administration/docs/integrate-with-self-hosted-tools-using-oauth/>

Generate OAuth Credentials : Client ID and Client Secret

## Usage

### With Github Actions

```yaml
- name: Jira Integration
  if: ${{ always() }}
  uses: rohit-gohri/jira-ci-cd-integration@v1
  with:
    event_type: build
    state: ${{ job.status }}
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

"successful", "failed", or "canceled" default is "successful"

##### issue (optional)

Will be parsed from branch name automatically if absent. Or you can provide it according to your own logic.
