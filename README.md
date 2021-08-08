[![Github Release](https://img.shields.io/github/v/release/rohit-gohri/jira-ci-cd-integration?style=flat)](https://github.com/rohit-gohri/jira-ci-cd-integration/releases)
[![Docker Release](https://img.shields.io/docker/v/boringdownload/jira-integration)](https://hub.docker.com/repository/docker/boringdownload/jira-integration)
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

[![test-release workflow](https://github.com/rohit-gohri/jira-ci-cd-integration/actions/workflows/test-release.yml/badge.svg)](https://github.com/rohit-gohri/jira-ci-cd-integration/actions/workflows/test-release.yml)

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
    state: ${{ job.status }}
    jira_instance: companyname # Subdomain for Jira Cloud
    client_id: ${{ secrets.JIRA_CLIENT_ID }}
    client_secret: ${{ secrets.JIRA_CLIENT_SECRET }}
```

#### Use in Deployment Pipeline

Just provide an evironment to send a deployment event instead of a build event.

```yaml
- name: Jira Integration
  if: ${{ always() }}
  uses: rohit-gohri/jira-ci-cd-integration@v0
  with:
    state: ${{ job.status }}
    environment: staging
    issue: JCI-3, JCI-6 # Comma separated list of issues being deployed/released. You are expected to generate this yourself in a previous step
    jira_instance: companyname # Subdomain for Jira Cloud
    client_id: ${{ secrets.JIRA_CLIENT_ID }}
    client_secret: ${{ secrets.JIRA_CLIENT_SECRET }}
```

## Use with Any Other CI/CD Providers

Supported in providers which support running arbitrary Docker images (like Drone, Gitlab CI).

Docker Images are available from:

- Docker Hub: `boringdownload/jira-integration`
- Github Container Registry: `ghcr.io/rohit-gohri/jira-ci-cd-integration`
- Gitlab Container Registry: `registry.gitlab.com/rohit-gohri/jira-ci-cd-integration`

Pick whatever you want and is convenient for you.

Configuration for the Docker image is through env vars. Read more in [options](#options).

### Drone.io

[![Build Status](https://cloud.drone.io/api/badges/rohit-gohri/jira-ci-cd-integration/status.svg?ref=refs/tags/v0)](https://cloud.drone.io/rohit-gohri/jira-ci-cd-integration)

Add secrets for `JIRA_CLIENT_ID` and `JIRA_CLIENT_SECRET` and then add this to your pipeline:

```yaml
steps:
  - name: jira-integration
    image: boringdownload/jira-integration:v0
    environment:
      BUILD_NAME: drone-pipeline
      JIRA_INSTANCE: companyname
      JIRA_CLIENT_ID:
        from_secret: jira_client_id
      JIRA_CLIENT_SECRET:
        from_secret: jira_client_secret
```

To send deployment information just promote the build and it will send a deployment info.

### Gitlab CI/CD

[![pipeline status](https://gitlab.com/rohit-gohri/jira-ci-cd-integration/badges/v0/pipeline.svg)](https://gitlab.com/rohit-gohri/jira-ci-cd-integration/-/commits/v0)

[Add a CI/CD Variable to your project](https://docs.gitlab.com/ee/ci/variables/#add-a-cicd-variable-to-a-project) for `JIRA_CLIENT_ID` and `JIRA_CLIENT_SECRET` (remember to mask them) and then add these steps to your pipeline (we use `.post` stage so it runs last)

#### Add to .post stage to send Build Info

```yaml
jira-build-integration-on-success:
  stage: .post
  when: on_success
  image: registry.gitlab.com/rohit-gohri/jira-ci-cd-integration:v0
  script: jira-integration
  variables:
    BUILD_NAME: gitlab-pipeline-name
    JIRA_INSTANCE: companyname

jira-build-integration-on-failure:
  extends: jira-build-integration-on-success
  when: on_failure
  variables:
    BUILD_STATE: failure
```

#### Use with Gitlab Environments to send Release Info

If you provide an environment block it will instead send a deployment event instead of build event.

```yaml
jira-deploy-integration-on-success:
  extends: jira-build-integration-on-success
  environment:
    name: production

jira-deploy-integration-on-failure:
  extends: jira-build-integration-on-failure
  environment:
    name: production
```

## Options

Provide these options directly in case of Github Actions or via the env variable in the brackets for Docker.

### Inputs

#### jira_instance (JIRA_INSTANCE)

Sub Domain of Jira Cloud Instance. This part of the url: `https://<jira_instance>.atlassian.net`

#### client_id (JIRA_CLIENT_ID)

ClientID of OAuth Creds

#### client_secret (JIRA_CLIENT_SECRET)

Client Secret of OAuth Creds

#### event_type (JIRA_EVENT_TYPE) (optional)

"build" or "deployment", (default is "build")

#### state (BUILD_STATE) (optional)

"successful"/"success", "failed", or "canceled" (default is "unknown")

#### issue (JIRA_ISSUES) (optional)

Will be parsed from branch name automatically if absent. Or you can provide it according to your own logic. Can be multiple issues.

#### token (optional)

> Only for Github Action

Github Token to get commit message in Pull Request Events. Since github context doesn't have commit message, we use the Github API to get it from sha.

### Pipeline Info

#### Commit Message (COMMIT_MESSAGE)

If you have the jira id in the commit message then provide this.

#### Pipeline Name (BUILD_NAME)

A name for your pipeline

#### Environment Name (BUILD_ENVIROMENT) (optional)

> NOTE: Only for Deployment events

A name for your environment. We try to automatically infer this from your CI/CD provider.

#### Environment Type (BUILD_ENVIROMENT_TYPE) (optional)

> NOTE: Automatically inferred from environment name

We try to automatically parse this from environment but if you want to override then provide one of (`unmapped`, `development`, `testing`, `staging`, `production`)
