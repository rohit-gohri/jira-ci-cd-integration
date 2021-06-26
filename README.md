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
- uses: rohit-gohri/jira-ci-cd-integration@v1
  with:
    jira_instance: companyname # Subdomain for Jira Cloud
    client_id: ${{ secrets.JIRA_CLIENT_ID }}
    client_secret: ${{ secrets.JIRA_CLIENT_SECRET }}
    # Optional #
    event_type: build # Optional ("build" or "deployment", default is "build")
    state: successful # Optional ("successful" or "failed", default is "successful")
    issue: JCI-2 # Optional (Will be parsed from branch name automatically if absent)
```
