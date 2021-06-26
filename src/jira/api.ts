/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type */
/**
 * Generated from OpenAPI file and [fetch-openapi](https://github.com/kogosoftwarellc/open-api/tree/master/packages/fetch-openapi)
 * @see https://redocly.github.io/redoc/?url=https://developer.atlassian.com/cloud/jira/software/on-premise-swagger.json
 */
import fetch from 'undici-fetch'
import {getCloudId, getJWT} from './auth'
import {operations} from './schema'

type OperationBody<
  T extends keyof operations
> = 'requestBody' extends keyof operations[T]
  ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error requestBody is dynamic
    operations[T]['requestBody']['content']['application/json']
  : never

export default async function createApi(options: {
  jiraInstance: string
  clientId: string
  clientSecret: string
}) {
  const basePath = ''
  const endpoint = 'https://api.atlassian.com'
  const cloudId = await getCloudId(options.jiraInstance)

  const securityHandlers: Record<string, Function> = {
    atlassianCloudOauth: async (headers: Record<string, string>) => {
      headers['Authorization'] = `Bearer ${await getJWT(
        options.clientId,
        options.clientSecret,
      )}`
      return true
    },
  }

  const handleSecurity = async (
    security: string | any[],
    headers: {},
    params: any,
    operationId: string,
  ) => {
    for (let i = 0, ilen = security.length; i < ilen; i++) {
      const scheme = security[i]
      const schemeParts = Object.keys(scheme)
      for (let j = 0, jlen = schemeParts.length; j < jlen; j++) {
        const schemePart = schemeParts[j]
        const fulfilsSecurityRequirements = securityHandlers[schemePart]
          ? await securityHandlers[schemePart](headers, params, schemePart)
          : false
        if (fulfilsSecurityRequirements) {
          return
        }
      }
    }
    throw new Error(
      `No security scheme was fulfilled by the provided securityHandlers for operation ${operationId}`,
    )
  }
  const ensureRequiredSecurityHandlersExist = () => {
    const requiredSecurityHandlers = ['atlassianCloudOauth']
    for (let i = 0, ilen = requiredSecurityHandlers.length; i < ilen; i++) {
      const requiredSecurityHandler = requiredSecurityHandlers[i]
      if (typeof securityHandlers[requiredSecurityHandler] !== 'function') {
        throw new Error(
          `Expected to see a security handler for scheme "${requiredSecurityHandler}" in options.securityHandlers`,
        )
      }
    }
  }
  ensureRequiredSecurityHandlersExist()
  const buildQuery = (obj: {
    [x: string]: any
    _updateSequenceNumber?: any
    _updateSequenceId?: any
  }) => {
    return Object.keys(obj)
      .filter(key => typeof obj[key] !== 'undefined')
      .map(key => {
        const value = obj[key]
        if (value === undefined) {
          return ''
        }
        if (value === null) {
          return key
        }
        if (Array.isArray(value)) {
          if (value.length) {
            return `${key}=${value.map(encodeURIComponent).join(`&${key}=`)}`
          } else {
            return ''
          }
        } else {
          return `${key}=${encodeURIComponent(value)}`
        }
      })
      .join('&')
  }
  return {
    async submitBuilds(params: any, body: OperationBody<'submitBuilds'>) {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'submitBuilds',
      )
      return fetch(`${endpoint + basePath}/rest/builds/0.1/bulk`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      })
    },
    async deleteBuildsByProperty(params: {_updateSequenceNumber: any}) {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'deleteBuildsByProperty',
      )
      return fetch(
        `${endpoint + basePath}/rest/builds/0.1/bulkByProperties` +
          `?${buildQuery({
            _updateSequenceNumber: params._updateSequenceNumber,
          })}`,

        {
          method: 'DELETE',
          headers,
        },
      )
    },
    async getBuildByKey(params: {pipelineId: any; buildNumber: any}) {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'getBuildByKey',
      )
      return fetch(
        `${endpoint + basePath}/rest/builds/0.1/pipelines/${
          params.pipelineId
        }/builds/${params.buildNumber}`,
        {
          method: 'GET',
          headers,
        },
      )
    },
    async deleteBuildByKey(params: {
      pipelineId: any
      buildNumber: any
      _updateSequenceNumber: any
    }) {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'deleteBuildByKey',
      )
      return fetch(
        `${endpoint + basePath}/rest/builds/0.1/pipelines/${
          params.pipelineId
        }/builds/${params.buildNumber}` +
          `?${buildQuery({
            _updateSequenceNumber: params._updateSequenceNumber,
          })}`,

        {
          method: 'DELETE',
          headers,
        },
      )
    },
    async storeDevelopmentInformation(
      params: {cloudId: any},
      body: OperationBody<'storeDevelopmentInformation'>,
    ) {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'storeDevelopmentInformation',
      )
      return fetch(
        `${endpoint + basePath}/jira/devinfo/0.1/cloud/${cloudId}/bulk`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(body),
        },
      )
    },
    async getRepository(params: {cloudId: any; repositoryId: any}) {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'getRepository',
      )
      return fetch(
        `${endpoint + basePath}/jira/devinfo/0.1/cloud/${cloudId}/repository/${
          params.repositoryId
        }`,
        {
          method: 'GET',
          headers,
        },
      )
    },
    async deleteRepository(params: {
      cloudId: any
      repositoryId: any
      _updateSequenceId: any
    }) {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'deleteRepository',
      )
      return fetch(
        `${endpoint + basePath}/jira/devinfo/0.1/cloud/${cloudId}/repository/${
          params.repositoryId
        }` +
          `?${buildQuery({
            _updateSequenceId: params._updateSequenceId,
          })}`,

        {
          method: 'DELETE',
          headers,
        },
      )
    },
    async deleteByProperties(params: {cloudId: any; _updateSequenceId: any}) {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'deleteByProperties',
      )
      return fetch(
        `${
          endpoint + basePath
        }/jira/devinfo/0.1/cloud/${cloudId}/bulkByProperties` +
          `?${buildQuery({
            _updateSequenceId: params._updateSequenceId,
          })}`,

        {
          method: 'DELETE',
          headers,
        },
      )
    },
    async existsByProperties(params: {cloudId: any; _updateSequenceId: any}) {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'existsByProperties',
      )
      return fetch(
        `${
          endpoint + basePath
        }/jira/devinfo/0.1/cloud/${cloudId}/existsByProperties` +
          `?${buildQuery({
            _updateSequenceId: params._updateSequenceId,
          })}`,

        {
          method: 'GET',
          headers,
        },
      )
    },
    async deleteEntity(params: {
      cloudId: any
      repositoryId: any
      entityType: any
      entityId: any
      _updateSequenceId: any
    }) {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'deleteEntity',
      )
      return fetch(
        `${endpoint + basePath}/jira/devinfo/0.1/cloud/${cloudId}/repository/${
          params.repositoryId
        }/${params.entityType}/${params.entityId}` +
          `?${buildQuery({
            _updateSequenceId: params._updateSequenceId,
          })}`,

        {
          method: 'DELETE',
          headers,
        },
      )
    },
    async submitDeployments(
      params: any,
      body: OperationBody<'submitDeployments'>,
    ) {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'submitDeployments',
      )
      return fetch(`${endpoint + basePath}/rest/deployments/0.1/bulk`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      })
    },
    async deleteDeploymentsByProperty(params: {_updateSequenceNumber: any}) {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'deleteDeploymentsByProperty',
      )
      return fetch(
        `${endpoint + basePath}/rest/deployments/0.1/bulkByProperties` +
          `?${buildQuery({
            _updateSequenceNumber: params._updateSequenceNumber,
          })}`,

        {
          method: 'DELETE',
          headers,
        },
      )
    },
    async getDeploymentByKey(params: {
      pipelineId: any
      environmentId: any
      deploymentSequenceNumber: any
    }) {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'getDeploymentByKey',
      )
      return fetch(
        `${endpoint + basePath}/rest/deployments/0.1/pipelines/${
          params.pipelineId
        }/environments/${params.environmentId}/deployments/${
          params.deploymentSequenceNumber
        }`,
        {
          method: 'GET',
          headers,
        },
      )
    },
    async deleteDeploymentByKey(params: {
      pipelineId: any
      environmentId: any
      deploymentSequenceNumber: any
      _updateSequenceNumber: any
    }) {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'deleteDeploymentByKey',
      )
      return fetch(
        `${endpoint + basePath}/rest/deployments/0.1/pipelines/${
          params.pipelineId
        }/environments/${params.environmentId}/deployments/${
          params.deploymentSequenceNumber
        }` +
          `?${buildQuery({
            _updateSequenceNumber: params._updateSequenceNumber,
          })}`,

        {
          method: 'DELETE',
          headers,
        },
      )
    },
  }
}
