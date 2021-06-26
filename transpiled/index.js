"use strict";

module.exports =
/******/
(() => {
  // webpackBootstrap

  /******/
  var __webpack_modules__ = {
    /***/
    5955:
    /***/
    (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const tslib_1 = __webpack_require__(5636);
      /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type */

      /**
       * Generated from OpenAPI file and [fetch-openapi](https://github.com/kogosoftwarellc/open-api/tree/master/packages/fetch-openapi)
       * @see https://redocly.github.io/redoc/?url=https://developer.atlassian.com/cloud/jira/software/on-premise-swagger.json
       */


      const undici_fetch_1 = tslib_1.__importDefault(__webpack_require__(3578));

      const auth_1 = __webpack_require__(6546);

      function createApi(options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
          const basePath = '';
          const endpoint = 'https://api.atlassian.com';
          const cloudId = yield auth_1.getCloudId(options.jiraInstance);
          const securityHandlers = {
            atlassianCloudOauth: headers => tslib_1.__awaiter(this, void 0, void 0, function* () {
              headers['Authorization'] = `Bearer ${yield auth_1.getJWT(options.clientId, options.clientSecret)}`;
              return true;
            })
          };

          const handleSecurity = (security, headers, params, operationId) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (let i = 0, ilen = security.length; i < ilen; i++) {
              const scheme = security[i];
              const schemeParts = Object.keys(scheme);

              for (let j = 0, jlen = schemeParts.length; j < jlen; j++) {
                const schemePart = schemeParts[j];
                const fulfilsSecurityRequirements = securityHandlers[schemePart] ? yield securityHandlers[schemePart](headers, params, schemePart) : false;

                if (fulfilsSecurityRequirements) {
                  return;
                }
              }
            }

            throw new Error(`No security scheme was fulfilled by the provided securityHandlers for operation ${operationId}`);
          });

          const ensureRequiredSecurityHandlersExist = () => {
            const requiredSecurityHandlers = ['atlassianCloudOauth'];

            for (let i = 0, ilen = requiredSecurityHandlers.length; i < ilen; i++) {
              const requiredSecurityHandler = requiredSecurityHandlers[i];

              if (typeof securityHandlers[requiredSecurityHandler] !== 'function') {
                throw new Error(`Expected to see a security handler for scheme "${requiredSecurityHandler}" in options.securityHandlers`);
              }
            }
          };

          ensureRequiredSecurityHandlersExist();

          const buildQuery = obj => {
            return Object.keys(obj).filter(key => typeof obj[key] !== 'undefined').map(key => {
              const value = obj[key];

              if (value === undefined) {
                return '';
              }

              if (value === null) {
                return key;
              }

              if (Array.isArray(value)) {
                if (value.length) {
                  return `${key}=${value.map(encodeURIComponent).join(`&${key}=`)}`;
                } else {
                  return '';
                }
              } else {
                return `${key}=${encodeURIComponent(value)}`;
              }
            }).join('&');
          };

          return {
            submitBuilds(params, body) {
              return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const headers = {};
                yield handleSecurity([{
                  atlassianCloudOauth: []
                }], headers, params, 'submitBuilds');
                return undici_fetch_1.default(`${endpoint + basePath}/rest/builds/0.1/bulk`, {
                  method: 'POST',
                  headers,
                  body: JSON.stringify(body)
                });
              });
            },

            deleteBuildsByProperty(params) {
              return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const headers = {};
                yield handleSecurity([{
                  atlassianCloudOauth: []
                }], headers, params, 'deleteBuildsByProperty');
                return undici_fetch_1.default(`${endpoint + basePath}/rest/builds/0.1/bulkByProperties` + `?${buildQuery({
                  _updateSequenceNumber: params._updateSequenceNumber
                })}`, {
                  method: 'DELETE',
                  headers
                });
              });
            },

            getBuildByKey(params) {
              return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const headers = {};
                yield handleSecurity([{
                  atlassianCloudOauth: []
                }], headers, params, 'getBuildByKey');
                return undici_fetch_1.default(`${endpoint + basePath}/rest/builds/0.1/pipelines/${params.pipelineId}/builds/${params.buildNumber}`, {
                  method: 'GET',
                  headers
                });
              });
            },

            deleteBuildByKey(params) {
              return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const headers = {};
                yield handleSecurity([{
                  atlassianCloudOauth: []
                }], headers, params, 'deleteBuildByKey');
                return undici_fetch_1.default(`${endpoint + basePath}/rest/builds/0.1/pipelines/${params.pipelineId}/builds/${params.buildNumber}` + `?${buildQuery({
                  _updateSequenceNumber: params._updateSequenceNumber
                })}`, {
                  method: 'DELETE',
                  headers
                });
              });
            },

            storeDevelopmentInformation(params, body) {
              return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const headers = {};
                yield handleSecurity([{
                  atlassianCloudOauth: []
                }], headers, params, 'storeDevelopmentInformation');
                return undici_fetch_1.default(`${endpoint + basePath}/jira/devinfo/0.1/cloud/${cloudId}/bulk`, {
                  method: 'POST',
                  headers,
                  body: JSON.stringify(body)
                });
              });
            },

            getRepository(params) {
              return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const headers = {};
                yield handleSecurity([{
                  atlassianCloudOauth: []
                }], headers, params, 'getRepository');
                return undici_fetch_1.default(`${endpoint + basePath}/jira/devinfo/0.1/cloud/${cloudId}/repository/${params.repositoryId}`, {
                  method: 'GET',
                  headers
                });
              });
            },

            deleteRepository(params) {
              return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const headers = {};
                yield handleSecurity([{
                  atlassianCloudOauth: []
                }], headers, params, 'deleteRepository');
                return undici_fetch_1.default(`${endpoint + basePath}/jira/devinfo/0.1/cloud/${cloudId}/repository/${params.repositoryId}` + `?${buildQuery({
                  _updateSequenceId: params._updateSequenceId
                })}`, {
                  method: 'DELETE',
                  headers
                });
              });
            },

            deleteByProperties(params) {
              return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const headers = {};
                yield handleSecurity([{
                  atlassianCloudOauth: []
                }], headers, params, 'deleteByProperties');
                return undici_fetch_1.default(`${endpoint + basePath}/jira/devinfo/0.1/cloud/${cloudId}/bulkByProperties` + `?${buildQuery({
                  _updateSequenceId: params._updateSequenceId
                })}`, {
                  method: 'DELETE',
                  headers
                });
              });
            },

            existsByProperties(params) {
              return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const headers = {};
                yield handleSecurity([{
                  atlassianCloudOauth: []
                }], headers, params, 'existsByProperties');
                return undici_fetch_1.default(`${endpoint + basePath}/jira/devinfo/0.1/cloud/${cloudId}/existsByProperties` + `?${buildQuery({
                  _updateSequenceId: params._updateSequenceId
                })}`, {
                  method: 'GET',
                  headers
                });
              });
            },

            deleteEntity(params) {
              return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const headers = {};
                yield handleSecurity([{
                  atlassianCloudOauth: []
                }], headers, params, 'deleteEntity');
                return undici_fetch_1.default(`${endpoint + basePath}/jira/devinfo/0.1/cloud/${cloudId}/repository/${params.repositoryId}/${params.entityType}/${params.entityId}` + `?${buildQuery({
                  _updateSequenceId: params._updateSequenceId
                })}`, {
                  method: 'DELETE',
                  headers
                });
              });
            },

            submitDeployments(params, body) {
              return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const headers = {};
                yield handleSecurity([{
                  atlassianCloudOauth: []
                }], headers, params, 'submitDeployments');
                return undici_fetch_1.default(`${endpoint + basePath}/rest/deployments/0.1/bulk`, {
                  method: 'POST',
                  headers,
                  body: JSON.stringify(body)
                });
              });
            },

            deleteDeploymentsByProperty(params) {
              return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const headers = {};
                yield handleSecurity([{
                  atlassianCloudOauth: []
                }], headers, params, 'deleteDeploymentsByProperty');
                return undici_fetch_1.default(`${endpoint + basePath}/rest/deployments/0.1/bulkByProperties` + `?${buildQuery({
                  _updateSequenceNumber: params._updateSequenceNumber
                })}`, {
                  method: 'DELETE',
                  headers
                });
              });
            },

            getDeploymentByKey(params) {
              return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const headers = {};
                yield handleSecurity([{
                  atlassianCloudOauth: []
                }], headers, params, 'getDeploymentByKey');
                return undici_fetch_1.default(`${endpoint + basePath}/rest/deployments/0.1/pipelines/${params.pipelineId}/environments/${params.environmentId}/deployments/${params.deploymentSequenceNumber}`, {
                  method: 'GET',
                  headers
                });
              });
            },

            deleteDeploymentByKey(params) {
              return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const headers = {};
                yield handleSecurity([{
                  atlassianCloudOauth: []
                }], headers, params, 'deleteDeploymentByKey');
                return undici_fetch_1.default(`${endpoint + basePath}/rest/deployments/0.1/pipelines/${params.pipelineId}/environments/${params.environmentId}/deployments/${params.deploymentSequenceNumber}` + `?${buildQuery({
                  _updateSequenceNumber: params._updateSequenceNumber
                })}`, {
                  method: 'DELETE',
                  headers
                });
              });
            }

          };
        });
      }

      exports.default = createApi;
      /***/
    },

    /***/
    6546:
    /***/
    (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.getCloudId = exports.getJWT = void 0;

      const tslib_1 = __webpack_require__(5636);

      const querystring_1 = __webpack_require__(1191);

      const undici_fetch_1 = tslib_1.__importDefault(__webpack_require__(3578));
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


      function getJWT(clientId, clientSecret) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
          const res = yield undici_fetch_1.default('https://api.atlassian.com/oauth/token', {
            method: 'POST',
            body: querystring_1.stringify({
              audience: 'api.atlassian.com',
              grant_type: 'client_credentials',
              client_id: clientId,
              client_secret: clientSecret
            })
          });
          return res.text();
        });
      }

      exports.getJWT = getJWT;
      /**
       * @param jiraInstance
       * @returns
       * @see https://developer.atlassian.com/cloud/jira/software/integrate-jsw-cloud-with-onpremises-tools/#making-api-calls
       */

      function getCloudId(jiraInstance) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
          try {
            const res = yield undici_fetch_1.default(`https://${jiraInstance}.atlassian.net/_edge/tenant_info`);
            const json = yield res.json();
            return json.cloudId;
          } catch (err) {
            console.error(err, 'Could not get cloudId, check "jiraInstance" is correct');
            throw err;
          }
        });
      }

      exports.getCloudId = getCloudId;
      /***/
    },

    /***/
    3109:
    /***/
    (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const tslib_1 = __webpack_require__(5636);

      const core = tslib_1.__importStar(__webpack_require__(2186));

      const github_1 = tslib_1.__importDefault(__webpack_require__(5438));

      const api_1 = tslib_1.__importDefault(__webpack_require__(5955));

      function run() {
        var _a;

        return tslib_1.__awaiter(this, void 0, void 0, function* () {
          try {
            const jiraInstance = core.getInput('jira_instance');
            core.debug(`Connecting to Jira Instance "${jiraInstance}"...`);
            const clientId = core.getInput('client_id');
            const clientSecret = core.getInput('client_secret');
            core.debug(`Connecting via "${clientId}"`);
            const jira = yield api_1.default({
              jiraInstance,
              clientId,
              clientSecret
            });
            const event = // eslint-disable-next-line @typescript-eslint/no-explicit-any
            core.getInput('event_type') || 'build';
            const state = // eslint-disable-next-line @typescript-eslint/no-explicit-any
            core.getInput('state') || 'successful';
            const now = Date.now();
            const branchName = github_1.default.context.ref.split('/')[2];
            const issueKey = core.getInput('issue') || ((_a = branchName.match(/(\w+)-(\d+)/)) === null || _a === void 0 ? void 0 : _a[0]);

            if (!issueKey) {
              throw new Error(`Could not parse issue key from branch name, "${branchName}"`);
            }

            switch (event) {
              case 'build':
                core.debug('Sending "build" event');
                yield jira.submitBuilds({}, {
                  // providerMetadata: {
                  //   product: `https://github.com/rohit-gohri/jira-ci-cd-integration`,
                  // },
                  builds: [{
                    schemaVersion: '1.0',
                    pipelineId: github_1.default.context.runId.toString(),
                    buildNumber: github_1.default.context.runNumber,
                    updateSequenceNumber: now,
                    displayName: github_1.default.context.workflow,
                    description: `${github_1.default.context.workflow} triggered by ${github_1.default.context.eventName} for commit ${github_1.default.context.sha}`,
                    url: `${github_1.default.context.serverUrl}/${github_1.default.context.repo.owner}/${github_1.default.context.repo.repo}/runs/${github_1.default.context.runId}`,
                    state,
                    lastUpdated: new Date(now).toISOString(),
                    issueKeys: [issueKey],
                    // testInfo: {
                    //   totalNumber: 150,
                    //   numberPassed: 145,
                    //   numberFailed: 5,
                    //   numberSkipped: 0,
                    // },
                    references: [{
                      commit: {
                        id: github_1.default.context.sha,
                        repositoryUri: `${github_1.default.context.serverUrl}/${github_1.default.context.repo.owner}/${github_1.default.context.repo.repo}`
                      },
                      ref: {
                        // TODO: slice refs/heads/ from this
                        name: branchName,
                        uri: `${github_1.default.context.serverUrl}/${github_1.default.context.repo.owner}/${github_1.default.context.repo.repo}/tree/${branchName}`
                      }
                    }]
                  }]
                });
                break;

              case 'deployment':
                core.debug('Sending "deployment" event');
                break;

              default:
                throw new Error(`Invalid event_type, "${event}"`);
            }

            core.setOutput('Done:', new Date().toTimeString());
          } catch (error) {
            core.setFailed(error.message);
          }
        });
      }

      run();
      /***/
    },

    /***/
    7351:
    /***/
    function (__unused_webpack_module, exports, __webpack_require__) {
      "use strict";

      var __importStar = this && this.__importStar || function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
      };

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const os = __importStar(__webpack_require__(2087));

      const utils_1 = __webpack_require__(5278);
      /**
       * Commands
       *
       * Command Format:
       *   ::name key=value,key=value::message
       *
       * Examples:
       *   ::warning::This is the message
       *   ::set-env name=MY_VAR::some value
       */


      function issueCommand(command, properties, message) {
        const cmd = new Command(command, properties, message);
        process.stdout.write(cmd.toString() + os.EOL);
      }

      exports.issueCommand = issueCommand;

      function issue(name, message = '') {
        issueCommand(name, {}, message);
      }

      exports.issue = issue;
      const CMD_STRING = '::';

      class Command {
        constructor(command, properties, message) {
          if (!command) {
            command = 'missing.command';
          }

          this.command = command;
          this.properties = properties;
          this.message = message;
        }

        toString() {
          let cmdStr = CMD_STRING + this.command;

          if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;

            for (const key in this.properties) {
              if (this.properties.hasOwnProperty(key)) {
                const val = this.properties[key];

                if (val) {
                  if (first) {
                    first = false;
                  } else {
                    cmdStr += ',';
                  }

                  cmdStr += `${key}=${escapeProperty(val)}`;
                }
              }
            }
          }

          cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
          return cmdStr;
        }

      }

      function escapeData(s) {
        return utils_1.toCommandValue(s).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
      }

      function escapeProperty(s) {
        return utils_1.toCommandValue(s).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A').replace(/:/g, '%3A').replace(/,/g, '%2C');
      }
      /***/

    },

    /***/
    2186:
    /***/
    function (__unused_webpack_module, exports, __webpack_require__) {
      "use strict";

      var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
          });
        }

        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }

          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }

          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }

          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };

      var __importStar = this && this.__importStar || function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
      };

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const command_1 = __webpack_require__(7351);

      const file_command_1 = __webpack_require__(717);

      const utils_1 = __webpack_require__(5278);

      const os = __importStar(__webpack_require__(2087));

      const path = __importStar(__webpack_require__(5622));
      /**
       * The code to exit an action
       */


      var ExitCode;

      (function (ExitCode) {
        /**
         * A code indicating that the action was successful
         */
        ExitCode[ExitCode["Success"] = 0] = "Success";
        /**
         * A code indicating that the action was a failure
         */

        ExitCode[ExitCode["Failure"] = 1] = "Failure";
      })(ExitCode = exports.ExitCode || (exports.ExitCode = {})); //-----------------------------------------------------------------------
      // Variables
      //-----------------------------------------------------------------------

      /**
       * Sets env variable for this action and future actions in the job
       * @param name the name of the variable to set
       * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any


      function exportVariable(name, val) {
        const convertedVal = utils_1.toCommandValue(val);
        process.env[name] = convertedVal;
        const filePath = process.env['GITHUB_ENV'] || '';

        if (filePath) {
          const delimiter = '_GitHubActionsFileCommandDelimeter_';
          const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
          file_command_1.issueCommand('ENV', commandValue);
        } else {
          command_1.issueCommand('set-env', {
            name
          }, convertedVal);
        }
      }

      exports.exportVariable = exportVariable;
      /**
       * Registers a secret which will get masked from logs
       * @param secret value of the secret
       */

      function setSecret(secret) {
        command_1.issueCommand('add-mask', {}, secret);
      }

      exports.setSecret = setSecret;
      /**
       * Prepends inputPath to the PATH (for this action and future actions)
       * @param inputPath
       */

      function addPath(inputPath) {
        const filePath = process.env['GITHUB_PATH'] || '';

        if (filePath) {
          file_command_1.issueCommand('PATH', inputPath);
        } else {
          command_1.issueCommand('add-path', {}, inputPath);
        }

        process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
      }

      exports.addPath = addPath;
      /**
       * Gets the value of an input.  The value is also trimmed.
       *
       * @param     name     name of the input to get
       * @param     options  optional. See InputOptions.
       * @returns   string
       */

      function getInput(name, options) {
        const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';

        if (options && options.required && !val) {
          throw new Error(`Input required and not supplied: ${name}`);
        }

        return val.trim();
      }

      exports.getInput = getInput;
      /**
       * Sets the value of an output.
       *
       * @param     name     name of the output to set
       * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any

      function setOutput(name, value) {
        command_1.issueCommand('set-output', {
          name
        }, value);
      }

      exports.setOutput = setOutput;
      /**
       * Enables or disables the echoing of commands into stdout for the rest of the step.
       * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
       *
       */

      function setCommandEcho(enabled) {
        command_1.issue('echo', enabled ? 'on' : 'off');
      }

      exports.setCommandEcho = setCommandEcho; //-----------------------------------------------------------------------
      // Results
      //-----------------------------------------------------------------------

      /**
       * Sets the action status to failed.
       * When the action exits it will be with an exit code of 1
       * @param message add error issue message
       */

      function setFailed(message) {
        process.exitCode = ExitCode.Failure;
        error(message);
      }

      exports.setFailed = setFailed; //-----------------------------------------------------------------------
      // Logging Commands
      //-----------------------------------------------------------------------

      /**
       * Gets whether Actions Step Debug is on or not
       */

      function isDebug() {
        return process.env['RUNNER_DEBUG'] === '1';
      }

      exports.isDebug = isDebug;
      /**
       * Writes debug message to user log
       * @param message debug message
       */

      function debug(message) {
        command_1.issueCommand('debug', {}, message);
      }

      exports.debug = debug;
      /**
       * Adds an error issue
       * @param message error issue message. Errors will be converted to string via toString()
       */

      function error(message) {
        command_1.issue('error', message instanceof Error ? message.toString() : message);
      }

      exports.error = error;
      /**
       * Adds an warning issue
       * @param message warning issue message. Errors will be converted to string via toString()
       */

      function warning(message) {
        command_1.issue('warning', message instanceof Error ? message.toString() : message);
      }

      exports.warning = warning;
      /**
       * Writes info to log with console.log.
       * @param message info message
       */

      function info(message) {
        process.stdout.write(message + os.EOL);
      }

      exports.info = info;
      /**
       * Begin an output group.
       *
       * Output until the next `groupEnd` will be foldable in this group
       *
       * @param name The name of the output group
       */

      function startGroup(name) {
        command_1.issue('group', name);
      }

      exports.startGroup = startGroup;
      /**
       * End an output group.
       */

      function endGroup() {
        command_1.issue('endgroup');
      }

      exports.endGroup = endGroup;
      /**
       * Wrap an asynchronous function call in a group.
       *
       * Returns the same type as the function itself.
       *
       * @param name The name of the group
       * @param fn The function to wrap in the group
       */

      function group(name, fn) {
        return __awaiter(this, void 0, void 0, function* () {
          startGroup(name);
          let result;

          try {
            result = yield fn();
          } finally {
            endGroup();
          }

          return result;
        });
      }

      exports.group = group; //-----------------------------------------------------------------------
      // Wrapper action state
      //-----------------------------------------------------------------------

      /**
       * Saves state for current action, the state can only be retrieved by this action's post job execution.
       *
       * @param     name     name of the state to store
       * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any

      function saveState(name, value) {
        command_1.issueCommand('save-state', {
          name
        }, value);
      }

      exports.saveState = saveState;
      /**
       * Gets the value of an state set by this action's main execution.
       *
       * @param     name     name of the state to get
       * @returns   string
       */

      function getState(name) {
        return process.env[`STATE_${name}`] || '';
      }

      exports.getState = getState;
      /***/
    },

    /***/
    717:
    /***/
    function (__unused_webpack_module, exports, __webpack_require__) {
      "use strict"; // For internal use, subject to change.

      var __importStar = this && this.__importStar || function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
      };

      Object.defineProperty(exports, "__esModule", {
        value: true
      }); // We use any as a valid input type

      /* eslint-disable @typescript-eslint/no-explicit-any */

      const fs = __importStar(__webpack_require__(5747));

      const os = __importStar(__webpack_require__(2087));

      const utils_1 = __webpack_require__(5278);

      function issueCommand(command, message) {
        const filePath = process.env[`GITHUB_${command}`];

        if (!filePath) {
          throw new Error(`Unable to find environment variable for file command ${command}`);
        }

        if (!fs.existsSync(filePath)) {
          throw new Error(`Missing file at path: ${filePath}`);
        }

        fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
          encoding: 'utf8'
        });
      }

      exports.issueCommand = issueCommand;
      /***/
    },

    /***/
    5278:
    /***/
    (__unused_webpack_module, exports) => {
      "use strict"; // We use any as a valid input type

      /* eslint-disable @typescript-eslint/no-explicit-any */

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      /**
       * Sanitizes an input into a string so it can be passed into issueCommand safely
       * @param input input to sanitize into a string
       */

      function toCommandValue(input) {
        if (input === null || input === undefined) {
          return '';
        } else if (typeof input === 'string' || input instanceof String) {
          return input;
        }

        return JSON.stringify(input);
      }

      exports.toCommandValue = toCommandValue;
      /***/
    },

    /***/
    4087:
    /***/
    (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Context = void 0;

      const fs_1 = __webpack_require__(5747);

      const os_1 = __webpack_require__(2087);

      class Context {
        /**
         * Hydrate the context from the environment
         */
        constructor() {
          var _a, _b, _c;

          this.payload = {};

          if (process.env.GITHUB_EVENT_PATH) {
            if (fs_1.existsSync(process.env.GITHUB_EVENT_PATH)) {
              this.payload = JSON.parse(fs_1.readFileSync(process.env.GITHUB_EVENT_PATH, {
                encoding: 'utf8'
              }));
            } else {
              const path = process.env.GITHUB_EVENT_PATH;
              process.stdout.write(`GITHUB_EVENT_PATH ${path} does not exist${os_1.EOL}`);
            }
          }

          this.eventName = process.env.GITHUB_EVENT_NAME;
          this.sha = process.env.GITHUB_SHA;
          this.ref = process.env.GITHUB_REF;
          this.workflow = process.env.GITHUB_WORKFLOW;
          this.action = process.env.GITHUB_ACTION;
          this.actor = process.env.GITHUB_ACTOR;
          this.job = process.env.GITHUB_JOB;
          this.runNumber = parseInt(process.env.GITHUB_RUN_NUMBER, 10);
          this.runId = parseInt(process.env.GITHUB_RUN_ID, 10);
          this.apiUrl = (_a = process.env.GITHUB_API_URL) !== null && _a !== void 0 ? _a : `https://api.github.com`;
          this.serverUrl = (_b = process.env.GITHUB_SERVER_URL) !== null && _b !== void 0 ? _b : `https://github.com`;
          this.graphqlUrl = (_c = process.env.GITHUB_GRAPHQL_URL) !== null && _c !== void 0 ? _c : `https://api.github.com/graphql`;
        }

        get issue() {
          const payload = this.payload;
          return Object.assign(Object.assign({}, this.repo), {
            number: (payload.issue || payload.pull_request || payload).number
          });
        }

        get repo() {
          if (process.env.GITHUB_REPOSITORY) {
            const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
            return {
              owner,
              repo
            };
          }

          if (this.payload.repository) {
            return {
              owner: this.payload.repository.owner.login,
              repo: this.payload.repository.name
            };
          }

          throw new Error("context.repo requires a GITHUB_REPOSITORY environment variable like 'owner/repo'");
        }

      }

      exports.Context = Context;
      /***/
    },

    /***/
    5438:
    /***/
    function (__unused_webpack_module, exports, __webpack_require__) {
      "use strict";

      var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          }
        });
      } : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });

      var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
        Object.defineProperty(o, "default", {
          enumerable: true,
          value: v
        });
      } : function (o, v) {
        o["default"] = v;
      });

      var __importStar = this && this.__importStar || function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

        __setModuleDefault(result, mod);

        return result;
      };

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.getOctokit = exports.context = void 0;

      const Context = __importStar(__webpack_require__(4087));

      const utils_1 = __webpack_require__(3030);

      exports.context = new Context.Context();
      /**
       * Returns a hydrated octokit ready to use for GitHub Actions
       *
       * @param     token    the repo PAT or GITHUB_TOKEN
       * @param     options  other options to set
       */

      function getOctokit(token, options) {
        return new utils_1.GitHub(utils_1.getOctokitOptions(token, options));
      }

      exports.getOctokit = getOctokit;
      /***/
    },

    /***/
    7914:
    /***/
    function (__unused_webpack_module, exports, __webpack_require__) {
      "use strict";

      var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          }
        });
      } : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });

      var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
        Object.defineProperty(o, "default", {
          enumerable: true,
          value: v
        });
      } : function (o, v) {
        o["default"] = v;
      });

      var __importStar = this && this.__importStar || function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

        __setModuleDefault(result, mod);

        return result;
      };

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.getApiBaseUrl = exports.getProxyAgent = exports.getAuthString = void 0;

      const httpClient = __importStar(__webpack_require__(9925));

      function getAuthString(token, options) {
        if (!token && !options.auth) {
          throw new Error('Parameter token or opts.auth is required');
        } else if (token && options.auth) {
          throw new Error('Parameters token and opts.auth may not both be specified');
        }

        return typeof options.auth === 'string' ? options.auth : `token ${token}`;
      }

      exports.getAuthString = getAuthString;

      function getProxyAgent(destinationUrl) {
        const hc = new httpClient.HttpClient();
        return hc.getAgent(destinationUrl);
      }

      exports.getProxyAgent = getProxyAgent;

      function getApiBaseUrl() {
        return process.env['GITHUB_API_URL'] || 'https://api.github.com';
      }

      exports.getApiBaseUrl = getApiBaseUrl;
      /***/
    },

    /***/
    3030:
    /***/
    function (__unused_webpack_module, exports, __webpack_require__) {
      "use strict";

      var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          }
        });
      } : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });

      var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
        Object.defineProperty(o, "default", {
          enumerable: true,
          value: v
        });
      } : function (o, v) {
        o["default"] = v;
      });

      var __importStar = this && this.__importStar || function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

        __setModuleDefault(result, mod);

        return result;
      };

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.getOctokitOptions = exports.GitHub = exports.context = void 0;

      const Context = __importStar(__webpack_require__(4087));

      const Utils = __importStar(__webpack_require__(7914)); // octokit + plugins


      const core_1 = __webpack_require__(6762);

      const plugin_rest_endpoint_methods_1 = __webpack_require__(3044);

      const plugin_paginate_rest_1 = __webpack_require__(4193);

      exports.context = new Context.Context();
      const baseUrl = Utils.getApiBaseUrl();
      const defaults = {
        baseUrl,
        request: {
          agent: Utils.getProxyAgent(baseUrl)
        }
      };
      exports.GitHub = core_1.Octokit.plugin(plugin_rest_endpoint_methods_1.restEndpointMethods, plugin_paginate_rest_1.paginateRest).defaults(defaults);
      /**
       * Convience function to correctly format Octokit Options to pass into the constructor.
       *
       * @param     token    the repo PAT or GITHUB_TOKEN
       * @param     options  other options to set
       */

      function getOctokitOptions(token, options) {
        const opts = Object.assign({}, options || {}); // Shallow clone - don't mutate the object provided by the caller
        // Auth

        const auth = Utils.getAuthString(token, opts);

        if (auth) {
          opts.auth = auth;
        }

        return opts;
      }

      exports.getOctokitOptions = getOctokitOptions;
      /***/
    },

    /***/
    9925:
    /***/
    (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const http = __webpack_require__(8605);

      const https = __webpack_require__(7211);

      const pm = __webpack_require__(6443);

      let tunnel;
      var HttpCodes;

      (function (HttpCodes) {
        HttpCodes[HttpCodes["OK"] = 200] = "OK";
        HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
        HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
        HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
        HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
        HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
        HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
        HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
        HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
        HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
        HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
        HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
        HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
        HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
        HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
        HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
        HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
        HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
        HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
        HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
        HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
        HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
        HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
        HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
        HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
        HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
        HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
      })(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));

      var Headers;

      (function (Headers) {
        Headers["Accept"] = "accept";
        Headers["ContentType"] = "content-type";
      })(Headers = exports.Headers || (exports.Headers = {}));

      var MediaTypes;

      (function (MediaTypes) {
        MediaTypes["ApplicationJson"] = "application/json";
      })(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
      /**
       * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
       * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
       */


      function getProxyUrl(serverUrl) {
        let proxyUrl = pm.getProxyUrl(new URL(serverUrl));
        return proxyUrl ? proxyUrl.href : '';
      }

      exports.getProxyUrl = getProxyUrl;
      const HttpRedirectCodes = [HttpCodes.MovedPermanently, HttpCodes.ResourceMoved, HttpCodes.SeeOther, HttpCodes.TemporaryRedirect, HttpCodes.PermanentRedirect];
      const HttpResponseRetryCodes = [HttpCodes.BadGateway, HttpCodes.ServiceUnavailable, HttpCodes.GatewayTimeout];
      const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
      const ExponentialBackoffCeiling = 10;
      const ExponentialBackoffTimeSlice = 5;

      class HttpClientError extends Error {
        constructor(message, statusCode) {
          super(message);
          this.name = 'HttpClientError';
          this.statusCode = statusCode;
          Object.setPrototypeOf(this, HttpClientError.prototype);
        }

      }

      exports.HttpClientError = HttpClientError;

      class HttpClientResponse {
        constructor(message) {
          this.message = message;
        }

        readBody() {
          return new Promise(async (resolve, reject) => {
            let output = Buffer.alloc(0);
            this.message.on('data', chunk => {
              output = Buffer.concat([output, chunk]);
            });
            this.message.on('end', () => {
              resolve(output.toString());
            });
          });
        }

      }

      exports.HttpClientResponse = HttpClientResponse;

      function isHttps(requestUrl) {
        let parsedUrl = new URL(requestUrl);
        return parsedUrl.protocol === 'https:';
      }

      exports.isHttps = isHttps;

      class HttpClient {
        constructor(userAgent, handlers, requestOptions) {
          this._ignoreSslError = false;
          this._allowRedirects = true;
          this._allowRedirectDowngrade = false;
          this._maxRedirects = 50;
          this._allowRetries = false;
          this._maxRetries = 1;
          this._keepAlive = false;
          this._disposed = false;
          this.userAgent = userAgent;
          this.handlers = handlers || [];
          this.requestOptions = requestOptions;

          if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
              this._ignoreSslError = requestOptions.ignoreSslError;
            }

            this._socketTimeout = requestOptions.socketTimeout;

            if (requestOptions.allowRedirects != null) {
              this._allowRedirects = requestOptions.allowRedirects;
            }

            if (requestOptions.allowRedirectDowngrade != null) {
              this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }

            if (requestOptions.maxRedirects != null) {
              this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }

            if (requestOptions.keepAlive != null) {
              this._keepAlive = requestOptions.keepAlive;
            }

            if (requestOptions.allowRetries != null) {
              this._allowRetries = requestOptions.allowRetries;
            }

            if (requestOptions.maxRetries != null) {
              this._maxRetries = requestOptions.maxRetries;
            }
          }
        }

        options(requestUrl, additionalHeaders) {
          return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
        }

        get(requestUrl, additionalHeaders) {
          return this.request('GET', requestUrl, null, additionalHeaders || {});
        }

        del(requestUrl, additionalHeaders) {
          return this.request('DELETE', requestUrl, null, additionalHeaders || {});
        }

        post(requestUrl, data, additionalHeaders) {
          return this.request('POST', requestUrl, data, additionalHeaders || {});
        }

        patch(requestUrl, data, additionalHeaders) {
          return this.request('PATCH', requestUrl, data, additionalHeaders || {});
        }

        put(requestUrl, data, additionalHeaders) {
          return this.request('PUT', requestUrl, data, additionalHeaders || {});
        }

        head(requestUrl, additionalHeaders) {
          return this.request('HEAD', requestUrl, null, additionalHeaders || {});
        }

        sendStream(verb, requestUrl, stream, additionalHeaders) {
          return this.request(verb, requestUrl, stream, additionalHeaders);
        }
        /**
         * Gets a typed object from an endpoint
         * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
         */


        async getJson(requestUrl, additionalHeaders = {}) {
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          let res = await this.get(requestUrl, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        }

        async postJson(requestUrl, obj, additionalHeaders = {}) {
          let data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
          let res = await this.post(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        }

        async putJson(requestUrl, obj, additionalHeaders = {}) {
          let data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
          let res = await this.put(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        }

        async patchJson(requestUrl, obj, additionalHeaders = {}) {
          let data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
          let res = await this.patch(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        }
        /**
         * Makes a raw http request.
         * All other methods such as get, post, patch, and request ultimately call this.
         * Prefer get, del, post and patch
         */


        async request(verb, requestUrl, data, headers) {
          if (this._disposed) {
            throw new Error('Client has already been disposed.');
          }

          let parsedUrl = new URL(requestUrl);

          let info = this._prepareRequest(verb, parsedUrl, headers); // Only perform retries on reads since writes may not be idempotent.


          let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1 ? this._maxRetries + 1 : 1;
          let numTries = 0;
          let response;

          while (numTries < maxTries) {
            response = await this.requestRaw(info, data); // Check if it's an authentication challenge

            if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
              let authenticationHandler;

              for (let i = 0; i < this.handlers.length; i++) {
                if (this.handlers[i].canHandleAuthentication(response)) {
                  authenticationHandler = this.handlers[i];
                  break;
                }
              }

              if (authenticationHandler) {
                return authenticationHandler.handleAuthentication(this, info, data);
              } else {
                // We have received an unauthorized response but have no handlers to handle it.
                // Let the response return to the caller.
                return response;
              }
            }

            let redirectsRemaining = this._maxRedirects;

            while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 && this._allowRedirects && redirectsRemaining > 0) {
              const redirectUrl = response.message.headers['location'];

              if (!redirectUrl) {
                // if there's no location to redirect to, we won't
                break;
              }

              let parsedRedirectUrl = new URL(redirectUrl);

              if (parsedUrl.protocol == 'https:' && parsedUrl.protocol != parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
                throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
              } // we need to finish reading the response before reassigning response
              // which will leak the open socket.


              await response.readBody(); // strip authorization header if redirected to a different hostname

              if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                for (let header in headers) {
                  // header names are case insensitive
                  if (header.toLowerCase() === 'authorization') {
                    delete headers[header];
                  }
                }
              } // let's make the request with the new redirectUrl


              info = this._prepareRequest(verb, parsedRedirectUrl, headers);
              response = await this.requestRaw(info, data);
              redirectsRemaining--;
            }

            if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
              // If not a retry code, return immediately instead of retrying
              return response;
            }

            numTries += 1;

            if (numTries < maxTries) {
              await response.readBody();
              await this._performExponentialBackoff(numTries);
            }
          }

          return response;
        }
        /**
         * Needs to be called if keepAlive is set to true in request options.
         */


        dispose() {
          if (this._agent) {
            this._agent.destroy();
          }

          this._disposed = true;
        }
        /**
         * Raw request.
         * @param info
         * @param data
         */


        requestRaw(info, data) {
          return new Promise((resolve, reject) => {
            let callbackForResult = function (err, res) {
              if (err) {
                reject(err);
              }

              resolve(res);
            };

            this.requestRawWithCallback(info, data, callbackForResult);
          });
        }
        /**
         * Raw request with callback.
         * @param info
         * @param data
         * @param onResult
         */


        requestRawWithCallback(info, data, onResult) {
          let socket;

          if (typeof data === 'string') {
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
          }

          let callbackCalled = false;

          let handleResult = (err, res) => {
            if (!callbackCalled) {
              callbackCalled = true;
              onResult(err, res);
            }
          };

          let req = info.httpModule.request(info.options, msg => {
            let res = new HttpClientResponse(msg);
            handleResult(null, res);
          });
          req.on('socket', sock => {
            socket = sock;
          }); // If we ever get disconnected, we want the socket to timeout eventually

          req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
              socket.end();
            }

            handleResult(new Error('Request timeout: ' + info.options.path), null);
          });
          req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err, null);
          });

          if (data && typeof data === 'string') {
            req.write(data, 'utf8');
          }

          if (data && typeof data !== 'string') {
            data.on('close', function () {
              req.end();
            });
            data.pipe(req);
          } else {
            req.end();
          }
        }
        /**
         * Gets an http agent. This function is useful when you need an http agent that handles
         * routing through a proxy server - depending upon the url and proxy environment variables.
         * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
         */


        getAgent(serverUrl) {
          let parsedUrl = new URL(serverUrl);
          return this._getAgent(parsedUrl);
        }

        _prepareRequest(method, requestUrl, headers) {
          const info = {};
          info.parsedUrl = requestUrl;
          const usingSsl = info.parsedUrl.protocol === 'https:';
          info.httpModule = usingSsl ? https : http;
          const defaultPort = usingSsl ? 443 : 80;
          info.options = {};
          info.options.host = info.parsedUrl.hostname;
          info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
          info.options.path = (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
          info.options.method = method;
          info.options.headers = this._mergeHeaders(headers);

          if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
          }

          info.options.agent = this._getAgent(info.parsedUrl); // gives handlers an opportunity to participate

          if (this.handlers) {
            this.handlers.forEach(handler => {
              handler.prepareRequest(info.options);
            });
          }

          return info;
        }

        _mergeHeaders(headers) {
          const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});

          if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
          }

          return lowercaseKeys(headers || {});
        }

        _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
          const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});

          let clientHeader;

          if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
          }

          return additionalHeaders[header] || clientHeader || _default;
        }

        _getAgent(parsedUrl) {
          let agent;
          let proxyUrl = pm.getProxyUrl(parsedUrl);
          let useProxy = proxyUrl && proxyUrl.hostname;

          if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
          }

          if (this._keepAlive && !useProxy) {
            agent = this._agent;
          } // if agent is already assigned use that agent.


          if (!!agent) {
            return agent;
          }

          const usingSsl = parsedUrl.protocol === 'https:';
          let maxSockets = 100;

          if (!!this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
          }

          if (useProxy) {
            // If using proxy, need tunnel
            if (!tunnel) {
              tunnel = __webpack_require__(4294);
            }

            const agentOptions = {
              maxSockets: maxSockets,
              keepAlive: this._keepAlive,
              proxy: { ...((proxyUrl.username || proxyUrl.password) && {
                  proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                }),
                host: proxyUrl.hostname,
                port: proxyUrl.port
              }
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';

            if (usingSsl) {
              tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            } else {
              tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }

            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
          } // if reusing agent across request and tunneling agent isn't assigned create a new agent


          if (this._keepAlive && !agent) {
            const options = {
              keepAlive: this._keepAlive,
              maxSockets: maxSockets
            };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
          } // if not using private agent and tunnel agent isn't setup then use global agent


          if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
          }

          if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
              rejectUnauthorized: false
            });
          }

          return agent;
        }

        _performExponentialBackoff(retryNumber) {
          retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
          const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
          return new Promise(resolve => setTimeout(() => resolve(), ms));
        }

        static dateTimeDeserializer(key, value) {
          if (typeof value === 'string') {
            let a = new Date(value);

            if (!isNaN(a.valueOf())) {
              return a;
            }
          }

          return value;
        }

        async _processResponse(res, options) {
          return new Promise(async (resolve, reject) => {
            const statusCode = res.message.statusCode;
            const response = {
              statusCode: statusCode,
              result: null,
              headers: {}
            }; // not found leads to null obj returned

            if (statusCode == HttpCodes.NotFound) {
              resolve(response);
            }

            let obj;
            let contents; // get the result from the body

            try {
              contents = await res.readBody();

              if (contents && contents.length > 0) {
                if (options && options.deserializeDates) {
                  obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
                } else {
                  obj = JSON.parse(contents);
                }

                response.result = obj;
              }

              response.headers = res.message.headers;
            } catch (err) {// Invalid resource (contents not json);  leaving result obj null
            } // note that 3xx redirects are handled by the http layer.


            if (statusCode > 299) {
              let msg; // if exception/error in body, attempt to get better error

              if (obj && obj.message) {
                msg = obj.message;
              } else if (contents && contents.length > 0) {
                // it may be the case that the exception is in the body message as string
                msg = contents;
              } else {
                msg = 'Failed request: (' + statusCode + ')';
              }

              let err = new HttpClientError(msg, statusCode);
              err.result = response.result;
              reject(err);
            } else {
              resolve(response);
            }
          });
        }

      }

      exports.HttpClient = HttpClient;
      /***/
    },

    /***/
    6443:
    /***/
    (__unused_webpack_module, exports) => {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      function getProxyUrl(reqUrl) {
        let usingSsl = reqUrl.protocol === 'https:';
        let proxyUrl;

        if (checkBypass(reqUrl)) {
          return proxyUrl;
        }

        let proxyVar;

        if (usingSsl) {
          proxyVar = process.env['https_proxy'] || process.env['HTTPS_PROXY'];
        } else {
          proxyVar = process.env['http_proxy'] || process.env['HTTP_PROXY'];
        }

        if (proxyVar) {
          proxyUrl = new URL(proxyVar);
        }

        return proxyUrl;
      }

      exports.getProxyUrl = getProxyUrl;

      function checkBypass(reqUrl) {
        if (!reqUrl.hostname) {
          return false;
        }

        let noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';

        if (!noProxy) {
          return false;
        } // Determine the request port


        let reqPort;

        if (reqUrl.port) {
          reqPort = Number(reqUrl.port);
        } else if (reqUrl.protocol === 'http:') {
          reqPort = 80;
        } else if (reqUrl.protocol === 'https:') {
          reqPort = 443;
        } // Format the request hostname and hostname with port


        let upperReqHosts = [reqUrl.hostname.toUpperCase()];

        if (typeof reqPort === 'number') {
          upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
        } // Compare request host against noproxy


        for (let upperNoProxyItem of noProxy.split(',').map(x => x.trim().toUpperCase()).filter(x => x)) {
          if (upperReqHosts.some(x => x === upperNoProxyItem)) {
            return true;
          }
        }

        return false;
      }

      exports.checkBypass = checkBypass;
      /***/
    },

    /***/
    334:
    /***/
    (__unused_webpack_module, exports) => {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      async function auth(token) {
        const tokenType = token.split(/\./).length === 3 ? "app" : /^v\d+\./.test(token) ? "installation" : "oauth";
        return {
          type: "token",
          token: token,
          tokenType
        };
      }
      /**
       * Prefix token for usage in the Authorization header
       *
       * @param token OAuth token or JSON Web Token
       */


      function withAuthorizationPrefix(token) {
        if (token.split(/\./).length === 3) {
          return `bearer ${token}`;
        }

        return `token ${token}`;
      }

      async function hook(token, request, route, parameters) {
        const endpoint = request.endpoint.merge(route, parameters);
        endpoint.headers.authorization = withAuthorizationPrefix(token);
        return request(endpoint);
      }

      const createTokenAuth = function createTokenAuth(token) {
        if (!token) {
          throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");
        }

        if (typeof token !== "string") {
          throw new Error("[@octokit/auth-token] Token passed to createTokenAuth is not a string");
        }

        token = token.replace(/^(token|bearer) +/i, "");
        return Object.assign(auth.bind(null, token), {
          hook: hook.bind(null, token)
        });
      };

      exports.createTokenAuth = createTokenAuth;
      /***/
    },

    /***/
    6762:
    /***/
    (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var universalUserAgent = __webpack_require__(5030);

      var beforeAfterHook = __webpack_require__(3682);

      var request = __webpack_require__(6234);

      var graphql = __webpack_require__(8467);

      var authToken = __webpack_require__(334);

      function _objectWithoutPropertiesLoose(source, excluded) {
        if (source == null) return {};
        var target = {};
        var sourceKeys = Object.keys(source);
        var key, i;

        for (i = 0; i < sourceKeys.length; i++) {
          key = sourceKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          target[key] = source[key];
        }

        return target;
      }

      function _objectWithoutProperties(source, excluded) {
        if (source == null) return {};

        var target = _objectWithoutPropertiesLoose(source, excluded);

        var key, i;

        if (Object.getOwnPropertySymbols) {
          var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

          for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
          }
        }

        return target;
      }

      const VERSION = "3.5.1";
      const _excluded = ["authStrategy"];

      class Octokit {
        constructor(options = {}) {
          const hook = new beforeAfterHook.Collection();
          const requestDefaults = {
            baseUrl: request.request.endpoint.DEFAULTS.baseUrl,
            headers: {},
            request: Object.assign({}, options.request, {
              // @ts-ignore internal usage only, no need to type
              hook: hook.bind(null, "request")
            }),
            mediaType: {
              previews: [],
              format: ""
            }
          }; // prepend default user agent with `options.userAgent` if set

          requestDefaults.headers["user-agent"] = [options.userAgent, `octokit-core.js/${VERSION} ${universalUserAgent.getUserAgent()}`].filter(Boolean).join(" ");

          if (options.baseUrl) {
            requestDefaults.baseUrl = options.baseUrl;
          }

          if (options.previews) {
            requestDefaults.mediaType.previews = options.previews;
          }

          if (options.timeZone) {
            requestDefaults.headers["time-zone"] = options.timeZone;
          }

          this.request = request.request.defaults(requestDefaults);
          this.graphql = graphql.withCustomRequest(this.request).defaults(requestDefaults);
          this.log = Object.assign({
            debug: () => {},
            info: () => {},
            warn: console.warn.bind(console),
            error: console.error.bind(console)
          }, options.log);
          this.hook = hook; // (1) If neither `options.authStrategy` nor `options.auth` are set, the `octokit` instance
          //     is unauthenticated. The `this.auth()` method is a no-op and no request hook is registered.
          // (2) If only `options.auth` is set, use the default token authentication strategy.
          // (3) If `options.authStrategy` is set then use it and pass in `options.auth`. Always pass own request as many strategies accept a custom request instance.
          // TODO: type `options.auth` based on `options.authStrategy`.

          if (!options.authStrategy) {
            if (!options.auth) {
              // (1)
              this.auth = async () => ({
                type: "unauthenticated"
              });
            } else {
              // (2)
              const auth = authToken.createTokenAuth(options.auth); // @ts-ignore  ¯\_(ツ)_/¯

              hook.wrap("request", auth.hook);
              this.auth = auth;
            }
          } else {
            const {
              authStrategy
            } = options,
                  otherOptions = _objectWithoutProperties(options, _excluded);

            const auth = authStrategy(Object.assign({
              request: this.request,
              log: this.log,
              // we pass the current octokit instance as well as its constructor options
              // to allow for authentication strategies that return a new octokit instance
              // that shares the same internal state as the current one. The original
              // requirement for this was the "event-octokit" authentication strategy
              // of https://github.com/probot/octokit-auth-probot.
              octokit: this,
              octokitOptions: otherOptions
            }, options.auth)); // @ts-ignore  ¯\_(ツ)_/¯

            hook.wrap("request", auth.hook);
            this.auth = auth;
          } // apply plugins
          // https://stackoverflow.com/a/16345172


          const classConstructor = this.constructor;
          classConstructor.plugins.forEach(plugin => {
            Object.assign(this, plugin(this, options));
          });
        }

        static defaults(defaults) {
          const OctokitWithDefaults = class extends this {
            constructor(...args) {
              const options = args[0] || {};

              if (typeof defaults === "function") {
                super(defaults(options));
                return;
              }

              super(Object.assign({}, defaults, options, options.userAgent && defaults.userAgent ? {
                userAgent: `${options.userAgent} ${defaults.userAgent}`
              } : null));
            }

          };
          return OctokitWithDefaults;
        }
        /**
         * Attach a plugin (or many) to your Octokit instance.
         *
         * @example
         * const API = Octokit.plugin(plugin1, plugin2, plugin3, ...)
         */


        static plugin(...newPlugins) {
          var _a;

          const currentPlugins = this.plugins;
          const NewOctokit = (_a = class extends this {}, _a.plugins = currentPlugins.concat(newPlugins.filter(plugin => !currentPlugins.includes(plugin))), _a);
          return NewOctokit;
        }

      }

      Octokit.VERSION = VERSION;
      Octokit.plugins = [];
      exports.Octokit = Octokit;
      /***/
    },

    /***/
    9440:
    /***/
    (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var isPlainObject = __webpack_require__(558);

      var universalUserAgent = __webpack_require__(5030);

      function lowercaseKeys(object) {
        if (!object) {
          return {};
        }

        return Object.keys(object).reduce((newObj, key) => {
          newObj[key.toLowerCase()] = object[key];
          return newObj;
        }, {});
      }

      function mergeDeep(defaults, options) {
        const result = Object.assign({}, defaults);
        Object.keys(options).forEach(key => {
          if (isPlainObject.isPlainObject(options[key])) {
            if (!(key in defaults)) Object.assign(result, {
              [key]: options[key]
            });else result[key] = mergeDeep(defaults[key], options[key]);
          } else {
            Object.assign(result, {
              [key]: options[key]
            });
          }
        });
        return result;
      }

      function removeUndefinedProperties(obj) {
        for (const key in obj) {
          if (obj[key] === undefined) {
            delete obj[key];
          }
        }

        return obj;
      }

      function merge(defaults, route, options) {
        if (typeof route === "string") {
          let [method, url] = route.split(" ");
          options = Object.assign(url ? {
            method,
            url
          } : {
            url: method
          }, options);
        } else {
          options = Object.assign({}, route);
        } // lowercase header names before merging with defaults to avoid duplicates


        options.headers = lowercaseKeys(options.headers); // remove properties with undefined values before merging

        removeUndefinedProperties(options);
        removeUndefinedProperties(options.headers);
        const mergedOptions = mergeDeep(defaults || {}, options); // mediaType.previews arrays are merged, instead of overwritten

        if (defaults && defaults.mediaType.previews.length) {
          mergedOptions.mediaType.previews = defaults.mediaType.previews.filter(preview => !mergedOptions.mediaType.previews.includes(preview)).concat(mergedOptions.mediaType.previews);
        }

        mergedOptions.mediaType.previews = mergedOptions.mediaType.previews.map(preview => preview.replace(/-preview/, ""));
        return mergedOptions;
      }

      function addQueryParameters(url, parameters) {
        const separator = /\?/.test(url) ? "&" : "?";
        const names = Object.keys(parameters);

        if (names.length === 0) {
          return url;
        }

        return url + separator + names.map(name => {
          if (name === "q") {
            return "q=" + parameters.q.split("+").map(encodeURIComponent).join("+");
          }

          return `${name}=${encodeURIComponent(parameters[name])}`;
        }).join("&");
      }

      const urlVariableRegex = /\{[^}]+\}/g;

      function removeNonChars(variableName) {
        return variableName.replace(/^\W+|\W+$/g, "").split(/,/);
      }

      function extractUrlVariableNames(url) {
        const matches = url.match(urlVariableRegex);

        if (!matches) {
          return [];
        }

        return matches.map(removeNonChars).reduce((a, b) => a.concat(b), []);
      }

      function omit(object, keysToOmit) {
        return Object.keys(object).filter(option => !keysToOmit.includes(option)).reduce((obj, key) => {
          obj[key] = object[key];
          return obj;
        }, {});
      } // Based on https://github.com/bramstein/url-template, licensed under BSD
      // TODO: create separate package.
      //
      // Copyright (c) 2012-2014, Bram Stein
      // All rights reserved.
      // Redistribution and use in source and binary forms, with or without
      // modification, are permitted provided that the following conditions
      // are met:
      //  1. Redistributions of source code must retain the above copyright
      //     notice, this list of conditions and the following disclaimer.
      //  2. Redistributions in binary form must reproduce the above copyright
      //     notice, this list of conditions and the following disclaimer in the
      //     documentation and/or other materials provided with the distribution.
      //  3. The name of the author may not be used to endorse or promote products
      //     derived from this software without specific prior written permission.
      // THIS SOFTWARE IS PROVIDED BY THE AUTHOR "AS IS" AND ANY EXPRESS OR IMPLIED
      // WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
      // MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
      // EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
      // INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
      // BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
      // DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
      // OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
      // NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
      // EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

      /* istanbul ignore file */


      function encodeReserved(str) {
        return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
          if (!/%[0-9A-Fa-f]/.test(part)) {
            part = encodeURI(part).replace(/%5B/g, "[").replace(/%5D/g, "]");
          }

          return part;
        }).join("");
      }

      function encodeUnreserved(str) {
        return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
          return "%" + c.charCodeAt(0).toString(16).toUpperCase();
        });
      }

      function encodeValue(operator, value, key) {
        value = operator === "+" || operator === "#" ? encodeReserved(value) : encodeUnreserved(value);

        if (key) {
          return encodeUnreserved(key) + "=" + value;
        } else {
          return value;
        }
      }

      function isDefined(value) {
        return value !== undefined && value !== null;
      }

      function isKeyOperator(operator) {
        return operator === ";" || operator === "&" || operator === "?";
      }

      function getValues(context, operator, key, modifier) {
        var value = context[key],
            result = [];

        if (isDefined(value) && value !== "") {
          if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            value = value.toString();

            if (modifier && modifier !== "*") {
              value = value.substring(0, parseInt(modifier, 10));
            }

            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : ""));
          } else {
            if (modifier === "*") {
              if (Array.isArray(value)) {
                value.filter(isDefined).forEach(function (value) {
                  result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : ""));
                });
              } else {
                Object.keys(value).forEach(function (k) {
                  if (isDefined(value[k])) {
                    result.push(encodeValue(operator, value[k], k));
                  }
                });
              }
            } else {
              const tmp = [];

              if (Array.isArray(value)) {
                value.filter(isDefined).forEach(function (value) {
                  tmp.push(encodeValue(operator, value));
                });
              } else {
                Object.keys(value).forEach(function (k) {
                  if (isDefined(value[k])) {
                    tmp.push(encodeUnreserved(k));
                    tmp.push(encodeValue(operator, value[k].toString()));
                  }
                });
              }

              if (isKeyOperator(operator)) {
                result.push(encodeUnreserved(key) + "=" + tmp.join(","));
              } else if (tmp.length !== 0) {
                result.push(tmp.join(","));
              }
            }
          }
        } else {
          if (operator === ";") {
            if (isDefined(value)) {
              result.push(encodeUnreserved(key));
            }
          } else if (value === "" && (operator === "&" || operator === "?")) {
            result.push(encodeUnreserved(key) + "=");
          } else if (value === "") {
            result.push("");
          }
        }

        return result;
      }

      function parseUrl(template) {
        return {
          expand: expand.bind(null, template)
        };
      }

      function expand(template, context) {
        var operators = ["+", "#", ".", "/", ";", "?", "&"];
        return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
          if (expression) {
            let operator = "";
            const values = [];

            if (operators.indexOf(expression.charAt(0)) !== -1) {
              operator = expression.charAt(0);
              expression = expression.substr(1);
            }

            expression.split(/,/g).forEach(function (variable) {
              var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
              values.push(getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
            });

            if (operator && operator !== "+") {
              var separator = ",";

              if (operator === "?") {
                separator = "&";
              } else if (operator !== "#") {
                separator = operator;
              }

              return (values.length !== 0 ? operator : "") + values.join(separator);
            } else {
              return values.join(",");
            }
          } else {
            return encodeReserved(literal);
          }
        });
      }

      function parse(options) {
        // https://fetch.spec.whatwg.org/#methods
        let method = options.method.toUpperCase(); // replace :varname with {varname} to make it RFC 6570 compatible

        let url = (options.url || "/").replace(/:([a-z]\w+)/g, "{$1}");
        let headers = Object.assign({}, options.headers);
        let body;
        let parameters = omit(options, ["method", "baseUrl", "url", "headers", "request", "mediaType"]); // extract variable names from URL to calculate remaining variables later

        const urlVariableNames = extractUrlVariableNames(url);
        url = parseUrl(url).expand(parameters);

        if (!/^http/.test(url)) {
          url = options.baseUrl + url;
        }

        const omittedParameters = Object.keys(options).filter(option => urlVariableNames.includes(option)).concat("baseUrl");
        const remainingParameters = omit(parameters, omittedParameters);
        const isBinaryRequest = /application\/octet-stream/i.test(headers.accept);

        if (!isBinaryRequest) {
          if (options.mediaType.format) {
            // e.g. application/vnd.github.v3+json => application/vnd.github.v3.raw
            headers.accept = headers.accept.split(/,/).map(preview => preview.replace(/application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/, `application/vnd$1$2.${options.mediaType.format}`)).join(",");
          }

          if (options.mediaType.previews.length) {
            const previewsFromAcceptHeader = headers.accept.match(/[\w-]+(?=-preview)/g) || [];
            headers.accept = previewsFromAcceptHeader.concat(options.mediaType.previews).map(preview => {
              const format = options.mediaType.format ? `.${options.mediaType.format}` : "+json";
              return `application/vnd.github.${preview}-preview${format}`;
            }).join(",");
          }
        } // for GET/HEAD requests, set URL query parameters from remaining parameters
        // for PATCH/POST/PUT/DELETE requests, set request body from remaining parameters


        if (["GET", "HEAD"].includes(method)) {
          url = addQueryParameters(url, remainingParameters);
        } else {
          if ("data" in remainingParameters) {
            body = remainingParameters.data;
          } else {
            if (Object.keys(remainingParameters).length) {
              body = remainingParameters;
            } else {
              headers["content-length"] = 0;
            }
          }
        } // default content-type for JSON if body is set


        if (!headers["content-type"] && typeof body !== "undefined") {
          headers["content-type"] = "application/json; charset=utf-8";
        } // GitHub expects 'content-length: 0' header for PUT/PATCH requests without body.
        // fetch does not allow to set `content-length` header, but we can set body to an empty string


        if (["PATCH", "PUT"].includes(method) && typeof body === "undefined") {
          body = "";
        } // Only return body/request keys if present


        return Object.assign({
          method,
          url,
          headers
        }, typeof body !== "undefined" ? {
          body
        } : null, options.request ? {
          request: options.request
        } : null);
      }

      function endpointWithDefaults(defaults, route, options) {
        return parse(merge(defaults, route, options));
      }

      function withDefaults(oldDefaults, newDefaults) {
        const DEFAULTS = merge(oldDefaults, newDefaults);
        const endpoint = endpointWithDefaults.bind(null, DEFAULTS);
        return Object.assign(endpoint, {
          DEFAULTS,
          defaults: withDefaults.bind(null, DEFAULTS),
          merge: merge.bind(null, DEFAULTS),
          parse
        });
      }

      const VERSION = "6.0.12";
      const userAgent = `octokit-endpoint.js/${VERSION} ${universalUserAgent.getUserAgent()}`; // DEFAULTS has all properties set that EndpointOptions has, except url.
      // So we use RequestParameters and add method as additional required property.

      const DEFAULTS = {
        method: "GET",
        baseUrl: "https://api.github.com",
        headers: {
          accept: "application/vnd.github.v3+json",
          "user-agent": userAgent
        },
        mediaType: {
          format: "",
          previews: []
        }
      };
      const endpoint = withDefaults(null, DEFAULTS);
      exports.endpoint = endpoint;
      /***/
    },

    /***/
    558:
    /***/
    (__unused_webpack_module, exports) => {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      /*!
       * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
       *
       * Copyright (c) 2014-2017, Jon Schlinkert.
       * Released under the MIT License.
       */

      function isObject(o) {
        return Object.prototype.toString.call(o) === '[object Object]';
      }

      function isPlainObject(o) {
        var ctor, prot;
        if (isObject(o) === false) return false; // If has modified constructor

        ctor = o.constructor;
        if (ctor === undefined) return true; // If has modified prototype

        prot = ctor.prototype;
        if (isObject(prot) === false) return false; // If constructor does not have an Object-specific method

        if (prot.hasOwnProperty('isPrototypeOf') === false) {
          return false;
        } // Most likely a plain Object


        return true;
      }

      exports.isPlainObject = isPlainObject;
      /***/
    },

    /***/
    8467:
    /***/
    (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var request = __webpack_require__(6234);

      var universalUserAgent = __webpack_require__(5030);

      const VERSION = "4.6.4";

      class GraphqlError extends Error {
        constructor(request, response) {
          const message = response.data.errors[0].message;
          super(message);
          Object.assign(this, response.data);
          Object.assign(this, {
            headers: response.headers
          });
          this.name = "GraphqlError";
          this.request = request; // Maintains proper stack trace (only available on V8)

          /* istanbul ignore next */

          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
          }
        }

      }

      const NON_VARIABLE_OPTIONS = ["method", "baseUrl", "url", "headers", "request", "query", "mediaType"];
      const FORBIDDEN_VARIABLE_OPTIONS = ["query", "method", "url"];
      const GHES_V3_SUFFIX_REGEX = /\/api\/v3\/?$/;

      function graphql(request, query, options) {
        if (options) {
          if (typeof query === "string" && "query" in options) {
            return Promise.reject(new Error(`[@octokit/graphql] "query" cannot be used as variable name`));
          }

          for (const key in options) {
            if (!FORBIDDEN_VARIABLE_OPTIONS.includes(key)) continue;
            return Promise.reject(new Error(`[@octokit/graphql] "${key}" cannot be used as variable name`));
          }
        }

        const parsedOptions = typeof query === "string" ? Object.assign({
          query
        }, options) : query;
        const requestOptions = Object.keys(parsedOptions).reduce((result, key) => {
          if (NON_VARIABLE_OPTIONS.includes(key)) {
            result[key] = parsedOptions[key];
            return result;
          }

          if (!result.variables) {
            result.variables = {};
          }

          result.variables[key] = parsedOptions[key];
          return result;
        }, {}); // workaround for GitHub Enterprise baseUrl set with /api/v3 suffix
        // https://github.com/octokit/auth-app.js/issues/111#issuecomment-657610451

        const baseUrl = parsedOptions.baseUrl || request.endpoint.DEFAULTS.baseUrl;

        if (GHES_V3_SUFFIX_REGEX.test(baseUrl)) {
          requestOptions.url = baseUrl.replace(GHES_V3_SUFFIX_REGEX, "/api/graphql");
        }

        return request(requestOptions).then(response => {
          if (response.data.errors) {
            const headers = {};

            for (const key of Object.keys(response.headers)) {
              headers[key] = response.headers[key];
            }

            throw new GraphqlError(requestOptions, {
              headers,
              data: response.data
            });
          }

          return response.data.data;
        });
      }

      function withDefaults(request$1, newDefaults) {
        const newRequest = request$1.defaults(newDefaults);

        const newApi = (query, options) => {
          return graphql(newRequest, query, options);
        };

        return Object.assign(newApi, {
          defaults: withDefaults.bind(null, newRequest),
          endpoint: request.request.endpoint
        });
      }

      const graphql$1 = withDefaults(request.request, {
        headers: {
          "user-agent": `octokit-graphql.js/${VERSION} ${universalUserAgent.getUserAgent()}`
        },
        method: "POST",
        url: "/graphql"
      });

      function withCustomRequest(customRequest) {
        return withDefaults(customRequest, {
          method: "POST",
          url: "/graphql"
        });
      }

      exports.graphql = graphql$1;
      exports.withCustomRequest = withCustomRequest;
      /***/
    },

    /***/
    4193:
    /***/
    (__unused_webpack_module, exports) => {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      const VERSION = "2.13.5";

      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);

        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);

          if (enumerableOnly) {
            symbols = symbols.filter(function (sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
          }

          keys.push.apply(keys, symbols);
        }

        return keys;
      }

      function _objectSpread2(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? arguments[i] : {};

          if (i % 2) {
            ownKeys(Object(source), true).forEach(function (key) {
              _defineProperty(target, key, source[key]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
          } else {
            ownKeys(Object(source)).forEach(function (key) {
              Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
          }
        }

        return target;
      }

      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }

        return obj;
      }
      /**
       * Some “list” response that can be paginated have a different response structure
       *
       * They have a `total_count` key in the response (search also has `incomplete_results`,
       * /installation/repositories also has `repository_selection`), as well as a key with
       * the list of the items which name varies from endpoint to endpoint.
       *
       * Octokit normalizes these responses so that paginated results are always returned following
       * the same structure. One challenge is that if the list response has only one page, no Link
       * header is provided, so this header alone is not sufficient to check wether a response is
       * paginated or not.
       *
       * We check if a "total_count" key is present in the response data, but also make sure that
       * a "url" property is not, as the "Get the combined status for a specific ref" endpoint would
       * otherwise match: https://developer.github.com/v3/repos/statuses/#get-the-combined-status-for-a-specific-ref
       */


      function normalizePaginatedListResponse(response) {
        // endpoints can respond with 204 if repository is empty
        if (!response.data) {
          return _objectSpread2(_objectSpread2({}, response), {}, {
            data: []
          });
        }

        const responseNeedsNormalization = "total_count" in response.data && !("url" in response.data);
        if (!responseNeedsNormalization) return response; // keep the additional properties intact as there is currently no other way
        // to retrieve the same information.

        const incompleteResults = response.data.incomplete_results;
        const repositorySelection = response.data.repository_selection;
        const totalCount = response.data.total_count;
        delete response.data.incomplete_results;
        delete response.data.repository_selection;
        delete response.data.total_count;
        const namespaceKey = Object.keys(response.data)[0];
        const data = response.data[namespaceKey];
        response.data = data;

        if (typeof incompleteResults !== "undefined") {
          response.data.incomplete_results = incompleteResults;
        }

        if (typeof repositorySelection !== "undefined") {
          response.data.repository_selection = repositorySelection;
        }

        response.data.total_count = totalCount;
        return response;
      }

      function iterator(octokit, route, parameters) {
        const options = typeof route === "function" ? route.endpoint(parameters) : octokit.request.endpoint(route, parameters);
        const requestMethod = typeof route === "function" ? route : octokit.request;
        const method = options.method;
        const headers = options.headers;
        let url = options.url;
        return {
          [Symbol.asyncIterator]: () => ({
            async next() {
              if (!url) return {
                done: true
              };

              try {
                const response = await requestMethod({
                  method,
                  url,
                  headers
                });
                const normalizedResponse = normalizePaginatedListResponse(response); // `response.headers.link` format:
                // '<https://api.github.com/users/aseemk/followers?page=2>; rel="next", <https://api.github.com/users/aseemk/followers?page=2>; rel="last"'
                // sets `url` to undefined if "next" URL is not present or `link` header is not set

                url = ((normalizedResponse.headers.link || "").match(/<([^>]+)>;\s*rel="next"/) || [])[1];
                return {
                  value: normalizedResponse
                };
              } catch (error) {
                if (error.status !== 409) throw error;
                url = "";
                return {
                  value: {
                    status: 200,
                    headers: {},
                    data: []
                  }
                };
              }
            }

          })
        };
      }

      function paginate(octokit, route, parameters, mapFn) {
        if (typeof parameters === "function") {
          mapFn = parameters;
          parameters = undefined;
        }

        return gather(octokit, [], iterator(octokit, route, parameters)[Symbol.asyncIterator](), mapFn);
      }

      function gather(octokit, results, iterator, mapFn) {
        return iterator.next().then(result => {
          if (result.done) {
            return results;
          }

          let earlyExit = false;

          function done() {
            earlyExit = true;
          }

          results = results.concat(mapFn ? mapFn(result.value, done) : result.value.data);

          if (earlyExit) {
            return results;
          }

          return gather(octokit, results, iterator, mapFn);
        });
      }

      const composePaginateRest = Object.assign(paginate, {
        iterator
      });
      const paginatingEndpoints = ["GET /app/installations", "GET /applications/grants", "GET /authorizations", "GET /enterprises/{enterprise}/actions/permissions/organizations", "GET /enterprises/{enterprise}/actions/runner-groups", "GET /enterprises/{enterprise}/actions/runner-groups/{runner_group_id}/organizations", "GET /enterprises/{enterprise}/actions/runner-groups/{runner_group_id}/runners", "GET /enterprises/{enterprise}/actions/runners", "GET /enterprises/{enterprise}/actions/runners/downloads", "GET /events", "GET /gists", "GET /gists/public", "GET /gists/starred", "GET /gists/{gist_id}/comments", "GET /gists/{gist_id}/commits", "GET /gists/{gist_id}/forks", "GET /installation/repositories", "GET /issues", "GET /marketplace_listing/plans", "GET /marketplace_listing/plans/{plan_id}/accounts", "GET /marketplace_listing/stubbed/plans", "GET /marketplace_listing/stubbed/plans/{plan_id}/accounts", "GET /networks/{owner}/{repo}/events", "GET /notifications", "GET /organizations", "GET /orgs/{org}/actions/permissions/repositories", "GET /orgs/{org}/actions/runner-groups", "GET /orgs/{org}/actions/runner-groups/{runner_group_id}/repositories", "GET /orgs/{org}/actions/runner-groups/{runner_group_id}/runners", "GET /orgs/{org}/actions/runners", "GET /orgs/{org}/actions/runners/downloads", "GET /orgs/{org}/actions/secrets", "GET /orgs/{org}/actions/secrets/{secret_name}/repositories", "GET /orgs/{org}/blocks", "GET /orgs/{org}/credential-authorizations", "GET /orgs/{org}/events", "GET /orgs/{org}/failed_invitations", "GET /orgs/{org}/hooks", "GET /orgs/{org}/installations", "GET /orgs/{org}/invitations", "GET /orgs/{org}/invitations/{invitation_id}/teams", "GET /orgs/{org}/issues", "GET /orgs/{org}/members", "GET /orgs/{org}/migrations", "GET /orgs/{org}/migrations/{migration_id}/repositories", "GET /orgs/{org}/outside_collaborators", "GET /orgs/{org}/projects", "GET /orgs/{org}/public_members", "GET /orgs/{org}/repos", "GET /orgs/{org}/team-sync/groups", "GET /orgs/{org}/teams", "GET /orgs/{org}/teams/{team_slug}/discussions", "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments", "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions", "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions", "GET /orgs/{org}/teams/{team_slug}/invitations", "GET /orgs/{org}/teams/{team_slug}/members", "GET /orgs/{org}/teams/{team_slug}/projects", "GET /orgs/{org}/teams/{team_slug}/repos", "GET /orgs/{org}/teams/{team_slug}/team-sync/group-mappings", "GET /orgs/{org}/teams/{team_slug}/teams", "GET /projects/columns/{column_id}/cards", "GET /projects/{project_id}/collaborators", "GET /projects/{project_id}/columns", "GET /repos/{owner}/{repo}/actions/artifacts", "GET /repos/{owner}/{repo}/actions/runners", "GET /repos/{owner}/{repo}/actions/runners/downloads", "GET /repos/{owner}/{repo}/actions/runs", "GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts", "GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs", "GET /repos/{owner}/{repo}/actions/secrets", "GET /repos/{owner}/{repo}/actions/workflows", "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs", "GET /repos/{owner}/{repo}/assignees", "GET /repos/{owner}/{repo}/branches", "GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations", "GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs", "GET /repos/{owner}/{repo}/code-scanning/alerts", "GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances", "GET /repos/{owner}/{repo}/code-scanning/analyses", "GET /repos/{owner}/{repo}/collaborators", "GET /repos/{owner}/{repo}/comments", "GET /repos/{owner}/{repo}/comments/{comment_id}/reactions", "GET /repos/{owner}/{repo}/commits", "GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head", "GET /repos/{owner}/{repo}/commits/{commit_sha}/comments", "GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls", "GET /repos/{owner}/{repo}/commits/{ref}/check-runs", "GET /repos/{owner}/{repo}/commits/{ref}/check-suites", "GET /repos/{owner}/{repo}/commits/{ref}/statuses", "GET /repos/{owner}/{repo}/contributors", "GET /repos/{owner}/{repo}/deployments", "GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses", "GET /repos/{owner}/{repo}/events", "GET /repos/{owner}/{repo}/forks", "GET /repos/{owner}/{repo}/git/matching-refs/{ref}", "GET /repos/{owner}/{repo}/hooks", "GET /repos/{owner}/{repo}/invitations", "GET /repos/{owner}/{repo}/issues", "GET /repos/{owner}/{repo}/issues/comments", "GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions", "GET /repos/{owner}/{repo}/issues/events", "GET /repos/{owner}/{repo}/issues/{issue_number}/comments", "GET /repos/{owner}/{repo}/issues/{issue_number}/events", "GET /repos/{owner}/{repo}/issues/{issue_number}/labels", "GET /repos/{owner}/{repo}/issues/{issue_number}/reactions", "GET /repos/{owner}/{repo}/issues/{issue_number}/timeline", "GET /repos/{owner}/{repo}/keys", "GET /repos/{owner}/{repo}/labels", "GET /repos/{owner}/{repo}/milestones", "GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels", "GET /repos/{owner}/{repo}/notifications", "GET /repos/{owner}/{repo}/pages/builds", "GET /repos/{owner}/{repo}/projects", "GET /repos/{owner}/{repo}/pulls", "GET /repos/{owner}/{repo}/pulls/comments", "GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions", "GET /repos/{owner}/{repo}/pulls/{pull_number}/comments", "GET /repos/{owner}/{repo}/pulls/{pull_number}/commits", "GET /repos/{owner}/{repo}/pulls/{pull_number}/files", "GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers", "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews", "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments", "GET /repos/{owner}/{repo}/releases", "GET /repos/{owner}/{repo}/releases/{release_id}/assets", "GET /repos/{owner}/{repo}/secret-scanning/alerts", "GET /repos/{owner}/{repo}/stargazers", "GET /repos/{owner}/{repo}/subscribers", "GET /repos/{owner}/{repo}/tags", "GET /repos/{owner}/{repo}/teams", "GET /repositories", "GET /repositories/{repository_id}/environments/{environment_name}/secrets", "GET /scim/v2/enterprises/{enterprise}/Groups", "GET /scim/v2/enterprises/{enterprise}/Users", "GET /scim/v2/organizations/{org}/Users", "GET /search/code", "GET /search/commits", "GET /search/issues", "GET /search/labels", "GET /search/repositories", "GET /search/topics", "GET /search/users", "GET /teams/{team_id}/discussions", "GET /teams/{team_id}/discussions/{discussion_number}/comments", "GET /teams/{team_id}/discussions/{discussion_number}/comments/{comment_number}/reactions", "GET /teams/{team_id}/discussions/{discussion_number}/reactions", "GET /teams/{team_id}/invitations", "GET /teams/{team_id}/members", "GET /teams/{team_id}/projects", "GET /teams/{team_id}/repos", "GET /teams/{team_id}/team-sync/group-mappings", "GET /teams/{team_id}/teams", "GET /user/blocks", "GET /user/emails", "GET /user/followers", "GET /user/following", "GET /user/gpg_keys", "GET /user/installations", "GET /user/installations/{installation_id}/repositories", "GET /user/issues", "GET /user/keys", "GET /user/marketplace_purchases", "GET /user/marketplace_purchases/stubbed", "GET /user/memberships/orgs", "GET /user/migrations", "GET /user/migrations/{migration_id}/repositories", "GET /user/orgs", "GET /user/public_emails", "GET /user/repos", "GET /user/repository_invitations", "GET /user/starred", "GET /user/subscriptions", "GET /user/teams", "GET /users", "GET /users/{username}/events", "GET /users/{username}/events/orgs/{org}", "GET /users/{username}/events/public", "GET /users/{username}/followers", "GET /users/{username}/following", "GET /users/{username}/gists", "GET /users/{username}/gpg_keys", "GET /users/{username}/keys", "GET /users/{username}/orgs", "GET /users/{username}/projects", "GET /users/{username}/received_events", "GET /users/{username}/received_events/public", "GET /users/{username}/repos", "GET /users/{username}/starred", "GET /users/{username}/subscriptions"];

      function isPaginatingEndpoint(arg) {
        if (typeof arg === "string") {
          return paginatingEndpoints.includes(arg);
        } else {
          return false;
        }
      }
      /**
       * @param octokit Octokit instance
       * @param options Options passed to Octokit constructor
       */


      function paginateRest(octokit) {
        return {
          paginate: Object.assign(paginate.bind(null, octokit), {
            iterator: iterator.bind(null, octokit)
          })
        };
      }

      paginateRest.VERSION = VERSION;
      exports.composePaginateRest = composePaginateRest;
      exports.isPaginatingEndpoint = isPaginatingEndpoint;
      exports.paginateRest = paginateRest;
      exports.paginatingEndpoints = paginatingEndpoints;
      /***/
    },

    /***/
    3044:
    /***/
    (__unused_webpack_module, exports) => {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);

        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);

          if (enumerableOnly) {
            symbols = symbols.filter(function (sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
          }

          keys.push.apply(keys, symbols);
        }

        return keys;
      }

      function _objectSpread2(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? arguments[i] : {};

          if (i % 2) {
            ownKeys(Object(source), true).forEach(function (key) {
              _defineProperty(target, key, source[key]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
          } else {
            ownKeys(Object(source)).forEach(function (key) {
              Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
          }
        }

        return target;
      }

      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }

        return obj;
      }

      const Endpoints = {
        actions: {
          addSelectedRepoToOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"],
          approveWorkflowRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/approve"],
          cancelWorkflowRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/cancel"],
          createOrUpdateEnvironmentSecret: ["PUT /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"],
          createOrUpdateOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}"],
          createOrUpdateRepoSecret: ["PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
          createRegistrationTokenForOrg: ["POST /orgs/{org}/actions/runners/registration-token"],
          createRegistrationTokenForRepo: ["POST /repos/{owner}/{repo}/actions/runners/registration-token"],
          createRemoveTokenForOrg: ["POST /orgs/{org}/actions/runners/remove-token"],
          createRemoveTokenForRepo: ["POST /repos/{owner}/{repo}/actions/runners/remove-token"],
          createWorkflowDispatch: ["POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches"],
          deleteArtifact: ["DELETE /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"],
          deleteEnvironmentSecret: ["DELETE /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"],
          deleteOrgSecret: ["DELETE /orgs/{org}/actions/secrets/{secret_name}"],
          deleteRepoSecret: ["DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
          deleteSelfHostedRunnerFromOrg: ["DELETE /orgs/{org}/actions/runners/{runner_id}"],
          deleteSelfHostedRunnerFromRepo: ["DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}"],
          deleteWorkflowRun: ["DELETE /repos/{owner}/{repo}/actions/runs/{run_id}"],
          deleteWorkflowRunLogs: ["DELETE /repos/{owner}/{repo}/actions/runs/{run_id}/logs"],
          disableSelectedRepositoryGithubActionsOrganization: ["DELETE /orgs/{org}/actions/permissions/repositories/{repository_id}"],
          disableWorkflow: ["PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable"],
          downloadArtifact: ["GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}"],
          downloadJobLogsForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs"],
          downloadWorkflowRunLogs: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs"],
          enableSelectedRepositoryGithubActionsOrganization: ["PUT /orgs/{org}/actions/permissions/repositories/{repository_id}"],
          enableWorkflow: ["PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable"],
          getAllowedActionsOrganization: ["GET /orgs/{org}/actions/permissions/selected-actions"],
          getAllowedActionsRepository: ["GET /repos/{owner}/{repo}/actions/permissions/selected-actions"],
          getArtifact: ["GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"],
          getEnvironmentPublicKey: ["GET /repositories/{repository_id}/environments/{environment_name}/secrets/public-key"],
          getEnvironmentSecret: ["GET /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"],
          getGithubActionsPermissionsOrganization: ["GET /orgs/{org}/actions/permissions"],
          getGithubActionsPermissionsRepository: ["GET /repos/{owner}/{repo}/actions/permissions"],
          getJobForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/jobs/{job_id}"],
          getOrgPublicKey: ["GET /orgs/{org}/actions/secrets/public-key"],
          getOrgSecret: ["GET /orgs/{org}/actions/secrets/{secret_name}"],
          getPendingDeploymentsForRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments"],
          getRepoPermissions: ["GET /repos/{owner}/{repo}/actions/permissions", {}, {
            renamed: ["actions", "getGithubActionsPermissionsRepository"]
          }],
          getRepoPublicKey: ["GET /repos/{owner}/{repo}/actions/secrets/public-key"],
          getRepoSecret: ["GET /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
          getReviewsForRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/approvals"],
          getSelfHostedRunnerForOrg: ["GET /orgs/{org}/actions/runners/{runner_id}"],
          getSelfHostedRunnerForRepo: ["GET /repos/{owner}/{repo}/actions/runners/{runner_id}"],
          getWorkflow: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}"],
          getWorkflowRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}"],
          getWorkflowRunUsage: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/timing"],
          getWorkflowUsage: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing"],
          listArtifactsForRepo: ["GET /repos/{owner}/{repo}/actions/artifacts"],
          listEnvironmentSecrets: ["GET /repositories/{repository_id}/environments/{environment_name}/secrets"],
          listJobsForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs"],
          listOrgSecrets: ["GET /orgs/{org}/actions/secrets"],
          listRepoSecrets: ["GET /repos/{owner}/{repo}/actions/secrets"],
          listRepoWorkflows: ["GET /repos/{owner}/{repo}/actions/workflows"],
          listRunnerApplicationsForOrg: ["GET /orgs/{org}/actions/runners/downloads"],
          listRunnerApplicationsForRepo: ["GET /repos/{owner}/{repo}/actions/runners/downloads"],
          listSelectedReposForOrgSecret: ["GET /orgs/{org}/actions/secrets/{secret_name}/repositories"],
          listSelectedRepositoriesEnabledGithubActionsOrganization: ["GET /orgs/{org}/actions/permissions/repositories"],
          listSelfHostedRunnersForOrg: ["GET /orgs/{org}/actions/runners"],
          listSelfHostedRunnersForRepo: ["GET /repos/{owner}/{repo}/actions/runners"],
          listWorkflowRunArtifacts: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts"],
          listWorkflowRuns: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs"],
          listWorkflowRunsForRepo: ["GET /repos/{owner}/{repo}/actions/runs"],
          reRunWorkflow: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun"],
          removeSelectedRepoFromOrgSecret: ["DELETE /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"],
          reviewPendingDeploymentsForRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments"],
          setAllowedActionsOrganization: ["PUT /orgs/{org}/actions/permissions/selected-actions"],
          setAllowedActionsRepository: ["PUT /repos/{owner}/{repo}/actions/permissions/selected-actions"],
          setGithubActionsPermissionsOrganization: ["PUT /orgs/{org}/actions/permissions"],
          setGithubActionsPermissionsRepository: ["PUT /repos/{owner}/{repo}/actions/permissions"],
          setSelectedReposForOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}/repositories"],
          setSelectedRepositoriesEnabledGithubActionsOrganization: ["PUT /orgs/{org}/actions/permissions/repositories"]
        },
        activity: {
          checkRepoIsStarredByAuthenticatedUser: ["GET /user/starred/{owner}/{repo}"],
          deleteRepoSubscription: ["DELETE /repos/{owner}/{repo}/subscription"],
          deleteThreadSubscription: ["DELETE /notifications/threads/{thread_id}/subscription"],
          getFeeds: ["GET /feeds"],
          getRepoSubscription: ["GET /repos/{owner}/{repo}/subscription"],
          getThread: ["GET /notifications/threads/{thread_id}"],
          getThreadSubscriptionForAuthenticatedUser: ["GET /notifications/threads/{thread_id}/subscription"],
          listEventsForAuthenticatedUser: ["GET /users/{username}/events"],
          listNotificationsForAuthenticatedUser: ["GET /notifications"],
          listOrgEventsForAuthenticatedUser: ["GET /users/{username}/events/orgs/{org}"],
          listPublicEvents: ["GET /events"],
          listPublicEventsForRepoNetwork: ["GET /networks/{owner}/{repo}/events"],
          listPublicEventsForUser: ["GET /users/{username}/events/public"],
          listPublicOrgEvents: ["GET /orgs/{org}/events"],
          listReceivedEventsForUser: ["GET /users/{username}/received_events"],
          listReceivedPublicEventsForUser: ["GET /users/{username}/received_events/public"],
          listRepoEvents: ["GET /repos/{owner}/{repo}/events"],
          listRepoNotificationsForAuthenticatedUser: ["GET /repos/{owner}/{repo}/notifications"],
          listReposStarredByAuthenticatedUser: ["GET /user/starred"],
          listReposStarredByUser: ["GET /users/{username}/starred"],
          listReposWatchedByUser: ["GET /users/{username}/subscriptions"],
          listStargazersForRepo: ["GET /repos/{owner}/{repo}/stargazers"],
          listWatchedReposForAuthenticatedUser: ["GET /user/subscriptions"],
          listWatchersForRepo: ["GET /repos/{owner}/{repo}/subscribers"],
          markNotificationsAsRead: ["PUT /notifications"],
          markRepoNotificationsAsRead: ["PUT /repos/{owner}/{repo}/notifications"],
          markThreadAsRead: ["PATCH /notifications/threads/{thread_id}"],
          setRepoSubscription: ["PUT /repos/{owner}/{repo}/subscription"],
          setThreadSubscription: ["PUT /notifications/threads/{thread_id}/subscription"],
          starRepoForAuthenticatedUser: ["PUT /user/starred/{owner}/{repo}"],
          unstarRepoForAuthenticatedUser: ["DELETE /user/starred/{owner}/{repo}"]
        },
        apps: {
          addRepoToInstallation: ["PUT /user/installations/{installation_id}/repositories/{repository_id}"],
          checkToken: ["POST /applications/{client_id}/token"],
          createContentAttachment: ["POST /content_references/{content_reference_id}/attachments", {
            mediaType: {
              previews: ["corsair"]
            }
          }],
          createContentAttachmentForRepo: ["POST /repos/{owner}/{repo}/content_references/{content_reference_id}/attachments", {
            mediaType: {
              previews: ["corsair"]
            }
          }],
          createFromManifest: ["POST /app-manifests/{code}/conversions"],
          createInstallationAccessToken: ["POST /app/installations/{installation_id}/access_tokens"],
          deleteAuthorization: ["DELETE /applications/{client_id}/grant"],
          deleteInstallation: ["DELETE /app/installations/{installation_id}"],
          deleteToken: ["DELETE /applications/{client_id}/token"],
          getAuthenticated: ["GET /app"],
          getBySlug: ["GET /apps/{app_slug}"],
          getInstallation: ["GET /app/installations/{installation_id}"],
          getOrgInstallation: ["GET /orgs/{org}/installation"],
          getRepoInstallation: ["GET /repos/{owner}/{repo}/installation"],
          getSubscriptionPlanForAccount: ["GET /marketplace_listing/accounts/{account_id}"],
          getSubscriptionPlanForAccountStubbed: ["GET /marketplace_listing/stubbed/accounts/{account_id}"],
          getUserInstallation: ["GET /users/{username}/installation"],
          getWebhookConfigForApp: ["GET /app/hook/config"],
          listAccountsForPlan: ["GET /marketplace_listing/plans/{plan_id}/accounts"],
          listAccountsForPlanStubbed: ["GET /marketplace_listing/stubbed/plans/{plan_id}/accounts"],
          listInstallationReposForAuthenticatedUser: ["GET /user/installations/{installation_id}/repositories"],
          listInstallations: ["GET /app/installations"],
          listInstallationsForAuthenticatedUser: ["GET /user/installations"],
          listPlans: ["GET /marketplace_listing/plans"],
          listPlansStubbed: ["GET /marketplace_listing/stubbed/plans"],
          listReposAccessibleToInstallation: ["GET /installation/repositories"],
          listSubscriptionsForAuthenticatedUser: ["GET /user/marketplace_purchases"],
          listSubscriptionsForAuthenticatedUserStubbed: ["GET /user/marketplace_purchases/stubbed"],
          removeRepoFromInstallation: ["DELETE /user/installations/{installation_id}/repositories/{repository_id}"],
          resetToken: ["PATCH /applications/{client_id}/token"],
          revokeInstallationAccessToken: ["DELETE /installation/token"],
          scopeToken: ["POST /applications/{client_id}/token/scoped"],
          suspendInstallation: ["PUT /app/installations/{installation_id}/suspended"],
          unsuspendInstallation: ["DELETE /app/installations/{installation_id}/suspended"],
          updateWebhookConfigForApp: ["PATCH /app/hook/config"]
        },
        billing: {
          getGithubActionsBillingOrg: ["GET /orgs/{org}/settings/billing/actions"],
          getGithubActionsBillingUser: ["GET /users/{username}/settings/billing/actions"],
          getGithubPackagesBillingOrg: ["GET /orgs/{org}/settings/billing/packages"],
          getGithubPackagesBillingUser: ["GET /users/{username}/settings/billing/packages"],
          getSharedStorageBillingOrg: ["GET /orgs/{org}/settings/billing/shared-storage"],
          getSharedStorageBillingUser: ["GET /users/{username}/settings/billing/shared-storage"]
        },
        checks: {
          create: ["POST /repos/{owner}/{repo}/check-runs"],
          createSuite: ["POST /repos/{owner}/{repo}/check-suites"],
          get: ["GET /repos/{owner}/{repo}/check-runs/{check_run_id}"],
          getSuite: ["GET /repos/{owner}/{repo}/check-suites/{check_suite_id}"],
          listAnnotations: ["GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations"],
          listForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-runs"],
          listForSuite: ["GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs"],
          listSuitesForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-suites"],
          rerequestSuite: ["POST /repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest"],
          setSuitesPreferences: ["PATCH /repos/{owner}/{repo}/check-suites/preferences"],
          update: ["PATCH /repos/{owner}/{repo}/check-runs/{check_run_id}"]
        },
        codeScanning: {
          deleteAnalysis: ["DELETE /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}{?confirm_delete}"],
          getAlert: ["GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}", {}, {
            renamedParameters: {
              alert_id: "alert_number"
            }
          }],
          getAnalysis: ["GET /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}"],
          getSarif: ["GET /repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}"],
          listAlertInstances: ["GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances"],
          listAlertsForRepo: ["GET /repos/{owner}/{repo}/code-scanning/alerts"],
          listAlertsInstances: ["GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances", {}, {
            renamed: ["codeScanning", "listAlertInstances"]
          }],
          listRecentAnalyses: ["GET /repos/{owner}/{repo}/code-scanning/analyses"],
          updateAlert: ["PATCH /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}"],
          uploadSarif: ["POST /repos/{owner}/{repo}/code-scanning/sarifs"]
        },
        codesOfConduct: {
          getAllCodesOfConduct: ["GET /codes_of_conduct", {
            mediaType: {
              previews: ["scarlet-witch"]
            }
          }],
          getConductCode: ["GET /codes_of_conduct/{key}", {
            mediaType: {
              previews: ["scarlet-witch"]
            }
          }],
          getForRepo: ["GET /repos/{owner}/{repo}/community/code_of_conduct", {
            mediaType: {
              previews: ["scarlet-witch"]
            }
          }]
        },
        emojis: {
          get: ["GET /emojis"]
        },
        enterpriseAdmin: {
          disableSelectedOrganizationGithubActionsEnterprise: ["DELETE /enterprises/{enterprise}/actions/permissions/organizations/{org_id}"],
          enableSelectedOrganizationGithubActionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions/organizations/{org_id}"],
          getAllowedActionsEnterprise: ["GET /enterprises/{enterprise}/actions/permissions/selected-actions"],
          getGithubActionsPermissionsEnterprise: ["GET /enterprises/{enterprise}/actions/permissions"],
          listSelectedOrganizationsEnabledGithubActionsEnterprise: ["GET /enterprises/{enterprise}/actions/permissions/organizations"],
          setAllowedActionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions/selected-actions"],
          setGithubActionsPermissionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions"],
          setSelectedOrganizationsEnabledGithubActionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions/organizations"]
        },
        gists: {
          checkIsStarred: ["GET /gists/{gist_id}/star"],
          create: ["POST /gists"],
          createComment: ["POST /gists/{gist_id}/comments"],
          delete: ["DELETE /gists/{gist_id}"],
          deleteComment: ["DELETE /gists/{gist_id}/comments/{comment_id}"],
          fork: ["POST /gists/{gist_id}/forks"],
          get: ["GET /gists/{gist_id}"],
          getComment: ["GET /gists/{gist_id}/comments/{comment_id}"],
          getRevision: ["GET /gists/{gist_id}/{sha}"],
          list: ["GET /gists"],
          listComments: ["GET /gists/{gist_id}/comments"],
          listCommits: ["GET /gists/{gist_id}/commits"],
          listForUser: ["GET /users/{username}/gists"],
          listForks: ["GET /gists/{gist_id}/forks"],
          listPublic: ["GET /gists/public"],
          listStarred: ["GET /gists/starred"],
          star: ["PUT /gists/{gist_id}/star"],
          unstar: ["DELETE /gists/{gist_id}/star"],
          update: ["PATCH /gists/{gist_id}"],
          updateComment: ["PATCH /gists/{gist_id}/comments/{comment_id}"]
        },
        git: {
          createBlob: ["POST /repos/{owner}/{repo}/git/blobs"],
          createCommit: ["POST /repos/{owner}/{repo}/git/commits"],
          createRef: ["POST /repos/{owner}/{repo}/git/refs"],
          createTag: ["POST /repos/{owner}/{repo}/git/tags"],
          createTree: ["POST /repos/{owner}/{repo}/git/trees"],
          deleteRef: ["DELETE /repos/{owner}/{repo}/git/refs/{ref}"],
          getBlob: ["GET /repos/{owner}/{repo}/git/blobs/{file_sha}"],
          getCommit: ["GET /repos/{owner}/{repo}/git/commits/{commit_sha}"],
          getRef: ["GET /repos/{owner}/{repo}/git/ref/{ref}"],
          getTag: ["GET /repos/{owner}/{repo}/git/tags/{tag_sha}"],
          getTree: ["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"],
          listMatchingRefs: ["GET /repos/{owner}/{repo}/git/matching-refs/{ref}"],
          updateRef: ["PATCH /repos/{owner}/{repo}/git/refs/{ref}"]
        },
        gitignore: {
          getAllTemplates: ["GET /gitignore/templates"],
          getTemplate: ["GET /gitignore/templates/{name}"]
        },
        interactions: {
          getRestrictionsForAuthenticatedUser: ["GET /user/interaction-limits"],
          getRestrictionsForOrg: ["GET /orgs/{org}/interaction-limits"],
          getRestrictionsForRepo: ["GET /repos/{owner}/{repo}/interaction-limits"],
          getRestrictionsForYourPublicRepos: ["GET /user/interaction-limits", {}, {
            renamed: ["interactions", "getRestrictionsForAuthenticatedUser"]
          }],
          removeRestrictionsForAuthenticatedUser: ["DELETE /user/interaction-limits"],
          removeRestrictionsForOrg: ["DELETE /orgs/{org}/interaction-limits"],
          removeRestrictionsForRepo: ["DELETE /repos/{owner}/{repo}/interaction-limits"],
          removeRestrictionsForYourPublicRepos: ["DELETE /user/interaction-limits", {}, {
            renamed: ["interactions", "removeRestrictionsForAuthenticatedUser"]
          }],
          setRestrictionsForAuthenticatedUser: ["PUT /user/interaction-limits"],
          setRestrictionsForOrg: ["PUT /orgs/{org}/interaction-limits"],
          setRestrictionsForRepo: ["PUT /repos/{owner}/{repo}/interaction-limits"],
          setRestrictionsForYourPublicRepos: ["PUT /user/interaction-limits", {}, {
            renamed: ["interactions", "setRestrictionsForAuthenticatedUser"]
          }]
        },
        issues: {
          addAssignees: ["POST /repos/{owner}/{repo}/issues/{issue_number}/assignees"],
          addLabels: ["POST /repos/{owner}/{repo}/issues/{issue_number}/labels"],
          checkUserCanBeAssigned: ["GET /repos/{owner}/{repo}/assignees/{assignee}"],
          create: ["POST /repos/{owner}/{repo}/issues"],
          createComment: ["POST /repos/{owner}/{repo}/issues/{issue_number}/comments"],
          createLabel: ["POST /repos/{owner}/{repo}/labels"],
          createMilestone: ["POST /repos/{owner}/{repo}/milestones"],
          deleteComment: ["DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}"],
          deleteLabel: ["DELETE /repos/{owner}/{repo}/labels/{name}"],
          deleteMilestone: ["DELETE /repos/{owner}/{repo}/milestones/{milestone_number}"],
          get: ["GET /repos/{owner}/{repo}/issues/{issue_number}"],
          getComment: ["GET /repos/{owner}/{repo}/issues/comments/{comment_id}"],
          getEvent: ["GET /repos/{owner}/{repo}/issues/events/{event_id}"],
          getLabel: ["GET /repos/{owner}/{repo}/labels/{name}"],
          getMilestone: ["GET /repos/{owner}/{repo}/milestones/{milestone_number}"],
          list: ["GET /issues"],
          listAssignees: ["GET /repos/{owner}/{repo}/assignees"],
          listComments: ["GET /repos/{owner}/{repo}/issues/{issue_number}/comments"],
          listCommentsForRepo: ["GET /repos/{owner}/{repo}/issues/comments"],
          listEvents: ["GET /repos/{owner}/{repo}/issues/{issue_number}/events"],
          listEventsForRepo: ["GET /repos/{owner}/{repo}/issues/events"],
          listEventsForTimeline: ["GET /repos/{owner}/{repo}/issues/{issue_number}/timeline", {
            mediaType: {
              previews: ["mockingbird"]
            }
          }],
          listForAuthenticatedUser: ["GET /user/issues"],
          listForOrg: ["GET /orgs/{org}/issues"],
          listForRepo: ["GET /repos/{owner}/{repo}/issues"],
          listLabelsForMilestone: ["GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels"],
          listLabelsForRepo: ["GET /repos/{owner}/{repo}/labels"],
          listLabelsOnIssue: ["GET /repos/{owner}/{repo}/issues/{issue_number}/labels"],
          listMilestones: ["GET /repos/{owner}/{repo}/milestones"],
          lock: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/lock"],
          removeAllLabels: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels"],
          removeAssignees: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees"],
          removeLabel: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}"],
          setLabels: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/labels"],
          unlock: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/lock"],
          update: ["PATCH /repos/{owner}/{repo}/issues/{issue_number}"],
          updateComment: ["PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}"],
          updateLabel: ["PATCH /repos/{owner}/{repo}/labels/{name}"],
          updateMilestone: ["PATCH /repos/{owner}/{repo}/milestones/{milestone_number}"]
        },
        licenses: {
          get: ["GET /licenses/{license}"],
          getAllCommonlyUsed: ["GET /licenses"],
          getForRepo: ["GET /repos/{owner}/{repo}/license"]
        },
        markdown: {
          render: ["POST /markdown"],
          renderRaw: ["POST /markdown/raw", {
            headers: {
              "content-type": "text/plain; charset=utf-8"
            }
          }]
        },
        meta: {
          get: ["GET /meta"],
          getOctocat: ["GET /octocat"],
          getZen: ["GET /zen"],
          root: ["GET /"]
        },
        migrations: {
          cancelImport: ["DELETE /repos/{owner}/{repo}/import"],
          deleteArchiveForAuthenticatedUser: ["DELETE /user/migrations/{migration_id}/archive", {
            mediaType: {
              previews: ["wyandotte"]
            }
          }],
          deleteArchiveForOrg: ["DELETE /orgs/{org}/migrations/{migration_id}/archive", {
            mediaType: {
              previews: ["wyandotte"]
            }
          }],
          downloadArchiveForOrg: ["GET /orgs/{org}/migrations/{migration_id}/archive", {
            mediaType: {
              previews: ["wyandotte"]
            }
          }],
          getArchiveForAuthenticatedUser: ["GET /user/migrations/{migration_id}/archive", {
            mediaType: {
              previews: ["wyandotte"]
            }
          }],
          getCommitAuthors: ["GET /repos/{owner}/{repo}/import/authors"],
          getImportStatus: ["GET /repos/{owner}/{repo}/import"],
          getLargeFiles: ["GET /repos/{owner}/{repo}/import/large_files"],
          getStatusForAuthenticatedUser: ["GET /user/migrations/{migration_id}", {
            mediaType: {
              previews: ["wyandotte"]
            }
          }],
          getStatusForOrg: ["GET /orgs/{org}/migrations/{migration_id}", {
            mediaType: {
              previews: ["wyandotte"]
            }
          }],
          listForAuthenticatedUser: ["GET /user/migrations", {
            mediaType: {
              previews: ["wyandotte"]
            }
          }],
          listForOrg: ["GET /orgs/{org}/migrations", {
            mediaType: {
              previews: ["wyandotte"]
            }
          }],
          listReposForOrg: ["GET /orgs/{org}/migrations/{migration_id}/repositories", {
            mediaType: {
              previews: ["wyandotte"]
            }
          }],
          listReposForUser: ["GET /user/migrations/{migration_id}/repositories", {
            mediaType: {
              previews: ["wyandotte"]
            }
          }],
          mapCommitAuthor: ["PATCH /repos/{owner}/{repo}/import/authors/{author_id}"],
          setLfsPreference: ["PATCH /repos/{owner}/{repo}/import/lfs"],
          startForAuthenticatedUser: ["POST /user/migrations"],
          startForOrg: ["POST /orgs/{org}/migrations"],
          startImport: ["PUT /repos/{owner}/{repo}/import"],
          unlockRepoForAuthenticatedUser: ["DELETE /user/migrations/{migration_id}/repos/{repo_name}/lock", {
            mediaType: {
              previews: ["wyandotte"]
            }
          }],
          unlockRepoForOrg: ["DELETE /orgs/{org}/migrations/{migration_id}/repos/{repo_name}/lock", {
            mediaType: {
              previews: ["wyandotte"]
            }
          }],
          updateImport: ["PATCH /repos/{owner}/{repo}/import"]
        },
        orgs: {
          blockUser: ["PUT /orgs/{org}/blocks/{username}"],
          cancelInvitation: ["DELETE /orgs/{org}/invitations/{invitation_id}"],
          checkBlockedUser: ["GET /orgs/{org}/blocks/{username}"],
          checkMembershipForUser: ["GET /orgs/{org}/members/{username}"],
          checkPublicMembershipForUser: ["GET /orgs/{org}/public_members/{username}"],
          convertMemberToOutsideCollaborator: ["PUT /orgs/{org}/outside_collaborators/{username}"],
          createInvitation: ["POST /orgs/{org}/invitations"],
          createWebhook: ["POST /orgs/{org}/hooks"],
          deleteWebhook: ["DELETE /orgs/{org}/hooks/{hook_id}"],
          get: ["GET /orgs/{org}"],
          getMembershipForAuthenticatedUser: ["GET /user/memberships/orgs/{org}"],
          getMembershipForUser: ["GET /orgs/{org}/memberships/{username}"],
          getWebhook: ["GET /orgs/{org}/hooks/{hook_id}"],
          getWebhookConfigForOrg: ["GET /orgs/{org}/hooks/{hook_id}/config"],
          list: ["GET /organizations"],
          listAppInstallations: ["GET /orgs/{org}/installations"],
          listBlockedUsers: ["GET /orgs/{org}/blocks"],
          listFailedInvitations: ["GET /orgs/{org}/failed_invitations"],
          listForAuthenticatedUser: ["GET /user/orgs"],
          listForUser: ["GET /users/{username}/orgs"],
          listInvitationTeams: ["GET /orgs/{org}/invitations/{invitation_id}/teams"],
          listMembers: ["GET /orgs/{org}/members"],
          listMembershipsForAuthenticatedUser: ["GET /user/memberships/orgs"],
          listOutsideCollaborators: ["GET /orgs/{org}/outside_collaborators"],
          listPendingInvitations: ["GET /orgs/{org}/invitations"],
          listPublicMembers: ["GET /orgs/{org}/public_members"],
          listWebhooks: ["GET /orgs/{org}/hooks"],
          pingWebhook: ["POST /orgs/{org}/hooks/{hook_id}/pings"],
          removeMember: ["DELETE /orgs/{org}/members/{username}"],
          removeMembershipForUser: ["DELETE /orgs/{org}/memberships/{username}"],
          removeOutsideCollaborator: ["DELETE /orgs/{org}/outside_collaborators/{username}"],
          removePublicMembershipForAuthenticatedUser: ["DELETE /orgs/{org}/public_members/{username}"],
          setMembershipForUser: ["PUT /orgs/{org}/memberships/{username}"],
          setPublicMembershipForAuthenticatedUser: ["PUT /orgs/{org}/public_members/{username}"],
          unblockUser: ["DELETE /orgs/{org}/blocks/{username}"],
          update: ["PATCH /orgs/{org}"],
          updateMembershipForAuthenticatedUser: ["PATCH /user/memberships/orgs/{org}"],
          updateWebhook: ["PATCH /orgs/{org}/hooks/{hook_id}"],
          updateWebhookConfigForOrg: ["PATCH /orgs/{org}/hooks/{hook_id}/config"]
        },
        packages: {
          deletePackageForAuthenticatedUser: ["DELETE /user/packages/{package_type}/{package_name}"],
          deletePackageForOrg: ["DELETE /orgs/{org}/packages/{package_type}/{package_name}"],
          deletePackageVersionForAuthenticatedUser: ["DELETE /user/packages/{package_type}/{package_name}/versions/{package_version_id}"],
          deletePackageVersionForOrg: ["DELETE /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
          getAllPackageVersionsForAPackageOwnedByAnOrg: ["GET /orgs/{org}/packages/{package_type}/{package_name}/versions", {}, {
            renamed: ["packages", "getAllPackageVersionsForPackageOwnedByOrg"]
          }],
          getAllPackageVersionsForAPackageOwnedByTheAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}/versions", {}, {
            renamed: ["packages", "getAllPackageVersionsForPackageOwnedByAuthenticatedUser"]
          }],
          getAllPackageVersionsForPackageOwnedByAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}/versions"],
          getAllPackageVersionsForPackageOwnedByOrg: ["GET /orgs/{org}/packages/{package_type}/{package_name}/versions"],
          getAllPackageVersionsForPackageOwnedByUser: ["GET /users/{username}/packages/{package_type}/{package_name}/versions"],
          getPackageForAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}"],
          getPackageForOrganization: ["GET /orgs/{org}/packages/{package_type}/{package_name}"],
          getPackageForUser: ["GET /users/{username}/packages/{package_type}/{package_name}"],
          getPackageVersionForAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}/versions/{package_version_id}"],
          getPackageVersionForOrganization: ["GET /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
          getPackageVersionForUser: ["GET /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
          restorePackageForAuthenticatedUser: ["POST /user/packages/{package_type}/{package_name}/restore{?token}"],
          restorePackageForOrg: ["POST /orgs/{org}/packages/{package_type}/{package_name}/restore{?token}"],
          restorePackageVersionForAuthenticatedUser: ["POST /user/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"],
          restorePackageVersionForOrg: ["POST /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"]
        },
        projects: {
          addCollaborator: ["PUT /projects/{project_id}/collaborators/{username}", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          createCard: ["POST /projects/columns/{column_id}/cards", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          createColumn: ["POST /projects/{project_id}/columns", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          createForAuthenticatedUser: ["POST /user/projects", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          createForOrg: ["POST /orgs/{org}/projects", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          createForRepo: ["POST /repos/{owner}/{repo}/projects", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          delete: ["DELETE /projects/{project_id}", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          deleteCard: ["DELETE /projects/columns/cards/{card_id}", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          deleteColumn: ["DELETE /projects/columns/{column_id}", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          get: ["GET /projects/{project_id}", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          getCard: ["GET /projects/columns/cards/{card_id}", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          getColumn: ["GET /projects/columns/{column_id}", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          getPermissionForUser: ["GET /projects/{project_id}/collaborators/{username}/permission", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          listCards: ["GET /projects/columns/{column_id}/cards", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          listCollaborators: ["GET /projects/{project_id}/collaborators", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          listColumns: ["GET /projects/{project_id}/columns", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          listForOrg: ["GET /orgs/{org}/projects", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          listForRepo: ["GET /repos/{owner}/{repo}/projects", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          listForUser: ["GET /users/{username}/projects", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          moveCard: ["POST /projects/columns/cards/{card_id}/moves", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          moveColumn: ["POST /projects/columns/{column_id}/moves", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          removeCollaborator: ["DELETE /projects/{project_id}/collaborators/{username}", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          update: ["PATCH /projects/{project_id}", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          updateCard: ["PATCH /projects/columns/cards/{card_id}", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          updateColumn: ["PATCH /projects/columns/{column_id}", {
            mediaType: {
              previews: ["inertia"]
            }
          }]
        },
        pulls: {
          checkIfMerged: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
          create: ["POST /repos/{owner}/{repo}/pulls"],
          createReplyForReviewComment: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies"],
          createReview: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
          createReviewComment: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/comments"],
          deletePendingReview: ["DELETE /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
          deleteReviewComment: ["DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}"],
          dismissReview: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals"],
          get: ["GET /repos/{owner}/{repo}/pulls/{pull_number}"],
          getReview: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
          getReviewComment: ["GET /repos/{owner}/{repo}/pulls/comments/{comment_id}"],
          list: ["GET /repos/{owner}/{repo}/pulls"],
          listCommentsForReview: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments"],
          listCommits: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/commits"],
          listFiles: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/files"],
          listRequestedReviewers: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
          listReviewComments: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/comments"],
          listReviewCommentsForRepo: ["GET /repos/{owner}/{repo}/pulls/comments"],
          listReviews: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
          merge: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
          removeRequestedReviewers: ["DELETE /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
          requestReviewers: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
          submitReview: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events"],
          update: ["PATCH /repos/{owner}/{repo}/pulls/{pull_number}"],
          updateBranch: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/update-branch", {
            mediaType: {
              previews: ["lydian"]
            }
          }],
          updateReview: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
          updateReviewComment: ["PATCH /repos/{owner}/{repo}/pulls/comments/{comment_id}"]
        },
        rateLimit: {
          get: ["GET /rate_limit"]
        },
        reactions: {
          createForCommitComment: ["POST /repos/{owner}/{repo}/comments/{comment_id}/reactions", {
            mediaType: {
              previews: ["squirrel-girl"]
            }
          }],
          createForIssue: ["POST /repos/{owner}/{repo}/issues/{issue_number}/reactions", {
            mediaType: {
              previews: ["squirrel-girl"]
            }
          }],
          createForIssueComment: ["POST /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions", {
            mediaType: {
              previews: ["squirrel-girl"]
            }
          }],
          createForPullRequestReviewComment: ["POST /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions", {
            mediaType: {
              previews: ["squirrel-girl"]
            }
          }],
          createForRelease: ["POST /repos/{owner}/{repo}/releases/{release_id}/reactions", {
            mediaType: {
              previews: ["squirrel-girl"]
            }
          }],
          createForTeamDiscussionCommentInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions", {
            mediaType: {
              previews: ["squirrel-girl"]
            }
          }],
          createForTeamDiscussionInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions", {
            mediaType: {
              previews: ["squirrel-girl"]
            }
          }],
          deleteForCommitComment: ["DELETE /repos/{owner}/{repo}/comments/{comment_id}/reactions/{reaction_id}", {
            mediaType: {
              previews: ["squirrel-girl"]
            }
          }],
          deleteForIssue: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}", {
            mediaType: {
              previews: ["squirrel-girl"]
            }
          }],
          deleteForIssueComment: ["DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}", {
            mediaType: {
              previews: ["squirrel-girl"]
            }
          }],
          deleteForPullRequestComment: ["DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions/{reaction_id}", {
            mediaType: {
              previews: ["squirrel-girl"]
            }
          }],
          deleteForTeamDiscussion: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions/{reaction_id}", {
            mediaType: {
              previews: ["squirrel-girl"]
            }
          }],
          deleteForTeamDiscussionComment: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions/{reaction_id}", {
            mediaType: {
              previews: ["squirrel-girl"]
            }
          }],
          deleteLegacy: ["DELETE /reactions/{reaction_id}", {
            mediaType: {
              previews: ["squirrel-girl"]
            }
          }, {
            deprecated: "octokit.rest.reactions.deleteLegacy() is deprecated, see https://docs.github.com/rest/reference/reactions/#delete-a-reaction-legacy"
          }],
          listForCommitComment: ["GET /repos/{owner}/{repo}/comments/{comment_id}/reactions", {
            mediaType: {
              previews: ["squirrel-girl"]
            }
          }],
          listForIssue: ["GET /repos/{owner}/{repo}/issues/{issue_number}/reactions", {
            mediaType: {
              previews: ["squirrel-girl"]
            }
          }],
          listForIssueComment: ["GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions", {
            mediaType: {
              previews: ["squirrel-girl"]
            }
          }],
          listForPullRequestReviewComment: ["GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions", {
            mediaType: {
              previews: ["squirrel-girl"]
            }
          }],
          listForTeamDiscussionCommentInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions", {
            mediaType: {
              previews: ["squirrel-girl"]
            }
          }],
          listForTeamDiscussionInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions", {
            mediaType: {
              previews: ["squirrel-girl"]
            }
          }]
        },
        repos: {
          acceptInvitation: ["PATCH /user/repository_invitations/{invitation_id}"],
          addAppAccessRestrictions: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps", {}, {
            mapToData: "apps"
          }],
          addCollaborator: ["PUT /repos/{owner}/{repo}/collaborators/{username}"],
          addStatusCheckContexts: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts", {}, {
            mapToData: "contexts"
          }],
          addTeamAccessRestrictions: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams", {}, {
            mapToData: "teams"
          }],
          addUserAccessRestrictions: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users", {}, {
            mapToData: "users"
          }],
          checkCollaborator: ["GET /repos/{owner}/{repo}/collaborators/{username}"],
          checkVulnerabilityAlerts: ["GET /repos/{owner}/{repo}/vulnerability-alerts", {
            mediaType: {
              previews: ["dorian"]
            }
          }],
          compareCommits: ["GET /repos/{owner}/{repo}/compare/{base}...{head}"],
          compareCommitsWithBasehead: ["GET /repos/{owner}/{repo}/compare/{basehead}"],
          createCommitComment: ["POST /repos/{owner}/{repo}/commits/{commit_sha}/comments"],
          createCommitSignatureProtection: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures", {
            mediaType: {
              previews: ["zzzax"]
            }
          }],
          createCommitStatus: ["POST /repos/{owner}/{repo}/statuses/{sha}"],
          createDeployKey: ["POST /repos/{owner}/{repo}/keys"],
          createDeployment: ["POST /repos/{owner}/{repo}/deployments"],
          createDeploymentStatus: ["POST /repos/{owner}/{repo}/deployments/{deployment_id}/statuses"],
          createDispatchEvent: ["POST /repos/{owner}/{repo}/dispatches"],
          createForAuthenticatedUser: ["POST /user/repos"],
          createFork: ["POST /repos/{owner}/{repo}/forks"],
          createInOrg: ["POST /orgs/{org}/repos"],
          createOrUpdateEnvironment: ["PUT /repos/{owner}/{repo}/environments/{environment_name}"],
          createOrUpdateFileContents: ["PUT /repos/{owner}/{repo}/contents/{path}"],
          createPagesSite: ["POST /repos/{owner}/{repo}/pages", {
            mediaType: {
              previews: ["switcheroo"]
            }
          }],
          createRelease: ["POST /repos/{owner}/{repo}/releases"],
          createUsingTemplate: ["POST /repos/{template_owner}/{template_repo}/generate", {
            mediaType: {
              previews: ["baptiste"]
            }
          }],
          createWebhook: ["POST /repos/{owner}/{repo}/hooks"],
          declineInvitation: ["DELETE /user/repository_invitations/{invitation_id}"],
          delete: ["DELETE /repos/{owner}/{repo}"],
          deleteAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions"],
          deleteAdminBranchProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
          deleteAnEnvironment: ["DELETE /repos/{owner}/{repo}/environments/{environment_name}"],
          deleteBranchProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection"],
          deleteCommitComment: ["DELETE /repos/{owner}/{repo}/comments/{comment_id}"],
          deleteCommitSignatureProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures", {
            mediaType: {
              previews: ["zzzax"]
            }
          }],
          deleteDeployKey: ["DELETE /repos/{owner}/{repo}/keys/{key_id}"],
          deleteDeployment: ["DELETE /repos/{owner}/{repo}/deployments/{deployment_id}"],
          deleteFile: ["DELETE /repos/{owner}/{repo}/contents/{path}"],
          deleteInvitation: ["DELETE /repos/{owner}/{repo}/invitations/{invitation_id}"],
          deletePagesSite: ["DELETE /repos/{owner}/{repo}/pages", {
            mediaType: {
              previews: ["switcheroo"]
            }
          }],
          deletePullRequestReviewProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
          deleteRelease: ["DELETE /repos/{owner}/{repo}/releases/{release_id}"],
          deleteReleaseAsset: ["DELETE /repos/{owner}/{repo}/releases/assets/{asset_id}"],
          deleteWebhook: ["DELETE /repos/{owner}/{repo}/hooks/{hook_id}"],
          disableAutomatedSecurityFixes: ["DELETE /repos/{owner}/{repo}/automated-security-fixes", {
            mediaType: {
              previews: ["london"]
            }
          }],
          disableVulnerabilityAlerts: ["DELETE /repos/{owner}/{repo}/vulnerability-alerts", {
            mediaType: {
              previews: ["dorian"]
            }
          }],
          downloadArchive: ["GET /repos/{owner}/{repo}/zipball/{ref}", {}, {
            renamed: ["repos", "downloadZipballArchive"]
          }],
          downloadTarballArchive: ["GET /repos/{owner}/{repo}/tarball/{ref}"],
          downloadZipballArchive: ["GET /repos/{owner}/{repo}/zipball/{ref}"],
          enableAutomatedSecurityFixes: ["PUT /repos/{owner}/{repo}/automated-security-fixes", {
            mediaType: {
              previews: ["london"]
            }
          }],
          enableVulnerabilityAlerts: ["PUT /repos/{owner}/{repo}/vulnerability-alerts", {
            mediaType: {
              previews: ["dorian"]
            }
          }],
          get: ["GET /repos/{owner}/{repo}"],
          getAccessRestrictions: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions"],
          getAdminBranchProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
          getAllEnvironments: ["GET /repos/{owner}/{repo}/environments"],
          getAllStatusCheckContexts: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts"],
          getAllTopics: ["GET /repos/{owner}/{repo}/topics", {
            mediaType: {
              previews: ["mercy"]
            }
          }],
          getAppsWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps"],
          getBranch: ["GET /repos/{owner}/{repo}/branches/{branch}"],
          getBranchProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection"],
          getClones: ["GET /repos/{owner}/{repo}/traffic/clones"],
          getCodeFrequencyStats: ["GET /repos/{owner}/{repo}/stats/code_frequency"],
          getCollaboratorPermissionLevel: ["GET /repos/{owner}/{repo}/collaborators/{username}/permission"],
          getCombinedStatusForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/status"],
          getCommit: ["GET /repos/{owner}/{repo}/commits/{ref}"],
          getCommitActivityStats: ["GET /repos/{owner}/{repo}/stats/commit_activity"],
          getCommitComment: ["GET /repos/{owner}/{repo}/comments/{comment_id}"],
          getCommitSignatureProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures", {
            mediaType: {
              previews: ["zzzax"]
            }
          }],
          getCommunityProfileMetrics: ["GET /repos/{owner}/{repo}/community/profile"],
          getContent: ["GET /repos/{owner}/{repo}/contents/{path}"],
          getContributorsStats: ["GET /repos/{owner}/{repo}/stats/contributors"],
          getDeployKey: ["GET /repos/{owner}/{repo}/keys/{key_id}"],
          getDeployment: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}"],
          getDeploymentStatus: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses/{status_id}"],
          getEnvironment: ["GET /repos/{owner}/{repo}/environments/{environment_name}"],
          getLatestPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/latest"],
          getLatestRelease: ["GET /repos/{owner}/{repo}/releases/latest"],
          getPages: ["GET /repos/{owner}/{repo}/pages"],
          getPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/{build_id}"],
          getPagesHealthCheck: ["GET /repos/{owner}/{repo}/pages/health"],
          getParticipationStats: ["GET /repos/{owner}/{repo}/stats/participation"],
          getPullRequestReviewProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
          getPunchCardStats: ["GET /repos/{owner}/{repo}/stats/punch_card"],
          getReadme: ["GET /repos/{owner}/{repo}/readme"],
          getReadmeInDirectory: ["GET /repos/{owner}/{repo}/readme/{dir}"],
          getRelease: ["GET /repos/{owner}/{repo}/releases/{release_id}"],
          getReleaseAsset: ["GET /repos/{owner}/{repo}/releases/assets/{asset_id}"],
          getReleaseByTag: ["GET /repos/{owner}/{repo}/releases/tags/{tag}"],
          getStatusChecksProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
          getTeamsWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams"],
          getTopPaths: ["GET /repos/{owner}/{repo}/traffic/popular/paths"],
          getTopReferrers: ["GET /repos/{owner}/{repo}/traffic/popular/referrers"],
          getUsersWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users"],
          getViews: ["GET /repos/{owner}/{repo}/traffic/views"],
          getWebhook: ["GET /repos/{owner}/{repo}/hooks/{hook_id}"],
          getWebhookConfigForRepo: ["GET /repos/{owner}/{repo}/hooks/{hook_id}/config"],
          listBranches: ["GET /repos/{owner}/{repo}/branches"],
          listBranchesForHeadCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head", {
            mediaType: {
              previews: ["groot"]
            }
          }],
          listCollaborators: ["GET /repos/{owner}/{repo}/collaborators"],
          listCommentsForCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/comments"],
          listCommitCommentsForRepo: ["GET /repos/{owner}/{repo}/comments"],
          listCommitStatusesForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/statuses"],
          listCommits: ["GET /repos/{owner}/{repo}/commits"],
          listContributors: ["GET /repos/{owner}/{repo}/contributors"],
          listDeployKeys: ["GET /repos/{owner}/{repo}/keys"],
          listDeploymentStatuses: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses"],
          listDeployments: ["GET /repos/{owner}/{repo}/deployments"],
          listForAuthenticatedUser: ["GET /user/repos"],
          listForOrg: ["GET /orgs/{org}/repos"],
          listForUser: ["GET /users/{username}/repos"],
          listForks: ["GET /repos/{owner}/{repo}/forks"],
          listInvitations: ["GET /repos/{owner}/{repo}/invitations"],
          listInvitationsForAuthenticatedUser: ["GET /user/repository_invitations"],
          listLanguages: ["GET /repos/{owner}/{repo}/languages"],
          listPagesBuilds: ["GET /repos/{owner}/{repo}/pages/builds"],
          listPublic: ["GET /repositories"],
          listPullRequestsAssociatedWithCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls", {
            mediaType: {
              previews: ["groot"]
            }
          }],
          listReleaseAssets: ["GET /repos/{owner}/{repo}/releases/{release_id}/assets"],
          listReleases: ["GET /repos/{owner}/{repo}/releases"],
          listTags: ["GET /repos/{owner}/{repo}/tags"],
          listTeams: ["GET /repos/{owner}/{repo}/teams"],
          listWebhooks: ["GET /repos/{owner}/{repo}/hooks"],
          merge: ["POST /repos/{owner}/{repo}/merges"],
          pingWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/pings"],
          removeAppAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps", {}, {
            mapToData: "apps"
          }],
          removeCollaborator: ["DELETE /repos/{owner}/{repo}/collaborators/{username}"],
          removeStatusCheckContexts: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts", {}, {
            mapToData: "contexts"
          }],
          removeStatusCheckProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
          removeTeamAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams", {}, {
            mapToData: "teams"
          }],
          removeUserAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users", {}, {
            mapToData: "users"
          }],
          renameBranch: ["POST /repos/{owner}/{repo}/branches/{branch}/rename"],
          replaceAllTopics: ["PUT /repos/{owner}/{repo}/topics", {
            mediaType: {
              previews: ["mercy"]
            }
          }],
          requestPagesBuild: ["POST /repos/{owner}/{repo}/pages/builds"],
          setAdminBranchProtection: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
          setAppAccessRestrictions: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps", {}, {
            mapToData: "apps"
          }],
          setStatusCheckContexts: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts", {}, {
            mapToData: "contexts"
          }],
          setTeamAccessRestrictions: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams", {}, {
            mapToData: "teams"
          }],
          setUserAccessRestrictions: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users", {}, {
            mapToData: "users"
          }],
          testPushWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/tests"],
          transfer: ["POST /repos/{owner}/{repo}/transfer"],
          update: ["PATCH /repos/{owner}/{repo}"],
          updateBranchProtection: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection"],
          updateCommitComment: ["PATCH /repos/{owner}/{repo}/comments/{comment_id}"],
          updateInformationAboutPagesSite: ["PUT /repos/{owner}/{repo}/pages"],
          updateInvitation: ["PATCH /repos/{owner}/{repo}/invitations/{invitation_id}"],
          updatePullRequestReviewProtection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
          updateRelease: ["PATCH /repos/{owner}/{repo}/releases/{release_id}"],
          updateReleaseAsset: ["PATCH /repos/{owner}/{repo}/releases/assets/{asset_id}"],
          updateStatusCheckPotection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks", {}, {
            renamed: ["repos", "updateStatusCheckProtection"]
          }],
          updateStatusCheckProtection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
          updateWebhook: ["PATCH /repos/{owner}/{repo}/hooks/{hook_id}"],
          updateWebhookConfigForRepo: ["PATCH /repos/{owner}/{repo}/hooks/{hook_id}/config"],
          uploadReleaseAsset: ["POST /repos/{owner}/{repo}/releases/{release_id}/assets{?name,label}", {
            baseUrl: "https://uploads.github.com"
          }]
        },
        search: {
          code: ["GET /search/code"],
          commits: ["GET /search/commits", {
            mediaType: {
              previews: ["cloak"]
            }
          }],
          issuesAndPullRequests: ["GET /search/issues"],
          labels: ["GET /search/labels"],
          repos: ["GET /search/repositories"],
          topics: ["GET /search/topics", {
            mediaType: {
              previews: ["mercy"]
            }
          }],
          users: ["GET /search/users"]
        },
        secretScanning: {
          getAlert: ["GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"],
          listAlertsForRepo: ["GET /repos/{owner}/{repo}/secret-scanning/alerts"],
          updateAlert: ["PATCH /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"]
        },
        teams: {
          addOrUpdateMembershipForUserInOrg: ["PUT /orgs/{org}/teams/{team_slug}/memberships/{username}"],
          addOrUpdateProjectPermissionsInOrg: ["PUT /orgs/{org}/teams/{team_slug}/projects/{project_id}", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          addOrUpdateRepoPermissionsInOrg: ["PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
          checkPermissionsForProjectInOrg: ["GET /orgs/{org}/teams/{team_slug}/projects/{project_id}", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          checkPermissionsForRepoInOrg: ["GET /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
          create: ["POST /orgs/{org}/teams"],
          createDiscussionCommentInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments"],
          createDiscussionInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions"],
          deleteDiscussionCommentInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
          deleteDiscussionInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
          deleteInOrg: ["DELETE /orgs/{org}/teams/{team_slug}"],
          getByName: ["GET /orgs/{org}/teams/{team_slug}"],
          getDiscussionCommentInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
          getDiscussionInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
          getMembershipForUserInOrg: ["GET /orgs/{org}/teams/{team_slug}/memberships/{username}"],
          list: ["GET /orgs/{org}/teams"],
          listChildInOrg: ["GET /orgs/{org}/teams/{team_slug}/teams"],
          listDiscussionCommentsInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments"],
          listDiscussionsInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions"],
          listForAuthenticatedUser: ["GET /user/teams"],
          listMembersInOrg: ["GET /orgs/{org}/teams/{team_slug}/members"],
          listPendingInvitationsInOrg: ["GET /orgs/{org}/teams/{team_slug}/invitations"],
          listProjectsInOrg: ["GET /orgs/{org}/teams/{team_slug}/projects", {
            mediaType: {
              previews: ["inertia"]
            }
          }],
          listReposInOrg: ["GET /orgs/{org}/teams/{team_slug}/repos"],
          removeMembershipForUserInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/memberships/{username}"],
          removeProjectInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/projects/{project_id}"],
          removeRepoInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
          updateDiscussionCommentInOrg: ["PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
          updateDiscussionInOrg: ["PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
          updateInOrg: ["PATCH /orgs/{org}/teams/{team_slug}"]
        },
        users: {
          addEmailForAuthenticated: ["POST /user/emails"],
          block: ["PUT /user/blocks/{username}"],
          checkBlocked: ["GET /user/blocks/{username}"],
          checkFollowingForUser: ["GET /users/{username}/following/{target_user}"],
          checkPersonIsFollowedByAuthenticated: ["GET /user/following/{username}"],
          createGpgKeyForAuthenticated: ["POST /user/gpg_keys"],
          createPublicSshKeyForAuthenticated: ["POST /user/keys"],
          deleteEmailForAuthenticated: ["DELETE /user/emails"],
          deleteGpgKeyForAuthenticated: ["DELETE /user/gpg_keys/{gpg_key_id}"],
          deletePublicSshKeyForAuthenticated: ["DELETE /user/keys/{key_id}"],
          follow: ["PUT /user/following/{username}"],
          getAuthenticated: ["GET /user"],
          getByUsername: ["GET /users/{username}"],
          getContextForUser: ["GET /users/{username}/hovercard"],
          getGpgKeyForAuthenticated: ["GET /user/gpg_keys/{gpg_key_id}"],
          getPublicSshKeyForAuthenticated: ["GET /user/keys/{key_id}"],
          list: ["GET /users"],
          listBlockedByAuthenticated: ["GET /user/blocks"],
          listEmailsForAuthenticated: ["GET /user/emails"],
          listFollowedByAuthenticated: ["GET /user/following"],
          listFollowersForAuthenticatedUser: ["GET /user/followers"],
          listFollowersForUser: ["GET /users/{username}/followers"],
          listFollowingForUser: ["GET /users/{username}/following"],
          listGpgKeysForAuthenticated: ["GET /user/gpg_keys"],
          listGpgKeysForUser: ["GET /users/{username}/gpg_keys"],
          listPublicEmailsForAuthenticated: ["GET /user/public_emails"],
          listPublicKeysForUser: ["GET /users/{username}/keys"],
          listPublicSshKeysForAuthenticated: ["GET /user/keys"],
          setPrimaryEmailVisibilityForAuthenticated: ["PATCH /user/email/visibility"],
          unblock: ["DELETE /user/blocks/{username}"],
          unfollow: ["DELETE /user/following/{username}"],
          updateAuthenticated: ["PATCH /user"]
        }
      };
      const VERSION = "5.3.4";

      function endpointsToMethods(octokit, endpointsMap) {
        const newMethods = {};

        for (const [scope, endpoints] of Object.entries(endpointsMap)) {
          for (const [methodName, endpoint] of Object.entries(endpoints)) {
            const [route, defaults, decorations] = endpoint;
            const [method, url] = route.split(/ /);
            const endpointDefaults = Object.assign({
              method,
              url
            }, defaults);

            if (!newMethods[scope]) {
              newMethods[scope] = {};
            }

            const scopeMethods = newMethods[scope];

            if (decorations) {
              scopeMethods[methodName] = decorate(octokit, scope, methodName, endpointDefaults, decorations);
              continue;
            }

            scopeMethods[methodName] = octokit.request.defaults(endpointDefaults);
          }
        }

        return newMethods;
      }

      function decorate(octokit, scope, methodName, defaults, decorations) {
        const requestWithDefaults = octokit.request.defaults(defaults);
        /* istanbul ignore next */

        function withDecorations(...args) {
          // @ts-ignore https://github.com/microsoft/TypeScript/issues/25488
          let options = requestWithDefaults.endpoint.merge(...args); // There are currently no other decorations than `.mapToData`

          if (decorations.mapToData) {
            options = Object.assign({}, options, {
              data: options[decorations.mapToData],
              [decorations.mapToData]: undefined
            });
            return requestWithDefaults(options);
          }

          if (decorations.renamed) {
            const [newScope, newMethodName] = decorations.renamed;
            octokit.log.warn(`octokit.${scope}.${methodName}() has been renamed to octokit.${newScope}.${newMethodName}()`);
          }

          if (decorations.deprecated) {
            octokit.log.warn(decorations.deprecated);
          }

          if (decorations.renamedParameters) {
            // @ts-ignore https://github.com/microsoft/TypeScript/issues/25488
            const options = requestWithDefaults.endpoint.merge(...args);

            for (const [name, alias] of Object.entries(decorations.renamedParameters)) {
              if (name in options) {
                octokit.log.warn(`"${name}" parameter is deprecated for "octokit.${scope}.${methodName}()". Use "${alias}" instead`);

                if (!(alias in options)) {
                  options[alias] = options[name];
                }

                delete options[name];
              }
            }

            return requestWithDefaults(options);
          } // @ts-ignore https://github.com/microsoft/TypeScript/issues/25488


          return requestWithDefaults(...args);
        }

        return Object.assign(withDecorations, requestWithDefaults);
      }

      function restEndpointMethods(octokit) {
        const api = endpointsToMethods(octokit, Endpoints);
        return {
          rest: api
        };
      }

      restEndpointMethods.VERSION = VERSION;

      function legacyRestEndpointMethods(octokit) {
        const api = endpointsToMethods(octokit, Endpoints);
        return _objectSpread2(_objectSpread2({}, api), {}, {
          rest: api
        });
      }

      legacyRestEndpointMethods.VERSION = VERSION;
      exports.legacyRestEndpointMethods = legacyRestEndpointMethods;
      exports.restEndpointMethods = restEndpointMethods;
      /***/
    },

    /***/
    537:
    /***/
    (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      function _interopDefault(ex) {
        return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
      }

      var deprecation = __webpack_require__(8932);

      var once = _interopDefault(__webpack_require__(1223));

      const logOnceCode = once(deprecation => console.warn(deprecation));
      const logOnceHeaders = once(deprecation => console.warn(deprecation));
      /**
       * Error with extra properties to help with debugging
       */

      class RequestError extends Error {
        constructor(message, statusCode, options) {
          super(message); // Maintains proper stack trace (only available on V8)

          /* istanbul ignore next */

          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
          }

          this.name = "HttpError";
          this.status = statusCode;
          let headers;

          if ("headers" in options && typeof options.headers !== "undefined") {
            headers = options.headers;
          }

          if ("response" in options) {
            this.response = options.response;
            headers = options.response.headers;
          } // redact request credentials without mutating original request options


          const requestCopy = Object.assign({}, options.request);

          if (options.request.headers.authorization) {
            requestCopy.headers = Object.assign({}, options.request.headers, {
              authorization: options.request.headers.authorization.replace(/ .*$/, " [REDACTED]")
            });
          }

          requestCopy.url = requestCopy.url // client_id & client_secret can be passed as URL query parameters to increase rate limit
          // see https://developer.github.com/v3/#increasing-the-unauthenticated-rate-limit-for-oauth-applications
          .replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]") // OAuth tokens can be passed as URL query parameters, although it is not recommended
          // see https://developer.github.com/v3/#oauth2-token-sent-in-a-header
          .replace(/\baccess_token=\w+/g, "access_token=[REDACTED]");
          this.request = requestCopy; // deprecations

          Object.defineProperty(this, "code", {
            get() {
              logOnceCode(new deprecation.Deprecation("[@octokit/request-error] `error.code` is deprecated, use `error.status`."));
              return statusCode;
            }

          });
          Object.defineProperty(this, "headers", {
            get() {
              logOnceHeaders(new deprecation.Deprecation("[@octokit/request-error] `error.headers` is deprecated, use `error.response.headers`."));
              return headers || {};
            }

          });
        }

      }

      exports.RequestError = RequestError;
      /***/
    },

    /***/
    6234:
    /***/
    (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      function _interopDefault(ex) {
        return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
      }

      var endpoint = __webpack_require__(9440);

      var universalUserAgent = __webpack_require__(5030);

      var isPlainObject = __webpack_require__(9062);

      var nodeFetch = _interopDefault(__webpack_require__(467));

      var requestError = __webpack_require__(537);

      const VERSION = "5.6.0";

      function getBufferResponse(response) {
        return response.arrayBuffer();
      }

      function fetchWrapper(requestOptions) {
        const log = requestOptions.request && requestOptions.request.log ? requestOptions.request.log : console;

        if (isPlainObject.isPlainObject(requestOptions.body) || Array.isArray(requestOptions.body)) {
          requestOptions.body = JSON.stringify(requestOptions.body);
        }

        let headers = {};
        let status;
        let url;
        const fetch = requestOptions.request && requestOptions.request.fetch || nodeFetch;
        return fetch(requestOptions.url, Object.assign({
          method: requestOptions.method,
          body: requestOptions.body,
          headers: requestOptions.headers,
          redirect: requestOptions.redirect
        }, // `requestOptions.request.agent` type is incompatible
        // see https://github.com/octokit/types.ts/pull/264
        requestOptions.request)).then(async response => {
          url = response.url;
          status = response.status;

          for (const keyAndValue of response.headers) {
            headers[keyAndValue[0]] = keyAndValue[1];
          }

          if ("deprecation" in headers) {
            const matches = headers.link && headers.link.match(/<([^>]+)>; rel="deprecation"/);
            const deprecationLink = matches && matches.pop();
            log.warn(`[@octokit/request] "${requestOptions.method} ${requestOptions.url}" is deprecated. It is scheduled to be removed on ${headers.sunset}${deprecationLink ? `. See ${deprecationLink}` : ""}`);
          }

          if (status === 204 || status === 205) {
            return;
          } // GitHub API returns 200 for HEAD requests


          if (requestOptions.method === "HEAD") {
            if (status < 400) {
              return;
            }

            throw new requestError.RequestError(response.statusText, status, {
              response: {
                url,
                status,
                headers,
                data: undefined
              },
              request: requestOptions
            });
          }

          if (status === 304) {
            throw new requestError.RequestError("Not modified", status, {
              response: {
                url,
                status,
                headers,
                data: await getResponseData(response)
              },
              request: requestOptions
            });
          }

          if (status >= 400) {
            const data = await getResponseData(response);
            const error = new requestError.RequestError(toErrorMessage(data), status, {
              response: {
                url,
                status,
                headers,
                data
              },
              request: requestOptions
            });
            throw error;
          }

          return getResponseData(response);
        }).then(data => {
          return {
            status,
            url,
            headers,
            data
          };
        }).catch(error => {
          if (error instanceof requestError.RequestError) throw error;
          throw new requestError.RequestError(error.message, 500, {
            request: requestOptions
          });
        });
      }

      async function getResponseData(response) {
        const contentType = response.headers.get("content-type");

        if (/application\/json/.test(contentType)) {
          return response.json();
        }

        if (!contentType || /^text\/|charset=utf-8$/.test(contentType)) {
          return response.text();
        }

        return getBufferResponse(response);
      }

      function toErrorMessage(data) {
        if (typeof data === "string") return data; // istanbul ignore else - just in case

        if ("message" in data) {
          if (Array.isArray(data.errors)) {
            return `${data.message}: ${data.errors.map(JSON.stringify).join(", ")}`;
          }

          return data.message;
        } // istanbul ignore next - just in case


        return `Unknown error: ${JSON.stringify(data)}`;
      }

      function withDefaults(oldEndpoint, newDefaults) {
        const endpoint = oldEndpoint.defaults(newDefaults);

        const newApi = function (route, parameters) {
          const endpointOptions = endpoint.merge(route, parameters);

          if (!endpointOptions.request || !endpointOptions.request.hook) {
            return fetchWrapper(endpoint.parse(endpointOptions));
          }

          const request = (route, parameters) => {
            return fetchWrapper(endpoint.parse(endpoint.merge(route, parameters)));
          };

          Object.assign(request, {
            endpoint,
            defaults: withDefaults.bind(null, endpoint)
          });
          return endpointOptions.request.hook(request, endpointOptions);
        };

        return Object.assign(newApi, {
          endpoint,
          defaults: withDefaults.bind(null, endpoint)
        });
      }

      const request = withDefaults(endpoint.endpoint, {
        headers: {
          "user-agent": `octokit-request.js/${VERSION} ${universalUserAgent.getUserAgent()}`
        }
      });
      exports.request = request;
      /***/
    },

    /***/
    9062:
    /***/
    (__unused_webpack_module, exports) => {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      /*!
       * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
       *
       * Copyright (c) 2014-2017, Jon Schlinkert.
       * Released under the MIT License.
       */

      function isObject(o) {
        return Object.prototype.toString.call(o) === '[object Object]';
      }

      function isPlainObject(o) {
        var ctor, prot;
        if (isObject(o) === false) return false; // If has modified constructor

        ctor = o.constructor;
        if (ctor === undefined) return true; // If has modified prototype

        prot = ctor.prototype;
        if (isObject(prot) === false) return false; // If constructor does not have an Object-specific method

        if (prot.hasOwnProperty('isPrototypeOf') === false) {
          return false;
        } // Most likely a plain Object


        return true;
      }

      exports.isPlainObject = isPlainObject;
      /***/
    },

    /***/
    3682:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      var register = __webpack_require__(4670);

      var addHook = __webpack_require__(5549);

      var removeHook = __webpack_require__(6819); // bind with array of arguments: https://stackoverflow.com/a/21792913


      var bind = Function.bind;
      var bindable = bind.bind(bind);

      function bindApi(hook, state, name) {
        var removeHookRef = bindable(removeHook, null).apply(null, name ? [state, name] : [state]);
        hook.api = {
          remove: removeHookRef
        };
        hook.remove = removeHookRef;
        ['before', 'error', 'after', 'wrap'].forEach(function (kind) {
          var args = name ? [state, kind, name] : [state, kind];
          hook[kind] = hook.api[kind] = bindable(addHook, null).apply(null, args);
        });
      }

      function HookSingular() {
        var singularHookName = 'h';
        var singularHookState = {
          registry: {}
        };
        var singularHook = register.bind(null, singularHookState, singularHookName);
        bindApi(singularHook, singularHookState, singularHookName);
        return singularHook;
      }

      function HookCollection() {
        var state = {
          registry: {}
        };
        var hook = register.bind(null, state);
        bindApi(hook, state);
        return hook;
      }

      var collectionHookDeprecationMessageDisplayed = false;

      function Hook() {
        if (!collectionHookDeprecationMessageDisplayed) {
          console.warn('[before-after-hook]: "Hook()" repurposing warning, use "Hook.Collection()". Read more: https://git.io/upgrade-before-after-hook-to-1.4');
          collectionHookDeprecationMessageDisplayed = true;
        }

        return HookCollection();
      }

      Hook.Singular = HookSingular.bind();
      Hook.Collection = HookCollection.bind();
      module.exports = Hook; // expose constructors as a named property for TypeScript

      module.exports.Hook = Hook;
      module.exports.Singular = Hook.Singular;
      module.exports.Collection = Hook.Collection;
      /***/
    },

    /***/
    5549:
    /***/
    module => {
      module.exports = addHook;

      function addHook(state, kind, name, hook) {
        var orig = hook;

        if (!state.registry[name]) {
          state.registry[name] = [];
        }

        if (kind === "before") {
          hook = function (method, options) {
            return Promise.resolve().then(orig.bind(null, options)).then(method.bind(null, options));
          };
        }

        if (kind === "after") {
          hook = function (method, options) {
            var result;
            return Promise.resolve().then(method.bind(null, options)).then(function (result_) {
              result = result_;
              return orig(result, options);
            }).then(function () {
              return result;
            });
          };
        }

        if (kind === "error") {
          hook = function (method, options) {
            return Promise.resolve().then(method.bind(null, options)).catch(function (error) {
              return orig(error, options);
            });
          };
        }

        state.registry[name].push({
          hook: hook,
          orig: orig
        });
      }
      /***/

    },

    /***/
    4670:
    /***/
    module => {
      module.exports = register;

      function register(state, name, method, options) {
        if (typeof method !== "function") {
          throw new Error("method for before hook must be a function");
        }

        if (!options) {
          options = {};
        }

        if (Array.isArray(name)) {
          return name.reverse().reduce(function (callback, name) {
            return register.bind(null, state, name, callback, options);
          }, method)();
        }

        return Promise.resolve().then(function () {
          if (!state.registry[name]) {
            return method(options);
          }

          return state.registry[name].reduce(function (method, registered) {
            return registered.hook.bind(null, method, options);
          }, method)();
        });
      }
      /***/

    },

    /***/
    6819:
    /***/
    module => {
      module.exports = removeHook;

      function removeHook(state, name, method) {
        if (!state.registry[name]) {
          return;
        }

        var index = state.registry[name].map(function (registered) {
          return registered.orig;
        }).indexOf(method);

        if (index === -1) {
          return;
        }

        state.registry[name].splice(index, 1);
      }
      /***/

    },

    /***/
    8932:
    /***/
    (__unused_webpack_module, exports) => {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      class Deprecation extends Error {
        constructor(message) {
          super(message); // Maintains proper stack trace (only available on V8)

          /* istanbul ignore next */

          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
          }

          this.name = 'Deprecation';
        }

      }

      exports.Deprecation = Deprecation;
      /***/
    },

    /***/
    467:
    /***/
    (module, exports, __webpack_require__) => {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      function _interopDefault(ex) {
        return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
      }

      var Stream = _interopDefault(__webpack_require__(2413));

      var http = _interopDefault(__webpack_require__(8605));

      var Url = _interopDefault(__webpack_require__(8835));

      var https = _interopDefault(__webpack_require__(7211));

      var zlib = _interopDefault(__webpack_require__(8761)); // Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js
      // fix for "Readable" isn't a named export issue


      const Readable = Stream.Readable;
      const BUFFER = Symbol('buffer');
      const TYPE = Symbol('type');

      class Blob {
        constructor() {
          this[TYPE] = '';
          const blobParts = arguments[0];
          const options = arguments[1];
          const buffers = [];
          let size = 0;

          if (blobParts) {
            const a = blobParts;
            const length = Number(a.length);

            for (let i = 0; i < length; i++) {
              const element = a[i];
              let buffer;

              if (element instanceof Buffer) {
                buffer = element;
              } else if (ArrayBuffer.isView(element)) {
                buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
              } else if (element instanceof ArrayBuffer) {
                buffer = Buffer.from(element);
              } else if (element instanceof Blob) {
                buffer = element[BUFFER];
              } else {
                buffer = Buffer.from(typeof element === 'string' ? element : String(element));
              }

              size += buffer.length;
              buffers.push(buffer);
            }
          }

          this[BUFFER] = Buffer.concat(buffers);
          let type = options && options.type !== undefined && String(options.type).toLowerCase();

          if (type && !/[^\u0020-\u007E]/.test(type)) {
            this[TYPE] = type;
          }
        }

        get size() {
          return this[BUFFER].length;
        }

        get type() {
          return this[TYPE];
        }

        text() {
          return Promise.resolve(this[BUFFER].toString());
        }

        arrayBuffer() {
          const buf = this[BUFFER];
          const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
          return Promise.resolve(ab);
        }

        stream() {
          const readable = new Readable();

          readable._read = function () {};

          readable.push(this[BUFFER]);
          readable.push(null);
          return readable;
        }

        toString() {
          return '[object Blob]';
        }

        slice() {
          const size = this.size;
          const start = arguments[0];
          const end = arguments[1];
          let relativeStart, relativeEnd;

          if (start === undefined) {
            relativeStart = 0;
          } else if (start < 0) {
            relativeStart = Math.max(size + start, 0);
          } else {
            relativeStart = Math.min(start, size);
          }

          if (end === undefined) {
            relativeEnd = size;
          } else if (end < 0) {
            relativeEnd = Math.max(size + end, 0);
          } else {
            relativeEnd = Math.min(end, size);
          }

          const span = Math.max(relativeEnd - relativeStart, 0);
          const buffer = this[BUFFER];
          const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
          const blob = new Blob([], {
            type: arguments[2]
          });
          blob[BUFFER] = slicedBuffer;
          return blob;
        }

      }

      Object.defineProperties(Blob.prototype, {
        size: {
          enumerable: true
        },
        type: {
          enumerable: true
        },
        slice: {
          enumerable: true
        }
      });
      Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
        value: 'Blob',
        writable: false,
        enumerable: false,
        configurable: true
      });
      /**
       * fetch-error.js
       *
       * FetchError interface for operational errors
       */

      /**
       * Create FetchError instance
       *
       * @param   String      message      Error message for human
       * @param   String      type         Error type for machine
       * @param   String      systemError  For Node.js system error
       * @return  FetchError
       */

      function FetchError(message, type, systemError) {
        Error.call(this, message);
        this.message = message;
        this.type = type; // when err.type is `system`, err.code contains system error code

        if (systemError) {
          this.code = this.errno = systemError.code;
        } // hide custom error implementation details from end-users


        Error.captureStackTrace(this, this.constructor);
      }

      FetchError.prototype = Object.create(Error.prototype);
      FetchError.prototype.constructor = FetchError;
      FetchError.prototype.name = 'FetchError';
      let convert;

      try {
        convert = __webpack_require__(2877).convert;
      } catch (e) {}

      const INTERNALS = Symbol('Body internals'); // fix an issue where "PassThrough" isn't a named export for node <10

      const PassThrough = Stream.PassThrough;
      /**
       * Body mixin
       *
       * Ref: https://fetch.spec.whatwg.org/#body
       *
       * @param   Stream  body  Readable stream
       * @param   Object  opts  Response options
       * @return  Void
       */

      function Body(body) {
        var _this = this;

        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref$size = _ref.size;

        let size = _ref$size === undefined ? 0 : _ref$size;
        var _ref$timeout = _ref.timeout;
        let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

        if (body == null) {
          // body is undefined or null
          body = null;
        } else if (isURLSearchParams(body)) {
          // body is a URLSearchParams
          body = Buffer.from(body.toString());
        } else if (isBlob(body)) ;else if (Buffer.isBuffer(body)) ;else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
          // body is ArrayBuffer
          body = Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          // body is ArrayBufferView
          body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof Stream) ;else {
          // none of the above
          // coerce to string then buffer
          body = Buffer.from(String(body));
        }

        this[INTERNALS] = {
          body,
          disturbed: false,
          error: null
        };
        this.size = size;
        this.timeout = timeout;

        if (body instanceof Stream) {
          body.on('error', function (err) {
            const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
            _this[INTERNALS].error = error;
          });
        }
      }

      Body.prototype = {
        get body() {
          return this[INTERNALS].body;
        },

        get bodyUsed() {
          return this[INTERNALS].disturbed;
        },

        /**
         * Decode response as ArrayBuffer
         *
         * @return  Promise
         */
        arrayBuffer() {
          return consumeBody.call(this).then(function (buf) {
            return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
          });
        },

        /**
         * Return raw response as Blob
         *
         * @return Promise
         */
        blob() {
          let ct = this.headers && this.headers.get('content-type') || '';
          return consumeBody.call(this).then(function (buf) {
            return Object.assign( // Prevent copying
            new Blob([], {
              type: ct.toLowerCase()
            }), {
              [BUFFER]: buf
            });
          });
        },

        /**
         * Decode response as json
         *
         * @return  Promise
         */
        json() {
          var _this2 = this;

          return consumeBody.call(this).then(function (buffer) {
            try {
              return JSON.parse(buffer.toString());
            } catch (err) {
              return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
            }
          });
        },

        /**
         * Decode response as text
         *
         * @return  Promise
         */
        text() {
          return consumeBody.call(this).then(function (buffer) {
            return buffer.toString();
          });
        },

        /**
         * Decode response as buffer (non-spec api)
         *
         * @return  Promise
         */
        buffer() {
          return consumeBody.call(this);
        },

        /**
         * Decode response as text, while automatically detecting the encoding and
         * trying to decode to UTF-8 (non-spec api)
         *
         * @return  Promise
         */
        textConverted() {
          var _this3 = this;

          return consumeBody.call(this).then(function (buffer) {
            return convertBody(buffer, _this3.headers);
          });
        }

      }; // In browsers, all properties are enumerable.

      Object.defineProperties(Body.prototype, {
        body: {
          enumerable: true
        },
        bodyUsed: {
          enumerable: true
        },
        arrayBuffer: {
          enumerable: true
        },
        blob: {
          enumerable: true
        },
        json: {
          enumerable: true
        },
        text: {
          enumerable: true
        }
      });

      Body.mixIn = function (proto) {
        for (const name of Object.getOwnPropertyNames(Body.prototype)) {
          // istanbul ignore else: future proof
          if (!(name in proto)) {
            const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
            Object.defineProperty(proto, name, desc);
          }
        }
      };
      /**
       * Consume and convert an entire Body to a Buffer.
       *
       * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
       *
       * @return  Promise
       */


      function consumeBody() {
        var _this4 = this;

        if (this[INTERNALS].disturbed) {
          return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
        }

        this[INTERNALS].disturbed = true;

        if (this[INTERNALS].error) {
          return Body.Promise.reject(this[INTERNALS].error);
        }

        let body = this.body; // body is null

        if (body === null) {
          return Body.Promise.resolve(Buffer.alloc(0));
        } // body is blob


        if (isBlob(body)) {
          body = body.stream();
        } // body is buffer


        if (Buffer.isBuffer(body)) {
          return Body.Promise.resolve(body);
        } // istanbul ignore if: should never happen


        if (!(body instanceof Stream)) {
          return Body.Promise.resolve(Buffer.alloc(0));
        } // body is stream
        // get ready to actually consume the body


        let accum = [];
        let accumBytes = 0;
        let abort = false;
        return new Body.Promise(function (resolve, reject) {
          let resTimeout; // allow timeout on slow response body

          if (_this4.timeout) {
            resTimeout = setTimeout(function () {
              abort = true;
              reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
            }, _this4.timeout);
          } // handle stream errors


          body.on('error', function (err) {
            if (err.name === 'AbortError') {
              // if the request was aborted, reject with this Error
              abort = true;
              reject(err);
            } else {
              // other errors, such as incorrect content-encoding
              reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
            }
          });
          body.on('data', function (chunk) {
            if (abort || chunk === null) {
              return;
            }

            if (_this4.size && accumBytes + chunk.length > _this4.size) {
              abort = true;
              reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
              return;
            }

            accumBytes += chunk.length;
            accum.push(chunk);
          });
          body.on('end', function () {
            if (abort) {
              return;
            }

            clearTimeout(resTimeout);

            try {
              resolve(Buffer.concat(accum, accumBytes));
            } catch (err) {
              // handle streams that have accumulated too much data (issue #414)
              reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
            }
          });
        });
      }
      /**
       * Detect buffer encoding and convert to target encoding
       * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
       *
       * @param   Buffer  buffer    Incoming buffer
       * @param   String  encoding  Target encoding
       * @return  String
       */


      function convertBody(buffer, headers) {
        if (typeof convert !== 'function') {
          throw new Error('The package `encoding` must be installed to use the textConverted() function');
        }

        const ct = headers.get('content-type');
        let charset = 'utf-8';
        let res, str; // header

        if (ct) {
          res = /charset=([^;]*)/i.exec(ct);
        } // no charset in content type, peek at response body for at most 1024 bytes


        str = buffer.slice(0, 1024).toString(); // html5

        if (!res && str) {
          res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
        } // html4


        if (!res && str) {
          res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);

          if (!res) {
            res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);

            if (res) {
              res.pop(); // drop last quote
            }
          }

          if (res) {
            res = /charset=(.*)/i.exec(res.pop());
          }
        } // xml


        if (!res && str) {
          res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
        } // found charset


        if (res) {
          charset = res.pop(); // prevent decode issues when sites use incorrect encoding
          // ref: https://hsivonen.fi/encoding-menu/

          if (charset === 'gb2312' || charset === 'gbk') {
            charset = 'gb18030';
          }
        } // turn raw buffers into a single utf-8 buffer


        return convert(buffer, 'UTF-8', charset).toString();
      }
      /**
       * Detect a URLSearchParams object
       * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
       *
       * @param   Object  obj     Object to detect by type or brand
       * @return  String
       */


      function isURLSearchParams(obj) {
        // Duck-typing as a necessary condition.
        if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
          return false;
        } // Brand-checking and more duck-typing as optional condition.


        return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
      }
      /**
       * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
       * @param  {*} obj
       * @return {boolean}
       */


      function isBlob(obj) {
        return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
      }
      /**
       * Clone body given Res/Req instance
       *
       * @param   Mixed  instance  Response or Request instance
       * @return  Mixed
       */


      function clone(instance) {
        let p1, p2;
        let body = instance.body; // don't allow cloning a used body

        if (instance.bodyUsed) {
          throw new Error('cannot clone body after it is used');
        } // check that body is a stream and not form-data object
        // note: we can't clone the form-data object without having it as a dependency


        if (body instanceof Stream && typeof body.getBoundary !== 'function') {
          // tee instance body
          p1 = new PassThrough();
          p2 = new PassThrough();
          body.pipe(p1);
          body.pipe(p2); // set instance body to teed body and return the other teed body

          instance[INTERNALS].body = p1;
          body = p2;
        }

        return body;
      }
      /**
       * Performs the operation "extract a `Content-Type` value from |object|" as
       * specified in the specification:
       * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
       *
       * This function assumes that instance.body is present.
       *
       * @param   Mixed  instance  Any options.body input
       */


      function extractContentType(body) {
        if (body === null) {
          // body is null
          return null;
        } else if (typeof body === 'string') {
          // body is string
          return 'text/plain;charset=UTF-8';
        } else if (isURLSearchParams(body)) {
          // body is a URLSearchParams
          return 'application/x-www-form-urlencoded;charset=UTF-8';
        } else if (isBlob(body)) {
          // body is blob
          return body.type || null;
        } else if (Buffer.isBuffer(body)) {
          // body is buffer
          return null;
        } else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
          // body is ArrayBuffer
          return null;
        } else if (ArrayBuffer.isView(body)) {
          // body is ArrayBufferView
          return null;
        } else if (typeof body.getBoundary === 'function') {
          // detect form data input from form-data module
          return `multipart/form-data;boundary=${body.getBoundary()}`;
        } else if (body instanceof Stream) {
          // body is stream
          // can't really do much about this
          return null;
        } else {
          // Body constructor defaults other things to string
          return 'text/plain;charset=UTF-8';
        }
      }
      /**
       * The Fetch Standard treats this as if "total bytes" is a property on the body.
       * For us, we have to explicitly get it with a function.
       *
       * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
       *
       * @param   Body    instance   Instance of Body
       * @return  Number?            Number of bytes, or null if not possible
       */


      function getTotalBytes(instance) {
        const body = instance.body;

        if (body === null) {
          // body is null
          return 0;
        } else if (isBlob(body)) {
          return body.size;
        } else if (Buffer.isBuffer(body)) {
          // body is buffer
          return body.length;
        } else if (body && typeof body.getLengthSync === 'function') {
          // detect form data input from form-data module
          if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
          body.hasKnownLength && body.hasKnownLength()) {
            // 2.x
            return body.getLengthSync();
          }

          return null;
        } else {
          // body is stream
          return null;
        }
      }
      /**
       * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
       *
       * @param   Body    instance   Instance of Body
       * @return  Void
       */


      function writeToStream(dest, instance) {
        const body = instance.body;

        if (body === null) {
          // body is null
          dest.end();
        } else if (isBlob(body)) {
          body.stream().pipe(dest);
        } else if (Buffer.isBuffer(body)) {
          // body is buffer
          dest.write(body);
          dest.end();
        } else {
          // body is stream
          body.pipe(dest);
        }
      } // expose Promise


      Body.Promise = global.Promise;
      /**
       * headers.js
       *
       * Headers class offers convenient helpers
       */

      const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
      const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

      function validateName(name) {
        name = `${name}`;

        if (invalidTokenRegex.test(name) || name === '') {
          throw new TypeError(`${name} is not a legal HTTP header name`);
        }
      }

      function validateValue(value) {
        value = `${value}`;

        if (invalidHeaderCharRegex.test(value)) {
          throw new TypeError(`${value} is not a legal HTTP header value`);
        }
      }
      /**
       * Find the key in the map object given a header name.
       *
       * Returns undefined if not found.
       *
       * @param   String  name  Header name
       * @return  String|Undefined
       */


      function find(map, name) {
        name = name.toLowerCase();

        for (const key in map) {
          if (key.toLowerCase() === name) {
            return key;
          }
        }

        return undefined;
      }

      const MAP = Symbol('map');

      class Headers {
        /**
         * Headers class
         *
         * @param   Object  headers  Response headers
         * @return  Void
         */
        constructor() {
          let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
          this[MAP] = Object.create(null);

          if (init instanceof Headers) {
            const rawHeaders = init.raw();
            const headerNames = Object.keys(rawHeaders);

            for (const headerName of headerNames) {
              for (const value of rawHeaders[headerName]) {
                this.append(headerName, value);
              }
            }

            return;
          } // We don't worry about converting prop to ByteString here as append()
          // will handle it.


          if (init == null) ;else if (typeof init === 'object') {
            const method = init[Symbol.iterator];

            if (method != null) {
              if (typeof method !== 'function') {
                throw new TypeError('Header pairs must be iterable');
              } // sequence<sequence<ByteString>>
              // Note: per spec we have to first exhaust the lists then process them


              const pairs = [];

              for (const pair of init) {
                if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
                  throw new TypeError('Each header pair must be iterable');
                }

                pairs.push(Array.from(pair));
              }

              for (const pair of pairs) {
                if (pair.length !== 2) {
                  throw new TypeError('Each header pair must be a name/value tuple');
                }

                this.append(pair[0], pair[1]);
              }
            } else {
              // record<ByteString, ByteString>
              for (const key of Object.keys(init)) {
                const value = init[key];
                this.append(key, value);
              }
            }
          } else {
            throw new TypeError('Provided initializer must be an object');
          }
        }
        /**
         * Return combined header value given name
         *
         * @param   String  name  Header name
         * @return  Mixed
         */


        get(name) {
          name = `${name}`;
          validateName(name);
          const key = find(this[MAP], name);

          if (key === undefined) {
            return null;
          }

          return this[MAP][key].join(', ');
        }
        /**
         * Iterate over all headers
         *
         * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
         * @param   Boolean   thisArg   `this` context for callback function
         * @return  Void
         */


        forEach(callback) {
          let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
          let pairs = getHeaders(this);
          let i = 0;

          while (i < pairs.length) {
            var _pairs$i = pairs[i];
            const name = _pairs$i[0],
                  value = _pairs$i[1];
            callback.call(thisArg, value, name, this);
            pairs = getHeaders(this);
            i++;
          }
        }
        /**
         * Overwrite header values given name
         *
         * @param   String  name   Header name
         * @param   String  value  Header value
         * @return  Void
         */


        set(name, value) {
          name = `${name}`;
          value = `${value}`;
          validateName(name);
          validateValue(value);
          const key = find(this[MAP], name);
          this[MAP][key !== undefined ? key : name] = [value];
        }
        /**
         * Append a value onto existing header
         *
         * @param   String  name   Header name
         * @param   String  value  Header value
         * @return  Void
         */


        append(name, value) {
          name = `${name}`;
          value = `${value}`;
          validateName(name);
          validateValue(value);
          const key = find(this[MAP], name);

          if (key !== undefined) {
            this[MAP][key].push(value);
          } else {
            this[MAP][name] = [value];
          }
        }
        /**
         * Check for header name existence
         *
         * @param   String   name  Header name
         * @return  Boolean
         */


        has(name) {
          name = `${name}`;
          validateName(name);
          return find(this[MAP], name) !== undefined;
        }
        /**
         * Delete all header values given name
         *
         * @param   String  name  Header name
         * @return  Void
         */


        delete(name) {
          name = `${name}`;
          validateName(name);
          const key = find(this[MAP], name);

          if (key !== undefined) {
            delete this[MAP][key];
          }
        }
        /**
         * Return raw headers (non-spec api)
         *
         * @return  Object
         */


        raw() {
          return this[MAP];
        }
        /**
         * Get an iterator on keys.
         *
         * @return  Iterator
         */


        keys() {
          return createHeadersIterator(this, 'key');
        }
        /**
         * Get an iterator on values.
         *
         * @return  Iterator
         */


        values() {
          return createHeadersIterator(this, 'value');
        }
        /**
         * Get an iterator on entries.
         *
         * This is the default iterator of the Headers object.
         *
         * @return  Iterator
         */


        [Symbol.iterator]() {
          return createHeadersIterator(this, 'key+value');
        }

      }

      Headers.prototype.entries = Headers.prototype[Symbol.iterator];
      Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
        value: 'Headers',
        writable: false,
        enumerable: false,
        configurable: true
      });
      Object.defineProperties(Headers.prototype, {
        get: {
          enumerable: true
        },
        forEach: {
          enumerable: true
        },
        set: {
          enumerable: true
        },
        append: {
          enumerable: true
        },
        has: {
          enumerable: true
        },
        delete: {
          enumerable: true
        },
        keys: {
          enumerable: true
        },
        values: {
          enumerable: true
        },
        entries: {
          enumerable: true
        }
      });

      function getHeaders(headers) {
        let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';
        const keys = Object.keys(headers[MAP]).sort();
        return keys.map(kind === 'key' ? function (k) {
          return k.toLowerCase();
        } : kind === 'value' ? function (k) {
          return headers[MAP][k].join(', ');
        } : function (k) {
          return [k.toLowerCase(), headers[MAP][k].join(', ')];
        });
      }

      const INTERNAL = Symbol('internal');

      function createHeadersIterator(target, kind) {
        const iterator = Object.create(HeadersIteratorPrototype);
        iterator[INTERNAL] = {
          target,
          kind,
          index: 0
        };
        return iterator;
      }

      const HeadersIteratorPrototype = Object.setPrototypeOf({
        next() {
          // istanbul ignore if
          if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
            throw new TypeError('Value of `this` is not a HeadersIterator');
          }

          var _INTERNAL = this[INTERNAL];
          const target = _INTERNAL.target,
                kind = _INTERNAL.kind,
                index = _INTERNAL.index;
          const values = getHeaders(target, kind);
          const len = values.length;

          if (index >= len) {
            return {
              value: undefined,
              done: true
            };
          }

          this[INTERNAL].index = index + 1;
          return {
            value: values[index],
            done: false
          };
        }

      }, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));
      Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
        value: 'HeadersIterator',
        writable: false,
        enumerable: false,
        configurable: true
      });
      /**
       * Export the Headers object in a form that Node.js can consume.
       *
       * @param   Headers  headers
       * @return  Object
       */

      function exportNodeCompatibleHeaders(headers) {
        const obj = Object.assign({
          __proto__: null
        }, headers[MAP]); // http.request() only supports string as Host header. This hack makes
        // specifying custom Host header possible.

        const hostHeaderKey = find(headers[MAP], 'Host');

        if (hostHeaderKey !== undefined) {
          obj[hostHeaderKey] = obj[hostHeaderKey][0];
        }

        return obj;
      }
      /**
       * Create a Headers object from an object of headers, ignoring those that do
       * not conform to HTTP grammar productions.
       *
       * @param   Object  obj  Object of headers
       * @return  Headers
       */


      function createHeadersLenient(obj) {
        const headers = new Headers();

        for (const name of Object.keys(obj)) {
          if (invalidTokenRegex.test(name)) {
            continue;
          }

          if (Array.isArray(obj[name])) {
            for (const val of obj[name]) {
              if (invalidHeaderCharRegex.test(val)) {
                continue;
              }

              if (headers[MAP][name] === undefined) {
                headers[MAP][name] = [val];
              } else {
                headers[MAP][name].push(val);
              }
            }
          } else if (!invalidHeaderCharRegex.test(obj[name])) {
            headers[MAP][name] = [obj[name]];
          }
        }

        return headers;
      }

      const INTERNALS$1 = Symbol('Response internals'); // fix an issue where "STATUS_CODES" aren't a named export for node <10

      const STATUS_CODES = http.STATUS_CODES;
      /**
       * Response class
       *
       * @param   Stream  body  Readable stream
       * @param   Object  opts  Response options
       * @return  Void
       */

      class Response {
        constructor() {
          let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
          let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          Body.call(this, body, opts);
          const status = opts.status || 200;
          const headers = new Headers(opts.headers);

          if (body != null && !headers.has('Content-Type')) {
            const contentType = extractContentType(body);

            if (contentType) {
              headers.append('Content-Type', contentType);
            }
          }

          this[INTERNALS$1] = {
            url: opts.url,
            status,
            statusText: opts.statusText || STATUS_CODES[status],
            headers,
            counter: opts.counter
          };
        }

        get url() {
          return this[INTERNALS$1].url || '';
        }

        get status() {
          return this[INTERNALS$1].status;
        }
        /**
         * Convenience property representing if the request ended normally
         */


        get ok() {
          return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
        }

        get redirected() {
          return this[INTERNALS$1].counter > 0;
        }

        get statusText() {
          return this[INTERNALS$1].statusText;
        }

        get headers() {
          return this[INTERNALS$1].headers;
        }
        /**
         * Clone this response
         *
         * @return  Response
         */


        clone() {
          return new Response(clone(this), {
            url: this.url,
            status: this.status,
            statusText: this.statusText,
            headers: this.headers,
            ok: this.ok,
            redirected: this.redirected
          });
        }

      }

      Body.mixIn(Response.prototype);
      Object.defineProperties(Response.prototype, {
        url: {
          enumerable: true
        },
        status: {
          enumerable: true
        },
        ok: {
          enumerable: true
        },
        redirected: {
          enumerable: true
        },
        statusText: {
          enumerable: true
        },
        headers: {
          enumerable: true
        },
        clone: {
          enumerable: true
        }
      });
      Object.defineProperty(Response.prototype, Symbol.toStringTag, {
        value: 'Response',
        writable: false,
        enumerable: false,
        configurable: true
      });
      const INTERNALS$2 = Symbol('Request internals'); // fix an issue where "format", "parse" aren't a named export for node <10

      const parse_url = Url.parse;
      const format_url = Url.format;
      const streamDestructionSupported = ('destroy' in Stream.Readable.prototype);
      /**
       * Check if a value is an instance of Request.
       *
       * @param   Mixed   input
       * @return  Boolean
       */

      function isRequest(input) {
        return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
      }

      function isAbortSignal(signal) {
        const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
        return !!(proto && proto.constructor.name === 'AbortSignal');
      }
      /**
       * Request class
       *
       * @param   Mixed   input  Url or Request instance
       * @param   Object  init   Custom options
       * @return  Void
       */


      class Request {
        constructor(input) {
          let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          let parsedURL; // normalize input

          if (!isRequest(input)) {
            if (input && input.href) {
              // in order to support Node.js' Url objects; though WHATWG's URL objects
              // will fall into this branch also (since their `toString()` will return
              // `href` property anyway)
              parsedURL = parse_url(input.href);
            } else {
              // coerce input to a string before attempting to parse
              parsedURL = parse_url(`${input}`);
            }

            input = {};
          } else {
            parsedURL = parse_url(input.url);
          }

          let method = init.method || input.method || 'GET';
          method = method.toUpperCase();

          if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
            throw new TypeError('Request with GET/HEAD method cannot have body');
          }

          let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;
          Body.call(this, inputBody, {
            timeout: init.timeout || input.timeout || 0,
            size: init.size || input.size || 0
          });
          const headers = new Headers(init.headers || input.headers || {});

          if (inputBody != null && !headers.has('Content-Type')) {
            const contentType = extractContentType(inputBody);

            if (contentType) {
              headers.append('Content-Type', contentType);
            }
          }

          let signal = isRequest(input) ? input.signal : null;
          if ('signal' in init) signal = init.signal;

          if (signal != null && !isAbortSignal(signal)) {
            throw new TypeError('Expected signal to be an instanceof AbortSignal');
          }

          this[INTERNALS$2] = {
            method,
            redirect: init.redirect || input.redirect || 'follow',
            headers,
            parsedURL,
            signal
          }; // node-fetch-only options

          this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
          this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
          this.counter = init.counter || input.counter || 0;
          this.agent = init.agent || input.agent;
        }

        get method() {
          return this[INTERNALS$2].method;
        }

        get url() {
          return format_url(this[INTERNALS$2].parsedURL);
        }

        get headers() {
          return this[INTERNALS$2].headers;
        }

        get redirect() {
          return this[INTERNALS$2].redirect;
        }

        get signal() {
          return this[INTERNALS$2].signal;
        }
        /**
         * Clone this request
         *
         * @return  Request
         */


        clone() {
          return new Request(this);
        }

      }

      Body.mixIn(Request.prototype);
      Object.defineProperty(Request.prototype, Symbol.toStringTag, {
        value: 'Request',
        writable: false,
        enumerable: false,
        configurable: true
      });
      Object.defineProperties(Request.prototype, {
        method: {
          enumerable: true
        },
        url: {
          enumerable: true
        },
        headers: {
          enumerable: true
        },
        redirect: {
          enumerable: true
        },
        clone: {
          enumerable: true
        },
        signal: {
          enumerable: true
        }
      });
      /**
       * Convert a Request to Node.js http request options.
       *
       * @param   Request  A Request instance
       * @return  Object   The options object to be passed to http.request
       */

      function getNodeRequestOptions(request) {
        const parsedURL = request[INTERNALS$2].parsedURL;
        const headers = new Headers(request[INTERNALS$2].headers); // fetch step 1.3

        if (!headers.has('Accept')) {
          headers.set('Accept', '*/*');
        } // Basic fetch


        if (!parsedURL.protocol || !parsedURL.hostname) {
          throw new TypeError('Only absolute URLs are supported');
        }

        if (!/^https?:$/.test(parsedURL.protocol)) {
          throw new TypeError('Only HTTP(S) protocols are supported');
        }

        if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
          throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
        } // HTTP-network-or-cache fetch steps 2.4-2.7


        let contentLengthValue = null;

        if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
          contentLengthValue = '0';
        }

        if (request.body != null) {
          const totalBytes = getTotalBytes(request);

          if (typeof totalBytes === 'number') {
            contentLengthValue = String(totalBytes);
          }
        }

        if (contentLengthValue) {
          headers.set('Content-Length', contentLengthValue);
        } // HTTP-network-or-cache fetch step 2.11


        if (!headers.has('User-Agent')) {
          headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
        } // HTTP-network-or-cache fetch step 2.15


        if (request.compress && !headers.has('Accept-Encoding')) {
          headers.set('Accept-Encoding', 'gzip,deflate');
        }

        let agent = request.agent;

        if (typeof agent === 'function') {
          agent = agent(parsedURL);
        }

        if (!headers.has('Connection') && !agent) {
          headers.set('Connection', 'close');
        } // HTTP-network fetch step 4.2
        // chunked encoding is handled by Node.js


        return Object.assign({}, parsedURL, {
          method: request.method,
          headers: exportNodeCompatibleHeaders(headers),
          agent
        });
      }
      /**
       * abort-error.js
       *
       * AbortError interface for cancelled requests
       */

      /**
       * Create AbortError instance
       *
       * @param   String      message      Error message for human
       * @return  AbortError
       */


      function AbortError(message) {
        Error.call(this, message);
        this.type = 'aborted';
        this.message = message; // hide custom error implementation details from end-users

        Error.captureStackTrace(this, this.constructor);
      }

      AbortError.prototype = Object.create(Error.prototype);
      AbortError.prototype.constructor = AbortError;
      AbortError.prototype.name = 'AbortError'; // fix an issue where "PassThrough", "resolve" aren't a named export for node <10

      const PassThrough$1 = Stream.PassThrough;
      const resolve_url = Url.resolve;
      /**
       * Fetch function
       *
       * @param   Mixed    url   Absolute url or Request instance
       * @param   Object   opts  Fetch options
       * @return  Promise
       */

      function fetch(url, opts) {
        // allow custom promise
        if (!fetch.Promise) {
          throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
        }

        Body.Promise = fetch.Promise; // wrap http.request into fetch

        return new fetch.Promise(function (resolve, reject) {
          // build request object
          const request = new Request(url, opts);
          const options = getNodeRequestOptions(request);
          const send = (options.protocol === 'https:' ? https : http).request;
          const signal = request.signal;
          let response = null;

          const abort = function abort() {
            let error = new AbortError('The user aborted a request.');
            reject(error);

            if (request.body && request.body instanceof Stream.Readable) {
              request.body.destroy(error);
            }

            if (!response || !response.body) return;
            response.body.emit('error', error);
          };

          if (signal && signal.aborted) {
            abort();
            return;
          }

          const abortAndFinalize = function abortAndFinalize() {
            abort();
            finalize();
          }; // send request


          const req = send(options);
          let reqTimeout;

          if (signal) {
            signal.addEventListener('abort', abortAndFinalize);
          }

          function finalize() {
            req.abort();
            if (signal) signal.removeEventListener('abort', abortAndFinalize);
            clearTimeout(reqTimeout);
          }

          if (request.timeout) {
            req.once('socket', function (socket) {
              reqTimeout = setTimeout(function () {
                reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
                finalize();
              }, request.timeout);
            });
          }

          req.on('error', function (err) {
            reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
            finalize();
          });
          req.on('response', function (res) {
            clearTimeout(reqTimeout);
            const headers = createHeadersLenient(res.headers); // HTTP fetch step 5

            if (fetch.isRedirect(res.statusCode)) {
              // HTTP fetch step 5.2
              const location = headers.get('Location'); // HTTP fetch step 5.3

              const locationURL = location === null ? null : resolve_url(request.url, location); // HTTP fetch step 5.5

              switch (request.redirect) {
                case 'error':
                  reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
                  finalize();
                  return;

                case 'manual':
                  // node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
                  if (locationURL !== null) {
                    // handle corrupted header
                    try {
                      headers.set('Location', locationURL);
                    } catch (err) {
                      // istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
                      reject(err);
                    }
                  }

                  break;

                case 'follow':
                  // HTTP-redirect fetch step 2
                  if (locationURL === null) {
                    break;
                  } // HTTP-redirect fetch step 5


                  if (request.counter >= request.follow) {
                    reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
                    finalize();
                    return;
                  } // HTTP-redirect fetch step 6 (counter increment)
                  // Create a new Request object.


                  const requestOpts = {
                    headers: new Headers(request.headers),
                    follow: request.follow,
                    counter: request.counter + 1,
                    agent: request.agent,
                    compress: request.compress,
                    method: request.method,
                    body: request.body,
                    signal: request.signal,
                    timeout: request.timeout,
                    size: request.size
                  }; // HTTP-redirect fetch step 9

                  if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
                    reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
                    finalize();
                    return;
                  } // HTTP-redirect fetch step 11


                  if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
                    requestOpts.method = 'GET';
                    requestOpts.body = undefined;
                    requestOpts.headers.delete('content-length');
                  } // HTTP-redirect fetch step 15


                  resolve(fetch(new Request(locationURL, requestOpts)));
                  finalize();
                  return;
              }
            } // prepare response


            res.once('end', function () {
              if (signal) signal.removeEventListener('abort', abortAndFinalize);
            });
            let body = res.pipe(new PassThrough$1());
            const response_options = {
              url: request.url,
              status: res.statusCode,
              statusText: res.statusMessage,
              headers: headers,
              size: request.size,
              timeout: request.timeout,
              counter: request.counter
            }; // HTTP-network fetch step 12.1.1.3

            const codings = headers.get('Content-Encoding'); // HTTP-network fetch step 12.1.1.4: handle content codings
            // in following scenarios we ignore compression support
            // 1. compression support is disabled
            // 2. HEAD request
            // 3. no Content-Encoding header
            // 4. no content response (204)
            // 5. content not modified response (304)

            if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
              response = new Response(body, response_options);
              resolve(response);
              return;
            } // For Node v6+
            // Be less strict when decoding compressed responses, since sometimes
            // servers send slightly invalid responses that are still accepted
            // by common browsers.
            // Always using Z_SYNC_FLUSH is what cURL does.


            const zlibOptions = {
              flush: zlib.Z_SYNC_FLUSH,
              finishFlush: zlib.Z_SYNC_FLUSH
            }; // for gzip

            if (codings == 'gzip' || codings == 'x-gzip') {
              body = body.pipe(zlib.createGunzip(zlibOptions));
              response = new Response(body, response_options);
              resolve(response);
              return;
            } // for deflate


            if (codings == 'deflate' || codings == 'x-deflate') {
              // handle the infamous raw deflate response from old servers
              // a hack for old IIS and Apache servers
              const raw = res.pipe(new PassThrough$1());
              raw.once('data', function (chunk) {
                // see http://stackoverflow.com/questions/37519828
                if ((chunk[0] & 0x0F) === 0x08) {
                  body = body.pipe(zlib.createInflate());
                } else {
                  body = body.pipe(zlib.createInflateRaw());
                }

                response = new Response(body, response_options);
                resolve(response);
              });
              return;
            } // for br


            if (codings == 'br' && typeof zlib.createBrotliDecompress === 'function') {
              body = body.pipe(zlib.createBrotliDecompress());
              response = new Response(body, response_options);
              resolve(response);
              return;
            } // otherwise, use response as-is


            response = new Response(body, response_options);
            resolve(response);
          });
          writeToStream(req, request);
        });
      }
      /**
       * Redirect code matching
       *
       * @param   Number   code  Status code
       * @return  Boolean
       */


      fetch.isRedirect = function (code) {
        return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
      }; // expose Promise


      fetch.Promise = global.Promise;
      module.exports = exports = fetch;
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = exports;
      exports.Headers = Headers;
      exports.Request = Request;
      exports.Response = Response;
      exports.FetchError = FetchError;
      /***/
    },

    /***/
    1223:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      var wrappy = __webpack_require__(2940);

      module.exports = wrappy(once);
      module.exports.strict = wrappy(onceStrict);
      once.proto = once(function () {
        Object.defineProperty(Function.prototype, 'once', {
          value: function () {
            return once(this);
          },
          configurable: true
        });
        Object.defineProperty(Function.prototype, 'onceStrict', {
          value: function () {
            return onceStrict(this);
          },
          configurable: true
        });
      });

      function once(fn) {
        var f = function () {
          if (f.called) return f.value;
          f.called = true;
          return f.value = fn.apply(this, arguments);
        };

        f.called = false;
        return f;
      }

      function onceStrict(fn) {
        var f = function () {
          if (f.called) throw new Error(f.onceError);
          f.called = true;
          return f.value = fn.apply(this, arguments);
        };

        var name = fn.name || 'Function wrapped with `once`';
        f.onceError = name + " shouldn't be called more than once";
        f.called = false;
        return f;
      }
      /***/

    },

    /***/
    5636:
    /***/
    (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "__extends": () =>
        /* binding */
        __extends,

        /* harmony export */
        "__assign": () =>
        /* binding */
        __assign,

        /* harmony export */
        "__rest": () =>
        /* binding */
        __rest,

        /* harmony export */
        "__decorate": () =>
        /* binding */
        __decorate,

        /* harmony export */
        "__param": () =>
        /* binding */
        __param,

        /* harmony export */
        "__metadata": () =>
        /* binding */
        __metadata,

        /* harmony export */
        "__awaiter": () =>
        /* binding */
        __awaiter,

        /* harmony export */
        "__generator": () =>
        /* binding */
        __generator,

        /* harmony export */
        "__createBinding": () =>
        /* binding */
        __createBinding,

        /* harmony export */
        "__exportStar": () =>
        /* binding */
        __exportStar,

        /* harmony export */
        "__values": () =>
        /* binding */
        __values,

        /* harmony export */
        "__read": () =>
        /* binding */
        __read,

        /* harmony export */
        "__spread": () =>
        /* binding */
        __spread,

        /* harmony export */
        "__spreadArrays": () =>
        /* binding */
        __spreadArrays,

        /* harmony export */
        "__spreadArray": () =>
        /* binding */
        __spreadArray,

        /* harmony export */
        "__await": () =>
        /* binding */
        __await,

        /* harmony export */
        "__asyncGenerator": () =>
        /* binding */
        __asyncGenerator,

        /* harmony export */
        "__asyncDelegator": () =>
        /* binding */
        __asyncDelegator,

        /* harmony export */
        "__asyncValues": () =>
        /* binding */
        __asyncValues,

        /* harmony export */
        "__makeTemplateObject": () =>
        /* binding */
        __makeTemplateObject,

        /* harmony export */
        "__importStar": () =>
        /* binding */
        __importStar,

        /* harmony export */
        "__importDefault": () =>
        /* binding */
        __importDefault,

        /* harmony export */
        "__classPrivateFieldGet": () =>
        /* binding */
        __classPrivateFieldGet,

        /* harmony export */
        "__classPrivateFieldSet": () =>
        /* binding */
        __classPrivateFieldSet
        /* harmony export */

      });
      /*! *****************************************************************************
      Copyright (c) Microsoft Corporation.
      
      Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted.
      
      THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
      REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
      AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
      INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
      LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
      OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
      PERFORMANCE OF THIS SOFTWARE.
      ***************************************************************************** */

      /* global Reflect, Promise */


      var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };

        return extendStatics(d, b);
      };

      function __extends(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      }

      var __assign = function () {
        __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];

            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }

          return t;
        };

        return __assign.apply(this, arguments);
      };

      function __rest(s, e) {
        var t = {};

        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

        if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
        }
        return t;
      }

      function __decorate(decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      }

      function __param(paramIndex, decorator) {
        return function (target, key) {
          decorator(target, key, paramIndex);
        };
      }

      function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
      }

      function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
          });
        }

        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }

          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }

          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }

          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      }

      function __generator(thisArg, body) {
        var _ = {
          label: 0,
          sent: function () {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        },
            f,
            y,
            t,
            g;
        return g = {
          next: verb(0),
          "throw": verb(1),
          "return": verb(2)
        }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
          return this;
        }), g;

        function verb(n) {
          return function (v) {
            return step([n, v]);
          };
        }

        function step(op) {
          if (f) throw new TypeError("Generator is already executing.");

          while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];

            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;

              case 4:
                _.label++;
                return {
                  value: op[1],
                  done: false
                };

              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;

              case 7:
                op = _.ops.pop();

                _.trys.pop();

                continue;

              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }

                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }

                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }

                if (t && _.label < t[2]) {
                  _.label = t[2];

                  _.ops.push(op);

                  break;
                }

                if (t[2]) _.ops.pop();

                _.trys.pop();

                continue;
            }

            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }

          if (op[0] & 5) throw op[1];
          return {
            value: op[0] ? op[1] : void 0,
            done: true
          };
        }
      }

      var __createBinding = Object.create ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          }
        });
      } : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      };

      function __exportStar(m, o) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
      }

      function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator,
            m = s && o[s],
            i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
          next: function () {
            if (o && i >= o.length) o = void 0;
            return {
              value: o && o[i++],
              done: !o
            };
          }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }

      function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o),
            r,
            ar = [],
            e;

        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = {
            error: error
          };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }

        return ar;
      }
      /** @deprecated */


      function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

        return ar;
      }
      /** @deprecated */


      function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

        for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

        return r;
      }

      function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
        return to.concat(ar || from);
      }

      function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
      }

      function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []),
            i,
            q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
          return this;
        }, i;

        function verb(n) {
          if (g[n]) i[n] = function (v) {
            return new Promise(function (a, b) {
              q.push([n, v, a, b]) > 1 || resume(n, v);
            });
          };
        }

        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e) {
            settle(q[0][3], e);
          }
        }

        function step(r) {
          r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }

        function fulfill(value) {
          resume("next", value);
        }

        function reject(value) {
          resume("throw", value);
        }

        function settle(f, v) {
          if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
        }
      }

      function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) {
          throw e;
        }), verb("return"), i[Symbol.iterator] = function () {
          return this;
        }, i;

        function verb(n, f) {
          i[n] = o[n] ? function (v) {
            return (p = !p) ? {
              value: __await(o[n](v)),
              done: n === "return"
            } : f ? f(v) : v;
          } : f;
        }
      }

      function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator],
            i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
          return this;
        }, i);

        function verb(n) {
          i[n] = o[n] && function (v) {
            return new Promise(function (resolve, reject) {
              v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
          };
        }

        function settle(resolve, reject, d, v) {
          Promise.resolve(v).then(function (v) {
            resolve({
              value: v,
              done: d
            });
          }, reject);
        }
      }

      function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", {
            value: raw
          });
        } else {
          cooked.raw = raw;
        }

        return cooked;
      }

      ;

      var __setModuleDefault = Object.create ? function (o, v) {
        Object.defineProperty(o, "default", {
          enumerable: true,
          value: v
        });
      } : function (o, v) {
        o["default"] = v;
      };

      function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

        __setModuleDefault(result, mod);

        return result;
      }

      function __importDefault(mod) {
        return mod && mod.__esModule ? mod : {
          default: mod
        };
      }

      function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      }

      function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
      }
      /***/

    },

    /***/
    4294:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = __webpack_require__(4219);
      /***/
    },

    /***/
    4219:
    /***/
    (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";

      var net = __webpack_require__(1631);

      var tls = __webpack_require__(4016);

      var http = __webpack_require__(8605);

      var https = __webpack_require__(7211);

      var events = __webpack_require__(8614);

      var assert = __webpack_require__(2357);

      var util = __webpack_require__(1669);

      exports.httpOverHttp = httpOverHttp;
      exports.httpsOverHttp = httpsOverHttp;
      exports.httpOverHttps = httpOverHttps;
      exports.httpsOverHttps = httpsOverHttps;

      function httpOverHttp(options) {
        var agent = new TunnelingAgent(options);
        agent.request = http.request;
        return agent;
      }

      function httpsOverHttp(options) {
        var agent = new TunnelingAgent(options);
        agent.request = http.request;
        agent.createSocket = createSecureSocket;
        agent.defaultPort = 443;
        return agent;
      }

      function httpOverHttps(options) {
        var agent = new TunnelingAgent(options);
        agent.request = https.request;
        return agent;
      }

      function httpsOverHttps(options) {
        var agent = new TunnelingAgent(options);
        agent.request = https.request;
        agent.createSocket = createSecureSocket;
        agent.defaultPort = 443;
        return agent;
      }

      function TunnelingAgent(options) {
        var self = this;
        self.options = options || {};
        self.proxyOptions = self.options.proxy || {};
        self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
        self.requests = [];
        self.sockets = [];
        self.on('free', function onFree(socket, host, port, localAddress) {
          var options = toOptions(host, port, localAddress);

          for (var i = 0, len = self.requests.length; i < len; ++i) {
            var pending = self.requests[i];

            if (pending.host === options.host && pending.port === options.port) {
              // Detect the request to connect same origin server,
              // reuse the connection.
              self.requests.splice(i, 1);
              pending.request.onSocket(socket);
              return;
            }
          }

          socket.destroy();
          self.removeSocket(socket);
        });
      }

      util.inherits(TunnelingAgent, events.EventEmitter);

      TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
        var self = this;
        var options = mergeOptions({
          request: req
        }, self.options, toOptions(host, port, localAddress));

        if (self.sockets.length >= this.maxSockets) {
          // We are over limit so we'll add it to the queue.
          self.requests.push(options);
          return;
        } // If we are under maxSockets create a new one.


        self.createSocket(options, function (socket) {
          socket.on('free', onFree);
          socket.on('close', onCloseOrRemove);
          socket.on('agentRemove', onCloseOrRemove);
          req.onSocket(socket);

          function onFree() {
            self.emit('free', socket, options);
          }

          function onCloseOrRemove(err) {
            self.removeSocket(socket);
            socket.removeListener('free', onFree);
            socket.removeListener('close', onCloseOrRemove);
            socket.removeListener('agentRemove', onCloseOrRemove);
          }
        });
      };

      TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
        var self = this;
        var placeholder = {};
        self.sockets.push(placeholder);
        var connectOptions = mergeOptions({}, self.proxyOptions, {
          method: 'CONNECT',
          path: options.host + ':' + options.port,
          agent: false,
          headers: {
            host: options.host + ':' + options.port
          }
        });

        if (options.localAddress) {
          connectOptions.localAddress = options.localAddress;
        }

        if (connectOptions.proxyAuth) {
          connectOptions.headers = connectOptions.headers || {};
          connectOptions.headers['Proxy-Authorization'] = 'Basic ' + new Buffer(connectOptions.proxyAuth).toString('base64');
        }

        debug('making CONNECT request');
        var connectReq = self.request(connectOptions);
        connectReq.useChunkedEncodingByDefault = false; // for v0.6

        connectReq.once('response', onResponse); // for v0.6

        connectReq.once('upgrade', onUpgrade); // for v0.6

        connectReq.once('connect', onConnect); // for v0.7 or later

        connectReq.once('error', onError);
        connectReq.end();

        function onResponse(res) {
          // Very hacky. This is necessary to avoid http-parser leaks.
          res.upgrade = true;
        }

        function onUpgrade(res, socket, head) {
          // Hacky.
          process.nextTick(function () {
            onConnect(res, socket, head);
          });
        }

        function onConnect(res, socket, head) {
          connectReq.removeAllListeners();
          socket.removeAllListeners();

          if (res.statusCode !== 200) {
            debug('tunneling socket could not be established, statusCode=%d', res.statusCode);
            socket.destroy();
            var error = new Error('tunneling socket could not be established, ' + 'statusCode=' + res.statusCode);
            error.code = 'ECONNRESET';
            options.request.emit('error', error);
            self.removeSocket(placeholder);
            return;
          }

          if (head.length > 0) {
            debug('got illegal response body from proxy');
            socket.destroy();
            var error = new Error('got illegal response body from proxy');
            error.code = 'ECONNRESET';
            options.request.emit('error', error);
            self.removeSocket(placeholder);
            return;
          }

          debug('tunneling connection has established');
          self.sockets[self.sockets.indexOf(placeholder)] = socket;
          return cb(socket);
        }

        function onError(cause) {
          connectReq.removeAllListeners();
          debug('tunneling socket could not be established, cause=%s\n', cause.message, cause.stack);
          var error = new Error('tunneling socket could not be established, ' + 'cause=' + cause.message);
          error.code = 'ECONNRESET';
          options.request.emit('error', error);
          self.removeSocket(placeholder);
        }
      };

      TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
        var pos = this.sockets.indexOf(socket);

        if (pos === -1) {
          return;
        }

        this.sockets.splice(pos, 1);
        var pending = this.requests.shift();

        if (pending) {
          // If we have pending requests and a socket gets closed a new one
          // needs to be created to take over in the pool for the one that closed.
          this.createSocket(pending, function (socket) {
            pending.request.onSocket(socket);
          });
        }
      };

      function createSecureSocket(options, cb) {
        var self = this;
        TunnelingAgent.prototype.createSocket.call(self, options, function (socket) {
          var hostHeader = options.request.getHeader('host');
          var tlsOptions = mergeOptions({}, self.options, {
            socket: socket,
            servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
          }); // 0 is dummy port for v0.6

          var secureSocket = tls.connect(0, tlsOptions);
          self.sockets[self.sockets.indexOf(socket)] = secureSocket;
          cb(secureSocket);
        });
      }

      function toOptions(host, port, localAddress) {
        if (typeof host === 'string') {
          // since v0.10
          return {
            host: host,
            port: port,
            localAddress: localAddress
          };
        }

        return host; // for v0.11 or later
      }

      function mergeOptions(target) {
        for (var i = 1, len = arguments.length; i < len; ++i) {
          var overrides = arguments[i];

          if (typeof overrides === 'object') {
            var keys = Object.keys(overrides);

            for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
              var k = keys[j];

              if (overrides[k] !== undefined) {
                target[k] = overrides[k];
              }
            }
          }
        }

        return target;
      }

      var debug;

      if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
        debug = function () {
          var args = Array.prototype.slice.call(arguments);

          if (typeof args[0] === 'string') {
            args[0] = 'TUNNEL: ' + args[0];
          } else {
            args.unshift('TUNNEL:');
          }

          console.error.apply(console, args);
        };
      } else {
        debug = function () {};
      }

      exports.debug = debug; // for test

      /***/
    },

    /***/
    3578:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const {
        setGlobalDispatcher,
        getGlobalDispatcher
      } = __webpack_require__(1773);

      const {
        fetch
      } = __webpack_require__(9307);

      fetch.Request = __webpack_require__(340).Request;
      fetch.Response = __webpack_require__(8091).Response;
      fetch.Headers = __webpack_require__(6990).Headers;
      fetch.setGlobalDispatcher = setGlobalDispatcher;
      fetch.getGlobalDispatcher = getGlobalDispatcher;
      module.exports = fetch;
      /***/
    },

    /***/
    2308:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const {
        body: {
          kBody
        }
      } = __webpack_require__(3802);

      const {
        isAsyncIterable
      } = __webpack_require__(330);

      class ControlledAsyncIterable {
        constructor(input) {
          if (!isAsyncIterable(input)) {
            throw Error('input argument must implement either `[Symbol.asyncIterator]` or `[Symbol.iterator]`');
          }

          this.data = input;
          this.disturbed = false;
        }

        async *[Symbol.asyncIterator]() {
          if (this.disturbed) {
            throw Error('cannot iterate on distured iterable');
          }

          this.disturbed = true;
          yield* this.data;
        }

      }

      function BodyMixin(requestOrResponsePrototype) {
        Object.defineProperties(requestOrResponsePrototype, {
          body: {
            get() {
              return this[kBody];
            }

          },
          bodyUsed: {
            get() {
              return isUnusable(this[kBody]);
            }

          },
          arrayBuffer: {
            value: function () {
              if (this[kBody] === null) return Promise.resolve(Buffer.alloc(0));
              return consumeBody(this[kBody]);
            }
          },
          blob: {
            value: async function () {
              throw Error(`${this.constructor.name}.blob() is not supported yet by undici-fetch`);
            }
          },
          formData: {
            value: async function () {
              throw Error(`${this.constructor.name}.formData() is not supported yet by undici-fetch`);
            }
          },
          json: {
            value: async function () {
              return JSON.parse(await this.text());
            }
          },
          text: {
            value: async function () {
              if (this[kBody] === null) return '';
              return (await consumeBody(this[kBody])).toString('utf-8');
            }
          }
        });
      }

      async function consumeBody(controlledAsyncIterable) {
        if (isUnusable(controlledAsyncIterable)) throw TypeError('cannot consume unusable body');

        if (Buffer.isBuffer(controlledAsyncIterable.data)) {
          controlledAsyncIterable.disturbed = true;
          return controlledAsyncIterable.data;
        } else {
          const bufs = [];

          for await (const chunk of controlledAsyncIterable) {
            bufs.push(Buffer.from(chunk));
          }

          return Buffer.concat(bufs);
        }
      }

      function isUnusable(controlledAsyncIterable) {
        var _controlledAsyncItera;

        return (_controlledAsyncItera = controlledAsyncIterable === null || controlledAsyncIterable === void 0 ? void 0 : controlledAsyncIterable.disturbed) !== null && _controlledAsyncItera !== void 0 ? _controlledAsyncItera : false;
      }

      function extractBody(body, keepalive = false) {
        // Test for unique iterator types (URLSearchParams, String, or ArrayBuffer) before the isAsyncIterable check
        // todo: Blob & FormBody
        if (body instanceof URLSearchParams) {
          // spec says to run application/x-www-form-urlencoded on body.list
          // this is implemented in Node.js as apart of an URLSearchParams instance toString method
          // See: https://github.com/nodejs/node/blob/e46c680bf2b211bbd52cf959ca17ee98c7f657f5/lib/internal/url.js#L490
          // And: https://github.com/nodejs/node/blob/e46c680bf2b211bbd52cf959ca17ee98c7f657f5/lib/internal/url.js#L1100
          return [Buffer.from(body.toString(), 'utf-8'), 'application/x-www-form-urlencoded;charset=UTF-8'];
        } else if (typeof body === 'string') {
          return [Buffer.from(body, 'utf-8'), 'text/plain;charset=UTF-8'];
        } else if (body instanceof ArrayBuffer || ArrayBuffer.isView(body)) {
          return [Buffer.from(body), null];
        } else if (isAsyncIterable(body)) {
          // Readable, Buffer
          if (keepalive) throw new TypeError('Cannot extract body while keepalive is true');
          return [body, null];
        } else {
          throw Error('Cannot extract Body from input: ', body);
        }
      }

      module.exports = {
        BodyMixin,
        consumeBody,
        ControlledAsyncIterable,
        extractBody,
        isUnusable
      };
      /***/
    },

    /***/
    9307:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const Undici = __webpack_require__(1773);

      const {
        STATUS_CODES
      } = __webpack_require__(8605);

      const {
        Request
      } = __webpack_require__(340);

      const {
        Response
      } = __webpack_require__(8091);

      const {
        AbortError
      } = __webpack_require__(330);

      const {
        headers: {
          kHeadersList
        }
      } = __webpack_require__(3802);

      async function fetch(resource, init) {
        const request = new Request(resource, init);

        if (!request.headers.has('accept')) {
          request.headers.set('accept', '*/*');
        }

        if (!request.headers.has('accept-language')) {
          request.headers.set('accept-language', '*');
        }

        try {
          var _request$body;

          const {
            statusCode,
            headers,
            body
          } = await Undici.request(request.url, {
            method: request.method,
            headers: request.headers[kHeadersList],
            body: (_request$body = request.body) === null || _request$body === void 0 ? void 0 : _request$body.data,
            signal: request.signal
          });
          return new Response(body, {
            status: statusCode,
            statusText: STATUS_CODES[statusCode],
            headers: headers
          });
        } catch (error) {
          if (error.code === new Undici.errors.RequestAbortedError().code) {
            throw new AbortError();
          }

          throw error;
        }
      }

      module.exports = {
        fetch
      };
      /***/
    },

    /***/
    6990:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const {
        types
      } = __webpack_require__(1669);

      const {
        validateHeaderName,
        validateHeaderValue
      } = __webpack_require__(8605);

      const {
        binarySearch
      } = __webpack_require__(330);

      const {
        headers: {
          kHeadersList
        }
      } = __webpack_require__(3802);

      function normalizeAndValidateHeaderName(name) {
        const normalizedHeaderName = name.toLowerCase();
        validateHeaderName(normalizedHeaderName);
        return normalizedHeaderName;
      }

      function normalizeAndValidateHeaderValue(name, value) {
        const normalizedHeaderValue = value.replace(/^[\n\t\r\x20]+|[\n\t\r\x20]+$/g, '');
        validateHeaderValue(name, normalizedHeaderValue);
        return normalizedHeaderValue;
      }

      function fill(headers, object) {
        if (Array.isArray(object)) {
          if (Array.isArray(object[0])) {
            for (let i = 0, header = object[0]; i < object.length; i++, header = object[i]) {
              if (header.length !== 2) throw TypeError('header entry must be of length two');
              headers.append(header[0], header[1]);
            }
          } else if (typeof object[0] === 'string' || Buffer.isBuffer(object[0])) {
            if (object.length % 2 !== 0) throw TypeError('flattened header init must have even length');

            for (let i = 0; i < object.length; i += 2) {
              headers.append(object[i].toString('utf-8'), object[i + 1].toString('utf-8'));
            }
          } else {
            if (object.length !== 0) throw TypeError('invalid array-based header init');
          }
        } else if (kHeadersList in object) {
          headers[kHeadersList] = new Array(...object[kHeadersList]);
        } else if (!types.isBoxedPrimitive(object)) {
          for (const [name, value] of Object.entries(object)) {
            headers.append(name, value);
          }
        }
      }

      class Headers {
        constructor(init) {
          this[kHeadersList] = [];

          if (init && typeof init === 'object') {
            fill(this, init);
          }
        }

        append(name, value) {
          const normalizedName = normalizeAndValidateHeaderName(name);
          const normalizedValue = normalizeAndValidateHeaderValue(name, value);
          const i = binarySearch(this[kHeadersList], normalizedName);

          if (this[kHeadersList][i] === normalizedName) {
            this[kHeadersList][i + 1] += `, ${normalizedValue}`;
          } else {
            this[kHeadersList].splice(i, 0, normalizedName, normalizedValue);
          }
        }

        delete(name) {
          const normalizedName = normalizeAndValidateHeaderName(name);
          const i = binarySearch(this[kHeadersList], normalizedName);

          if (this[kHeadersList][i] === normalizedName) {
            this[kHeadersList].splice(i, 2);
          }
        }

        get(name) {
          const normalizedName = normalizeAndValidateHeaderName(name);
          const i = binarySearch(this[kHeadersList], normalizedName);

          if (this[kHeadersList][i] === normalizedName) {
            return this[kHeadersList][i + 1];
          }

          return null;
        }

        has(name) {
          const normalizedName = normalizeAndValidateHeaderName(name);
          const i = binarySearch(this[kHeadersList], normalizedName);
          return this[kHeadersList][i] === normalizedName;
        }

        set(name, value) {
          const normalizedName = normalizeAndValidateHeaderName(name);
          const normalizedValue = normalizeAndValidateHeaderValue(name, value);
          const i = binarySearch(this[kHeadersList], normalizedName);

          if (this[kHeadersList][i] === normalizedName) {
            this[kHeadersList][i + 1] = normalizedValue;
          } else {
            this[kHeadersList].splice(i, 0, normalizedName, normalizedValue);
          }
        }

        *keys() {
          for (const header of this) {
            yield header[0];
          }
        }

        *values() {
          for (const header of this) {
            yield header[1];
          }
        }

        *entries() {
          yield* this;
        }

        forEach(callback, thisArg) {
          for (let i = 0; i < this[kHeadersList].length; i += 2) {
            callback.call(thisArg, this[kHeadersList][i + 1], this[kHeadersList][i], this);
          }
        }

        *[Symbol.iterator]() {
          for (let i = 0; i < this[kHeadersList].length; i += 2) {
            yield [this[kHeadersList][i], this[kHeadersList][i + 1]];
          }
        }

      }

      module.exports = {
        Headers,
        fill,
        normalizeAndValidateHeaderName,
        normalizeAndValidateHeaderValue
      };
      /***/
    },

    /***/
    340:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const {
        METHODS
      } = __webpack_require__(8605);

      const {
        ControlledAsyncIterable,
        BodyMixin,
        extractBody
      } = __webpack_require__(2308);

      const {
        Headers
      } = __webpack_require__(6990);

      const {
        request: {
          kMethod,
          kRedirect,
          kIntegrity,
          kKeepalive,
          kSignal
        },
        headers: {
          kHeadersList
        },
        shared: {
          kHeaders,
          kUrlList
        },
        body: {
          kBody
        }
      } = __webpack_require__(3802);

      function normalizeAndValidateRequestMethod(method) {
        if (typeof method !== 'string') {
          throw TypeError(`Request method: ${method} must be type 'string'`);
        }

        const normalizedMethod = method.toUpperCase();

        if (METHODS.indexOf(normalizedMethod) === -1) {
          throw Error(`Normalized request method: ${normalizedMethod} must be one of ${METHODS.join(', ')}`);
        }

        return normalizedMethod;
      }

      class Request {
        constructor(input, init = {}) {
          if (input instanceof Request) {
            return new Request(input.url, {
              method: input.method,
              keepalive: input.keepalive,
              headers: input.headers[kHeadersList],
              redirect: input.redirect,
              integrity: input.integrity,
              body: null,
              // cloning body currently not-supported
              signal: null,
              // cloning signal currently not-supported
              ...init
            });
          } else if (typeof input !== 'string' && !(input instanceof URL)) {
            throw TypeError('Request input must be type Request, URL, or string');
          }

          this[kUrlList] = [new URL(input)];
          this[kKeepalive] = init.keepalive || false;
          this[kRedirect] = init.redirect || 'follow';
          this[kIntegrity] = init.integrity || '';
          this[kSignal] = init.signal || null;
          this[kMethod] = init.method !== undefined ? normalizeAndValidateRequestMethod(init.method) : 'GET';
          this[kHeaders] = new Headers(init.headers);
          this[kBody] = init.body || null;

          if (this[kBody] !== null) {
            if (this[kMethod] === 'GET' || this[kMethod] === 'HEAD') {
              throw TypeError('Request with GET/HEAD method cannot have body');
            }

            const [extractedBody, contentType] = extractBody(this[kBody], this[kKeepalive]);
            this[kBody] = new ControlledAsyncIterable(extractedBody);

            if (contentType !== null && !this[kHeaders].has('content-type')) {
              this[kHeaders].append('content-type', contentType);
            }
          }
        }

        get method() {
          return this[kMethod];
        }

        get url() {
          return this[kUrlList][0].toString();
        }

        get headers() {
          return this[kHeaders];
        }

        get redirect() {
          return this[kRedirect];
        }

        get integrity() {
          return this[kIntegrity];
        }

        get keepalive() {
          return this[kKeepalive];
        }

        get signal() {
          return this[kSignal];
        }

        clone() {
          if (this.bodyUsed) {
            throw TypeError('Cannot clone a Request with an unusable body');
          }

          const request = new Request(this);
          return request;
        }

      }

      BodyMixin(Request.prototype);
      module.exports = {
        Request
      };
      /***/
    },

    /***/
    8091:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const {
        extractBody,
        BodyMixin,
        ControlledAsyncIterable
      } = __webpack_require__(2308);

      const {
        Headers
      } = __webpack_require__(6990);

      const {
        response: {
          kStatus,
          kStatusText,
          kType
        },
        body: {
          kBody
        },
        shared: {
          kHeaders,
          kUrlList
        }
      } = __webpack_require__(3802);

      class Response {
        constructor(body = null, {
          status = 200,
          statusText = '',
          headers
        } = {}) {
          if (typeof status !== 'number') {
            throw TypeError(`Response status must be of type number. Found type: ${typeof status}`);
          } else if (status < 200 || status > 599) {
            throw RangeError(`Response status must be between 200 and 599 inclusive. Found: ${status}`);
          }

          if (typeof statusText !== 'string') {
            throw TypeError(`Response statusText must be of type string. Found type: ${typeof statusText}`);
          }

          this[kStatus] = status;
          this[kStatusText] = statusText;
          this[kType] = 'default';
          this[kUrlList] = [];
          this[kHeaders] = new Headers(headers);
          this[kBody] = body;

          if (this[kBody] !== null) {
            if (isNullBodyStatus(this[kStatus])) {
              throw TypeError(`Expected non-null Response body status. Found: ${this[kStatus]}`);
            }

            const [extractedBody, contentType] = extractBody(this[kBody]);
            this[kBody] = new ControlledAsyncIterable(extractedBody);

            if (contentType !== null && !this[kHeaders].has('content-type')) {
              this[kHeaders].append('content-type', contentType);
            }
          }
        }

        get type() {
          return this[kType];
        }

        get url() {
          const length = this[kUrlList].length;
          return length === 0 ? '' : this[kUrlList][length - 1].toString();
        }

        get redirected() {
          return this[kUrlList].length > 1;
        }

        get status() {
          return this[kStatus];
        }

        get ok() {
          return isOkStatus(this[kStatus]);
        }

        get statusText() {
          return this[kStatusText];
        }

        get headers() {
          return this[kHeaders];
        }

        clone() {
          if (this.bodyUsed) {
            throw TypeError('Cannot clone Response - body is unusable');
          }

          const response = new Response();
          response[kHeaders] = this[kHeaders];
          response[kStatus] = this[kStatus];
          response[kStatusText] = this[kStatusText];
          response[kType] = this[kType];
          response[kUrlList] = this[kUrlList];

          if (this[kBody] !== null) {
            // todo: tee this[kBody]
            throw Error('Cannot clone a non-null body response');
          }

          return response;
        }

        static error() {
          const response = new Response(null, {
            statusText: ''
          }); // Manually override status since constructor will throw error is status is 0

          response[kStatus] = 0;
          response[kType] = 'error';
          return response;
        }

        static redirect(url, status) {
          const parsedURL = new URL(url);

          if (!isRedirectStatus(status)) {
            throw RangeError(`redirect status must be 301, 302, 303, 307, or 308. Found ${status}`);
          }

          const response = new Response(null, {
            headers: ['location', parsedURL.toString()],
            status
          });
          return response;
        }

      }

      function isNullBodyStatus(status) {
        return status === 204 || status === 205 || status === 304;
      }

      function isOkStatus(status) {
        return status >= 200 && status <= 299;
      }

      function isRedirectStatus(status) {
        return status === 301 || status === 302 || status === 303 || status === 307 || status === 308;
      }

      BodyMixin(Response.prototype);
      module.exports = {
        Response
      };
      /***/
    },

    /***/
    3802:
    /***/
    module => {
      // Body
      const kBody = Symbol('body');
      const kBodyUsed = Symbol('bodyUsed'); // Headers

      const kHeadersList = Symbol('headersList'); // Request & Response

      const kHeaders = Symbol('headers');
      const kUrlList = Symbol('urlList'); // Response

      const kStatus = Symbol('status');
      const kStatusText = Symbol('statusText');
      const kType = Symbol('type'); // Request

      const kMethod = Symbol('method');
      const kRedirect = Symbol('redirect');
      const kIntegrity = Symbol('integrity');
      const kKeepalive = Symbol('keepalive');
      const kSignal = Symbol('signal');
      module.exports = {
        body: {
          kBody,
          kBodyUsed
        },
        headers: {
          kHeadersList
        },
        response: {
          kStatus,
          kStatusText,
          kType
        },
        request: {
          kMethod,
          kRedirect,
          kIntegrity,
          kKeepalive,
          kSignal
        },
        shared: {
          kHeaders,
          kUrlList
        }
      };
      /***/
    },

    /***/
    330:
    /***/
    module => {
      "use strict";

      function isAsyncIterable(obj) {
        return typeof (obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]) === 'function' || typeof (obj === null || obj === void 0 ? void 0 : obj[Symbol.iterator]) === 'function';
      }
      /**
       * This algorithm is based off of https://www.tbray.org/ongoing/When/200x/2003/03/22/Binary
       * It only operates on the even indexes of the array (the header names) by only iterating at most
       * half the length of the input array. The search also assumes all entries are strings and uses
       * String.prototype.localeCompare for comparison
       */


      function binarySearch(arr, val) {
        let low = 0;
        let high = arr.length / 2;

        while (high > low) {
          const mid = high + low >>> 1;

          if (val.localeCompare(arr[mid * 2]) > 0) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }

        return low * 2;
      }

      class AbortError extends Error {
        constructor() {
          super('The operation was aborted');
          this.name = 'AbortError';
        }

      }

      module.exports = {
        AbortError,
        isAsyncIterable,
        binarySearch
      };
      /***/
    },

    /***/
    1773:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const Client = __webpack_require__(3598);

      const Dispatcher = __webpack_require__(412);

      const errors = __webpack_require__(8045);

      const Pool = __webpack_require__(4634);

      const Agent = __webpack_require__(7890);

      const util = __webpack_require__(3983);

      const {
        InvalidArgumentError
      } = __webpack_require__(8045);

      const api = __webpack_require__(4059);

      const MockClient = __webpack_require__(8687);

      const MockAgent = __webpack_require__(6771);

      const MockPool = __webpack_require__(6193);

      const mockErrors = __webpack_require__(888);

      Object.assign(Dispatcher.prototype, api);
      module.exports.Dispatcher = Dispatcher;
      module.exports.Client = Client;
      module.exports.Pool = Pool;
      module.exports.Agent = Agent;
      module.exports.errors = errors;
      let globalDispatcher = new Agent();

      function setGlobalDispatcher(agent) {
        if (!agent || typeof agent.dispatch !== 'function') {
          throw new InvalidArgumentError('Argument agent must implement Agent');
        }

        globalDispatcher = agent;
      }

      function getGlobalDispatcher() {
        return globalDispatcher;
      }

      function makeDispatcher(fn) {
        return (url, opts, handler) => {
          if (typeof opts === 'function') {
            handler = opts;
            opts = null;
          }

          if (!url || typeof url !== 'string' && typeof url !== 'object' && !(url instanceof URL)) {
            throw new InvalidArgumentError('invalid url');
          }

          if (opts != null && typeof opts !== 'object') {
            throw new InvalidArgumentError('invalid opts');
          }

          if (opts && opts.path != null) {
            if (typeof opts.path !== 'string') {
              throw new InvalidArgumentError('invalid opts.path');
            }

            url = new URL(opts.path, util.parseOrigin(url));
          } else {
            if (!opts) {
              opts = typeof url === 'object' ? url : {};
            }

            url = util.parseURL(url);
          }

          const {
            agent,
            dispatcher = getGlobalDispatcher()
          } = opts;

          if (agent) {
            throw new InvalidArgumentError('unsupported opts.agent. Did you mean opts.client?');
          }

          return fn.call(dispatcher, { ...opts,
            origin: url.origin,
            path: url.search ? `${url.pathname}${url.search}` : url.pathname,
            method: opts.method ? opts.method : opts.body ? 'PUT' : 'GET'
          }, handler);
        };
      }

      module.exports.setGlobalDispatcher = setGlobalDispatcher;
      module.exports.getGlobalDispatcher = getGlobalDispatcher;
      module.exports.request = makeDispatcher(api.request);
      module.exports.stream = makeDispatcher(api.stream);
      module.exports.pipeline = makeDispatcher(api.pipeline);
      module.exports.connect = makeDispatcher(api.connect);
      module.exports.upgrade = makeDispatcher(api.upgrade);
      module.exports.MockClient = MockClient;
      module.exports.MockPool = MockPool;
      module.exports.MockAgent = MockAgent;
      module.exports.mockErrors = mockErrors;
      /***/
    },

    /***/
    7890:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const {
        ClientClosedError,
        InvalidArgumentError,
        ClientDestroyedError
      } = __webpack_require__(8045);

      const {
        kClients,
        kRunning
      } = __webpack_require__(2785);

      const Dispatcher = __webpack_require__(412);

      const Pool = __webpack_require__(4634);

      const Client = __webpack_require__(3598);

      const util = __webpack_require__(3983);

      const assert = __webpack_require__(2357);

      const RedirectHandler = __webpack_require__(751);

      const {
        WeakRef,
        FinalizationRegistry
      } = __webpack_require__(6436)();

      const kDestroyed = Symbol('destroyed');
      const kClosed = Symbol('closed');
      const kOnConnect = Symbol('onConnect');
      const kOnDisconnect = Symbol('onDisconnect');
      const kMaxRedirections = Symbol('maxRedirections');
      const kOnDrain = Symbol('onDrain');
      const kFactory = Symbol('factory');
      const kFinalizer = Symbol('finalizer');
      const kOptions = Symbol('options');

      function defaultFactory(origin, opts) {
        return opts && opts.connections === 1 ? new Client(origin, opts) : new Pool(origin, opts);
      }

      class Agent extends Dispatcher {
        constructor({
          factory = defaultFactory,
          maxRedirections = 0,
          ...options
        } = {}) {
          super();

          if (typeof factory !== 'function') {
            throw new InvalidArgumentError('factory must be a function.');
          }

          if (!Number.isInteger(maxRedirections) || maxRedirections < 0) {
            throw new InvalidArgumentError('maxRedirections must be a positive number');
          }

          this[kOptions] = JSON.parse(JSON.stringify(options));
          this[kMaxRedirections] = maxRedirections;
          this[kFactory] = factory;
          this[kClients] = new Map();
          this[kFinalizer] = new FinalizationRegistry(
          /* istanbul ignore next: gc is undeterministic */
          key => {
            const ref = this[kClients].get(key);

            if (ref !== undefined && ref.deref() === undefined) {
              this[kClients].delete(key);
            }
          });
          this[kClosed] = false;
          this[kDestroyed] = false;
          const agent = this;

          this[kOnDrain] = (origin, targets) => {
            agent.emit('drain', origin, [agent, ...targets]);
          };

          this[kOnConnect] = (origin, targets) => {
            agent.emit('connect', origin, [agent, ...targets]);
          };

          this[kOnDisconnect] = (origin, targets, err) => {
            agent.emit('disconnect', origin, [agent, ...targets], err);
          };
        }

        get [kRunning]() {
          let ret = 0;

          for (const ref of this[kClients].values()) {
            const client = ref.deref();

            if (client) {
              ret += client[kRunning];
            }
          }

          return ret;
        }

        dispatch(opts, handler) {
          if (!handler || typeof handler !== 'object') {
            throw new InvalidArgumentError('handler');
          }

          try {
            if (!opts || typeof opts !== 'object') {
              throw new InvalidArgumentError('opts must be a object.');
            }

            if (typeof opts.origin !== 'string' || opts.origin === '') {
              throw new InvalidArgumentError('opts.origin must be a non-empty string.');
            }

            if (this[kDestroyed]) {
              throw new ClientDestroyedError();
            }

            if (this[kClosed]) {
              throw new ClientClosedError();
            }

            const ref = this[kClients].get(opts.origin);
            let dispatcher = ref ? ref.deref() : null;

            if (!dispatcher) {
              dispatcher = this[kFactory](opts.origin, this[kOptions]).on('connect', this[kOnConnect]).on('disconnect', this[kOnDisconnect]).on('drain', this[kOnDrain]);
              this[kClients].set(opts.origin, new WeakRef(dispatcher));
              this[kFinalizer].register(dispatcher, opts.origin);
            }

            const {
              maxRedirections = this[kMaxRedirections]
            } = opts;

            if (maxRedirections != null && (!Number.isInteger(maxRedirections) || maxRedirections < 0)) {
              throw new InvalidArgumentError('maxRedirections must be a positive number');
            }

            if (!maxRedirections) {
              return dispatcher.dispatch(opts, handler);
            }

            if (util.isStream(opts.body) && util.bodyLength(opts.body) !== 0) {
              // TODO (fix): Provide some way for the user to cache the file to e.g. /tmp
              // so that it can be dispatched again?
              // TODO (fix): Do we need 100-expect support to provide a way to do this properly?
              return dispatcher.dispatch(opts, handler);
            }
            /* istanbul ignore next */


            if (util.isStream(opts.body)) {
              opts.body.on('data', function () {
                assert(false);
              });
            }

            return dispatcher.dispatch(opts, new RedirectHandler(this, opts, handler));
          } catch (err) {
            if (typeof handler.onError !== 'function') {
              throw new InvalidArgumentError('invalid onError method');
            }

            handler.onError(err);
          }
        }

        get closed() {
          return this[kClosed];
        }

        get destroyed() {
          return this[kDestroyed];
        }

        close(callback) {
          if (callback != null && typeof callback !== 'function') {
            throw new InvalidArgumentError('callback must be a function');
          }

          this[kClosed] = true;
          const closePromises = [];

          for (const ref of this[kClients].values()) {
            const client = ref.deref();
            /* istanbul ignore else: gc is undeterministic */

            if (client) {
              closePromises.push(client.close());
            }
          }

          if (!callback) {
            return Promise.all(closePromises);
          } // Should never error.


          Promise.all(closePromises).then(() => process.nextTick(callback));
        }

        destroy(err, callback) {
          if (typeof err === 'function') {
            callback = err;
            err = null;
          }

          if (callback != null && typeof callback !== 'function') {
            throw new InvalidArgumentError('callback must be a function');
          }

          this[kClosed] = true;
          this[kDestroyed] = true;
          const destroyPromises = [];

          for (const ref of this[kClients].values()) {
            const client = ref.deref();
            /* istanbul ignore else: gc is undeterministic */

            if (client) {
              destroyPromises.push(client.destroy(err));
            }
          }

          if (!callback) {
            return Promise.all(destroyPromises);
          } // Should never error.


          Promise.all(destroyPromises).then(() => process.nextTick(callback));
        }

      }

      module.exports = Agent;
      /***/
    },

    /***/
    7032:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      const {
        RequestAbortedError
      } = __webpack_require__(8045);

      const kListener = Symbol('kListener');
      const kSignal = Symbol('kSignal');

      function abort(self) {
        if (self.abort) {
          self.abort();
        } else {
          self.onError(new RequestAbortedError());
        }
      }

      function addSignal(self, signal) {
        self[kSignal] = null;
        self[kListener] = null;

        if (!signal) {
          return;
        }

        if (signal.aborted) {
          abort(self);
          return;
        }

        self[kSignal] = signal;

        self[kListener] = () => {
          abort(self);
        };

        if ('addEventListener' in self[kSignal]) {
          self[kSignal].addEventListener('abort', self[kListener]);
        } else {
          self[kSignal].addListener('abort', self[kListener]);
        }
      }

      function removeSignal(self) {
        if (!self[kSignal]) {
          return;
        }

        if ('removeEventListener' in self[kSignal]) {
          self[kSignal].removeEventListener('abort', self[kListener]);
        } else {
          self[kSignal].removeListener('abort', self[kListener]);
        }

        self[kSignal] = null;
        self[kListener] = null;
      }

      module.exports = {
        addSignal,
        removeSignal
      };
      /***/
    },

    /***/
    9744:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const {
        InvalidArgumentError,
        RequestAbortedError,
        SocketError
      } = __webpack_require__(8045);

      const {
        AsyncResource
      } = __webpack_require__(7303);

      const util = __webpack_require__(3983);

      const {
        addSignal,
        removeSignal
      } = __webpack_require__(7032);

      class ConnectHandler extends AsyncResource {
        constructor(opts, callback) {
          if (!opts || typeof opts !== 'object') {
            throw new InvalidArgumentError('invalid opts');
          }

          if (typeof callback !== 'function') {
            throw new InvalidArgumentError('invalid callback');
          }

          const {
            signal,
            opaque
          } = opts;

          if (signal && typeof signal.on !== 'function' && typeof signal.addEventListener !== 'function') {
            throw new InvalidArgumentError('signal must be an EventEmitter or EventTarget');
          }

          super('UNDICI_CONNECT');
          this.opaque = opaque || null;
          this.callback = callback;
          this.abort = null;
          addSignal(this, signal);
        }

        onConnect(abort, context) {
          if (!this.callback) {
            throw new RequestAbortedError();
          }

          this.abort = abort;
          this.context = context;
        }

        onHeaders() {
          throw new SocketError('bad connect');
        }

        onUpgrade(statusCode, headers, socket) {
          const {
            callback,
            opaque,
            context
          } = this;
          removeSignal(this);
          this.callback = null;
          this.runInAsyncScope(callback, null, null, {
            statusCode,
            headers: util.parseHeaders(headers),
            socket,
            opaque,
            context
          });
        }

        onError(err) {
          const {
            callback,
            opaque
          } = this;
          removeSignal(this);

          if (callback) {
            this.callback = null;
            queueMicrotask(() => {
              this.runInAsyncScope(callback, null, err, {
                opaque
              });
            });
          }
        }

      }

      function connect(opts, callback) {
        if (callback === undefined) {
          return new Promise((resolve, reject) => {
            connect.call(this, opts, (err, data) => {
              return err ? reject(err) : resolve(data);
            });
          });
        }

        try {
          const connectHandler = new ConnectHandler(opts, callback);
          this.dispatch({ ...opts,
            method: 'CONNECT'
          }, connectHandler);
        } catch (err) {
          if (typeof callback !== 'function') {
            throw err;
          }

          const opaque = opts && opts.opaque;
          queueMicrotask(() => callback(err, {
            opaque
          }));
        }
      }

      module.exports = connect;
      /***/
    },

    /***/
    8752:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const {
        Readable,
        Duplex,
        PassThrough
      } = __webpack_require__(2413);

      const {
        InvalidArgumentError,
        InvalidReturnValueError,
        RequestAbortedError
      } = __webpack_require__(8045);

      const util = __webpack_require__(3983);

      const {
        AsyncResource
      } = __webpack_require__(7303);

      const {
        assert
      } = __webpack_require__(7082);

      const {
        addSignal,
        removeSignal
      } = __webpack_require__(7032);

      const kResume = Symbol('resume');

      class PipelineRequest extends Readable {
        constructor() {
          super({
            autoDestroy: true
          });
          this[kResume] = null;
        }

        _read() {
          const {
            [kResume]: resume
          } = this;

          if (resume) {
            this[kResume] = null;
            resume();
          }
        }

        _destroy(err, callback) {
          this._read();

          callback(err);
        }

      }

      class PipelineResponse extends Readable {
        constructor(resume) {
          super({
            autoDestroy: true
          });
          this[kResume] = resume;
        }

        _read() {
          this[kResume]();
        }

        _destroy(err, callback) {
          if (!err && !this._readableState.endEmitted) {
            err = new RequestAbortedError();
          }

          callback(err);
        }

      }

      class PipelineHandler extends AsyncResource {
        constructor(opts, handler) {
          if (!opts || typeof opts !== 'object') {
            throw new InvalidArgumentError('invalid opts');
          }

          if (typeof handler !== 'function') {
            throw new InvalidArgumentError('invalid handler');
          }

          const {
            signal,
            method,
            opaque
          } = opts;

          if (signal && typeof signal.on !== 'function' && typeof signal.addEventListener !== 'function') {
            throw new InvalidArgumentError('signal must be an EventEmitter or EventTarget');
          }

          if (method === 'CONNECT') {
            throw new InvalidArgumentError('invalid method');
          }

          super('UNDICI_PIPELINE');
          this.opaque = opaque || null;
          this.handler = handler;
          this.abort = null;
          this.context = null;
          this.req = new PipelineRequest().on('error', util.nop);
          this.ret = new Duplex({
            readableObjectMode: opts.objectMode,
            autoDestroy: true,
            read: () => {
              const {
                body
              } = this;

              if (body && body.resume) {
                body.resume();
              }
            },
            write: (chunk, encoding, callback) => {
              const {
                req
              } = this;

              if (req.push(chunk, encoding) || req._readableState.destroyed) {
                callback();
              } else {
                req[kResume] = callback;
              }
            },
            destroy: (err, callback) => {
              const {
                body,
                req,
                res,
                ret,
                abort
              } = this;

              if (!err && !ret._readableState.endEmitted) {
                err = new RequestAbortedError();
              }

              if (abort && err) {
                abort();
              }

              util.destroy(body, err);
              util.destroy(req, err);
              util.destroy(res, err);
              removeSignal(this);
              callback(err);
            }
          }).on('prefinish', () => {
            const {
              req
            } = this; // Node < 15 does not call _final in same tick.

            req.push(null);
          });
          this.res = null;
          addSignal(this, signal);
        }

        onConnect(abort, context) {
          const {
            ret,
            res
          } = this;
          assert(!res, 'pipeline cannot be retried');

          if (ret.destroyed) {
            throw new RequestAbortedError();
          }

          this.abort = abort;
          this.context = context;
        }

        onHeaders(statusCode, headers, resume) {
          const {
            opaque,
            handler,
            context
          } = this;

          if (statusCode < 200) {
            return;
          }

          this.res = new PipelineResponse(resume);
          let body;

          try {
            this.handler = null;
            body = this.runInAsyncScope(handler, null, {
              statusCode,
              headers: util.parseHeaders(headers),
              opaque,
              body: this.res,
              context
            });
          } catch (err) {
            this.res.on('error', util.nop);
            throw err;
          }

          if (!body || typeof body.on !== 'function') {
            throw new InvalidReturnValueError('expected Readable');
          }

          body.on('data', chunk => {
            const {
              ret,
              body
            } = this;

            if (!ret.push(chunk) && body.pause) {
              body.pause();
            }
          }).on('error', err => {
            const {
              ret
            } = this;
            util.destroy(ret, err);
          }).on('end', () => {
            const {
              ret
            } = this;
            ret.push(null);
          }).on('close', () => {
            const {
              ret
            } = this;

            if (!ret._readableState.ended) {
              util.destroy(ret, new RequestAbortedError());
            }
          });
          this.body = body;
        }

        onData(chunk) {
          const {
            res
          } = this;
          return res.push(chunk);
        }

        onComplete(trailers) {
          const {
            res
          } = this;
          res.push(null);
        }

        onError(err) {
          const {
            ret
          } = this;
          this.handler = null;
          util.destroy(ret, err);
        }

      }

      function pipeline(opts, handler) {
        try {
          const pipelineHandler = new PipelineHandler(opts, handler);
          this.dispatch({ ...opts,
            body: pipelineHandler.req
          }, pipelineHandler);
          return pipelineHandler.ret;
        } catch (err) {
          return new PassThrough().destroy(err);
        }
      }

      module.exports = pipeline;
      /***/
    },

    /***/
    5448:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const {
        Readable
      } = __webpack_require__(2413);

      const {
        InvalidArgumentError,
        RequestAbortedError
      } = __webpack_require__(8045);

      const util = __webpack_require__(3983);

      const {
        AsyncResource
      } = __webpack_require__(7303);

      const {
        addSignal,
        removeSignal
      } = __webpack_require__(7032);

      const kAbort = Symbol('abort');

      class RequestResponse extends Readable {
        constructor(resume, abort) {
          super({
            autoDestroy: true,
            read: resume
          });
          this[kAbort] = abort;
        }

        _destroy(err, callback) {
          if (!err && !this._readableState.endEmitted) {
            err = new RequestAbortedError();
          }

          if (err) {
            this[kAbort]();
          }

          callback(err);
        }

      }

      class RequestHandler extends AsyncResource {
        constructor(opts, callback) {
          if (!opts || typeof opts !== 'object') {
            throw new InvalidArgumentError('invalid opts');
          }

          const {
            signal,
            method,
            opaque,
            body
          } = opts;

          try {
            if (typeof callback !== 'function') {
              throw new InvalidArgumentError('invalid callback');
            }

            if (signal && typeof signal.on !== 'function' && typeof signal.addEventListener !== 'function') {
              throw new InvalidArgumentError('signal must be an EventEmitter or EventTarget');
            }

            if (method === 'CONNECT') {
              throw new InvalidArgumentError('invalid method');
            }

            super('UNDICI_REQUEST');
          } catch (err) {
            if (util.isStream(body)) {
              util.destroy(body.on('error', util.nop), err);
            }

            throw err;
          }

          this.opaque = opaque || null;
          this.callback = callback;
          this.res = null;
          this.abort = null;
          this.body = body;
          this.trailers = {};
          this.context = null;

          if (util.isStream(body)) {
            body.on('error', err => {
              this.onError(err);
            });
          }

          addSignal(this, signal);
        }

        onConnect(abort, context) {
          if (!this.callback) {
            throw new RequestAbortedError();
          }

          this.abort = abort;
          this.context = context;
        }

        onHeaders(statusCode, headers, resume) {
          const {
            callback,
            opaque,
            abort,
            context
          } = this;

          if (statusCode < 200) {
            return;
          }

          const body = new RequestResponse(resume, abort);
          this.callback = null;
          this.res = body;
          this.runInAsyncScope(callback, null, null, {
            statusCode,
            headers: util.parseHeaders(headers),
            trailers: this.trailers,
            opaque,
            body,
            context
          });
        }

        onData(chunk) {
          const {
            res
          } = this;
          return res.push(chunk);
        }

        onComplete(trailers) {
          const {
            res
          } = this;
          removeSignal(this);

          if (trailers) {
            util.parseHeaders(trailers, this.trailers);
          }

          res.push(null);
        }

        onError(err) {
          const {
            res,
            callback,
            body,
            opaque
          } = this;
          removeSignal(this);

          if (callback) {
            // TODO: Does this need queueMicrotask?
            this.callback = null;
            queueMicrotask(() => {
              this.runInAsyncScope(callback, null, err, {
                opaque
              });
            });
          }

          if (res) {
            this.res = null; // Ensure all queued handlers are invoked before destroying res.

            queueMicrotask(() => {
              util.destroy(res, err);
            });
          }

          if (body) {
            this.body = null;
            util.destroy(body, err);
          }
        }

      }

      function request(opts, callback) {
        if (callback === undefined) {
          return new Promise((resolve, reject) => {
            request.call(this, opts, (err, data) => {
              return err ? reject(err) : resolve(data);
            });
          });
        }

        try {
          this.dispatch(opts, new RequestHandler(opts, callback));
        } catch (err) {
          if (typeof callback !== 'function') {
            throw err;
          }

          const opaque = opts && opts.opaque;
          queueMicrotask(() => callback(err, {
            opaque
          }));
        }
      }

      module.exports = request;
      /***/
    },

    /***/
    5395:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const {
        finished
      } = __webpack_require__(2413);

      const {
        InvalidArgumentError,
        InvalidReturnValueError,
        RequestAbortedError
      } = __webpack_require__(8045);

      const util = __webpack_require__(3983);

      const {
        AsyncResource
      } = __webpack_require__(7303);

      const {
        addSignal,
        removeSignal
      } = __webpack_require__(7032);

      class StreamHandler extends AsyncResource {
        constructor(opts, factory, callback) {
          if (!opts || typeof opts !== 'object') {
            throw new InvalidArgumentError('invalid opts');
          }

          const {
            signal,
            method,
            opaque,
            body
          } = opts;

          try {
            if (typeof callback !== 'function') {
              throw new InvalidArgumentError('invalid callback');
            }

            if (typeof factory !== 'function') {
              throw new InvalidArgumentError('invalid factory');
            }

            if (signal && typeof signal.on !== 'function' && typeof signal.addEventListener !== 'function') {
              throw new InvalidArgumentError('signal must be an EventEmitter or EventTarget');
            }

            if (method === 'CONNECT') {
              throw new InvalidArgumentError('invalid method');
            }

            super('UNDICI_STREAM');
          } catch (err) {
            if (util.isStream(body)) {
              util.destroy(body.on('error', util.nop), err);
            }

            throw err;
          }

          this.opaque = opaque || null;
          this.factory = factory;
          this.callback = callback;
          this.res = null;
          this.abort = null;
          this.context = null;
          this.trailers = null;
          this.body = body;

          if (util.isStream(body)) {
            body.on('error', err => {
              this.onError(err);
            });
          }

          addSignal(this, signal);
        }

        onConnect(abort, context) {
          if (!this.callback) {
            throw new RequestAbortedError();
          }

          this.abort = abort;
          this.context = context;
        }

        onHeaders(statusCode, headers, resume) {
          const {
            factory,
            opaque,
            context
          } = this;

          if (statusCode < 200) {
            return;
          }

          this.factory = null;
          const res = this.runInAsyncScope(factory, null, {
            statusCode,
            headers: util.parseHeaders(headers),
            opaque,
            context
          });

          if (!res || typeof res.write !== 'function' || typeof res.end !== 'function' || typeof res.on !== 'function') {
            throw new InvalidReturnValueError('expected Writable');
          }

          res.on('drain', resume); // TODO: Avoid finished. It registers an unecessary amount of listeners.

          finished(res, {
            readable: false
          }, err => {
            const {
              callback,
              res,
              opaque,
              trailers,
              abort
            } = this;
            this.res = null;

            if (err || !res.readable) {
              util.destroy(res, err);
            }

            this.callback = null;
            this.runInAsyncScope(callback, null, err || null, {
              opaque,
              trailers
            });

            if (err) {
              abort();
            }
          });
          this.res = res;
          const needDrain = res.writableNeedDrain !== undefined ? res.writableNeedDrain : res._writableState && res._writableState.needDrain;
          return needDrain !== true;
        }

        onData(chunk) {
          const {
            res
          } = this;
          return res.write(chunk);
        }

        onComplete(trailers) {
          const {
            res
          } = this;
          removeSignal(this);
          this.trailers = trailers ? util.parseHeaders(trailers) : {};
          res.end();
        }

        onError(err) {
          const {
            res,
            callback,
            opaque,
            body
          } = this;
          removeSignal(this);
          this.factory = null;

          if (res) {
            this.res = null;
            util.destroy(res, err);
          } else if (callback) {
            this.callback = null;
            queueMicrotask(() => {
              this.runInAsyncScope(callback, null, err, {
                opaque
              });
            });
          }

          if (body) {
            this.body = null;
            util.destroy(body, err);
          }
        }

      }

      function stream(opts, factory, callback) {
        if (callback === undefined) {
          return new Promise((resolve, reject) => {
            stream.call(this, opts, factory, (err, data) => {
              return err ? reject(err) : resolve(data);
            });
          });
        }

        try {
          this.dispatch(opts, new StreamHandler(opts, factory, callback));
        } catch (err) {
          if (typeof callback !== 'function') {
            throw err;
          }

          const opaque = opts && opts.opaque;
          queueMicrotask(() => callback(err, {
            opaque
          }));
        }
      }

      module.exports = stream;
      /***/
    },

    /***/
    6923:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const {
        InvalidArgumentError,
        RequestAbortedError,
        SocketError
      } = __webpack_require__(8045);

      const {
        AsyncResource
      } = __webpack_require__(7303);

      const util = __webpack_require__(3983);

      const {
        addSignal,
        removeSignal
      } = __webpack_require__(7032);

      const assert = __webpack_require__(2357);

      class UpgradeHandler extends AsyncResource {
        constructor(opts, callback) {
          if (!opts || typeof opts !== 'object') {
            throw new InvalidArgumentError('invalid opts');
          }

          if (typeof callback !== 'function') {
            throw new InvalidArgumentError('invalid callback');
          }

          const {
            signal,
            opaque
          } = opts;

          if (signal && typeof signal.on !== 'function' && typeof signal.addEventListener !== 'function') {
            throw new InvalidArgumentError('signal must be an EventEmitter or EventTarget');
          }

          super('UNDICI_UPGRADE');
          this.opaque = opaque || null;
          this.callback = callback;
          this.abort = null;
          this.context = null;
          addSignal(this, signal);
        }

        onConnect(abort, context) {
          if (!this.callback) {
            throw new RequestAbortedError();
          }

          this.abort = abort;
          this.context = null;
        }

        onHeaders() {
          throw new SocketError('bad upgrade');
        }

        onUpgrade(statusCode, headers, socket) {
          const {
            callback,
            opaque,
            context
          } = this;
          assert.strictEqual(statusCode, 101);
          removeSignal(this);
          this.callback = null;
          this.runInAsyncScope(callback, null, null, {
            headers: util.parseHeaders(headers),
            socket,
            opaque,
            context
          });
        }

        onError(err) {
          const {
            callback,
            opaque
          } = this;
          removeSignal(this);

          if (callback) {
            this.callback = null;
            queueMicrotask(() => {
              this.runInAsyncScope(callback, null, err, {
                opaque
              });
            });
          }
        }

      }

      function upgrade(opts, callback) {
        if (callback === undefined) {
          return new Promise((resolve, reject) => {
            upgrade.call(this, opts, (err, data) => {
              return err ? reject(err) : resolve(data);
            });
          });
        }

        try {
          const upgradeHandler = new UpgradeHandler(opts, callback);
          this.dispatch({ ...opts,
            method: opts.method || 'GET',
            upgrade: opts.protocol || 'Websocket'
          }, upgradeHandler);
        } catch (err) {
          if (typeof callback !== 'function') {
            throw err;
          }

          const opaque = opts && opts.opaque;
          queueMicrotask(() => callback(err, {
            opaque
          }));
        }
      }

      module.exports = upgrade;
      /***/
    },

    /***/
    4059:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      module.exports.request = __webpack_require__(5448);
      module.exports.stream = __webpack_require__(5395);
      module.exports.pipeline = __webpack_require__(8752);
      module.exports.upgrade = __webpack_require__(6923);
      module.exports.connect = __webpack_require__(9744);
      /***/
    },

    /***/
    3598:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      /* global WebAssembly */

      const assert = __webpack_require__(2357);

      const net = __webpack_require__(1631);

      const util = __webpack_require__(3983);

      const Request = __webpack_require__(2905);

      const Dispatcher = __webpack_require__(412);

      const {
        RequestContentLengthMismatchError,
        ResponseContentLengthMismatchError,
        TrailerMismatchError,
        InvalidArgumentError,
        RequestAbortedError,
        HeadersTimeoutError,
        HeadersOverflowError,
        ClientDestroyedError,
        ClientClosedError,
        ConnectTimeoutError,
        SocketError,
        InformationalError,
        BodyTimeoutError,
        HTTPParserError
      } = __webpack_require__(8045);

      const makeConnect = __webpack_require__(2067);

      const {
        kUrl,
        kReset,
        kServerName,
        kClient,
        kBusy,
        kParser,
        kConnect,
        kResuming,
        kRunning,
        kPending,
        kSize,
        kWriting,
        kQueue,
        kConnected,
        kConnecting,
        kNeedDrain,
        kNoRef,
        kConnectTimeoutValue,
        kKeepAliveDefaultTimeout,
        kHostHeader,
        kClosed,
        kDestroyed,
        kPendingIdx,
        kRunningIdx,
        kError,
        kOnDestroyed,
        kPipelining,
        kSocket,
        kKeepAliveTimeoutValue,
        kMaxHeadersSize,
        kKeepAliveMaxTimeout,
        kKeepAliveTimeoutThreshold,
        kHeadersTimeout,
        kBodyTimeout,
        kStrictContentLength,
        kConnector
      } = __webpack_require__(2785);

      class Client extends Dispatcher {
        constructor(url, {
          maxHeaderSize,
          headersTimeout,
          socketTimeout,
          requestTimeout,
          connectTimeout,
          bodyTimeout,
          idleTimeout,
          keepAlive,
          keepAliveTimeout,
          maxKeepAliveTimeout,
          keepAliveMaxTimeout,
          keepAliveTimeoutThreshold,
          socketPath,
          pipelining,
          tls,
          strictContentLength,
          maxCachedSessions,
          [kConnect]: connect
        } = {}) {
          super();

          if (keepAlive !== undefined) {
            throw new InvalidArgumentError('unsupported keepAlive, use pipelining=0 instead');
          }

          if (socketTimeout !== undefined) {
            throw new InvalidArgumentError('unsupported socketTimeout, use headersTimeout & bodyTimeout instead');
          }

          if (requestTimeout !== undefined) {
            throw new InvalidArgumentError('unsupported requestTimeout, use headersTimeout & bodyTimeout instead');
          }

          if (idleTimeout !== undefined) {
            throw new InvalidArgumentError('unsupported idleTimeout, use keepAliveTimeout instead');
          }

          if (maxKeepAliveTimeout !== undefined) {
            throw new InvalidArgumentError('unsupported maxKeepAliveTimeout, use keepAliveMaxTimeout instead');
          }

          if (maxHeaderSize != null && !Number.isFinite(maxHeaderSize)) {
            throw new InvalidArgumentError('invalid maxHeaderSize');
          }

          if (socketPath != null && typeof socketPath !== 'string') {
            throw new InvalidArgumentError('invalid socketPath');
          }

          if (connectTimeout != null && (!Number.isFinite(connectTimeout) || connectTimeout < 0)) {
            throw new InvalidArgumentError('invalid connectTimeout');
          }

          if (keepAliveTimeout != null && (!Number.isFinite(keepAliveTimeout) || keepAliveTimeout <= 0)) {
            throw new InvalidArgumentError('invalid keepAliveTimeout');
          }

          if (keepAliveMaxTimeout != null && (!Number.isFinite(keepAliveMaxTimeout) || keepAliveMaxTimeout <= 0)) {
            throw new InvalidArgumentError('invalid keepAliveMaxTimeout');
          }

          if (keepAliveTimeoutThreshold != null && !Number.isFinite(keepAliveTimeoutThreshold)) {
            throw new InvalidArgumentError('invalid keepAliveTimeoutThreshold');
          }

          if (headersTimeout != null && (!Number.isInteger(headersTimeout) || headersTimeout < 0)) {
            throw new InvalidArgumentError('headersTimeout must be a positive integer or zero');
          }

          if (bodyTimeout != null && (!Number.isInteger(bodyTimeout) || bodyTimeout < 0)) {
            throw new InvalidArgumentError('bodyTimeout must be a positive integer or zero');
          }

          if (connect != null && typeof connect !== 'function') {
            throw new InvalidArgumentError('connect must be a function');
          }

          this[kUrl] = util.parseOrigin(url);
          this[kConnector] = connect || makeConnect({
            tls,
            socketPath,
            maxCachedSessions
          });
          this[kSocket] = null;
          this[kPipelining] = pipelining != null ? pipelining : 1;
          this[kMaxHeadersSize] = maxHeaderSize || 16384;
          this[kConnectTimeoutValue] = connectTimeout == null ? 10e3 : connectTimeout;
          this[kKeepAliveDefaultTimeout] = keepAliveTimeout == null ? 4e3 : keepAliveTimeout;
          this[kKeepAliveMaxTimeout] = keepAliveMaxTimeout == null ? 600e3 : keepAliveMaxTimeout;
          this[kKeepAliveTimeoutThreshold] = keepAliveTimeoutThreshold == null ? 1e3 : keepAliveTimeoutThreshold;
          this[kKeepAliveTimeoutValue] = this[kKeepAliveDefaultTimeout];
          this[kClosed] = false;
          this[kDestroyed] = false;
          this[kServerName] = null;
          this[kOnDestroyed] = [];
          this[kResuming] = 0; // 0, idle, 1, scheduled, 2 resuming

          this[kNeedDrain] = 0; // 0, idle, 1, scheduled, 2 resuming

          this[kHostHeader] = `host: ${this[kUrl].hostname}${this[kUrl].port ? `:${this[kUrl].port}` : ''}\r\n`;
          this[kBodyTimeout] = bodyTimeout != null ? bodyTimeout : 30e3;
          this[kHeadersTimeout] = headersTimeout != null ? headersTimeout : 30e3;
          this[kStrictContentLength] = strictContentLength == null ? true : strictContentLength; // kQueue is built up of 3 sections separated by
          // the kRunningIdx and kPendingIdx indices.
          // |   complete   |   running   |   pending   |
          //                ^ kRunningIdx ^ kPendingIdx ^ kQueue.length
          // kRunningIdx points to the first running element.
          // kPendingIdx points to the first pending element.
          // This implements a fast queue with an amortized
          // time of O(1).

          this[kQueue] = [];
          this[kRunningIdx] = 0;
          this[kPendingIdx] = 0;
        } // TODO: Make private?


        get pipelining() {
          return this[kPipelining];
        } // TODO: Make private?


        set pipelining(value) {
          this[kPipelining] = value;
          resume(this, true);
        }

        get destroyed() {
          return this[kDestroyed];
        }

        get closed() {
          return this[kClosed];
        }

        get [kPending]() {
          return this[kQueue].length - this[kPendingIdx];
        }

        get [kRunning]() {
          return this[kPendingIdx] - this[kRunningIdx];
        }

        get [kSize]() {
          return this[kQueue].length - this[kRunningIdx];
        }

        get [kConnected]() {
          return !!this[kSocket] && !this[kSocket][kConnecting] && !this[kSocket].destroyed;
        }

        get [kBusy]() {
          const socket = this[kSocket];
          return socket && (socket[kReset] || socket[kWriting]) || this[kSize] >= (this[kPipelining] || 1) || this[kPending] > 0;
        }
        /* istanbul ignore: only used for test */


        [kConnect](cb) {
          connect(this);
          this.once('connect', cb);
        }

        dispatch(opts, handler) {
          if (!handler || typeof handler !== 'object') {
            throw new InvalidArgumentError('handler');
          }

          try {
            const request = new Request(opts, handler);

            if (this[kDestroyed]) {
              throw new ClientDestroyedError();
            }

            if (this[kClosed]) {
              throw new ClientClosedError();
            }

            this[kQueue].push(request);

            if (this[kResuming]) {// Do nothing.
            } else if (util.isStream(request.body)) {
              // Wait a tick in case stream is ended in the same tick.
              this[kResuming] = 1;
              process.nextTick(resume, this);
            } else {
              resume(this, true);
            }

            if (this[kResuming] && this[kNeedDrain] !== 2 && this[kBusy]) {
              this[kNeedDrain] = 2;
            }
          } catch (err) {
            if (typeof handler.onError !== 'function') {
              throw new InvalidArgumentError('invalid onError method');
            }

            handler.onError(err);
          }

          return this[kNeedDrain] < 2;
        }

        close(callback) {
          if (callback === undefined) {
            return new Promise((resolve, reject) => {
              this.close((err, data) => {
                return err ? reject(err) : resolve(data);
              });
            });
          }

          if (typeof callback !== 'function') {
            throw new InvalidArgumentError('invalid callback');
          }

          if (this[kDestroyed]) {
            queueMicrotask(() => callback(new ClientDestroyedError(), null));
            return;
          }

          this[kClosed] = true;

          if (!this[kSize]) {
            this.destroy(callback);
          } else {
            this[kOnDestroyed].push(callback);
          }
        }

        destroy(err, callback) {
          if (typeof err === 'function') {
            callback = err;
            err = null;
          }

          if (callback === undefined) {
            return new Promise((resolve, reject) => {
              this.destroy(err, (err, data) => {
                return err ?
                /* istanbul ignore next: should never error */
                reject(err) : resolve(data);
              });
            });
          }

          if (typeof callback !== 'function') {
            throw new InvalidArgumentError('invalid callback');
          }

          if (this[kDestroyed]) {
            if (this[kOnDestroyed]) {
              this[kOnDestroyed].push(callback);
            } else {
              queueMicrotask(() => callback(null, null));
            }

            return;
          }

          if (!err) {
            err = new ClientDestroyedError();
          }

          const requests = this[kQueue].splice(this[kPendingIdx]);

          for (let i = 0; i < requests.length; i++) {
            const request = requests[i];
            errorRequest(this, request, err);
          }

          this[kClosed] = true;
          this[kDestroyed] = true;
          this[kOnDestroyed].push(callback);

          const onDestroyed = () => {
            const callbacks = this[kOnDestroyed];
            this[kOnDestroyed] = null;

            for (let i = 0; i < callbacks.length; i++) {
              callbacks[i](null, null);
            }
          };

          if (!this[kSocket]) {
            queueMicrotask(onDestroyed);
          } else {
            util.destroy(this[kSocket].on('close', onDestroyed), err);
          }

          resume(this);
        }

      }

      let mod, build;

      const {
        resolve
      } = __webpack_require__(5622);

      const {
        readFileSync
      } = __webpack_require__(5747);

      const constants = __webpack_require__(953);

      const EMPTY_BUF = Buffer.alloc(0);

      try {
        build = __webpack_require__.ab + "llhttp_simd.wasm";
        const bin = readFileSync(__webpack_require__.ab + "llhttp_simd.wasm");
        mod = new WebAssembly.Module(bin);
      } catch (e) {
        // We could check if the error was caused by the simd option not
        // being enabled, but the occurring of this other error
        // * https://github.com/emscripten-core/emscripten/issues/11495
        // got me to remove that check to avoid breaking Node 12.
        build = __webpack_require__.ab + "llhttp.wasm";
        const bin = readFileSync(__webpack_require__.ab + "llhttp.wasm");
        mod = new WebAssembly.Module(bin);
      }

      const llhttp = new WebAssembly.Instance(mod, {
        env: {
          /* eslint-disable camelcase */
          wasm_on_message_begin: p => {
            assert.strictEqual(currentParser.ptr, p);
            return currentParser.onMessageBegin() || 0;
          },
          wasm_on_header_field: (p, at, len) => {
            assert.strictEqual(currentParser.ptr, p);
            const start = at - currentBufferPtr;
            const end = start + len;
            return currentParser.onHeaderField(currentBufferRef.slice(start, end)) || 0;
          },
          wasm_on_header_value: (p, at, len) => {
            assert.strictEqual(currentParser.ptr, p);
            const start = at - currentBufferPtr;
            const end = start + len;
            return currentParser.onHeaderValue(currentBufferRef.slice(start, end)) || 0;
          },
          wasm_on_headers_complete: (p, statusCode, upgrade, shouldKeepAlive) => {
            assert.strictEqual(currentParser.ptr, p);
            return currentParser.onHeadersComplete(statusCode, Boolean(upgrade), Boolean(shouldKeepAlive)) || 0;
          },
          wasm_on_body: (p, at, len) => {
            assert.strictEqual(currentParser.ptr, p);
            const start = at - currentBufferPtr;
            const end = start + len;
            return currentParser.onBody(currentBufferRef.slice(start, end)) || 0;
          },
          wasm_on_message_complete: p => {
            assert.strictEqual(currentParser.ptr, p);
            return currentParser.onMessageComplete() || 0;
          }
          /* eslint-enable camelcase */

        }
      });
      let currentParser = null;
      let currentBufferRef = null;
      let currentBufferSize = 16384;
      let currentBufferPtr = llhttp.exports.malloc(currentBufferSize);
      const TIMEOUT_HEADERS = 1;
      const TIMEOUT_BODY = 2;
      const TIMEOUT_IDLE = 3;
      const TIMEOUT_CONNECT = 4;

      class Parser {
        constructor(client, socket) {
          assert(Number.isFinite(client[kMaxHeadersSize]) && client[kMaxHeadersSize] > 0);
          this.ptr = llhttp.exports.llhttp_alloc(constants.TYPE.RESPONSE);
          this.client = client;
          this.socket = socket;
          this.timeout = null;
          this.timeoutValue = null;
          this.timeoutType = null;
          this.statusCode = null;
          this.upgrade = false;
          this.headers = [];
          this.headersSize = 0;
          this.headersMaxSize = client[kMaxHeadersSize];
          this.shouldKeepAlive = false;
          this.paused = false;
          this.resume = this.resume.bind(this);
          this.currentMessage = {
            request: null,
            trailers: null
          };
          this.bytesRead = 0;
          this.trailer = '';
          this.keepAlive = '';
          this.contentLength = '';
        }

        setTimeout(value, type) {
          this.timeoutType = type;

          if (value !== this.timeoutValue) {
            clearTimeout(this.timeout);

            if (value) {
              this.timeout = setTimeout(onParserTimeout, value, this); // istanbul ignore else: only for jest

              if (this.timeout.unref) {
                this.timeout.unref();
              }
            } else {
              this.timeout = null;
            }

            this.timeoutValue = value;
          } else if (this.timeout) {
            // istanbul ignore else: only for jest
            if (this.timeout.refresh) {
              this.timeout.refresh();
            }
          }
        }

        resume() {
          if (this.socket.destroyed || !this.paused) {
            return;
          }

          assert(this.ptr != null);
          assert(currentParser == null);
          llhttp.exports.llhttp_resume(this.ptr);
          assert(this.timeoutType === TIMEOUT_BODY);

          if (this.timeout) {
            // istanbul ignore else: only for jest
            if (this.timeout.refresh) {
              this.timeout.refresh();
            }
          }

          this.paused = false;
          this.socket.resume();
          this.execute(EMPTY_BUF); // Flush parser.
        }

        execute(data) {
          assert(this.ptr != null);
          assert(currentParser == null);
          assert(!this.paused);
          const {
            socket
          } = this;

          if (data.length > currentBufferSize) {
            llhttp.exports.free(currentBufferPtr);
            currentBufferSize = Math.ceil(data.length / 4096) * 4096;
            currentBufferPtr = llhttp.exports.malloc(currentBufferSize);
          } // TODO (perf): Can we avoid this copy somehow?


          new Uint8Array(llhttp.exports.memory.buffer, currentBufferPtr, currentBufferSize).set(data); // Call `execute` on the wasm parser.
          // We pass the `llhttp_parser` pointer address, the pointer address of buffer view data,
          // and finally the length of bytes to parse.
          // The return value is an error code or `constants.ERROR.OK`.

          try {
            let ret;

            try {
              currentBufferRef = data;
              currentParser = this;
              ret = llhttp.exports.llhttp_execute(this.ptr, currentBufferPtr, data.length);
              /* eslint-disable-next-line no-useless-catch */
            } catch (err) {
              /* istanbul ignore next: difficult to make a test case for */
              throw err;
            } finally {
              currentParser = null;
              currentBufferRef = null;
            }

            const offset = llhttp.exports.llhttp_get_error_pos(this.ptr) - currentBufferPtr;

            if (ret === constants.ERROR.PAUSED_UPGRADE) {
              this.onUpgrade(data.slice(offset));
            } else if (ret === constants.ERROR.PAUSED) {
              this.paused = true;
              socket.pause();
              socket.unshift(data.slice(offset));
            } else if (ret !== constants.ERROR.OK) {
              const ptr = llhttp.exports.llhttp_get_error_reason(this.ptr);
              let message = '';

              if (ptr) {
                const len = new Uint8Array(llhttp.exports.memory.buffer, ptr).indexOf(0);
                message = Buffer.from(llhttp.exports.memory.buffer, ptr, len).toString();
              }

              throw new HTTPParserError(message, constants.ERROR[ret], data.slice(offset));
            }

            this.flush();
          } catch (err) {
            util.destroy(socket, err);
          }
        }

        flush() {
          const {
            client,
            request,
            trailers
          } = this.currentMessage;

          if (!request) {
            return;
          }

          try {
            request.onComplete(trailers);
          } catch (err) {
            errorRequest(client, request, err);
          }

          this.currentMessage.request = null;
          this.currentMessage.trailers = null;
        }

        finish() {
          try {
            try {
              currentParser = this;
              llhttp.exports.llhttp_finish(this.ptr); // TODO (fix): Check ret?
            } finally {
              currentParser = null;
            }

            this.flush();
          } catch (err) {
            // TODO (fix): What if socket is already destroyed? Error will be swallowed.

            /* istanbul ignore next: difficult to make a test case for */
            util.destroy(this.socket, err);
          }
        }

        destroy(err) {
          assert(this.ptr != null);
          assert(currentParser == null);

          if (err && err.code !== 'UND_ERR_INFO' && this.currentMessage.request) {
            this.currentMessage.request.onError(err);
            this.currentMessage.request = null;
          }

          assert(!this.currentMessage.request);
          llhttp.exports.llhttp_free(this.ptr);
          this.ptr = null;
          clearTimeout(this.timeout);
          this.timeout = null;
          this.timeoutValue = null;
          this.timeoutType = null;
          this.paused = false;
        }

        onMessageBegin() {
          const {
            socket,
            client
          } = this;
          /* istanbul ignore next: difficult to make a test case for */

          if (socket.destroyed) {
            return -1;
          }

          const request = client[kQueue][client[kRunningIdx]];

          if (!request) {
            return -1;
          }
        }

        onHeaderField(buf) {
          const len = this.headers.length;

          if ((len & 1) === 0) {
            this.headers.push(buf);
          } else {
            this.headers[len - 1] = Buffer.concat([this.headers[len - 1], buf]);
          }

          this.trackHeader(buf.length);
        }

        onHeaderValue(buf) {
          let len = this.headers.length;

          if ((len & 1) === 1) {
            this.headers.push(buf);
            len += 1;
          } else {
            this.headers[len - 1] = Buffer.concat([this.headers[len - 1], buf]);
          }

          const key = this.headers[len - 2];

          if (key.length === 10 && key.toString().toLowerCase() === 'keep-alive') {
            this.keepAlive += buf.toString();
          } else if (key.length === 7 && key.toString().toLowerCase() === 'trailer') {
            this.trailer += buf.toString();
          } else if (key.length === 14 && key.toString().toLowerCase() === 'content-length') {
            this.contentLength += buf.toString();
          }

          this.trackHeader(buf.length);
        }

        trackHeader(len) {
          this.headersSize += len;

          if (this.headersSize >= this.headersMaxSize) {
            util.destroy(this.socket, new HeadersOverflowError());
          }
        }

        onUpgrade(head) {
          const {
            upgrade,
            client,
            socket,
            headers,
            statusCode
          } = this;
          assert(upgrade);
          const request = client[kQueue][client[kRunningIdx]];
          assert(request);
          assert(!socket.destroyed);
          assert(socket === client[kSocket]);
          assert(!socket.isPaused());
          assert(!this.paused);
          assert(request.upgrade || request.method === 'CONNECT');
          this.statusCode = null;
          this.shouldKeepAlive = null;
          assert(this.headers.length % 2 === 0);
          this.headers = [];
          this.headersSize = 0; // _readableState.flowing might be `true` if the socket has been
          // explicitly `resume()`:d even if we never registered a 'data'
          // listener.
          // We need to stop unshift from emitting 'data'. However, we cannot
          // call pause()  as that will stop socket from automatically resuming
          // when 'data' listener is registered.
          // Reset socket state to non flowing:

          socket._readableState.flowing = null;
          socket.unshift(head);
          socket[kParser].destroy();
          socket[kParser] = null;
          socket[kClient] = null;
          socket[kError] = null;
          socket.removeListener('error', onSocketError).removeListener('data', onSocketData).removeListener('end', onSocketEnd).removeListener('close', onSocketClose);
          client[kSocket] = null;
          client[kQueue][client[kRunningIdx]++] = null;
          client.emit('disconnect', client[kUrl], [client], new InformationalError('upgrade'));

          try {
            request.onUpgrade(statusCode, headers, socket);
          } catch (err) {
            util.destroy(socket, err);
          }

          resume(client);
        }

        onHeadersComplete(statusCode, upgrade, shouldKeepAlive) {
          const {
            client,
            socket,
            headers
          } = this;
          /* istanbul ignore next: difficult to make a test case for */

          if (socket.destroyed) {
            return -1;
          }

          const request = client[kQueue][client[kRunningIdx]];

          if (!request) {
            return -1;
          } // TODO: Check for content-length mismatch from server?


          assert(!this.upgrade);
          assert(this.statusCode < 200); // TODO: More statusCode validation?

          if (statusCode === 100) {
            util.destroy(socket, new SocketError('bad response'));
            return -1;
          }
          /* istanbul ignore if: this can only happen if server is misbehaving */


          if (upgrade && !request.upgrade) {
            util.destroy(socket, new SocketError('bad upgrade'));
            return -1;
          }

          assert.strictEqual(this.timeoutType, TIMEOUT_HEADERS);
          this.statusCode = statusCode;
          this.shouldKeepAlive = shouldKeepAlive;

          if (this.statusCode >= 200) {
            const bodyTimeout = request.bodyTimeout != null ? request.bodyTimeout : client[kBodyTimeout];
            this.setTimeout(bodyTimeout, TIMEOUT_BODY);
          } else if (this.timeout) {
            // istanbul ignore else: only for jest
            if (this.timeout.refresh) {
              this.timeout.refresh();
            }
          }

          if (request.method === 'CONNECT' && statusCode >= 200 && statusCode < 300) {
            assert(client[kRunning] === 1);
            this.upgrade = true;
            return 2;
          }

          if (upgrade) {
            assert(client[kRunning] === 1);
            this.upgrade = true;
            return 2;
          }

          assert(this.headers.length % 2 === 0);
          this.headers = [];
          this.headersSize = 0;

          if (shouldKeepAlive && client[kPipelining]) {
            const keepAliveTimeout = this.keepAlive ? util.parseKeepAliveTimeout(this.keepAlive) : null;

            if (keepAliveTimeout != null) {
              const timeout = Math.min(keepAliveTimeout - client[kKeepAliveTimeoutThreshold], client[kKeepAliveMaxTimeout]);

              if (timeout <= 0) {
                socket[kReset] = true;
              } else {
                client[kKeepAliveTimeoutValue] = timeout;
              }
            } else {
              client[kKeepAliveTimeoutValue] = client[kKeepAliveDefaultTimeout];
            }
          } else {
            // Stop more requests from being dispatched.
            socket[kReset] = true;
          }

          try {
            if (request.onHeaders(statusCode, headers, this.resume) === false) {
              return constants.ERROR.PAUSED;
            }
          } catch (err) {
            util.destroy(socket, err);
            return -1;
          }

          if (request.method === 'HEAD') {
            assert(socket[kReset]);
            return 1;
          }

          if (statusCode < 200) {
            return 1;
          }
        }

        onBody(buf) {
          const {
            client,
            socket,
            statusCode
          } = this;

          if (socket.destroyed) {
            return -1;
          }

          const request = client[kQueue][client[kRunningIdx]];
          assert(request);
          assert.strictEqual(this.timeoutType, TIMEOUT_BODY);

          if (this.timeout) {
            // istanbul ignore else: only for jest
            if (this.timeout.refresh) {
              this.timeout.refresh();
            }
          }

          assert(statusCode >= 200);
          this.bytesRead += buf.length;

          try {
            if (request.onData(buf) === false) {
              return constants.ERROR.PAUSED;
            }
          } catch (err) {
            util.destroy(socket, err);
            return -1;
          }
        }

        onMessageComplete() {
          const {
            client,
            socket,
            statusCode,
            upgrade,
            trailer,
            headers,
            contentLength,
            bytesRead,
            shouldKeepAlive
          } = this;

          if (socket.destroyed && (!statusCode || shouldKeepAlive)) {
            return -1;
          }

          if (upgrade) {
            return;
          }

          const request = client[kQueue][client[kRunningIdx]];
          assert(request);
          assert(statusCode >= 100);
          this.statusCode = null;
          this.bytesRead = 0;
          this.contentLength = '';
          this.trailer = '';
          this.keepAlive = '';
          assert(this.headers.length % 2 === 0);
          this.headers = [];
          this.headersSize = 0;

          if (statusCode < 200) {
            return;
          }

          const trailers = trailer ? trailer.split(/,\s*/) : [];

          for (let i = 0; i < trailers.length; i++) {
            const trailer = trailers[i];
            let found = false;

            for (let n = 0; n < headers.length; n += 2) {
              const key = headers[n];

              if (key.length === trailer.length && key.toString().toLowerCase() === trailer.toLowerCase()) {
                found = true;
                break;
              }
            }

            if (!found) {
              util.destroy(socket, new TrailerMismatchError());
              return -1;
            }
          }
          /* istanbul ignore next: should be handled by llhttp? */


          if (request.method !== 'HEAD' && contentLength && bytesRead !== parseInt(contentLength, 10)) {
            util.destroy(socket, new ResponseContentLengthMismatchError());
            return -1;
          }

          this.flush();
          assert(!this.currentMessage.request && !this.currentMessage.trailers);
          this.currentMessage.request = request;
          this.currentMessage.trailers = headers;
          client[kQueue][client[kRunningIdx]++] = null;

          if (socket[kWriting]) {
            assert.strictEqual(client[kRunning], 0); // Response completed before request.

            util.destroy(socket, new InformationalError('reset'));
            return constants.ERROR.PAUSED;
          } else if (!shouldKeepAlive) {
            // TODO: What if running > 0?
            util.destroy(socket, new InformationalError('reset'));
            return constants.ERROR.PAUSED;
          } else if (socket[kReset] && client[kRunning] === 0) {
            // Destroy socket once all requests have completed.
            // The request at the tail of the pipeline is the one
            // that requested reset and no further requests should
            // have been queued since then.
            util.destroy(socket, new InformationalError('reset'));
            return constants.ERROR.PAUSED;
          } else {
            resume(client);
          }
        }

      }

      function onParserTimeout(parser) {
        const {
          socket,
          timeoutType,
          client
        } = parser;
        /* istanbul ignore else */

        if (timeoutType === TIMEOUT_HEADERS) {
          if (!socket[kWriting]) {
            assert(!parser.paused, 'cannot be paused while waiting for headers');
            util.destroy(socket, new HeadersTimeoutError());
          }
        } else if (timeoutType === TIMEOUT_BODY) {
          if (!parser.paused) {
            util.destroy(socket, new BodyTimeoutError());
          }
        } else if (timeoutType === TIMEOUT_IDLE) {
          assert(client[kRunning] === 0 && client[kKeepAliveTimeoutValue]);
          util.destroy(socket, new InformationalError('socket idle timeout'));
        } else if (timeoutType === TIMEOUT_CONNECT) {
          assert(!client[kConnected]);
          util.destroy(socket, new ConnectTimeoutError());
        }
      }

      function onSocketData(data) {
        const {
          [kParser]: parser
        } = this;
        parser.execute(data);
      }

      function onSocketConnect() {
        const {
          [kClient]: client
        } = this;
        this[kConnecting] = false;
        client.emit('connect', client[kUrl], [client]);
        resume(client);
      }

      function onSocketError(err) {
        const {
          [kParser]: parser
        } = this; // On Mac OS, we get an ECONNRESET even if there is a full body to be forwarded
        // to the user.

        if (err.code === 'ECONNRESET' && parser.statusCode && !parser.shouldKeepAlive) {
          // We treat all incoming data so for as a valid response.
          parser.finish();
          return;
        }

        const {
          [kClient]: client
        } = this;
        this[kError] = err;

        if (err.code === 'ERR_TLS_CERT_ALTNAME_INVALID') {
          assert(client[kRunning] === 0);

          while (client[kPending] > 0 && client[kQueue][client[kPendingIdx]].servername === client[kServerName]) {
            const request = client[kQueue][client[kPendingIdx]++];
            errorRequest(client, request, err);
          }
        } else if (client[kRunning] === 0 && err.code !== 'UND_ERR_INFO' && err.code !== 'UND_ERR_SOCKET') {
          // Error is not caused by running request and not a recoverable
          // socket error.
          assert(client[kPendingIdx] === client[kRunningIdx]);
          const requests = client[kQueue].splice(client[kRunningIdx]);

          for (let i = 0; i < requests.length; i++) {
            const request = requests[i];
            errorRequest(client, request, err);
          }

          assert(client[kSize] === 0);
        }
      }

      function onSocketEnd() {
        const {
          [kParser]: parser
        } = this;

        if (parser.statusCode && !parser.shouldKeepAlive) {
          // We treat all incoming data so far as a valid response.
          parser.finish();
          return;
        }

        util.destroy(this, new SocketError('other side closed'));
      }

      function onSocketClose() {
        const {
          [kClient]: client
        } = this;
        this[kParser].destroy(this[kError]);
        this[kParser] = null;
        const err = this[kError] || new SocketError('closed');
        client[kSocket] = null;

        if (client[kDestroyed]) {
          assert(client[kPending] === 0); // Fail entire queue.

          const requests = client[kQueue].splice(client[kRunningIdx]);

          for (let i = 0; i < requests.length; i++) {
            const request = requests[i];
            errorRequest(client, request, err);
          }
        } else if (client[kRunning] > 0 && err.code !== 'UND_ERR_INFO') {
          // Fail head of pipeline.
          const request = client[kQueue][client[kRunningIdx]];
          client[kQueue][client[kRunningIdx]++] = null;
          errorRequest(client, request, err);
        }

        client[kPendingIdx] = client[kRunningIdx];
        assert(client[kRunning] === 0);

        if (this[kConnecting]) {
          this[kConnecting] = false;
          client.emit('connectionError', client[kUrl], [client], err);
        } else {
          client.emit('disconnect', client[kUrl], [client], err);
        }

        resume(client);
      }

      function connect(client) {
        assert(!client[kSocket]);
        let {
          host,
          hostname,
          protocol,
          port
        } = client[kUrl]; // Resolve ipv6

        if (hostname.startsWith('[')) {
          const idx = hostname.indexOf(']');
          assert(idx !== -1);
          const ip = hostname.substr(1, idx - 1);
          assert(net.isIP(ip));
          hostname = ip;
        }

        const socket = client[kConnector]({
          host,
          hostname,
          protocol,
          port,
          servername: client[kServerName]
        }, onSocketConnect);
        client[kSocket] = socket;
        socket[kNoRef] = false;
        socket[kConnecting] = true;
        socket[kWriting] = false;
        socket[kReset] = false;
        socket[kError] = null;
        socket[kParser] = new Parser(client, socket);
        socket[kClient] = client;
        socket.on('error', onSocketError).on('data', onSocketData).on('end', onSocketEnd).on('close', onSocketClose);
      }

      function emitDrain(client) {
        client[kNeedDrain] = 0;
        client.emit('drain', client[kUrl], [client]);
      }

      function resume(client, sync) {
        if (client[kResuming] === 2) {
          return;
        }

        client[kResuming] = 2;

        _resume(client, sync);

        client[kResuming] = 0;

        if (client[kRunningIdx] > 256) {
          client[kQueue].splice(0, client[kRunningIdx]);
          client[kPendingIdx] -= client[kRunningIdx];
          client[kRunningIdx] = 0;
        }
      }

      function _resume(client, sync) {
        while (true) {
          if (client[kDestroyed]) {
            assert(client[kPending] === 0);
            return;
          }

          if (client[kClosed] && !client[kSize]) {
            client.destroy(util.nop);
            continue;
          }

          const socket = client[kSocket];

          if (socket) {
            if (client[kSize] === 0) {
              if (!socket[kNoRef] && socket.unref) {
                socket.unref();
                socket[kNoRef] = true;
              }
            } else if (socket[kNoRef] && socket.ref) {
              socket.ref();
              socket[kNoRef] = false;
            }

            if (socket[kConnecting]) {
              if (socket[kParser].timeoutType !== TIMEOUT_CONNECT) {
                socket[kParser].setTimeout(client[kConnectTimeoutValue], TIMEOUT_CONNECT);
              }
            } else if (client[kSize] === 0) {
              if (socket[kParser].timeoutType !== TIMEOUT_IDLE) {
                socket[kParser].setTimeout(client[kKeepAliveTimeoutValue], TIMEOUT_IDLE);
              }
            } else if (client[kRunning] > 0 && socket[kParser].statusCode < 200) {
              if (socket[kParser].timeoutType !== TIMEOUT_HEADERS) {
                const request = client[kQueue][client[kRunningIdx]];
                const headersTimeout = request.headersTimeout != null ? request.headersTimeout : client[kHeadersTimeout];
                socket[kParser].setTimeout(headersTimeout, TIMEOUT_HEADERS);
              }
            }
          }

          if (client[kBusy]) {
            client[kNeedDrain] = 2;
          } else if (client[kNeedDrain] === 2) {
            if (sync) {
              client[kNeedDrain] = 1;
              process.nextTick(emitDrain, client);
            } else {
              emitDrain(client);
            }

            continue;
          }

          if (client[kPending] === 0) {
            return;
          }

          if (client[kRunning] >= (client[kPipelining] || 1)) {
            return;
          }

          const request = client[kQueue][client[kPendingIdx]];

          if (client[kUrl].protocol === 'https:' && client[kServerName] !== request.servername) {
            if (client[kRunning] > 0) {
              return;
            }

            client[kServerName] = request.servername;

            if (socket && socket.servername !== request.servername) {
              util.destroy(socket, new InformationalError('servername changed'));
              return;
            }
          }

          if (!socket) {
            connect(client);
            continue;
          }

          if (socket.destroyed || socket[kConnecting] || socket[kWriting] || socket[kReset]) {
            return;
          }

          if (client[kRunning] > 0 && !request.idempotent) {
            // Non-idempotent request cannot be retried.
            // Ensure that no other requests are inflight and
            // could cause failure.
            return;
          }

          if (client[kRunning] > 0 && (request.upgrade || request.method === 'CONNECT')) {
            // Don't dispatch an upgrade until all preceding requests have completed.
            // A misbehaving server might upgrade the connection before all pipelined
            // request has completed.
            return;
          }

          if (util.isStream(request.body) && util.bodyLength(request.body) === 0) {
            request.body.on('data',
            /* istanbul ignore next */
            function () {
              /* istanbul ignore next */
              assert(false);
            }).on('error', function (err) {
              errorRequest(client, request, err);
            }).on('end', function () {
              util.destroy(this);
            });
            request.body = null;
          }

          if (client[kRunning] > 0 && util.isStream(request.body)) {
            // Request with stream body can error while other requests
            // are inflight and indirectly error those as well.
            // Ensure this doesn't happen by waiting for inflight
            // to complete before dispatching.
            // Request with stream body cannot be retried.
            // Ensure that no other requests are inflight and
            // could cause failure.
            return;
          }

          if (!request.aborted && write(client, request)) {
            client[kPendingIdx]++;
          } else {
            client[kQueue].splice(client[kPendingIdx], 1);
          }
        }
      }

      function write(client, request) {
        const {
          body,
          method,
          path,
          host,
          upgrade,
          headers
        } = request; // https://tools.ietf.org/html/rfc7231#section-4.3.1
        // https://tools.ietf.org/html/rfc7231#section-4.3.2
        // https://tools.ietf.org/html/rfc7231#section-4.3.5
        // Sending a payload body on a request that does not
        // expect it can cause undefined behavior on some
        // servers and corrupt connection state. Do not
        // re-use the connection for further requests.

        const expectsPayload = method === 'PUT' || method === 'POST' || method === 'PATCH';

        if (body && typeof body.read === 'function') {
          // Try to read EOF in order to get length.
          body.read(0);
        }

        let contentLength = util.bodyLength(body);

        if (contentLength === null) {
          contentLength = request.contentLength;
        }

        if (contentLength === 0 && !expectsPayload) {
          // https://tools.ietf.org/html/rfc7230#section-3.3.2
          // A user agent SHOULD NOT send a Content-Length header field when
          // the request message does not contain a payload body and the method
          // semantics do not anticipate such a body.
          contentLength = null;
        }

        if (request.contentLength !== null && request.contentLength !== contentLength) {
          if (client[kStrictContentLength]) {
            errorRequest(client, request, new RequestContentLengthMismatchError());
            return false;
          }

          process.emitWarning(new RequestContentLengthMismatchError());
        }

        const socket = client[kSocket];

        try {
          request.onConnect(err => {
            if (request.aborted || request.completed) {
              return;
            }

            errorRequest(client, request, err || new RequestAbortedError());
            util.destroy(socket, new InformationalError('aborted'));
          });
        } catch (err) {
          errorRequest(client, request, err);
        }

        if (request.aborted) {
          return false;
        }

        if (method === 'HEAD') {
          // https://github.com/mcollina/undici/issues/258
          // Close after a HEAD request to interop with misbehaving servers
          // that may send a body in the response.
          socket[kReset] = true;
        }

        if (upgrade || method === 'CONNECT') {
          // On CONNECT or upgrade, block pipeline from dispatching further
          // requests on this connection.
          socket[kReset] = true;
        } // TODO: Expect: 100-continue
        // TODO: An HTTP/1.1 user agent MUST NOT preface
        // or follow a request with an extra CRLF.
        // https://tools.ietf.org/html/rfc7230#section-3.5


        let header;

        if (upgrade) {
          header = `${method} ${path} HTTP/1.1\r\nconnection: upgrade\r\nupgrade: ${upgrade}\r\n`;
        } else if (client[kPipelining]) {
          header = `${method} ${path} HTTP/1.1\r\nconnection: keep-alive\r\n`;
        } else {
          header = `${method} ${path} HTTP/1.1\r\nconnection: close\r\n`;
        }

        if (!host) {
          header += client[kHostHeader];
        }

        if (headers) {
          header += headers;
        }

        if (!body) {
          if (contentLength === 0) {
            socket.write(`${header}content-length: ${contentLength}\r\n\r\n\r\n`, 'ascii');
          } else {
            assert(contentLength === null, 'no body must not have content length');
            socket.write(`${header}\r\n`, 'ascii');
          }
        } else if (util.isBuffer(body)) {
          assert(contentLength !== null, 'buffer body must have content length');
          socket.cork();
          socket.write(`${header}content-length: ${contentLength}\r\n\r\n`, 'ascii');
          socket.write(body);
          socket.write('\r\n', 'ascii');
          socket.uncork();

          if (!expectsPayload) {
            socket[kReset] = true;
          }
        } else {
          socket[kWriting] = true;
          assert(util.isStream(body));
          assert(contentLength !== 0 || client[kRunning] === 0, 'stream body cannot be pipelined');
          let finished = false;
          let bytesWritten = 0;

          const onData = function (chunk) {
            try {
              assert(!finished);
              const len = Buffer.byteLength(chunk);

              if (!len) {
                return;
              } // TODO: What if not ended and bytesWritten === contentLength?
              // We should defer writing chunks.


              if (contentLength !== null && bytesWritten + len > contentLength) {
                if (client[kStrictContentLength]) {
                  util.destroy(socket, new RequestContentLengthMismatchError());
                  return;
                }

                process.emitWarning(new RequestContentLengthMismatchError());
              }

              if (bytesWritten === 0) {
                if (!expectsPayload) {
                  socket[kReset] = true;
                }

                if (contentLength === null) {
                  socket.write(`${header}transfer-encoding: chunked\r\n`, 'ascii');
                } else {
                  socket.write(`${header}content-length: ${contentLength}\r\n\r\n`, 'ascii');
                }
              }

              if (contentLength === null) {
                socket.write(`\r\n${len.toString(16)}\r\n`, 'ascii');
              }

              bytesWritten += len;

              if (!socket.write(chunk) && this.pause) {
                this.pause();
              }
            } catch (err) {
              util.destroy(this, err);
            }
          };

          const onDrain = function () {
            assert(!finished);

            if (body.resume) {
              body.resume();
            }
          };

          const onAbort = function () {
            onFinished(new RequestAbortedError());
          };

          const onFinished = function (err) {
            if (finished) {
              return;
            }

            finished = true;
            assert(socket.destroyed || socket[kWriting] && client[kRunning] <= 1);
            socket[kWriting] = false;

            if (!err && contentLength !== null && bytesWritten !== contentLength) {
              if (client[kStrictContentLength]) {
                err = new RequestContentLengthMismatchError();
              } else {
                process.emitWarning(new RequestContentLengthMismatchError());
              }
            }

            socket.removeListener('drain', onDrain).removeListener('error', onFinished);
            body.removeListener('data', onData).removeListener('end', onFinished).removeListener('error', onFinished).removeListener('close', onAbort); // TODO (fix): Avoid using err.message for logic.

            if (err && (err.code !== 'UND_ERR_INFO' || err.message !== 'reset')) {
              util.destroy(body, err);
            } else {
              util.destroy(body);
            }

            if (err) {
              assert(client[kRunning] <= 1, 'pipeline should only contain this request');
              util.destroy(socket, err);
            }

            if (socket.destroyed) {
              return;
            }

            if (bytesWritten === 0) {
              if (expectsPayload) {
                // https://tools.ietf.org/html/rfc7230#section-3.3.2
                // A user agent SHOULD send a Content-Length in a request message when
                // no Transfer-Encoding is sent and the request method defines a meaning
                // for an enclosed payload body.
                socket.write(`${header}content-length: 0\r\n\r\n\r\n`, 'ascii');
              } else {
                socket.write(`${header}\r\n`, 'ascii');
              }
            } else if (contentLength === null) {
              socket.write('\r\n0\r\n\r\n', 'ascii');
            }

            if (socket[kParser].timeout && socket[kParser].timeoutType === TIMEOUT_HEADERS) {
              // istanbul ignore else: only for jest
              if (socket[kParser].timeout.refresh) {
                socket[kParser].timeout.refresh();
              }
            }

            resume(client);
          };

          body.on('data', onData).on('end', onFinished).on('error', onFinished).on('close', onAbort);
          socket.on('drain', onDrain).on('error', onFinished);
        }

        return true;
      }

      function errorRequest(client, request, err) {
        try {
          request.onError(err);
          assert(request.aborted);
        } catch (err) {
          client.emit('error', err);
        }
      }

      module.exports = Client;
      /***/
    },

    /***/
    6436:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      /* istanbul ignore file: only for Node 12 */

      const {
        kConnected,
        kSize
      } = __webpack_require__(2785);

      class CompatWeakRef {
        constructor(value) {
          this.value = value;
        }

        deref() {
          return this.value[kConnected] === 0 && this.value[kSize] === 0 ? undefined : this.value;
        }

      }

      class CompatFinalizer {
        constructor(finalizer) {
          this.finalizer = finalizer;
        }

        register(dispatcher, key) {
          dispatcher.on('disconnect', () => {
            if (dispatcher[kConnected] === 0 && dispatcher[kSize] === 0) {
              this.finalizer(key);
            }
          });
        }

      }

      module.exports = function () {
        return {
          WeakRef: global.WeakRef || CompatWeakRef,
          FinalizationRegistry: global.FinalizationRegistry || CompatFinalizer
        };
      };
      /***/

    },

    /***/
    2067:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const net = __webpack_require__(1631);

      const tls = __webpack_require__(4016);

      const assert = __webpack_require__(2357);

      const util = __webpack_require__(3983);

      const {
        InvalidArgumentError
      } = __webpack_require__(8045); // TODO: session re-use does not wait for the first
      // connection to resolve the session and might therefore
      // resolve the same servername multiple times even when
      // re-use is enabled.


      class Connector {
        constructor({
          tls,
          socketPath,
          maxCachedSessions
        }) {
          this.tls = tls || {}; // TODO: Make shallow copy to protect against mutations.

          if (maxCachedSessions != null && (!Number.isInteger(maxCachedSessions) || maxCachedSessions < 0)) {
            throw new InvalidArgumentError('maxCachedSessions must be a positive integer or zero');
          }

          this.socketPath = socketPath;
          this.sessionCache = new Map();
          this.maxCachedSessions = maxCachedSessions == null ? 100 : maxCachedSessions;
        }

        connect({
          hostname,
          host,
          protocol,
          port,
          servername
        }, callback) {
          let socket;

          if (protocol === 'https:') {
            servername = servername || this.tls.servername || util.getServerName(host);
            const session = this.sessionCache.get(servername) || null;
            const opts = { ...this.tls,
              servername,
              session
            };
            socket = this.socketPath ? tls.connect(this.socketPath, opts) : tls.connect(port ||
            /* istanbul ignore next */
            443, hostname, opts);
            const cache = this.sessionCache;
            const maxCachedSessions = this.maxCachedSessions;
            socket.on('session', function (session) {
              assert(this.servername); // cache is disabled

              if (maxCachedSessions === 0) {
                return;
              }

              if (cache.size >= maxCachedSessions) {
                // remove the oldest session
                const {
                  value: oldestKey
                } = cache.keys().next();
                cache.delete(oldestKey);
              }

              cache.set(this.servername, session);
            }).on('error', function (err) {
              assert(this.servername);

              if (err.code !== 'UND_ERR_INFO') {
                // TODO (fix): Only delete for session related errors.
                cache.delete(this.servername);
              }
            });
          } else {
            socket = this.socketPath ? net.connect(this.socketPath) : net.connect(port ||
            /* istanbul ignore next */
            80, hostname);
          }

          socket.setNoDelay(true).once(protocol === 'https:' ? 'secureConnect' : 'connect', callback);
          return socket;
        }

      }

      module.exports = opts => {
        return Connector.prototype.connect.bind(new Connector(opts));
      };
      /***/

    },

    /***/
    8045:
    /***/
    module => {
      "use strict";

      class UndiciError extends Error {
        constructor(message) {
          super(message);
          this.name = 'UndiciError';
          this.code = 'UND_ERR';
        }

      }

      class ConnectTimeoutError extends UndiciError {
        constructor(message) {
          super(message);
          Error.captureStackTrace(this, ConnectTimeoutError);
          this.name = 'ConnectTimeoutError';
          this.message = message || 'Connect Timeout Error';
          this.code = 'UND_ERR_CONNECT_TIMEOUT';
        }

      }

      class HeadersTimeoutError extends UndiciError {
        constructor(message) {
          super(message);
          Error.captureStackTrace(this, HeadersTimeoutError);
          this.name = 'HeadersTimeoutError';
          this.message = message || 'Headers Timeout Error';
          this.code = 'UND_ERR_HEADERS_TIMEOUT';
        }

      }

      class HeadersOverflowError extends UndiciError {
        constructor(message) {
          super(message);
          Error.captureStackTrace(this, HeadersOverflowError);
          this.name = 'HeadersOverflowError';
          this.message = message || 'Headers Overflow Error';
          this.code = 'UND_ERR_HEADERS_OVERFLOW';
        }

      }

      class BodyTimeoutError extends UndiciError {
        constructor(message) {
          super(message);
          Error.captureStackTrace(this, BodyTimeoutError);
          this.name = 'BodyTimeoutError';
          this.message = message || 'Body Timeout Error';
          this.code = 'UND_ERR_BODY_TIMEOUT';
        }

      }

      class InvalidArgumentError extends UndiciError {
        constructor(message) {
          super(message);
          Error.captureStackTrace(this, InvalidArgumentError);
          this.name = 'InvalidArgumentError';
          this.message = message || 'Invalid Argument Error';
          this.code = 'UND_ERR_INVALID_ARG';
        }

      }

      class InvalidReturnValueError extends UndiciError {
        constructor(message) {
          super(message);
          Error.captureStackTrace(this, InvalidReturnValueError);
          this.name = 'InvalidReturnValueError';
          this.message = message || 'Invalid Return Value Error';
          this.code = 'UND_ERR_INVALID_RETURN_VALUE';
        }

      }

      class RequestAbortedError extends UndiciError {
        constructor(message) {
          super(message);
          Error.captureStackTrace(this, RequestAbortedError);
          this.name = 'RequestAbortedError';
          this.message = message || 'Request aborted';
          this.code = 'UND_ERR_ABORTED';
        }

      }

      class InformationalError extends UndiciError {
        constructor(message) {
          super(message);
          Error.captureStackTrace(this, InformationalError);
          this.name = 'InformationalError';
          this.message = message || 'Request information';
          this.code = 'UND_ERR_INFO';
        }

      }

      class RequestContentLengthMismatchError extends UndiciError {
        constructor(message) {
          super(message);
          Error.captureStackTrace(this, RequestContentLengthMismatchError);
          this.name = 'RequestContentLengthMismatchError';
          this.message = message || 'Request body length does not match content-length header';
          this.code = 'UND_ERR_REQ_CONTENT_LENGTH_MISMATCH';
        }

      }

      class ResponseContentLengthMismatchError extends UndiciError {
        constructor(message) {
          super(message);
          Error.captureStackTrace(this, ResponseContentLengthMismatchError);
          this.name = 'ResponseContentLengthMismatchError';
          this.message = message || 'Response body length does not match content-length header';
          this.code = 'UND_ERR_RES_CONTENT_LENGTH_MISMATCH';
        }

      }

      class TrailerMismatchError extends UndiciError {
        constructor(message) {
          super(message);
          Error.captureStackTrace(this, TrailerMismatchError);
          this.name = 'TrailerMismatchError';
          this.message = message || 'Trailers does not match trailer header';
          this.code = 'UND_ERR_TRAILER_MISMATCH';
        }

      }

      class ClientDestroyedError extends UndiciError {
        constructor(message) {
          super(message);
          Error.captureStackTrace(this, ClientDestroyedError);
          this.name = 'ClientDestroyedError';
          this.message = message || 'The client is destroyed';
          this.code = 'UND_ERR_DESTROYED';
        }

      }

      class ClientClosedError extends UndiciError {
        constructor(message) {
          super(message);
          Error.captureStackTrace(this, ClientClosedError);
          this.name = 'ClientClosedError';
          this.message = message || 'The client is closed';
          this.code = 'UND_ERR_CLOSED';
        }

      }

      class SocketError extends UndiciError {
        constructor(message) {
          super(message);
          Error.captureStackTrace(this, SocketError);
          this.name = 'SocketError';
          this.message = message || 'Socket error';
          this.code = 'UND_ERR_SOCKET';
        }

      }

      class NotSupportedError extends UndiciError {
        constructor(message) {
          super(message);
          Error.captureStackTrace(this, NotSupportedError);
          this.name = 'NotSupportedError';
          this.message = message || 'Not supported error';
          this.code = 'UND_ERR_NOT_SUPPORTED';
        }

      }

      class HTTPParserError extends Error {
        constructor(message, code, data) {
          super(message);
          Error.captureStackTrace(this, HTTPParserError);
          this.name = 'HTTPParserError';
          this.code = code ? `HPE_${code}` : undefined;
          this.data = data ? data.toString() : undefined;
        }

      }

      module.exports = {
        HTTPParserError,
        UndiciError,
        HeadersTimeoutError,
        HeadersOverflowError,
        BodyTimeoutError,
        RequestContentLengthMismatchError,
        ConnectTimeoutError,
        TrailerMismatchError,
        InvalidArgumentError,
        InvalidReturnValueError,
        RequestAbortedError,
        ClientDestroyedError,
        ClientClosedError,
        InformationalError,
        SocketError,
        NotSupportedError,
        ResponseContentLengthMismatchError
      };
      /***/
    },

    /***/
    2905:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const {
        InvalidArgumentError,
        NotSupportedError
      } = __webpack_require__(8045);

      const util = __webpack_require__(3983);

      const assert = __webpack_require__(2357);

      const kHandler = Symbol('handler');

      class Request {
        constructor({
          path,
          method,
          body,
          headers,
          idempotent,
          upgrade,
          headersTimeout,
          bodyTimeout
        }, handler) {
          if (typeof path !== 'string') {
            throw new InvalidArgumentError('path must be a string');
          } else if (path[0] !== '/' && !(path.startsWith('http://') || path.startsWith('https://'))) {
            throw new InvalidArgumentError('path must be an absolute URL or start with a slash');
          }

          if (typeof method !== 'string') {
            throw new InvalidArgumentError('method must be a string');
          }

          if (upgrade && typeof upgrade !== 'string') {
            throw new InvalidArgumentError('upgrade must be a string');
          }

          if (headersTimeout != null && (!Number.isFinite(headersTimeout) || headersTimeout < 0)) {
            throw new InvalidArgumentError('invalid headersTimeout');
          }

          if (bodyTimeout != null && (!Number.isFinite(bodyTimeout) || bodyTimeout < 0)) {
            throw new InvalidArgumentError('invalid bodyTimeout');
          }

          this.headersTimeout = headersTimeout;
          this.bodyTimeout = bodyTimeout;
          this.method = method;

          if (body == null) {
            this.body = null;
          } else if (util.isReadable(body)) {
            this.body = body;
          } else if (util.isBuffer(body)) {
            this.body = body.length ? body : null;
          } else if (typeof body === 'string') {
            this.body = body.length ? Buffer.from(body) : null;
          } else {
            throw new InvalidArgumentError('body must be a string, a Buffer or a Readable stream');
          }

          this.completed = false;
          this.aborted = false;
          this.upgrade = upgrade || null;
          this.path = path;
          this.idempotent = idempotent == null ? method === 'HEAD' || method === 'GET' : idempotent;
          this.host = null;
          this.contentLength = null;
          this.headers = '';

          if (Array.isArray(headers)) {
            if (headers.length % 2 !== 0) {
              throw new InvalidArgumentError('headers array must be even');
            }

            for (let i = 0; i < headers.length; i += 2) {
              processHeader(this, headers[i], headers[i + 1]);
            }
          } else if (headers && typeof headers === 'object') {
            const keys = Object.keys(headers);

            for (let i = 0; i < keys.length; i++) {
              const key = keys[i];
              processHeader(this, key, headers[key]);
            }
          } else if (headers != null) {
            throw new InvalidArgumentError('headers must be an object or an array');
          }

          if (typeof handler.onConnect !== 'function') {
            throw new InvalidArgumentError('invalid onConnect method');
          }

          if (typeof handler.onError !== 'function') {
            throw new InvalidArgumentError('invalid onError method');
          }

          if (this.upgrade || this.method === 'CONNECT') {
            if (typeof handler.onUpgrade !== 'function') {
              throw new InvalidArgumentError('invalid onUpgrade method');
            }
          } else {
            if (typeof handler.onHeaders !== 'function') {
              throw new InvalidArgumentError('invalid onHeaders method');
            }

            if (typeof handler.onData !== 'function') {
              throw new InvalidArgumentError('invalid onData method');
            }

            if (typeof handler.onComplete !== 'function') {
              throw new InvalidArgumentError('invalid onComplete method');
            }
          }

          this.servername = util.getServerName(this.host);
          this[kHandler] = handler;
        }

        onConnect(abort) {
          assert(!this.aborted);
          assert(!this.completed);
          return this[kHandler].onConnect(abort, this.context);
        }

        onHeaders(statusCode, headers, resume) {
          assert(!this.aborted);
          assert(!this.completed);
          return this[kHandler].onHeaders(statusCode, headers, resume);
        }

        onData(chunk) {
          assert(!this.aborted);
          assert(!this.completed);
          return this[kHandler].onData(chunk);
        }

        onUpgrade(statusCode, headers, socket) {
          assert(!this.aborted);
          assert(!this.completed);
          return this[kHandler].onUpgrade(statusCode, headers, socket);
        }

        onComplete(trailers) {
          assert(!this.aborted);
          this.completed = true;
          return this[kHandler].onComplete(trailers);
        }

        onError(err) {
          if (this.aborted) {
            return;
          }

          this.aborted = true;
          return this[kHandler].onError(err);
        }

      }

      function processHeader(request, key, val) {
        if (val && typeof val === 'object') {
          throw new InvalidArgumentError(`invalid ${key} header`);
        } else if (val === undefined) {
          return;
        }

        if (request.host === null && key.length === 4 && key.toLowerCase() === 'host') {
          request.host = val;
          request.headers += `${key}: ${val}\r\n`;
        } else if (request.contentLength === null && key.length === 14 && key.toLowerCase() === 'content-length') {
          request.contentLength = parseInt(val, 10);

          if (!Number.isFinite(request.contentLength)) {
            throw new InvalidArgumentError('invalid content-length header');
          }
        } else if (key.length === 17 && key.toLowerCase() === 'transfer-encoding') {
          throw new InvalidArgumentError('invalid transfer-encoding header');
        } else if (key.length === 10 && key.toLowerCase() === 'connection') {
          throw new InvalidArgumentError('invalid connection header');
        } else if (key.length === 10 && key.toLowerCase() === 'keep-alive') {
          throw new InvalidArgumentError('invalid keep-alive header');
        } else if (key.length === 7 && key.toLowerCase() === 'upgrade') {
          throw new InvalidArgumentError('invalid upgrade header');
        } else if (key.length === 6 && key.toLowerCase() === 'expect') {
          throw new NotSupportedError('expect header not supported');
        } else {
          request.headers += `${key}: ${val}\r\n`;
        }
      }

      module.exports = Request;
      /***/
    },

    /***/
    2785:
    /***/
    module => {
      module.exports = {
        kUrl: Symbol('url'),
        kWriting: Symbol('writing'),
        kResuming: Symbol('resuming'),
        kQueue: Symbol('queue'),
        kConnect: Symbol('connect'),
        kConnecting: Symbol('connecting'),
        kConnectTimeoutValue: Symbol('connect timeout value'),
        kKeepAliveDefaultTimeout: Symbol('default keep alive timeout'),
        kKeepAliveMaxTimeout: Symbol('max keep alive timeout'),
        kKeepAliveTimeoutThreshold: Symbol('keep alive timeout threshold'),
        kKeepAliveTimeoutValue: Symbol('keep alive timeout'),
        kKeepAlive: Symbol('keep alive'),
        kHeadersTimeout: Symbol('headers timeout'),
        kBodyTimeout: Symbol('body timeout'),
        kServerName: Symbol('server name'),
        kHost: Symbol('host'),
        kNoRef: Symbol('no ref'),
        kRunning: Symbol('running'),
        kPending: Symbol('pending'),
        kSize: Symbol('size'),
        kBusy: Symbol('busy'),
        kConnected: Symbol('connected'),
        kClosed: Symbol('closed'),
        kNeedDrain: Symbol('need drain'),
        kReset: Symbol('reset'),
        kDestroyed: Symbol('destroyed'),
        kMaxHeadersSize: Symbol('max headers size'),
        kRunningIdx: Symbol('running index'),
        kPendingIdx: Symbol('pending index'),
        kError: Symbol('error'),
        kClients: Symbol('clients'),
        kClient: Symbol('client'),
        kParser: Symbol('parser'),
        kOnDestroyed: Symbol('destroy callbacks'),
        kPipelining: Symbol('pipelinig'),
        kSocket: Symbol('socket'),
        kHostHeader: Symbol('host header'),
        kConnector: Symbol('connector'),
        kStrictContentLength: Symbol('strict content length')
      };
      /***/
    },

    /***/
    3983:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const assert = __webpack_require__(2357);

      const {
        kDestroyed
      } = __webpack_require__(2785);

      const {
        IncomingMessage
      } = __webpack_require__(8605);

      const net = __webpack_require__(1631);

      const {
        InvalidArgumentError
      } = __webpack_require__(8045);

      function nop() {}

      function isReadable(obj) {
        return !!(obj && typeof obj.pipe === 'function' && typeof obj.on === 'function');
      }

      function isWritable(obj) {
        return !!(obj && typeof obj.write === 'function' && typeof obj.on === 'function');
      }

      function isStream(obj) {
        return isReadable(obj) || isWritable(obj);
      }

      function parseURL(url) {
        if (typeof url === 'string') {
          url = new URL(url);
        }

        if (!url || typeof url !== 'object') {
          throw new InvalidArgumentError('invalid url');
        }

        if (url.port != null && url.port !== '' && !Number.isFinite(parseInt(url.port))) {
          throw new InvalidArgumentError('invalid port');
        }

        if (url.path != null && typeof url.path !== 'string') {
          throw new InvalidArgumentError('invalid path');
        }

        if (url.pathname != null && typeof url.pathname !== 'string') {
          throw new InvalidArgumentError('invalid pathname');
        }

        if (url.hostname != null && typeof url.hostname !== 'string') {
          throw new InvalidArgumentError('invalid hostname');
        }

        if (url.origin != null && typeof url.origin !== 'string') {
          throw new InvalidArgumentError('invalid origin');
        }

        if (!/^https?:/.test(url.origin || url.protocol)) {
          throw new InvalidArgumentError('invalid protocol');
        }

        if (!(url instanceof URL)) {
          const port = url.port != null ? url.port : {
            'http:': 80,
            'https:': 443
          }[url.protocol];
          const origin = url.origin != null ? url.origin : `${url.protocol}//${url.hostname}:${port}`;
          const path = url.path != null ? url.path : `${url.pathname || ''}${url.search || ''}`;
          url = new URL(path, origin);
        }

        return url;
      }

      function parseOrigin(url) {
        url = parseURL(url);

        if (/\/.+/.test(url.pathname) || url.search || url.hash) {
          throw new InvalidArgumentError('invalid url');
        }

        return url;
      }

      function getServerName(host) {
        if (!host) {
          return null;
        }

        assert.strictEqual(typeof host, 'string');
        let servername = host;

        if (servername.startsWith('[')) {
          const idx = servername.indexOf(']');
          assert(idx !== -1);
          servername = servername.substr(1, idx - 1);
        } else {
          servername = servername.split(':', 1)[0];
        }

        if (net.isIP(servername)) {
          servername = null;
        }

        return servername;
      }

      function bodyLength(body) {
        if (body && typeof body.on === 'function') {
          const state = body._readableState;
          return state && state.ended === true && Number.isFinite(state.length) ? state.length : null;
        }

        assert(!body || Number.isFinite(body.byteLength));
        return body ? body.byteLength : 0;
      }

      function isDestroyed(stream) {
        return !stream || !!(stream.destroyed || stream[kDestroyed]);
      }

      function destroy(stream, err) {
        if (!isStream(stream) || isDestroyed(stream)) {
          return;
        }

        if (typeof stream.destroy === 'function') {
          if (Object.getPrototypeOf(stream).constructor === IncomingMessage) {
            // See: https://github.com/nodejs/node/pull/38505/files
            stream.socket = null;
          }

          stream.destroy(err);
        } else if (err) {
          process.nextTick((stream, err) => {
            stream.emit('error', err);
          }, stream, err);
        }

        if (stream.destroyed !== true) {
          stream[kDestroyed] = true;
        }
      }

      const KEEPALIVE_TIMEOUT_EXPR = /timeout=(\d+)/;

      function parseKeepAliveTimeout(val) {
        const m = val.toString().match(KEEPALIVE_TIMEOUT_EXPR);
        return m ? parseInt(m[1], 10) * 1000 : null;
      }

      function parseHeaders(headers, obj = {}) {
        for (let i = 0; i < headers.length; i += 2) {
          const key = headers[i].toString().toLowerCase();
          let val = obj[key];

          if (!val) {
            obj[key] = headers[i + 1].toString();
          } else {
            if (!Array.isArray(val)) {
              val = [val];
              obj[key] = val;
            }

            val.push(headers[i + 1].toString());
          }
        }

        return obj;
      }

      function isBuffer(buffer) {
        // See, https://github.com/mcollina/undici/pull/319
        return buffer instanceof Uint8Array || Buffer.isBuffer(buffer);
      }

      module.exports = {
        nop,
        parseOrigin,
        parseURL,
        getServerName,
        isStream,
        isReadable,
        isDestroyed,
        parseHeaders,
        parseKeepAliveTimeout,
        destroy,
        bodyLength,
        isBuffer
      };
      /***/
    },

    /***/
    412:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const EventEmitter = __webpack_require__(8614);

      class Dispatcher extends EventEmitter {
        dispatch() {
          throw new Error('not implemented');
        }

        close() {
          throw new Error('not implemented');
        }

        destroy() {
          throw new Error('not implemented');
        }

      }

      module.exports = Dispatcher;
      /***/
    },

    /***/
    751:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const {
        InvalidArgumentError
      } = __webpack_require__(8045);

      const util = __webpack_require__(3983);

      const redirectableStatusCodes = [300, 301, 302, 303, 307, 308];

      class RedirectHandler {
        constructor(dispatcher, {
          maxRedirections,
          ...opts
        }, handler) {
          this.dispatcher = dispatcher;
          this.location = null;
          this.abort = null;
          this.opts = opts;
          this.maxRedirections = maxRedirections;
          this.handler = handler;
          this.history = [];
        }

        onConnect(abort, context = {}) {
          context.history = this.history;
          this.abort = abort;
          this.handler.onConnect(abort, context);
        }

        onUpgrade(statusCode, headers, socket) {
          this.handler.onUpgrade(statusCode, headers, socket);
        }

        onError(error) {
          this.handler.onError(error);
        }

        onHeaders(statusCode, headers, resume) {
          this.location = this.history.length >= this.maxRedirections ? null : parseLocation(statusCode, headers);

          if (!this.location) {
            return this.handler.onHeaders(statusCode, headers, resume);
          }

          this.history.push(new URL(this.opts.path, this.opts.origin));
          const {
            origin,
            pathname,
            search
          } = util.parseURL(new URL(this.location, this.opts.origin));
          const path = search ? `${pathname}${search}` : pathname; // Remove headers referring to the original URL.
          // By default it is Host only, unless it's a 303 (see below), which removes also all Content-* headers.
          // https://tools.ietf.org/html/rfc7231#section-6.4

          this.opts.headers = cleanRequestHeaders(this.opts.headers, statusCode === 303);
          this.opts.path = path;
          this.opts.origin = origin; // https://tools.ietf.org/html/rfc7231#section-6.4.4
          // In case of HTTP 303, always replace method to be either HEAD or GET

          if (statusCode === 303 && this.opts.method !== 'HEAD') {
            this.opts.method = 'GET';
            this.opts.body = null;
          }
        }

        onData(chunk) {
          if (this.location) {
            /*
              https://tools.ietf.org/html/rfc7231#section-6.4
               TLDR: undici always ignores 3xx response bodies.
               Redirection is used to serve the requested resource from another URL, so it is assumes that
              no body is generated (and thus can be ignored). Even though generating a body is not prohibited.
               For status 301, 302, 303, 307 and 308 (the latter from RFC 7238), the specs mention that the body usually
              (which means it's optional and not mandated) contain just an hyperlink to the value of
              the Location response header, so the body can be ignored safely.
               For status 300, which is "Multiple Choices", the spec mentions both generating a Location
              response header AND a response body with the other possible location to follow.
              Since the spec explicitily chooses not to specify a format for such body and leave it to
              servers and browsers implementors, we ignore the body as there is no specified way to eventually parse it.
            */
          } else {
            return this.handler.onData(chunk);
          }
        }

        onComplete(trailers) {
          if (this.location) {
            /*
              https://tools.ietf.org/html/rfc7231#section-6.4
               TLDR: undici always ignores 3xx response trailers as they are not expected in case of redirections
              and neither are useful if present.
               See comment on onData method above for more detailed informations.
            */
            this.location = null;
            this.abort = null;
            this.dispatcher.dispatch(this.opts, this);
          } else {
            this.handler.onComplete(trailers);
          }
        }

      }

      function parseLocation(statusCode, headers) {
        if (redirectableStatusCodes.indexOf(statusCode) === -1) {
          return null;
        }

        for (let i = 0; i < headers.length; i += 2) {
          if (headers[i].length === 8 && headers[i].toString().toLowerCase() === 'location') {
            return headers[i + 1];
          }
        }
      } // https://tools.ietf.org/html/rfc7231#section-6.4.4


      function shouldRemoveHeader(header, removeContent) {
        return header.length === 4 && header.toString().toLowerCase() === 'host' || removeContent && header.toString().toLowerCase().indexOf('content-') === 0;
      } // https://tools.ietf.org/html/rfc7231#section-6.4


      function cleanRequestHeaders(headers, removeContent) {
        const ret = [];

        if (Array.isArray(headers)) {
          for (let i = 0; i < headers.length; i += 2) {
            if (!shouldRemoveHeader(headers[i], removeContent)) {
              ret.push(headers[i], headers[i + 1]);
            }
          }
        } else if (headers && typeof headers === 'object') {
          const keys = Object.keys(headers);

          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];

            if (!shouldRemoveHeader(key, removeContent)) {
              ret.push(key, headers[key]);
            }
          }
        } else if (headers != null) {
          throw new InvalidArgumentError('headers must be an object or an array');
        }

        return ret;
      }

      module.exports = RedirectHandler;
      /***/
    },

    /***/
    953:
    /***/
    (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.SPECIAL_HEADERS = exports.HEADER_STATE = exports.MINOR = exports.MAJOR = exports.CONNECTION_TOKEN_CHARS = exports.HEADER_CHARS = exports.TOKEN = exports.STRICT_TOKEN = exports.HEX = exports.URL_CHAR = exports.STRICT_URL_CHAR = exports.USERINFO_CHARS = exports.MARK = exports.ALPHANUM = exports.NUM = exports.HEX_MAP = exports.NUM_MAP = exports.ALPHA = exports.FINISH = exports.H_METHOD_MAP = exports.METHOD_MAP = exports.METHODS_RTSP = exports.METHODS_ICE = exports.METHODS_HTTP = exports.METHODS = exports.LENIENT_FLAGS = exports.FLAGS = exports.TYPE = exports.ERROR = void 0;

      const utils_1 = __webpack_require__(1891); // C headers


      var ERROR;

      (function (ERROR) {
        ERROR[ERROR["OK"] = 0] = "OK";
        ERROR[ERROR["INTERNAL"] = 1] = "INTERNAL";
        ERROR[ERROR["STRICT"] = 2] = "STRICT";
        ERROR[ERROR["LF_EXPECTED"] = 3] = "LF_EXPECTED";
        ERROR[ERROR["UNEXPECTED_CONTENT_LENGTH"] = 4] = "UNEXPECTED_CONTENT_LENGTH";
        ERROR[ERROR["CLOSED_CONNECTION"] = 5] = "CLOSED_CONNECTION";
        ERROR[ERROR["INVALID_METHOD"] = 6] = "INVALID_METHOD";
        ERROR[ERROR["INVALID_URL"] = 7] = "INVALID_URL";
        ERROR[ERROR["INVALID_CONSTANT"] = 8] = "INVALID_CONSTANT";
        ERROR[ERROR["INVALID_VERSION"] = 9] = "INVALID_VERSION";
        ERROR[ERROR["INVALID_HEADER_TOKEN"] = 10] = "INVALID_HEADER_TOKEN";
        ERROR[ERROR["INVALID_CONTENT_LENGTH"] = 11] = "INVALID_CONTENT_LENGTH";
        ERROR[ERROR["INVALID_CHUNK_SIZE"] = 12] = "INVALID_CHUNK_SIZE";
        ERROR[ERROR["INVALID_STATUS"] = 13] = "INVALID_STATUS";
        ERROR[ERROR["INVALID_EOF_STATE"] = 14] = "INVALID_EOF_STATE";
        ERROR[ERROR["INVALID_TRANSFER_ENCODING"] = 15] = "INVALID_TRANSFER_ENCODING";
        ERROR[ERROR["CB_MESSAGE_BEGIN"] = 16] = "CB_MESSAGE_BEGIN";
        ERROR[ERROR["CB_HEADERS_COMPLETE"] = 17] = "CB_HEADERS_COMPLETE";
        ERROR[ERROR["CB_MESSAGE_COMPLETE"] = 18] = "CB_MESSAGE_COMPLETE";
        ERROR[ERROR["CB_CHUNK_HEADER"] = 19] = "CB_CHUNK_HEADER";
        ERROR[ERROR["CB_CHUNK_COMPLETE"] = 20] = "CB_CHUNK_COMPLETE";
        ERROR[ERROR["PAUSED"] = 21] = "PAUSED";
        ERROR[ERROR["PAUSED_UPGRADE"] = 22] = "PAUSED_UPGRADE";
        ERROR[ERROR["PAUSED_H2_UPGRADE"] = 23] = "PAUSED_H2_UPGRADE";
        ERROR[ERROR["USER"] = 24] = "USER";
      })(ERROR = exports.ERROR || (exports.ERROR = {}));

      var TYPE;

      (function (TYPE) {
        TYPE[TYPE["BOTH"] = 0] = "BOTH";
        TYPE[TYPE["REQUEST"] = 1] = "REQUEST";
        TYPE[TYPE["RESPONSE"] = 2] = "RESPONSE";
      })(TYPE = exports.TYPE || (exports.TYPE = {}));

      var FLAGS;

      (function (FLAGS) {
        FLAGS[FLAGS["CONNECTION_KEEP_ALIVE"] = 1] = "CONNECTION_KEEP_ALIVE";
        FLAGS[FLAGS["CONNECTION_CLOSE"] = 2] = "CONNECTION_CLOSE";
        FLAGS[FLAGS["CONNECTION_UPGRADE"] = 4] = "CONNECTION_UPGRADE";
        FLAGS[FLAGS["CHUNKED"] = 8] = "CHUNKED";
        FLAGS[FLAGS["UPGRADE"] = 16] = "UPGRADE";
        FLAGS[FLAGS["CONTENT_LENGTH"] = 32] = "CONTENT_LENGTH";
        FLAGS[FLAGS["SKIPBODY"] = 64] = "SKIPBODY";
        FLAGS[FLAGS["TRAILING"] = 128] = "TRAILING"; // 1 << 8 is unused

        FLAGS[FLAGS["TRANSFER_ENCODING"] = 512] = "TRANSFER_ENCODING";
      })(FLAGS = exports.FLAGS || (exports.FLAGS = {}));

      var LENIENT_FLAGS;

      (function (LENIENT_FLAGS) {
        LENIENT_FLAGS[LENIENT_FLAGS["HEADERS"] = 1] = "HEADERS";
        LENIENT_FLAGS[LENIENT_FLAGS["CHUNKED_LENGTH"] = 2] = "CHUNKED_LENGTH";
        LENIENT_FLAGS[LENIENT_FLAGS["KEEP_ALIVE"] = 4] = "KEEP_ALIVE";
      })(LENIENT_FLAGS = exports.LENIENT_FLAGS || (exports.LENIENT_FLAGS = {}));

      var METHODS;

      (function (METHODS) {
        METHODS[METHODS["DELETE"] = 0] = "DELETE";
        METHODS[METHODS["GET"] = 1] = "GET";
        METHODS[METHODS["HEAD"] = 2] = "HEAD";
        METHODS[METHODS["POST"] = 3] = "POST";
        METHODS[METHODS["PUT"] = 4] = "PUT";
        /* pathological */

        METHODS[METHODS["CONNECT"] = 5] = "CONNECT";
        METHODS[METHODS["OPTIONS"] = 6] = "OPTIONS";
        METHODS[METHODS["TRACE"] = 7] = "TRACE";
        /* WebDAV */

        METHODS[METHODS["COPY"] = 8] = "COPY";
        METHODS[METHODS["LOCK"] = 9] = "LOCK";
        METHODS[METHODS["MKCOL"] = 10] = "MKCOL";
        METHODS[METHODS["MOVE"] = 11] = "MOVE";
        METHODS[METHODS["PROPFIND"] = 12] = "PROPFIND";
        METHODS[METHODS["PROPPATCH"] = 13] = "PROPPATCH";
        METHODS[METHODS["SEARCH"] = 14] = "SEARCH";
        METHODS[METHODS["UNLOCK"] = 15] = "UNLOCK";
        METHODS[METHODS["BIND"] = 16] = "BIND";
        METHODS[METHODS["REBIND"] = 17] = "REBIND";
        METHODS[METHODS["UNBIND"] = 18] = "UNBIND";
        METHODS[METHODS["ACL"] = 19] = "ACL";
        /* subversion */

        METHODS[METHODS["REPORT"] = 20] = "REPORT";
        METHODS[METHODS["MKACTIVITY"] = 21] = "MKACTIVITY";
        METHODS[METHODS["CHECKOUT"] = 22] = "CHECKOUT";
        METHODS[METHODS["MERGE"] = 23] = "MERGE";
        /* upnp */

        METHODS[METHODS["M-SEARCH"] = 24] = "M-SEARCH";
        METHODS[METHODS["NOTIFY"] = 25] = "NOTIFY";
        METHODS[METHODS["SUBSCRIBE"] = 26] = "SUBSCRIBE";
        METHODS[METHODS["UNSUBSCRIBE"] = 27] = "UNSUBSCRIBE";
        /* RFC-5789 */

        METHODS[METHODS["PATCH"] = 28] = "PATCH";
        METHODS[METHODS["PURGE"] = 29] = "PURGE";
        /* CalDAV */

        METHODS[METHODS["MKCALENDAR"] = 30] = "MKCALENDAR";
        /* RFC-2068, section 19.6.1.2 */

        METHODS[METHODS["LINK"] = 31] = "LINK";
        METHODS[METHODS["UNLINK"] = 32] = "UNLINK";
        /* icecast */

        METHODS[METHODS["SOURCE"] = 33] = "SOURCE";
        /* RFC-7540, section 11.6 */

        METHODS[METHODS["PRI"] = 34] = "PRI";
        /* RFC-2326 RTSP */

        METHODS[METHODS["DESCRIBE"] = 35] = "DESCRIBE";
        METHODS[METHODS["ANNOUNCE"] = 36] = "ANNOUNCE";
        METHODS[METHODS["SETUP"] = 37] = "SETUP";
        METHODS[METHODS["PLAY"] = 38] = "PLAY";
        METHODS[METHODS["PAUSE"] = 39] = "PAUSE";
        METHODS[METHODS["TEARDOWN"] = 40] = "TEARDOWN";
        METHODS[METHODS["GET_PARAMETER"] = 41] = "GET_PARAMETER";
        METHODS[METHODS["SET_PARAMETER"] = 42] = "SET_PARAMETER";
        METHODS[METHODS["REDIRECT"] = 43] = "REDIRECT";
        METHODS[METHODS["RECORD"] = 44] = "RECORD";
        /* RAOP */

        METHODS[METHODS["FLUSH"] = 45] = "FLUSH";
      })(METHODS = exports.METHODS || (exports.METHODS = {}));

      exports.METHODS_HTTP = [METHODS.DELETE, METHODS.GET, METHODS.HEAD, METHODS.POST, METHODS.PUT, METHODS.CONNECT, METHODS.OPTIONS, METHODS.TRACE, METHODS.COPY, METHODS.LOCK, METHODS.MKCOL, METHODS.MOVE, METHODS.PROPFIND, METHODS.PROPPATCH, METHODS.SEARCH, METHODS.UNLOCK, METHODS.BIND, METHODS.REBIND, METHODS.UNBIND, METHODS.ACL, METHODS.REPORT, METHODS.MKACTIVITY, METHODS.CHECKOUT, METHODS.MERGE, METHODS['M-SEARCH'], METHODS.NOTIFY, METHODS.SUBSCRIBE, METHODS.UNSUBSCRIBE, METHODS.PATCH, METHODS.PURGE, METHODS.MKCALENDAR, METHODS.LINK, METHODS.UNLINK, METHODS.PRI, // TODO(indutny): should we allow it with HTTP?
      METHODS.SOURCE];
      exports.METHODS_ICE = [METHODS.SOURCE];
      exports.METHODS_RTSP = [METHODS.OPTIONS, METHODS.DESCRIBE, METHODS.ANNOUNCE, METHODS.SETUP, METHODS.PLAY, METHODS.PAUSE, METHODS.TEARDOWN, METHODS.GET_PARAMETER, METHODS.SET_PARAMETER, METHODS.REDIRECT, METHODS.RECORD, METHODS.FLUSH, // For AirPlay
      METHODS.GET, METHODS.POST];
      exports.METHOD_MAP = utils_1.enumToMap(METHODS);
      exports.H_METHOD_MAP = {};
      Object.keys(exports.METHOD_MAP).forEach(key => {
        if (/^H/.test(key)) {
          exports.H_METHOD_MAP[key] = exports.METHOD_MAP[key];
        }
      });
      var FINISH;

      (function (FINISH) {
        FINISH[FINISH["SAFE"] = 0] = "SAFE";
        FINISH[FINISH["SAFE_WITH_CB"] = 1] = "SAFE_WITH_CB";
        FINISH[FINISH["UNSAFE"] = 2] = "UNSAFE";
      })(FINISH = exports.FINISH || (exports.FINISH = {}));

      exports.ALPHA = [];

      for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
        // Upper case
        exports.ALPHA.push(String.fromCharCode(i)); // Lower case

        exports.ALPHA.push(String.fromCharCode(i + 0x20));
      }

      exports.NUM_MAP = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9
      };
      exports.HEX_MAP = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        A: 0XA,
        B: 0XB,
        C: 0XC,
        D: 0XD,
        E: 0XE,
        F: 0XF,
        a: 0xa,
        b: 0xb,
        c: 0xc,
        d: 0xd,
        e: 0xe,
        f: 0xf
      };
      exports.NUM = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      exports.ALPHANUM = exports.ALPHA.concat(exports.NUM);
      exports.MARK = ['-', '_', '.', '!', '~', '*', '\'', '(', ')'];
      exports.USERINFO_CHARS = exports.ALPHANUM.concat(exports.MARK).concat(['%', ';', ':', '&', '=', '+', '$', ',']); // TODO(indutny): use RFC

      exports.STRICT_URL_CHAR = ['!', '"', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'].concat(exports.ALPHANUM);
      exports.URL_CHAR = exports.STRICT_URL_CHAR.concat(['\t', '\f']); // All characters with 0x80 bit set to 1

      for (let i = 0x80; i <= 0xff; i++) {
        exports.URL_CHAR.push(i);
      }

      exports.HEX = exports.NUM.concat(['a', 'b', 'c', 'd', 'e', 'f', 'A', 'B', 'C', 'D', 'E', 'F']);
      /* Tokens as defined by rfc 2616. Also lowercases them.
       *        token       = 1*<any CHAR except CTLs or separators>
       *     separators     = "(" | ")" | "<" | ">" | "@"
       *                    | "," | ";" | ":" | "\" | <">
       *                    | "/" | "[" | "]" | "?" | "="
       *                    | "{" | "}" | SP | HT
       */

      exports.STRICT_TOKEN = ['!', '#', '$', '%', '&', '\'', '*', '+', '-', '.', '^', '_', '`', '|', '~'].concat(exports.ALPHANUM);
      exports.TOKEN = exports.STRICT_TOKEN.concat([' ']);
      /*
       * Verify that a char is a valid visible (printable) US-ASCII
       * character or %x80-FF
       */

      exports.HEADER_CHARS = ['\t'];

      for (let i = 32; i <= 255; i++) {
        if (i !== 127) {
          exports.HEADER_CHARS.push(i);
        }
      } // ',' = \x44


      exports.CONNECTION_TOKEN_CHARS = exports.HEADER_CHARS.filter(c => c !== 44);
      exports.MAJOR = exports.NUM_MAP;
      exports.MINOR = exports.MAJOR;
      var HEADER_STATE;

      (function (HEADER_STATE) {
        HEADER_STATE[HEADER_STATE["GENERAL"] = 0] = "GENERAL";
        HEADER_STATE[HEADER_STATE["CONNECTION"] = 1] = "CONNECTION";
        HEADER_STATE[HEADER_STATE["CONTENT_LENGTH"] = 2] = "CONTENT_LENGTH";
        HEADER_STATE[HEADER_STATE["TRANSFER_ENCODING"] = 3] = "TRANSFER_ENCODING";
        HEADER_STATE[HEADER_STATE["UPGRADE"] = 4] = "UPGRADE";
        HEADER_STATE[HEADER_STATE["CONNECTION_KEEP_ALIVE"] = 5] = "CONNECTION_KEEP_ALIVE";
        HEADER_STATE[HEADER_STATE["CONNECTION_CLOSE"] = 6] = "CONNECTION_CLOSE";
        HEADER_STATE[HEADER_STATE["CONNECTION_UPGRADE"] = 7] = "CONNECTION_UPGRADE";
        HEADER_STATE[HEADER_STATE["TRANSFER_ENCODING_CHUNKED"] = 8] = "TRANSFER_ENCODING_CHUNKED";
      })(HEADER_STATE = exports.HEADER_STATE || (exports.HEADER_STATE = {}));

      exports.SPECIAL_HEADERS = {
        'connection': HEADER_STATE.CONNECTION,
        'content-length': HEADER_STATE.CONTENT_LENGTH,
        'proxy-connection': HEADER_STATE.CONNECTION,
        'transfer-encoding': HEADER_STATE.TRANSFER_ENCODING,
        'upgrade': HEADER_STATE.UPGRADE
      };
      /***/
    },

    /***/
    1891:
    /***/
    (__unused_webpack_module, exports) => {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.enumToMap = void 0;

      function enumToMap(obj) {
        const res = {};
        Object.keys(obj).forEach(key => {
          const value = obj[key];

          if (typeof value === 'number') {
            res[key] = value;
          }
        });
        return res;
      }

      exports.enumToMap = enumToMap;
      /***/
    },

    /***/
    6771:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const {
        kClients
      } = __webpack_require__(2785);

      const Agent = __webpack_require__(7890);

      const {
        kAgent,
        kMockAgentSet,
        kMockAgentGet,
        kDispatches,
        kIsMockActive,
        kNetConnect,
        kGetNetConnect,
        kOptions,
        kFactory
      } = __webpack_require__(4347);

      const MockClient = __webpack_require__(8687);

      const MockPool = __webpack_require__(6193);

      const {
        matchValue,
        buildMockOptions
      } = __webpack_require__(9323);

      const {
        InvalidArgumentError
      } = __webpack_require__(8045);

      const Dispatcher = __webpack_require__(412);

      const {
        WeakRef
      } = __webpack_require__(6436)();

      class MockAgent extends Dispatcher {
        constructor(opts) {
          super(opts);
          this[kNetConnect] = true;
          this[kIsMockActive] = true; // Instantiate Agent and encapsulate

          if (opts && opts.agent && typeof opts.agent.dispatch !== 'function') {
            throw new InvalidArgumentError('Argument opts.agent must implement Agent');
          }

          const agent = opts && opts.agent ? opts.agent : new Agent(opts);
          this[kAgent] = agent;
          this[kClients] = agent[kClients];
          this[kOptions] = buildMockOptions(opts);
        }

        get(origin) {
          let dispatcher = this[kMockAgentGet](origin);

          if (!dispatcher) {
            dispatcher = this[kFactory](origin);
            this[kMockAgentSet](origin, dispatcher);
          }

          return dispatcher;
        }

        dispatch(opts, handler) {
          // Call MockAgent.get to perform additional setup before dispatching as normal
          this.get(opts.origin);
          return this[kAgent].dispatch(opts, handler);
        }

        async close() {
          await this[kAgent].close();
          this[kClients].clear();
        }

        deactivate() {
          this[kIsMockActive] = false;
        }

        activate() {
          this[kIsMockActive] = true;
        }

        enableNetConnect(matcher) {
          if (typeof matcher === 'string' || typeof matcher === 'function' || matcher instanceof RegExp) {
            if (Array.isArray(this[kNetConnect])) {
              this[kNetConnect].push(matcher);
            } else {
              this[kNetConnect] = [matcher];
            }
          } else if (typeof matcher === 'undefined') {
            this[kNetConnect] = true;
          } else {
            throw new InvalidArgumentError('Unsupported matcher. Must be one of String|Function|RegExp.');
          }
        }

        disableNetConnect() {
          this[kNetConnect] = false;
        }

        [kMockAgentSet](origin, dispatcher) {
          this[kClients].set(origin, new WeakRef(dispatcher));
        }

        [kFactory](origin) {
          const mockOptions = Object.assign({
            agent: this
          }, this[kOptions]);
          return this[kOptions] && this[kOptions].connections === 1 ? new MockClient(origin, mockOptions) : new MockPool(origin, mockOptions);
        }

        [kMockAgentGet](origin) {
          // First check if we can immediately find it
          const ref = this[kClients].get(origin);

          if (ref) {
            return ref.deref();
          } // If the origin is not a string create a dummy parent pool and return to user


          if (typeof origin !== 'string') {
            const dispatcher = this[kFactory]('http://localhost:9999');
            this[kMockAgentSet](origin, dispatcher);
            return dispatcher;
          } // If we match, create a pool and assign the same dispatches


          for (const [keyMatcher, nonExplicitRef] of Array.from(this[kClients])) {
            const nonExplicitDispatcher = nonExplicitRef.deref();

            if (nonExplicitDispatcher && typeof keyMatcher !== 'string' && matchValue(keyMatcher, origin)) {
              const dispatcher = this[kFactory](origin);
              this[kMockAgentSet](origin, dispatcher);
              dispatcher[kDispatches] = nonExplicitDispatcher[kDispatches];
              return dispatcher;
            }
          }
        }

        [kGetNetConnect]() {
          return this[kNetConnect];
        }

      }

      module.exports = MockAgent;
      /***/
    },

    /***/
    8687:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const {
        promisify
      } = __webpack_require__(1669);

      const Client = __webpack_require__(3598);

      const {
        buildMockDispatch
      } = __webpack_require__(9323);

      const {
        kDispatches,
        kMockAgent,
        kClose,
        kOriginalClose,
        kOrigin,
        kOriginalDispatch,
        kConnected
      } = __webpack_require__(4347);

      const {
        MockInterceptor
      } = __webpack_require__(410);

      const Symbols = __webpack_require__(2785);

      const {
        InvalidArgumentError
      } = __webpack_require__(8045);
      /**
       * MockClient provides an API that extends the Client to influence the mockDispatches.
       */


      class MockClient extends Client {
        constructor(origin, opts) {
          super(origin, opts);

          if (!opts || !opts.agent || typeof opts.agent.dispatch !== 'function') {
            throw new InvalidArgumentError('Argument opts.agent must implement Agent');
          }

          this[kMockAgent] = opts.agent;
          this[kOrigin] = origin;
          this[kDispatches] = [];
          this[kConnected] = 1;
          this[kOriginalDispatch] = this.dispatch;
          this[kOriginalClose] = this.close.bind(this);
          this.dispatch = buildMockDispatch.call(this);
          this.close = this[kClose];
        }

        get [Symbols.kConnected]() {
          return this[kConnected];
        }
        /**
         * Sets up the base interceptor for mocking replies from undici.
         */


        intercept(opts) {
          return new MockInterceptor(opts, this[kDispatches]);
        }

        async [kClose]() {
          await promisify(this[kOriginalClose])();
          this[kConnected] = 0;
          this[kMockAgent][Symbols.kClients].delete(this[kOrigin]);
        }

      }

      module.exports = MockClient;
      /***/
    },

    /***/
    888:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const {
        UndiciError
      } = __webpack_require__(8045);

      class MockNotMatchedError extends UndiciError {
        constructor(message) {
          super(message);
          Error.captureStackTrace(this, MockNotMatchedError);
          this.name = 'MockNotMatchedError';
          this.message = message || 'The request does not match any registered mock dispatches';
          this.code = 'UND_MOCK_ERR_MOCK_NOT_MATCHED';
        }

      }

      module.exports = {
        MockNotMatchedError
      };
      /***/
    },

    /***/
    410:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const {
        getResponseData,
        buildKey,
        addMockDispatch
      } = __webpack_require__(9323);

      const {
        kDispatches,
        kDispatchKey,
        kDefaultHeaders,
        kDefaultTrailers,
        kContentLength,
        kMockDispatch
      } = __webpack_require__(4347);

      const {
        InvalidArgumentError
      } = __webpack_require__(8045);
      /**
       * Defines the scope API for a interceptor reply
       */


      class MockScope {
        constructor(mockDispatch) {
          this[kMockDispatch] = mockDispatch;
        }
        /**
         * Delay a reply by a set amount in ms.
         */


        delay(waitInMs) {
          if (typeof waitInMs !== 'number' || !Number.isInteger(waitInMs) || waitInMs <= 0) {
            throw new InvalidArgumentError('waitInMs must be a valid integer > 0');
          }

          this[kMockDispatch].delay = waitInMs;
          return this;
        }
        /**
         * For a defined reply, never mark as consumed.
         */


        persist() {
          this[kMockDispatch].persist = true;
          return this;
        }
        /**
         * Allow one to define a reply for a set amount of matching requests.
         */


        times(repeatTimes) {
          if (typeof repeatTimes !== 'number' || !Number.isInteger(repeatTimes) || repeatTimes <= 0) {
            throw new InvalidArgumentError('repeatTimes must be a valid integer > 0');
          }

          this[kMockDispatch].times = repeatTimes;
          return this;
        }

      }
      /**
       * Defines an interceptor for a Mock
       */


      class MockInterceptor {
        constructor(opts, mockDispatches) {
          if (typeof opts !== 'object') {
            throw new InvalidArgumentError('opts must be an object');
          }

          if (typeof opts.path === 'undefined') {
            throw new InvalidArgumentError('opts.path must be defined');
          }

          if (typeof opts.method === 'undefined') {
            throw new InvalidArgumentError('opts.method must be defined');
          }

          this[kDispatchKey] = buildKey(opts);
          this[kDispatches] = mockDispatches;
          this[kDefaultHeaders] = {};
          this[kDefaultTrailers] = {};
          this[kContentLength] = false;
        }
        /**
         * Mock an undici request with a defined reply.
         */


        reply(statusCode, data, responseOptions = {}) {
          if (typeof statusCode === 'undefined') {
            throw new InvalidArgumentError('statusCode must be defined');
          }

          if (typeof data === 'undefined') {
            throw new InvalidArgumentError('data must be defined');
          }

          if (typeof responseOptions !== 'object') {
            throw new InvalidArgumentError('responseOptions must be an object');
          }

          const responseData = getResponseData(data);
          const contentLength = this[kContentLength] ? {
            'content-length': responseData.length
          } : {};
          const headers = { ...this[kDefaultHeaders],
            ...contentLength,
            ...responseOptions.headers
          };
          const trailers = { ...this[kDefaultTrailers],
            ...responseOptions.trailers
          };
          const newMockDispatch = addMockDispatch(this[kDispatches], this[kDispatchKey], {
            statusCode,
            data,
            headers,
            trailers
          });
          return new MockScope(newMockDispatch);
        }
        /**
         * Mock an undici request with a defined error.
         */


        replyWithError(error) {
          if (typeof error === 'undefined') {
            throw new InvalidArgumentError('error must be defined');
          }

          const newMockDispatch = addMockDispatch(this[kDispatches], this[kDispatchKey], {
            error
          });
          return new MockScope(newMockDispatch);
        }
        /**
         * Set default reply headers on the interceptor for subsequent replies
         */


        defaultReplyHeaders(headers) {
          if (typeof headers === 'undefined') {
            throw new InvalidArgumentError('headers must be defined');
          }

          this[kDefaultHeaders] = headers;
          return this;
        }
        /**
         * Set default reply trailers on the interceptor for subsequent replies
         */


        defaultReplyTrailers(trailers) {
          if (typeof trailers === 'undefined') {
            throw new InvalidArgumentError('trailers must be defined');
          }

          this[kDefaultTrailers] = trailers;
          return this;
        }
        /**
         * Set reply content length header for replies on the interceptor
         */


        replyContentLength() {
          this[kContentLength] = true;
          return this;
        }

      }

      module.exports.MockInterceptor = MockInterceptor;
      module.exports.MockScope = MockScope;
      /***/
    },

    /***/
    6193:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const {
        promisify
      } = __webpack_require__(1669);

      const Pool = __webpack_require__(4634);

      const {
        buildMockDispatch
      } = __webpack_require__(9323);

      const {
        kDispatches,
        kMockAgent,
        kClose,
        kOriginalClose,
        kOrigin,
        kOriginalDispatch,
        kConnected
      } = __webpack_require__(4347);

      const {
        MockInterceptor
      } = __webpack_require__(410);

      const Symbols = __webpack_require__(2785);

      const {
        InvalidArgumentError
      } = __webpack_require__(8045);
      /**
       * MockPool provides an API that extends the Pool to influence the mockDispatches.
       */


      class MockPool extends Pool {
        constructor(origin, opts) {
          super(origin, opts);

          if (!opts || !opts.agent || typeof opts.agent.dispatch !== 'function') {
            throw new InvalidArgumentError('Argument opts.agent must implement Agent');
          }

          this[kMockAgent] = opts.agent;
          this[kOrigin] = origin;
          this[kDispatches] = [];
          this[kConnected] = 1;
          this[kOriginalDispatch] = this.dispatch;
          this[kOriginalClose] = this.close.bind(this);
          this.dispatch = buildMockDispatch.call(this);
          this.close = this[kClose];
        }

        get [Symbols.kConnected]() {
          return this[kConnected];
        }
        /**
         * Sets up the base interceptor for mocking replies from undici.
         */


        intercept(opts) {
          return new MockInterceptor(opts, this[kDispatches]);
        }

        async [kClose]() {
          await promisify(this[kOriginalClose])();
          this[kConnected] = 0;
          this[kMockAgent][Symbols.kClients].delete(this[kOrigin]);
        }

      }

      module.exports = MockPool;
      /***/
    },

    /***/
    4347:
    /***/
    module => {
      "use strict";

      module.exports = {
        kAgent: Symbol('agent'),
        kOptions: Symbol('options'),
        kFactory: Symbol('factory'),
        kDispatches: Symbol('dispatches'),
        kDispatchKey: Symbol('dispatch key'),
        kDefaultHeaders: Symbol('default headers'),
        kDefaultTrailers: Symbol('default trailers'),
        kContentLength: Symbol('content length'),
        kMockAgent: Symbol('mock agent'),
        kMockAgentSet: Symbol('mock agent set'),
        kMockAgentGet: Symbol('mock agent get'),
        kMockDispatch: Symbol('mock dispatch'),
        kClose: Symbol('close'),
        kOriginalClose: Symbol('original agent close'),
        kOrigin: Symbol('origin'),
        kIsMockActive: Symbol('is mock active'),
        kNetConnect: Symbol('net connect'),
        kGetNetConnect: Symbol('get net connect'),
        kConnected: Symbol('connected')
      };
      /***/
    },

    /***/
    9323:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const {
        MockNotMatchedError
      } = __webpack_require__(888);

      const {
        kDispatches,
        kMockAgent,
        kOriginalDispatch,
        kOrigin,
        kIsMockActive,
        kGetNetConnect
      } = __webpack_require__(4347);

      function matchValue(match, value) {
        if (typeof match === 'string') {
          return match === value;
        }

        if (match instanceof RegExp) {
          return match.test(value);
        }

        if (typeof match === 'function') {
          return match(value) === true;
        }

        return false;
      }

      function matchHeaders(mockDispatch, headers) {
        if (typeof mockDispatch.headers === 'undefined') {
          return true;
        }

        if (typeof headers !== 'object' || typeof mockDispatch.headers !== 'object') {
          return false;
        }

        for (const [matchHeaderName, matchHeaderValue] of Object.entries(mockDispatch.headers)) {
          if (!matchValue(matchHeaderValue, headers[matchHeaderName])) {
            return false;
          }
        }

        return true;
      }

      function matchKey(mockDispatch, {
        path,
        method,
        body,
        headers
      }) {
        const pathMatch = matchValue(mockDispatch.path, path);
        const methodMatch = matchValue(mockDispatch.method, method);
        const bodyMatch = typeof mockDispatch.body !== 'undefined' ? matchValue(mockDispatch.body, body) : true;
        const headersMatch = matchHeaders(mockDispatch, headers);
        return pathMatch && methodMatch && bodyMatch && headersMatch;
      }

      function getResponseData(data) {
        return typeof data === 'object' ? JSON.stringify(data) : data.toString();
      }

      function getMockDispatch(mockDispatches, key) {
        // Match path
        let matchedMockDispatches = mockDispatches.filter(({
          consumed
        }) => !consumed).filter(({
          path
        }) => matchValue(path, key.path));

        if (matchedMockDispatches.length === 0) {
          throw new MockNotMatchedError(`Mock dispatch not matched for path '${key.path}'`);
        } // Match method


        matchedMockDispatches = matchedMockDispatches.filter(({
          method
        }) => matchValue(method, key.method));

        if (matchedMockDispatches.length === 0) {
          throw new MockNotMatchedError(`Mock dispatch not matched for method '${key.method}'`);
        } // Match body


        matchedMockDispatches = matchedMockDispatches.filter(({
          body
        }) => typeof body !== 'undefined' ? matchValue(body, key.body) : true);

        if (matchedMockDispatches.length === 0) {
          throw new MockNotMatchedError(`Mock dispatch not matched for body '${key.body}'`);
        } // Match headers


        matchedMockDispatches = matchedMockDispatches.filter(mockDispatch => matchHeaders(mockDispatch, key.headers));

        if (matchedMockDispatches.length === 0) {
          throw new MockNotMatchedError(`Mock dispatch not matched for headers '${typeof key.headers === 'object' ? JSON.stringify(key.headers) : key.headers}'`);
        }

        return matchedMockDispatches[0];
      }

      function addMockDispatch(mockDispatches, key, data) {
        const baseData = {
          times: null,
          persist: false,
          consumed: false
        };
        const newMockDispatch = { ...baseData,
          ...key,
          data: {
            error: null,
            ...data
          }
        };
        mockDispatches.push(newMockDispatch);
        return newMockDispatch;
      }

      function deleteMockDispatch(mockDispatches, key) {
        const index = mockDispatches.findIndex(dispatch => {
          if (!dispatch.consumed) {
            return false;
          }

          return matchKey(dispatch, key);
        });

        if (index !== -1) {
          mockDispatches.splice(index, 1);
        }
      }

      function buildKey(opts) {
        const {
          path,
          method,
          body,
          headers
        } = opts;
        return {
          path,
          method,
          body,
          headers
        };
      }

      function generateKeyValues(data) {
        return Object.entries(data).reduce((keyValuePairs, [key, value]) => [...keyValuePairs, key, value], []);
      }

      async function getResponse(body) {
        const buffers = [];

        for await (const data of body) {
          buffers.push(data);
        }

        return Buffer.concat(buffers).toString('utf8');
      }
      /**
       * Mock dispatch function used to simulate undici dispatches
       */


      function mockDispatch(opts, handler) {
        // Get mock dispatch from built key
        const key = buildKey(opts);
        const mockDispatch = getMockDispatch(this[kDispatches], key); // Parse mockDispatch data

        const {
          data: {
            statusCode,
            data,
            headers,
            trailers,
            error
          },
          delay,
          persist
        } = mockDispatch;
        let {
          times
        } = mockDispatch;

        if (typeof times === 'number' && times > 0) {
          times = --mockDispatch.times;
        } // If persist is true, skip
        // Or if times is a number and > 0, skip
        // Otherwise, mark as consumed


        if (!(persist === true || typeof times === 'number' && times > 0)) {
          mockDispatch.consumed = true;
        } // If specified, trigger dispatch error


        if (error !== null) {
          deleteMockDispatch(this[kDispatches], key);
          handler.onError(error);
          return true;
        } // Handle the request with a delay if necessary


        if (typeof delay === 'number' && delay > 0) {
          setTimeout(() => {
            handleReply(this[kDispatches]);
          }, delay);
        } else {
          handleReply(this[kDispatches]);
        }

        function handleReply(mockDispatches) {
          const responseData = getResponseData(data);
          const responseHeaders = generateKeyValues(headers);
          const responseTrailers = generateKeyValues(trailers);
          handler.onHeaders(statusCode, responseHeaders, resume);
          handler.onData(Buffer.from(responseData));
          handler.onComplete(responseTrailers);
          deleteMockDispatch(mockDispatches, key);
        }

        function resume() {}

        return true;
      }

      function buildMockDispatch() {
        const agent = this[kMockAgent];
        const origin = this[kOrigin];
        const originalDispatch = this[kOriginalDispatch];
        return function dispatch(opts, handler) {
          if (agent[kIsMockActive]) {
            try {
              mockDispatch.call(this, opts, handler);
            } catch (error) {
              if (error instanceof MockNotMatchedError) {
                const netConnect = agent[kGetNetConnect]();

                if (netConnect === false) {
                  throw new MockNotMatchedError(`${error.message}: subsequent request to origin ${origin} was not allowed (net.connect disabled)`);
                }

                if (checkNetConnect(netConnect, origin)) {
                  originalDispatch.call(this, opts, handler);
                } else {
                  throw new MockNotMatchedError(`${error.message}: subsequent request to origin ${origin} was not allowed (net.connect is not enabled for this origin)`);
                }
              } else {
                throw error;
              }
            }
          } else {
            originalDispatch.call(this, opts, handler);
          }
        };
      }

      function checkNetConnect(netConnect, origin) {
        const url = new URL(origin);

        if (netConnect === true) {
          return true;
        } else if (Array.isArray(netConnect) && netConnect.some(matcher => matchValue(matcher, url.host))) {
          return true;
        }

        return false;
      }

      function buildMockOptions(opts) {
        if (opts) {
          const {
            agent,
            ...mockOptions
          } = opts;
          return mockOptions;
        }
      }

      module.exports = {
        getResponseData,
        getMockDispatch,
        addMockDispatch,
        deleteMockDispatch,
        buildKey,
        generateKeyValues,
        matchValue,
        getResponse,
        mockDispatch,
        buildMockDispatch,
        checkNetConnect,
        buildMockOptions
      };
      /***/
    },

    /***/
    8266:
    /***/
    module => {
      "use strict";
      /* eslint-disable */
      // Extracted from node/lib/internal/fixed_queue.js
      // Currently optimal queue size, tested on V8 6.0 - 6.6. Must be power of two.

      const kSize = 2048;
      const kMask = kSize - 1; // The FixedQueue is implemented as a singly-linked list of fixed-size
      // circular buffers. It looks something like this:
      //
      //  head                                                       tail
      //    |                                                          |
      //    v                                                          v
      // +-----------+ <-----\       +-----------+ <------\         +-----------+
      // |  [null]   |        \----- |   next    |         \------- |   next    |
      // +-----------+               +-----------+                  +-----------+
      // |   item    | <-- bottom    |   item    | <-- bottom       |  [empty]  |
      // |   item    |               |   item    |                  |  [empty]  |
      // |   item    |               |   item    |                  |  [empty]  |
      // |   item    |               |   item    |                  |  [empty]  |
      // |   item    |               |   item    |       bottom --> |   item    |
      // |   item    |               |   item    |                  |   item    |
      // |    ...    |               |    ...    |                  |    ...    |
      // |   item    |               |   item    |                  |   item    |
      // |   item    |               |   item    |                  |   item    |
      // |  [empty]  | <-- top       |   item    |                  |   item    |
      // |  [empty]  |               |   item    |                  |   item    |
      // |  [empty]  |               |  [empty]  | <-- top  top --> |  [empty]  |
      // +-----------+               +-----------+                  +-----------+
      //
      // Or, if there is only one circular buffer, it looks something
      // like either of these:
      //
      //  head   tail                                 head   tail
      //    |     |                                     |     |
      //    v     v                                     v     v
      // +-----------+                               +-----------+
      // |  [null]   |                               |  [null]   |
      // +-----------+                               +-----------+
      // |  [empty]  |                               |   item    |
      // |  [empty]  |                               |   item    |
      // |   item    | <-- bottom            top --> |  [empty]  |
      // |   item    |                               |  [empty]  |
      // |  [empty]  | <-- top            bottom --> |   item    |
      // |  [empty]  |                               |   item    |
      // +-----------+                               +-----------+
      //
      // Adding a value means moving `top` forward by one, removing means
      // moving `bottom` forward by one. After reaching the end, the queue
      // wraps around.
      //
      // When `top === bottom` the current queue is empty and when
      // `top + 1 === bottom` it's full. This wastes a single space of storage
      // but allows much quicker checks.

      class FixedCircularBuffer {
        constructor() {
          this.bottom = 0;
          this.top = 0;
          this.list = new Array(kSize);
          this.next = null;
        }

        isEmpty() {
          return this.top === this.bottom;
        }

        isFull() {
          return (this.top + 1 & kMask) === this.bottom;
        }

        push(data) {
          this.list[this.top] = data;
          this.top = this.top + 1 & kMask;
        }

        shift() {
          const nextItem = this.list[this.bottom];
          if (nextItem === undefined) return null;
          this.list[this.bottom] = undefined;
          this.bottom = this.bottom + 1 & kMask;
          return nextItem;
        }

      }

      module.exports = class FixedQueue {
        constructor() {
          this.head = this.tail = new FixedCircularBuffer();
        }

        isEmpty() {
          return this.head.isEmpty();
        }

        push(data) {
          if (this.head.isFull()) {
            // Head is full: Creates a new queue, sets the old queue's `.next` to it,
            // and sets it as the new main queue.
            this.head = this.head.next = new FixedCircularBuffer();
          }

          this.head.push(data);
        }

        shift() {
          const tail = this.tail;
          const next = tail.shift();

          if (tail.isEmpty() && tail.next !== null) {
            // If there is another queue, it forms the new tail.
            this.tail = tail.next;
          }

          return next;
        }

      };
      /***/
    },

    /***/
    4634:
    /***/
    (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";

      const Dispatcher = __webpack_require__(412);

      const Client = __webpack_require__(3598);

      const {
        ClientClosedError,
        InvalidArgumentError,
        ClientDestroyedError
      } = __webpack_require__(8045);

      const FixedQueue = __webpack_require__(8266);

      const util = __webpack_require__(3983);

      const {
        kSize,
        kConnect,
        kRunning,
        kUrl,
        kPending,
        kBusy
      } = __webpack_require__(2785);

      const assert = __webpack_require__(2357);

      const makeConnect = __webpack_require__(2067);

      const kClients = Symbol('clients');
      const kNeedDrain = Symbol('needDrain');
      const kQueue = Symbol('queue');
      const kDestroyed = Symbol('destroyed');
      const kClosedPromise = Symbol('closed promise');
      const kClosedResolve = Symbol('closed resolve');
      const kOptions = Symbol('options');
      const kOnDrain = Symbol('onDrain');
      const kOnConnect = Symbol('onConnect');
      const kOnDisconnect = Symbol('onDisconnect');
      const kConnections = Symbol('connections');
      const kFactory = Symbol('factory');
      const kQueued = Symbol('queued');

      function defaultFactory(origin, opts) {
        return new Client(origin, opts);
      }

      class Pool extends Dispatcher {
        constructor(origin, {
          connections,
          factory = defaultFactory,
          [kConnect]: connect,
          tls,
          socketPath,
          ...options
        } = {}) {
          super();

          if (connections != null && (!Number.isFinite(connections) || connections < 0)) {
            throw new InvalidArgumentError('invalid connections');
          }

          if (typeof factory !== 'function') {
            throw new InvalidArgumentError('factory must be a function.');
          }

          if (connect != null && typeof connect !== 'function') {
            throw new InvalidArgumentError('connect must be a function');
          }

          this[kConnections] = connections || null;
          this[kUrl] = util.parseOrigin(origin);
          this[kOptions] = { ...JSON.parse(JSON.stringify(options)),
            [kConnect]: connect || makeConnect({
              tls,
              socketPath
            })
          };
          this[kQueue] = new FixedQueue();
          this[kClosedPromise] = null;
          this[kClosedResolve] = null;
          this[kDestroyed] = false;
          this[kClients] = [];
          this[kNeedDrain] = false;
          this[kQueued] = 0;
          this[kFactory] = factory;
          const pool = this;

          this[kOnDrain] = function onDrain(url, targets) {
            assert(pool[kUrl].origin === url.origin);
            const queue = pool[kQueue];
            let needDrain = false;

            while (!needDrain) {
              const item = queue.shift();

              if (!item) {
                break;
              }

              pool[kQueued]--;
              needDrain = !this.dispatch(item.opts, item.handler);
            }

            this[kNeedDrain] = needDrain;

            if (!this[kNeedDrain] && pool[kNeedDrain]) {
              pool[kNeedDrain] = false;
              pool.emit('drain', origin, [pool, ...targets]);
            }

            if (pool[kClosedResolve] && queue.isEmpty()) {
              Promise.all(pool[kClients].map(c => c.close())).then(pool[kClosedResolve]);
            }
          };

          this[kOnConnect] = (origin, targets) => {
            pool.emit('connect', origin, [pool, ...targets]);
          };

          this[kOnDisconnect] = (origin, targets, err) => {
            pool.emit('disconnect', origin, [pool, ...targets], err);
          };
        }

        get [kBusy]() {
          return this[kNeedDrain];
        }

        get [kPending]() {
          let ret = this[kQueued];

          for (const {
            [kPending]: pending
          } of this[kClients]) {
            ret += pending;
          }

          return ret;
        }

        get [kRunning]() {
          let ret = 0;

          for (const {
            [kRunning]: running
          } of this[kClients]) {
            ret += running;
          }

          return ret;
        }

        get [kSize]() {
          let ret = this[kQueued];

          for (const {
            [kSize]: size
          } of this[kClients]) {
            ret += size;
          }

          return ret;
        }

        get destroyed() {
          return this[kDestroyed];
        }

        get closed() {
          return this[kClosedPromise] != null;
        }

        dispatch(opts, handler) {
          if (!handler || typeof handler !== 'object') {
            throw new InvalidArgumentError('handler');
          }

          try {
            if (this[kDestroyed]) {
              throw new ClientDestroyedError();
            }

            if (this[kClosedPromise]) {
              throw new ClientClosedError();
            }

            let dispatcher = this[kClients].find(dispatcher => !dispatcher[kNeedDrain]);

            if (!dispatcher) {
              if (!this[kConnections] || this[kClients].length < this[kConnections]) {
                dispatcher = this[kFactory](this[kUrl], this[kOptions]).on('drain', this[kOnDrain]).on('connect', this[kOnConnect]).on('disconnect', this[kOnDisconnect]);
                this[kClients].push(dispatcher);
              }
            }

            if (!dispatcher) {
              this[kNeedDrain] = true;
              this[kQueue].push({
                opts,
                handler
              });
              this[kQueued]++;
            } else if (!dispatcher.dispatch(opts, handler)) {
              dispatcher[kNeedDrain] = true;
              this[kNeedDrain] = this[kConnections] && this[kClients].length === this[kConnections];
            }
          } catch (err) {
            if (typeof handler.onError !== 'function') {
              throw new InvalidArgumentError('invalid onError method');
            }

            handler.onError(err);
          }

          return !this[kNeedDrain];
        }

        close(cb) {
          try {
            if (this[kDestroyed]) {
              throw new ClientDestroyedError();
            }

            if (!this[kClosedPromise]) {
              if (this[kQueue].isEmpty()) {
                this[kClosedPromise] = Promise.all(this[kClients].map(c => c.close()));
              } else {
                this[kClosedPromise] = new Promise(resolve => {
                  this[kClosedResolve] = resolve;
                });
              }

              this[kClosedPromise] = this[kClosedPromise].then(() => {
                this[kDestroyed] = true;
              });
            }

            if (cb) {
              this[kClosedPromise].then(() => cb(null, null));
            } else {
              return this[kClosedPromise];
            }
          } catch (err) {
            if (cb) {
              cb(err);
            } else {
              return Promise.reject(err);
            }
          }
        }

        destroy(err, cb) {
          this[kDestroyed] = true;

          if (typeof err === 'function') {
            cb = err;
            err = null;
          }

          if (!err) {
            err = new ClientDestroyedError();
          }

          while (true) {
            const item = this[kQueue].shift();

            if (!item) {
              break;
            }

            item.handler.onError(err);
          }

          const promise = Promise.all(this[kClients].map(c => c.destroy(err)));

          if (cb) {
            promise.then(() => cb(null, null));
          } else {
            return promise;
          }
        }

      }

      module.exports = Pool;
      /***/
    },

    /***/
    5030:
    /***/
    (__unused_webpack_module, exports) => {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      function getUserAgent() {
        if (typeof navigator === "object" && "userAgent" in navigator) {
          return navigator.userAgent;
        }

        if (typeof process === "object" && "version" in process) {
          return `Node.js/${process.version.substr(1)} (${process.platform}; ${process.arch})`;
        }

        return "<environment undetectable>";
      }

      exports.getUserAgent = getUserAgent;
      /***/
    },

    /***/
    2940:
    /***/
    module => {
      // Returns a wrapper function that returns a wrapped callback
      // The wrapper function should do some stuff, and return a
      // presumably different callback function.
      // This makes sure that own properties are retained, so that
      // decorations and such are not lost along the way.
      module.exports = wrappy;

      function wrappy(fn, cb) {
        if (fn && cb) return wrappy(fn)(cb);
        if (typeof fn !== 'function') throw new TypeError('need wrapper function');
        Object.keys(fn).forEach(function (k) {
          wrapper[k] = fn[k];
        });
        return wrapper;

        function wrapper() {
          var args = new Array(arguments.length);

          for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
          }

          var ret = fn.apply(this, args);
          var cb = args[args.length - 1];

          if (typeof ret === 'function' && ret !== cb) {
            Object.keys(cb).forEach(function (k) {
              ret[k] = cb[k];
            });
          }

          return ret;
        }
      }
      /***/

    },

    /***/
    2877:
    /***/
    module => {
      module.exports = eval("require")("encoding");
      /***/
    },

    /***/
    2357:
    /***/
    module => {
      "use strict";

      module.exports = require("assert");
      ;
      /***/
    },

    /***/
    7303:
    /***/
    module => {
      "use strict";

      module.exports = require("async_hooks");
      ;
      /***/
    },

    /***/
    7082:
    /***/
    module => {
      "use strict";

      module.exports = require("console");
      ;
      /***/
    },

    /***/
    8614:
    /***/
    module => {
      "use strict";

      module.exports = require("events");
      ;
      /***/
    },

    /***/
    5747:
    /***/
    module => {
      "use strict";

      module.exports = require("fs");
      ;
      /***/
    },

    /***/
    8605:
    /***/
    module => {
      "use strict";

      module.exports = require("http");
      ;
      /***/
    },

    /***/
    7211:
    /***/
    module => {
      "use strict";

      module.exports = require("https");
      ;
      /***/
    },

    /***/
    1631:
    /***/
    module => {
      "use strict";

      module.exports = require("net");
      ;
      /***/
    },

    /***/
    2087:
    /***/
    module => {
      "use strict";

      module.exports = require("os");
      ;
      /***/
    },

    /***/
    5622:
    /***/
    module => {
      "use strict";

      module.exports = require("path");
      ;
      /***/
    },

    /***/
    1191:
    /***/
    module => {
      "use strict";

      module.exports = require("querystring");
      ;
      /***/
    },

    /***/
    2413:
    /***/
    module => {
      "use strict";

      module.exports = require("stream");
      ;
      /***/
    },

    /***/
    4016:
    /***/
    module => {
      "use strict";

      module.exports = require("tls");
      ;
      /***/
    },

    /***/
    8835:
    /***/
    module => {
      "use strict";

      module.exports = require("url");
      ;
      /***/
    },

    /***/
    1669:
    /***/
    module => {
      "use strict";

      module.exports = require("util");
      ;
      /***/
    },

    /***/
    8761:
    /***/
    module => {
      "use strict";

      module.exports = require("zlib");
      ;
      /***/
    }
    /******/

  };
  /************************************************************************/

  /******/
  // The module cache

  /******/

  var __webpack_module_cache__ = {};
  /******/

  /******/
  // The require function

  /******/

  function __webpack_require__(moduleId) {
    /******/
    // Check if module is in cache

    /******/
    if (__webpack_module_cache__[moduleId]) {
      /******/
      return __webpack_module_cache__[moduleId].exports;
      /******/
    }
    /******/
    // Create a new module (and put it into the cache)

    /******/


    var module = __webpack_module_cache__[moduleId] = {
      /******/
      // no module.id needed

      /******/
      // no module.loaded needed

      /******/
      exports: {}
      /******/

    };
    /******/

    /******/
    // Execute the module function

    /******/

    var threw = true;
    /******/

    try {
      /******/
      __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      /******/


      threw = false;
      /******/
    } finally {
      /******/
      if (threw) delete __webpack_module_cache__[moduleId];
      /******/
    }
    /******/

    /******/
    // Return the exports of the module

    /******/


    return module.exports;
    /******/
  }
  /******/

  /************************************************************************/

  /******/

  /* webpack/runtime/define property getters */

  /******/


  (() => {
    /******/
    // define getter functions for harmony exports

    /******/
    __webpack_require__.d = (exports, definition) => {
      /******/
      for (var key in definition) {
        /******/
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          /******/
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key]
          });
          /******/
        }
        /******/

      }
      /******/

    };
    /******/

  })();
  /******/

  /******/

  /* webpack/runtime/hasOwnProperty shorthand */

  /******/


  (() => {
    /******/
    __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    /******/

  })();
  /******/

  /******/

  /* webpack/runtime/make namespace object */

  /******/


  (() => {
    /******/
    // define __esModule on exports

    /******/
    __webpack_require__.r = exports => {
      /******/
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
        /******/
      }
      /******/


      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      /******/
    };
    /******/

  })();
  /******/

  /******/

  /* webpack/runtime/compat */

  /******/

  /******/


  __webpack_require__.ab = __dirname + "/";
  /************************************************************************/

  /******/
  // module exports must be returned from runtime so entry inlining is disabled

  /******/
  // startup

  /******/
  // Load entry module and return exports

  /******/

  return __webpack_require__(3109);
  /******/
})();