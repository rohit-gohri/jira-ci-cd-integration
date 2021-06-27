/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type */
/**
 * Generated from OpenAPI file and [fetch-openapi](https://github.com/kogosoftwarellc/open-api/tree/master/packages/fetch-openapi)
 * @see https://redocly.github.io/redoc/?url=https://developer.atlassian.com/cloud/jira/software/on-premise-swagger.json
 */
import fetch from 'isomorphic-fetch'
import {ReturnTypeResolved} from '../utils/types'
import {getCloudId, getJWT} from './auth'
import {operations} from './schema'

type OperationBody<
  T extends keyof operations
> = 'requestBody' extends keyof operations[T]
  ? // @ts-expect-error requestBody is dynamic
    operations[T]['requestBody']['content']['application/json']
  : never

type ResponseBody<T extends keyof operations> = Promise<
  202 extends keyof operations[T]['responses']
    ? // @ts-expect-error requestBody is dynamic
      operations[T]['responses'][202]['content']['application/json']
    : 200 extends keyof operations[T]['responses']
    ? // @ts-expect-error requestBody is dynamic
      operations[T]['responses'][200]['content']['application/json']
    : never
>

export type Jira = ReturnTypeResolved<typeof createApi>

export default async function createApi(options: {
  jiraInstance: string
  clientId: string
  clientSecret: string
  logger?: {debug: typeof console.log; info: typeof console.log}
}) {
  const basePath = '/jira'
  const endpoint = 'https://api.atlassian.com'
  const cloudId = await getCloudId(options.jiraInstance)
  const {logger} = options

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
    cloudId,
    async submitBuilds(
      params: any,
      body: OperationBody<'submitBuilds'>,
    ): ResponseBody<'submitBuilds'> {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'submitBuilds',
      )
      const result = await fetch(
        `${endpoint + basePath}/builds/0.1/cloud/${cloudId}/bulk`,
        {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        },
      )
      logger?.debug(`Requesting url: ${result.url}}`)
      const res = await result.json()
      if (result.status >= 400) {
        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`)
      }
      return res
    },
    async deleteBuildsByProperty(params: {
      _updateSequenceNumber: any
    }): ResponseBody<'deleteBuildsByProperty'> {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'deleteBuildsByProperty',
      )
      const result = await fetch(
        `${endpoint + basePath}/builds/0.1/cloud/${cloudId}/bulkByProperties` +
          `?${buildQuery({
            _updateSequenceNumber: params._updateSequenceNumber,
          })}`,

        {
          method: 'DELETE',
          headers,
        },
      )
      logger?.debug(`Requesting url: ${result.url}`)
      const res = await result.json()
      if (result.status >= 400) {
        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`)
      }
      return res
    },
    async getBuildByKey(params: {
      pipelineId: any
      buildNumber: any
    }): ResponseBody<'getBuildByKey'> {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'getBuildByKey',
      )
      const result = await fetch(
        `${endpoint + basePath}/builds/0.1/cloud/${cloudId}/pipelines/${
          params.pipelineId
        }/builds/${params.buildNumber}`,
        {
          method: 'GET',
          headers,
        },
      )
      logger?.debug(`Requesting url: ${result.url}`)
      const res = await result.json()
      if (result.status >= 400) {
        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`)
      }
      return res
    },
    async deleteBuildByKey(params: {
      pipelineId: any
      buildNumber: any
      _updateSequenceNumber: any
    }): ResponseBody<'deleteBuildByKey'> {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'deleteBuildByKey',
      )
      const result = await fetch(
        `${endpoint + basePath}/builds/0.1/cloud/${cloudId}/pipelines/${
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
      logger?.debug(`Requesting url: ${result.url}`)
      const res = await result.json()
      if (result.status >= 400) {
        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`)
      }
      return res
    },
    async storeDevelopmentInformation(
      params: {},
      body: OperationBody<'storeDevelopmentInformation'>,
    ): ResponseBody<'storeDevelopmentInformation'> {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'storeDevelopmentInformation',
      )
      const result = await fetch(
        `${endpoint + basePath}/devinfo/0.1/cloud/${cloudId}/bulk`,
        {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        },
      )
      logger?.debug(`Requesting url: ${result.url}`)
      const res = await result.json()
      if (result.status >= 400) {
        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`)
      }
      return res
    },
    async getRepository(params: {
      repositoryId: any
    }): ResponseBody<'getRepository'> {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'getRepository',
      )
      const result = await fetch(
        `${endpoint + basePath}/devinfo/0.1/cloud/${cloudId}/repository/${
          params.repositoryId
        }`,
        {
          method: 'GET',
          headers,
        },
      )
      logger?.debug(`Requesting url: ${result.url}`)
      const res = await result.json()
      if (result.status >= 400) {
        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`)
      }
      return res
    },
    async deleteRepository(params: {
      repositoryId: any
      _updateSequenceId: any
    }): ResponseBody<'deleteRepository'> {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'deleteRepository',
      )
      const result = await fetch(
        `${endpoint + basePath}/devinfo/0.1/cloud/${cloudId}/repository/${
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
      logger?.debug(`Requesting url: ${result.url}`)
      const res = await result.json()
      if (result.status >= 400) {
        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`)
      }
      return res
    },
    async deleteByProperties(params: {
      _updateSequenceId: any
    }): ResponseBody<'deleteByProperties'> {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'deleteByProperties',
      )
      const result = await fetch(
        `${endpoint + basePath}/devinfo/0.1/cloud/${cloudId}/bulkByProperties` +
          `?${buildQuery({
            _updateSequenceId: params._updateSequenceId,
          })}`,

        {
          method: 'DELETE',
          headers,
        },
      )
      logger?.debug(`Requesting url: ${result.url}`)
      const res = await result.json()
      if (result.status >= 400) {
        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`)
      }
      return res
    },
    async existsByProperties(params: {
      _updateSequenceId: any
    }): ResponseBody<'existsByProperties'> {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'existsByProperties',
      )
      const result = await fetch(
        `${
          endpoint + basePath
        }/devinfo/0.1/cloud/${cloudId}/existsByProperties` +
          `?${buildQuery({
            _updateSequenceId: params._updateSequenceId,
          })}`,

        {
          method: 'GET',
          headers,
        },
      )
      logger?.debug(`Requesting url: ${result.url}`)
      const res = await result.json()
      if (result.status >= 400) {
        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`)
      }
      return res
    },
    async deleteEntity(params: {
      repositoryId: any
      entityType: any
      entityId: any
      _updateSequenceId: any
    }): ResponseBody<'deleteEntity'> {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'deleteEntity',
      )
      const result = await fetch(
        `${endpoint + basePath}/devinfo/0.1/cloud/${cloudId}/repository/${
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
      logger?.debug(`Requesting url: ${result.url}`)
      const res = await result.json()
      if (result.status >= 400) {
        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`)
      }
      return res
    },
    async submitDeployments(
      params: any,
      body: OperationBody<'submitDeployments'>,
    ): ResponseBody<'submitDeployments'> {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'submitDeployments',
      )
      const result = await fetch(
        `${endpoint + basePath}/deployments/0.1/cloud/${cloudId}/bulk`,
        {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        },
      )
      logger?.debug(`Requesting url: ${result.url}`)
      const res = await result.json()
      if (result.status >= 400) {
        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`)
      }
      return res
    },
    async deleteDeploymentsByProperty(params: {
      _updateSequenceNumber: any
    }): ResponseBody<'deleteDeploymentsByProperty'> {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'deleteDeploymentsByProperty',
      )
      const result = await fetch(
        `${
          endpoint + basePath
        }/deployments/0.1/cloud/${cloudId}/bulkByProperties` +
          `?${buildQuery({
            _updateSequenceNumber: params._updateSequenceNumber,
          })}`,

        {
          method: 'DELETE',
          headers,
        },
      )
      logger?.debug(`Requesting url: ${result.url}`)
      const res = await result.json()
      if (result.status >= 400) {
        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`)
      }
      return res
    },
    async getDeploymentByKey(params: {
      pipelineId: any
      environmentId: any
      deploymentSequenceNumber: any
    }): ResponseBody<'getDeploymentByKey'> {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'getDeploymentByKey',
      )
      const result = await fetch(
        `${endpoint + basePath}/deployments/0.1/cloud/${cloudId}/pipelines/${
          params.pipelineId
        }/environments/${params.environmentId}/deployments/${
          params.deploymentSequenceNumber
        }`,
        {
          method: 'GET',
          headers,
        },
      )
      logger?.debug(`Requesting url: ${result.url}`)
      const res = await result.json()
      if (result.status >= 400) {
        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`)
      }
      return res
    },
    async deleteDeploymentByKey(params: {
      pipelineId: any
      environmentId: any
      deploymentSequenceNumber: any
      _updateSequenceNumber: any
    }): ResponseBody<'deleteDeploymentByKey'> {
      const headers = {}
      await handleSecurity(
        [{atlassianCloudOauth: []}],
        headers,
        params,
        'deleteDeploymentByKey',
      )
      const result = await fetch(
        `${endpoint + basePath}/deployments/0.1/cloud/${cloudId}/pipelines/${
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
      logger?.debug(`Requesting url: ${result.url}`)
      const res = await result.json()
      if (result.status >= 400) {
        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`)
      }
      return res
    },
  }
}
