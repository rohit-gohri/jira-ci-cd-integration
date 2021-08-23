require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 141:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const process = __nccwpck_require__(1765); // eslint-disable-line node/prefer-global/process
const git = __nccwpck_require__(3866);

const services = {
  appveyor: __nccwpck_require__(9439),
  bamboo: __nccwpck_require__(8578),
  bitbucket: __nccwpck_require__(5286),
  bitrise: __nccwpck_require__(1542),
  buddy: __nccwpck_require__(7955),
  buildkite: __nccwpck_require__(512),
  circleci: __nccwpck_require__(4257),
  cirrus: __nccwpck_require__(3796),
  codebuild: __nccwpck_require__(5080),
  codefresh: __nccwpck_require__(2902),
  codeship: __nccwpck_require__(896),
  drone: __nccwpck_require__(1384),
  github: __nccwpck_require__(5562),
  gitlab: __nccwpck_require__(4095),
  jenkins: __nccwpck_require__(704),
  puppet: __nccwpck_require__(9619),
  netlify: __nccwpck_require__(3331),
  sail: __nccwpck_require__(6148),
  scrutinizer: __nccwpck_require__(406),
  semaphore: __nccwpck_require__(5736),
  shippable: __nccwpck_require__(2907),
  teamcity: __nccwpck_require__(2355),
  travis: __nccwpck_require__(9445),
  vercel: __nccwpck_require__(2263),
  vsts: __nccwpck_require__(3746),
  wercker: __nccwpck_require__(1562),
};

module.exports = ({env = process.env, cwd = process.cwd()} = {}) => {
  for (const name of Object.keys(services)) {
    if (services[name].detect({env, cwd})) {
      return {isCi: true, ...services[name].configuration({env, cwd})};
    }
  }

  return {isCi: Boolean(env.CI), ...git.configuration({env, cwd})};
};


/***/ }),

/***/ 533:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const execa = __nccwpck_require__(5098);

function head(options) {
  try {
    return execa.sync('git', ['rev-parse', 'HEAD'], options).stdout;
  } catch (_) {
    return undefined;
  }
}

function branch(options) {
  try {
    const headRef = execa.sync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], options).stdout;

    if (headRef === 'HEAD') {
      const branch = execa
        .sync('git', ['show', '-s', '--pretty=%d', 'HEAD'], options)
        .stdout.replace(/^\(|\)$/g, '')
        .split(', ')
        .find(branch => branch.startsWith('origin/'));
      return branch ? branch.match(/^origin\/(?<branch>.+)/)[1] : undefined;
    }

    return headRef;
  } catch (_) {
    return undefined;
  }
}

module.exports = {head, branch};


/***/ }),

/***/ 1102:
/***/ ((module) => {

function prNumber(pr) {
  return (/\d+(?!.*\d+)/.exec(pr) || [])[0];
}

function parseBranch(branch) {
  return branch ? /^(?:refs\/heads\/)?(?<branch>.+)$/i.exec(branch)[1] : undefined;
}

module.exports = {prNumber, parseBranch};


/***/ }),

/***/ 5098:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const path = __nccwpck_require__(5622);
const childProcess = __nccwpck_require__(3129);
const crossSpawn = __nccwpck_require__(2746);
const stripFinalNewline = __nccwpck_require__(8174);
const npmRunPath = __nccwpck_require__(502);
const onetime = __nccwpck_require__(9082);
const makeError = __nccwpck_require__(4919);
const normalizeStdio = __nccwpck_require__(1284);
const {spawnedKill, spawnedCancel, setupTimeout, setExitHandler} = __nccwpck_require__(89);
const {handleInput, getSpawnedResult, makeAllStream, validateInputSync} = __nccwpck_require__(1073);
const {mergePromise, getSpawnedPromise} = __nccwpck_require__(1059);
const {joinCommand, parseCommand} = __nccwpck_require__(3416);

const DEFAULT_MAX_BUFFER = 1000 * 1000 * 100;

const getEnv = ({env: envOption, extendEnv, preferLocal, localDir, execPath}) => {
	const env = extendEnv ? {...process.env, ...envOption} : envOption;

	if (preferLocal) {
		return npmRunPath.env({env, cwd: localDir, execPath});
	}

	return env;
};

const handleArguments = (file, args, options = {}) => {
	const parsed = crossSpawn._parse(file, args, options);
	file = parsed.command;
	args = parsed.args;
	options = parsed.options;

	options = {
		maxBuffer: DEFAULT_MAX_BUFFER,
		buffer: true,
		stripFinalNewline: true,
		extendEnv: true,
		preferLocal: false,
		localDir: options.cwd || process.cwd(),
		execPath: process.execPath,
		encoding: 'utf8',
		reject: true,
		cleanup: true,
		all: false,
		windowsHide: true,
		...options
	};

	options.env = getEnv(options);

	options.stdio = normalizeStdio(options);

	if (process.platform === 'win32' && path.basename(file, '.exe') === 'cmd') {
		// #116
		args.unshift('/q');
	}

	return {file, args, options, parsed};
};

const handleOutput = (options, value, error) => {
	if (typeof value !== 'string' && !Buffer.isBuffer(value)) {
		// When `execa.sync()` errors, we normalize it to '' to mimic `execa()`
		return error === undefined ? undefined : '';
	}

	if (options.stripFinalNewline) {
		return stripFinalNewline(value);
	}

	return value;
};

const execa = (file, args, options) => {
	const parsed = handleArguments(file, args, options);
	const command = joinCommand(file, args);

	let spawned;
	try {
		spawned = childProcess.spawn(parsed.file, parsed.args, parsed.options);
	} catch (error) {
		// Ensure the returned error is always both a promise and a child process
		const dummySpawned = new childProcess.ChildProcess();
		const errorPromise = Promise.reject(makeError({
			error,
			stdout: '',
			stderr: '',
			all: '',
			command,
			parsed,
			timedOut: false,
			isCanceled: false,
			killed: false
		}));
		return mergePromise(dummySpawned, errorPromise);
	}

	const spawnedPromise = getSpawnedPromise(spawned);
	const timedPromise = setupTimeout(spawned, parsed.options, spawnedPromise);
	const processDone = setExitHandler(spawned, parsed.options, timedPromise);

	const context = {isCanceled: false};

	spawned.kill = spawnedKill.bind(null, spawned.kill.bind(spawned));
	spawned.cancel = spawnedCancel.bind(null, spawned, context);

	const handlePromise = async () => {
		const [{error, exitCode, signal, timedOut}, stdoutResult, stderrResult, allResult] = await getSpawnedResult(spawned, parsed.options, processDone);
		const stdout = handleOutput(parsed.options, stdoutResult);
		const stderr = handleOutput(parsed.options, stderrResult);
		const all = handleOutput(parsed.options, allResult);

		if (error || exitCode !== 0 || signal !== null) {
			const returnedError = makeError({
				error,
				exitCode,
				signal,
				stdout,
				stderr,
				all,
				command,
				parsed,
				timedOut,
				isCanceled: context.isCanceled,
				killed: spawned.killed
			});

			if (!parsed.options.reject) {
				return returnedError;
			}

			throw returnedError;
		}

		return {
			command,
			exitCode: 0,
			stdout,
			stderr,
			all,
			failed: false,
			timedOut: false,
			isCanceled: false,
			killed: false
		};
	};

	const handlePromiseOnce = onetime(handlePromise);

	crossSpawn._enoent.hookChildProcess(spawned, parsed.parsed);

	handleInput(spawned, parsed.options.input);

	spawned.all = makeAllStream(spawned, parsed.options);

	return mergePromise(spawned, handlePromiseOnce);
};

module.exports = execa;

module.exports.sync = (file, args, options) => {
	const parsed = handleArguments(file, args, options);
	const command = joinCommand(file, args);

	validateInputSync(parsed.options);

	let result;
	try {
		result = childProcess.spawnSync(parsed.file, parsed.args, parsed.options);
	} catch (error) {
		throw makeError({
			error,
			stdout: '',
			stderr: '',
			all: '',
			command,
			parsed,
			timedOut: false,
			isCanceled: false,
			killed: false
		});
	}

	const stdout = handleOutput(parsed.options, result.stdout, result.error);
	const stderr = handleOutput(parsed.options, result.stderr, result.error);

	if (result.error || result.status !== 0 || result.signal !== null) {
		const error = makeError({
			stdout,
			stderr,
			error: result.error,
			signal: result.signal,
			exitCode: result.status,
			command,
			parsed,
			timedOut: result.error && result.error.code === 'ETIMEDOUT',
			isCanceled: false,
			killed: result.signal !== null
		});

		if (!parsed.options.reject) {
			return error;
		}

		throw error;
	}

	return {
		command,
		exitCode: 0,
		stdout,
		stderr,
		failed: false,
		timedOut: false,
		isCanceled: false,
		killed: false
	};
};

module.exports.command = (command, options) => {
	const [file, ...args] = parseCommand(command);
	return execa(file, args, options);
};

module.exports.commandSync = (command, options) => {
	const [file, ...args] = parseCommand(command);
	return execa.sync(file, args, options);
};

module.exports.node = (scriptPath, args, options = {}) => {
	if (args && !Array.isArray(args) && typeof args === 'object') {
		options = args;
		args = [];
	}

	const stdio = normalizeStdio.node(options);
	const defaultExecArgv = process.execArgv.filter(arg => !arg.startsWith('--inspect'));

	const {
		nodePath = process.execPath,
		nodeOptions = defaultExecArgv
	} = options;

	return execa(
		nodePath,
		[
			...nodeOptions,
			scriptPath,
			...(Array.isArray(args) ? args : [])
		],
		{
			...options,
			stdin: undefined,
			stdout: undefined,
			stderr: undefined,
			stdio,
			shell: false
		}
	);
};


/***/ }),

/***/ 3416:
/***/ ((module) => {

"use strict";

const SPACES_REGEXP = / +/g;

const joinCommand = (file, args = []) => {
	if (!Array.isArray(args)) {
		return file;
	}

	return [file, ...args].join(' ');
};

// Handle `execa.command()`
const parseCommand = command => {
	const tokens = [];
	for (const token of command.trim().split(SPACES_REGEXP)) {
		// Allow spaces to be escaped by a backslash if not meant as a delimiter
		const previousToken = tokens[tokens.length - 1];
		if (previousToken && previousToken.endsWith('\\')) {
			// Merge previous token with current one
			tokens[tokens.length - 1] = `${previousToken.slice(0, -1)} ${token}`;
		} else {
			tokens.push(token);
		}
	}

	return tokens;
};

module.exports = {
	joinCommand,
	parseCommand
};


/***/ }),

/***/ 4919:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const {signalsByName} = __nccwpck_require__(3927);

const getErrorPrefix = ({timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled}) => {
	if (timedOut) {
		return `timed out after ${timeout} milliseconds`;
	}

	if (isCanceled) {
		return 'was canceled';
	}

	if (errorCode !== undefined) {
		return `failed with ${errorCode}`;
	}

	if (signal !== undefined) {
		return `was killed with ${signal} (${signalDescription})`;
	}

	if (exitCode !== undefined) {
		return `failed with exit code ${exitCode}`;
	}

	return 'failed';
};

const makeError = ({
	stdout,
	stderr,
	all,
	error,
	signal,
	exitCode,
	command,
	timedOut,
	isCanceled,
	killed,
	parsed: {options: {timeout}}
}) => {
	// `signal` and `exitCode` emitted on `spawned.on('exit')` event can be `null`.
	// We normalize them to `undefined`
	exitCode = exitCode === null ? undefined : exitCode;
	signal = signal === null ? undefined : signal;
	const signalDescription = signal === undefined ? undefined : signalsByName[signal].description;

	const errorCode = error && error.code;

	const prefix = getErrorPrefix({timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled});
	const execaMessage = `Command ${prefix}: ${command}`;
	const isError = Object.prototype.toString.call(error) === '[object Error]';
	const shortMessage = isError ? `${execaMessage}\n${error.message}` : execaMessage;
	const message = [shortMessage, stderr, stdout].filter(Boolean).join('\n');

	if (isError) {
		error.originalMessage = error.message;
		error.message = message;
	} else {
		error = new Error(message);
	}

	error.shortMessage = shortMessage;
	error.command = command;
	error.exitCode = exitCode;
	error.signal = signal;
	error.signalDescription = signalDescription;
	error.stdout = stdout;
	error.stderr = stderr;

	if (all !== undefined) {
		error.all = all;
	}

	if ('bufferedData' in error) {
		delete error.bufferedData;
	}

	error.failed = true;
	error.timedOut = Boolean(timedOut);
	error.isCanceled = isCanceled;
	error.killed = killed && !timedOut;

	return error;
};

module.exports = makeError;


/***/ }),

/***/ 89:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const os = __nccwpck_require__(2087);
const onExit = __nccwpck_require__(4931);

const DEFAULT_FORCE_KILL_TIMEOUT = 1000 * 5;

// Monkey-patches `childProcess.kill()` to add `forceKillAfterTimeout` behavior
const spawnedKill = (kill, signal = 'SIGTERM', options = {}) => {
	const killResult = kill(signal);
	setKillTimeout(kill, signal, options, killResult);
	return killResult;
};

const setKillTimeout = (kill, signal, options, killResult) => {
	if (!shouldForceKill(signal, options, killResult)) {
		return;
	}

	const timeout = getForceKillAfterTimeout(options);
	const t = setTimeout(() => {
		kill('SIGKILL');
	}, timeout);

	// Guarded because there's no `.unref()` when `execa` is used in the renderer
	// process in Electron. This cannot be tested since we don't run tests in
	// Electron.
	// istanbul ignore else
	if (t.unref) {
		t.unref();
	}
};

const shouldForceKill = (signal, {forceKillAfterTimeout}, killResult) => {
	return isSigterm(signal) && forceKillAfterTimeout !== false && killResult;
};

const isSigterm = signal => {
	return signal === os.constants.signals.SIGTERM ||
		(typeof signal === 'string' && signal.toUpperCase() === 'SIGTERM');
};

const getForceKillAfterTimeout = ({forceKillAfterTimeout = true}) => {
	if (forceKillAfterTimeout === true) {
		return DEFAULT_FORCE_KILL_TIMEOUT;
	}

	if (!Number.isFinite(forceKillAfterTimeout) || forceKillAfterTimeout < 0) {
		throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${forceKillAfterTimeout}\` (${typeof forceKillAfterTimeout})`);
	}

	return forceKillAfterTimeout;
};

// `childProcess.cancel()`
const spawnedCancel = (spawned, context) => {
	const killResult = spawned.kill();

	if (killResult) {
		context.isCanceled = true;
	}
};

const timeoutKill = (spawned, signal, reject) => {
	spawned.kill(signal);
	reject(Object.assign(new Error('Timed out'), {timedOut: true, signal}));
};

// `timeout` option handling
const setupTimeout = (spawned, {timeout, killSignal = 'SIGTERM'}, spawnedPromise) => {
	if (timeout === 0 || timeout === undefined) {
		return spawnedPromise;
	}

	if (!Number.isFinite(timeout) || timeout < 0) {
		throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${timeout}\` (${typeof timeout})`);
	}

	let timeoutId;
	const timeoutPromise = new Promise((resolve, reject) => {
		timeoutId = setTimeout(() => {
			timeoutKill(spawned, killSignal, reject);
		}, timeout);
	});

	const safeSpawnedPromise = spawnedPromise.finally(() => {
		clearTimeout(timeoutId);
	});

	return Promise.race([timeoutPromise, safeSpawnedPromise]);
};

// `cleanup` option handling
const setExitHandler = async (spawned, {cleanup, detached}, timedPromise) => {
	if (!cleanup || detached) {
		return timedPromise;
	}

	const removeExitHandler = onExit(() => {
		spawned.kill();
	});

	return timedPromise.finally(() => {
		removeExitHandler();
	});
};

module.exports = {
	spawnedKill,
	spawnedCancel,
	setupTimeout,
	setExitHandler
};


/***/ }),

/***/ 1059:
/***/ ((module) => {

"use strict";


const nativePromisePrototype = (async () => {})().constructor.prototype;
const descriptors = ['then', 'catch', 'finally'].map(property => [
	property,
	Reflect.getOwnPropertyDescriptor(nativePromisePrototype, property)
]);

// The return value is a mixin of `childProcess` and `Promise`
const mergePromise = (spawned, promise) => {
	for (const [property, descriptor] of descriptors) {
		// Starting the main `promise` is deferred to avoid consuming streams
		const value = typeof promise === 'function' ?
			(...args) => Reflect.apply(descriptor.value, promise(), args) :
			descriptor.value.bind(promise);

		Reflect.defineProperty(spawned, property, {...descriptor, value});
	}

	return spawned;
};

// Use promises instead of `child_process` events
const getSpawnedPromise = spawned => {
	return new Promise((resolve, reject) => {
		spawned.on('exit', (exitCode, signal) => {
			resolve({exitCode, signal});
		});

		spawned.on('error', error => {
			reject(error);
		});

		if (spawned.stdin) {
			spawned.stdin.on('error', error => {
				reject(error);
			});
		}
	});
};

module.exports = {
	mergePromise,
	getSpawnedPromise
};



/***/ }),

/***/ 1284:
/***/ ((module) => {

"use strict";

const aliases = ['stdin', 'stdout', 'stderr'];

const hasAlias = opts => aliases.some(alias => opts[alias] !== undefined);

const normalizeStdio = opts => {
	if (!opts) {
		return;
	}

	const {stdio} = opts;

	if (stdio === undefined) {
		return aliases.map(alias => opts[alias]);
	}

	if (hasAlias(opts)) {
		throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${aliases.map(alias => `\`${alias}\``).join(', ')}`);
	}

	if (typeof stdio === 'string') {
		return stdio;
	}

	if (!Array.isArray(stdio)) {
		throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
	}

	const length = Math.max(stdio.length, aliases.length);
	return Array.from({length}, (value, index) => stdio[index]);
};

module.exports = normalizeStdio;

// `ipc` is pushed unless it is already present
module.exports.node = opts => {
	const stdio = normalizeStdio(opts);

	if (stdio === 'ipc') {
		return 'ipc';
	}

	if (stdio === undefined || typeof stdio === 'string') {
		return [stdio, stdio, stdio, 'ipc'];
	}

	if (stdio.includes('ipc')) {
		return stdio;
	}

	return [...stdio, 'ipc'];
};


/***/ }),

/***/ 1073:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const isStream = __nccwpck_require__(1554);
const getStream = __nccwpck_require__(898);
const mergeStream = __nccwpck_require__(2621);

// `input` option
const handleInput = (spawned, input) => {
	// Checking for stdin is workaround for https://github.com/nodejs/node/issues/26852
	// TODO: Remove `|| spawned.stdin === undefined` once we drop support for Node.js <=12.2.0
	if (input === undefined || spawned.stdin === undefined) {
		return;
	}

	if (isStream(input)) {
		input.pipe(spawned.stdin);
	} else {
		spawned.stdin.end(input);
	}
};

// `all` interleaves `stdout` and `stderr`
const makeAllStream = (spawned, {all}) => {
	if (!all || (!spawned.stdout && !spawned.stderr)) {
		return;
	}

	const mixed = mergeStream();

	if (spawned.stdout) {
		mixed.add(spawned.stdout);
	}

	if (spawned.stderr) {
		mixed.add(spawned.stderr);
	}

	return mixed;
};

// On failure, `result.stdout|stderr|all` should contain the currently buffered stream
const getBufferedData = async (stream, streamPromise) => {
	if (!stream) {
		return;
	}

	stream.destroy();

	try {
		return await streamPromise;
	} catch (error) {
		return error.bufferedData;
	}
};

const getStreamPromise = (stream, {encoding, buffer, maxBuffer}) => {
	if (!stream || !buffer) {
		return;
	}

	if (encoding) {
		return getStream(stream, {encoding, maxBuffer});
	}

	return getStream.buffer(stream, {maxBuffer});
};

// Retrieve result of child process: exit code, signal, error, streams (stdout/stderr/all)
const getSpawnedResult = async ({stdout, stderr, all}, {encoding, buffer, maxBuffer}, processDone) => {
	const stdoutPromise = getStreamPromise(stdout, {encoding, buffer, maxBuffer});
	const stderrPromise = getStreamPromise(stderr, {encoding, buffer, maxBuffer});
	const allPromise = getStreamPromise(all, {encoding, buffer, maxBuffer: maxBuffer * 2});

	try {
		return await Promise.all([processDone, stdoutPromise, stderrPromise, allPromise]);
	} catch (error) {
		return Promise.all([
			{error, signal: error.signal, timedOut: error.timedOut},
			getBufferedData(stdout, stdoutPromise),
			getBufferedData(stderr, stderrPromise),
			getBufferedData(all, allPromise)
		]);
	}
};

const validateInputSync = ({input}) => {
	if (isStream(input)) {
		throw new TypeError('The `input` option cannot be a stream in sync mode');
	}
};

module.exports = {
	handleInput,
	makeAllStream,
	getSpawnedResult,
	validateInputSync
};



/***/ }),

/***/ 8498:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const {PassThrough: PassThroughStream} = __nccwpck_require__(2413);

module.exports = options => {
	options = {...options};

	const {array} = options;
	let {encoding} = options;
	const isBuffer = encoding === 'buffer';
	let objectMode = false;

	if (array) {
		objectMode = !(encoding || isBuffer);
	} else {
		encoding = encoding || 'utf8';
	}

	if (isBuffer) {
		encoding = null;
	}

	const stream = new PassThroughStream({objectMode});

	if (encoding) {
		stream.setEncoding(encoding);
	}

	let length = 0;
	const chunks = [];

	stream.on('data', chunk => {
		chunks.push(chunk);

		if (objectMode) {
			length = chunks.length;
		} else {
			length += chunk.length;
		}
	});

	stream.getBufferedValue = () => {
		if (array) {
			return chunks;
		}

		return isBuffer ? Buffer.concat(chunks, length) : chunks.join('');
	};

	stream.getBufferedLength = () => length;

	return stream;
};


/***/ }),

/***/ 898:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const {constants: BufferConstants} = __nccwpck_require__(4293);
const pump = __nccwpck_require__(8341);
const bufferStream = __nccwpck_require__(8498);

class MaxBufferError extends Error {
	constructor() {
		super('maxBuffer exceeded');
		this.name = 'MaxBufferError';
	}
}

async function getStream(inputStream, options) {
	if (!inputStream) {
		return Promise.reject(new Error('Expected a stream'));
	}

	options = {
		maxBuffer: Infinity,
		...options
	};

	const {maxBuffer} = options;

	let stream;
	await new Promise((resolve, reject) => {
		const rejectPromise = error => {
			// Don't retrieve an oversized buffer.
			if (error && stream.getBufferedLength() <= BufferConstants.MAX_LENGTH) {
				error.bufferedData = stream.getBufferedValue();
			}

			reject(error);
		};

		stream = pump(inputStream, bufferStream(options), error => {
			if (error) {
				rejectPromise(error);
				return;
			}

			resolve();
		});

		stream.on('data', () => {
			if (stream.getBufferedLength() > maxBuffer) {
				rejectPromise(new MaxBufferError());
			}
		});
	});

	return stream.getBufferedValue();
}

module.exports = getStream;
// TODO: Remove this for the next major release
module.exports.default = getStream;
module.exports.buffer = (stream, options) => getStream(stream, {...options, encoding: 'buffer'});
module.exports.array = (stream, options) => getStream(stream, {...options, array: true});
module.exports.MaxBufferError = MaxBufferError;


/***/ }),

/***/ 5687:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.SIGNALS=void 0;

const SIGNALS=[
{
name:"SIGHUP",
number:1,
action:"terminate",
description:"Terminal closed",
standard:"posix"},

{
name:"SIGINT",
number:2,
action:"terminate",
description:"User interruption with CTRL-C",
standard:"ansi"},

{
name:"SIGQUIT",
number:3,
action:"core",
description:"User interruption with CTRL-\\",
standard:"posix"},

{
name:"SIGILL",
number:4,
action:"core",
description:"Invalid machine instruction",
standard:"ansi"},

{
name:"SIGTRAP",
number:5,
action:"core",
description:"Debugger breakpoint",
standard:"posix"},

{
name:"SIGABRT",
number:6,
action:"core",
description:"Aborted",
standard:"ansi"},

{
name:"SIGIOT",
number:6,
action:"core",
description:"Aborted",
standard:"bsd"},

{
name:"SIGBUS",
number:7,
action:"core",
description:
"Bus error due to misaligned, non-existing address or paging error",
standard:"bsd"},

{
name:"SIGEMT",
number:7,
action:"terminate",
description:"Command should be emulated but is not implemented",
standard:"other"},

{
name:"SIGFPE",
number:8,
action:"core",
description:"Floating point arithmetic error",
standard:"ansi"},

{
name:"SIGKILL",
number:9,
action:"terminate",
description:"Forced termination",
standard:"posix",
forced:true},

{
name:"SIGUSR1",
number:10,
action:"terminate",
description:"Application-specific signal",
standard:"posix"},

{
name:"SIGSEGV",
number:11,
action:"core",
description:"Segmentation fault",
standard:"ansi"},

{
name:"SIGUSR2",
number:12,
action:"terminate",
description:"Application-specific signal",
standard:"posix"},

{
name:"SIGPIPE",
number:13,
action:"terminate",
description:"Broken pipe or socket",
standard:"posix"},

{
name:"SIGALRM",
number:14,
action:"terminate",
description:"Timeout or timer",
standard:"posix"},

{
name:"SIGTERM",
number:15,
action:"terminate",
description:"Termination",
standard:"ansi"},

{
name:"SIGSTKFLT",
number:16,
action:"terminate",
description:"Stack is empty or overflowed",
standard:"other"},

{
name:"SIGCHLD",
number:17,
action:"ignore",
description:"Child process terminated, paused or unpaused",
standard:"posix"},

{
name:"SIGCLD",
number:17,
action:"ignore",
description:"Child process terminated, paused or unpaused",
standard:"other"},

{
name:"SIGCONT",
number:18,
action:"unpause",
description:"Unpaused",
standard:"posix",
forced:true},

{
name:"SIGSTOP",
number:19,
action:"pause",
description:"Paused",
standard:"posix",
forced:true},

{
name:"SIGTSTP",
number:20,
action:"pause",
description:"Paused using CTRL-Z or \"suspend\"",
standard:"posix"},

{
name:"SIGTTIN",
number:21,
action:"pause",
description:"Background process cannot read terminal input",
standard:"posix"},

{
name:"SIGBREAK",
number:21,
action:"terminate",
description:"User interruption with CTRL-BREAK",
standard:"other"},

{
name:"SIGTTOU",
number:22,
action:"pause",
description:"Background process cannot write to terminal output",
standard:"posix"},

{
name:"SIGURG",
number:23,
action:"ignore",
description:"Socket received out-of-band data",
standard:"bsd"},

{
name:"SIGXCPU",
number:24,
action:"core",
description:"Process timed out",
standard:"bsd"},

{
name:"SIGXFSZ",
number:25,
action:"core",
description:"File too big",
standard:"bsd"},

{
name:"SIGVTALRM",
number:26,
action:"terminate",
description:"Timeout or timer",
standard:"bsd"},

{
name:"SIGPROF",
number:27,
action:"terminate",
description:"Timeout or timer",
standard:"bsd"},

{
name:"SIGWINCH",
number:28,
action:"ignore",
description:"Terminal window size changed",
standard:"bsd"},

{
name:"SIGIO",
number:29,
action:"terminate",
description:"I/O is available",
standard:"other"},

{
name:"SIGPOLL",
number:29,
action:"terminate",
description:"Watched event",
standard:"other"},

{
name:"SIGINFO",
number:29,
action:"ignore",
description:"Request for process information",
standard:"other"},

{
name:"SIGPWR",
number:30,
action:"terminate",
description:"Device running out of power",
standard:"systemv"},

{
name:"SIGSYS",
number:31,
action:"core",
description:"Invalid system call",
standard:"other"},

{
name:"SIGUNUSED",
number:31,
action:"terminate",
description:"Invalid system call",
standard:"other"}];exports.SIGNALS=SIGNALS;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 3927:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.signalsByNumber=exports.signalsByName=void 0;var _os=__nccwpck_require__(2087);

var _signals=__nccwpck_require__(7928);
var _realtime=__nccwpck_require__(697);



const getSignalsByName=function(){
const signals=(0,_signals.getSignals)();
return signals.reduce(getSignalByName,{});
};

const getSignalByName=function(
signalByNameMemo,
{name,number,description,supported,action,forced,standard})
{
return{
...signalByNameMemo,
[name]:{name,number,description,supported,action,forced,standard}};

};

const signalsByName=getSignalsByName();exports.signalsByName=signalsByName;




const getSignalsByNumber=function(){
const signals=(0,_signals.getSignals)();
const length=_realtime.SIGRTMAX+1;
const signalsA=Array.from({length},(value,number)=>
getSignalByNumber(number,signals));

return Object.assign({},...signalsA);
};

const getSignalByNumber=function(number,signals){
const signal=findSignalByNumber(number,signals);

if(signal===undefined){
return{};
}

const{name,description,supported,action,forced,standard}=signal;
return{
[number]:{
name,
number,
description,
supported,
action,
forced,
standard}};


};



const findSignalByNumber=function(number,signals){
const signal=signals.find(({name})=>_os.constants.signals[name]===number);

if(signal!==undefined){
return signal;
}

return signals.find(signalA=>signalA.number===number);
};

const signalsByNumber=getSignalsByNumber();exports.signalsByNumber=signalsByNumber;
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 697:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.SIGRTMAX=exports.getRealtimeSignals=void 0;
const getRealtimeSignals=function(){
const length=SIGRTMAX-SIGRTMIN+1;
return Array.from({length},getRealtimeSignal);
};exports.getRealtimeSignals=getRealtimeSignals;

const getRealtimeSignal=function(value,index){
return{
name:`SIGRT${index+1}`,
number:SIGRTMIN+index,
action:"terminate",
description:"Application-specific signal (realtime)",
standard:"posix"};

};

const SIGRTMIN=34;
const SIGRTMAX=64;exports.SIGRTMAX=SIGRTMAX;
//# sourceMappingURL=realtime.js.map

/***/ }),

/***/ 7928:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.getSignals=void 0;var _os=__nccwpck_require__(2087);

var _core=__nccwpck_require__(5687);
var _realtime=__nccwpck_require__(697);



const getSignals=function(){
const realtimeSignals=(0,_realtime.getRealtimeSignals)();
const signals=[..._core.SIGNALS,...realtimeSignals].map(normalizeSignal);
return signals;
};exports.getSignals=getSignals;







const normalizeSignal=function({
name,
number:defaultNumber,
description,
action,
forced=false,
standard})
{
const{
signals:{[name]:constantSignal}}=
_os.constants;
const supported=constantSignal!==undefined;
const number=supported?constantSignal:defaultNumber;
return{name,number,description,supported,action,forced,standard};
};
//# sourceMappingURL=signals.js.map

/***/ }),

/***/ 9439:
/***/ ((module) => {

// https://www.appveyor.com/docs/environment-variables

module.exports = {
  detect({env}) {
    return Boolean(env.APPVEYOR);
  },
  configuration({env}) {
    const pr = env.APPVEYOR_PULL_REQUEST_NUMBER;
    const isPr = Boolean(pr);

    return {
      name: 'Appveyor',
      service: 'appveyor',
      commit: env.APPVEYOR_REPO_COMMIT,
      tag: env.APPVEYOR_REPO_TAG_NAME,
      build: env.APPVEYOR_BUILD_NUMBER,
      buildUrl: `https://ci.appveyor.com/project/${env.APPVEYOR_PROJECT_SLUG}/build/${env.APPVEYOR_BUILD_VERSION}`,
      branch: env.APPVEYOR_REPO_BRANCH,
      job: env.APPVEYOR_JOB_NUMBER,
      jobUrl: `https://ci.appveyor.com/project/${env.APPVEYOR_PROJECT_SLUG}/build/job/${env.APPVEYOR_JOB_ID}`,
      pr,
      isPr,
      prBranch: env.APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH,
      slug: env.APPVEYOR_REPO_NAME,
      root: env.APPVEYOR_BUILD_FOLDER,
    };
  },
};


/***/ }),

/***/ 8578:
/***/ ((module) => {

// https://confluence.atlassian.com/bamboo/bamboo-variables-289277087.html

module.exports = {
  detect({env}) {
    return Boolean(env.bamboo_agentId);
  },
  configuration({env}) {
    return {
      name: 'Bamboo',
      service: 'bamboo',
      commit: env.bamboo_planRepository_1_revision,
      build: env.bamboo_buildNumber,
      buildUrl: env.bamboo_buildResultsUrl,
      branch: env.bamboo_planRepository_1_branchName,
      job: env.bamboo_buildKey,
      root: env.bamboo_build_working_directory,
    };
  },
};


/***/ }),

/***/ 5286:
/***/ ((module) => {

// https://confluence.atlassian.com/bitbucket/environment-variables-794502608.html

module.exports = {
  detect({env}) {
    return Boolean(env.BITBUCKET_BUILD_NUMBER);
  },
  configuration({env}) {
    return {
      name: 'Bitbucket Pipelines',
      service: 'bitbucket',
      commit: env.BITBUCKET_COMMIT,
      tag: env.BITBUCKET_TAG,
      build: env.BITBUCKET_BUILD_NUMBER,
      buildUrl: `https://bitbucket.org/${env.BITBUCKET_REPO_SLUG}/addon/pipelines/home#!/results/${env.BITBUCKET_BUILD_NUMBER}`,
      branch: env.BITBUCKET_BRANCH,
      slug: env.BITBUCKET_REPO_SLUG,
      root: env.BITBUCKET_CLONE_DIR,
    };
  },
};


/***/ }),

/***/ 1542:
/***/ ((module) => {

// https://devcenter.bitrise.io/builds/available-environment-variables/#exposed-by-bitriseio

module.exports = {
  detect({env}) {
    return Boolean(env.BITRISE_IO);
  },
  configuration({env}) {
    const pr = env.BITRISE_PULL_REQUEST === 'false' ? undefined : env.BITRISE_PULL_REQUEST;
    const isPr = Boolean(pr);

    return {
      name: 'Bitrise',
      service: 'bitrise',
      commit: env.BITRISE_GIT_COMMIT,
      tag: env.BITRISE_GIT_TAG,
      build: env.BITRISE_BUILD_NUMBER,
      buildUrl: env.BITRISE_BUILD_URL,
      branch: isPr ? env.BITRISEIO_GIT_BRANCH_DEST : env.BITRISE_GIT_BRANCH,
      pr,
      isPr,
      prBranch: isPr ? env.BITRISE_GIT_BRANCH : undefined,
      slug: env.BITRISE_APP_SLUG,
    };
  },
};


/***/ }),

/***/ 7955:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// https://buddy.works/knowledge/deployments/how-use-environment-variables#default-environment-variables

const {prNumber} = __nccwpck_require__(1102);

module.exports = {
  detect({env}) {
    return Boolean(env.BUDDY_WORKSPACE_ID);
  },
  configuration({env}) {
    const pr = prNumber(env.BUDDY_EXECUTION_PULL_REQUEST_ID);
    const isPr = Boolean(pr);

    return {
      name: 'Buddy',
      service: 'buddy',
      commit: env.BUDDY_EXECUTION_REVISION,
      tag: env.BUDDY_EXECUTION_TAG,
      build: env.BUDDY_EXECUTION_ID,
      buildUrl: env.BUDDY_EXECUTION_URL,
      branch: isPr ? undefined : env.BUDDY_EXECUTION_BRANCH,
      pr,
      isPr,
      slug: env.BUDDY_REPO_SLUG,
    };
  },
};


/***/ }),

/***/ 512:
/***/ ((module) => {

// https://buildkite.com/docs/builds/environment-variables

module.exports = {
  detect({env}) {
    return Boolean(env.BUILDKITE);
  },
  configuration({env}) {
    const pr = env.BUILDKITE_PULL_REQUEST === 'false' ? undefined : env.BUILDKITE_PULL_REQUEST;
    const isPr = Boolean(pr);

    return {
      name: 'Buildkite',
      service: 'buildkite',
      build: env.BUILDKITE_BUILD_NUMBER,
      buildUrl: env.BUILDKITE_BUILD_URL,
      commit: env.BUILDKITE_COMMIT,
      tag: env.BUILDKITE_TAG,
      branch: isPr ? env.BUILDKITE_PULL_REQUEST_BASE_BRANCH : env.BUILDKITE_BRANCH,
      slug: `${env.BUILDKITE_ORGANIZATION_SLUG}/${env.BUILDKITE_PROJECT_SLUG}`,
      pr,
      isPr,
      prBranch: isPr ? env.BUILDKITE_BRANCH : undefined,
      root: env.BUILDKITE_BUILD_CHECKOUT_PATH,
    };
  },
};


/***/ }),

/***/ 4257:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// https://circleci.com/docs/2.0/env-vars/#built-in-environment-variables

const {prNumber} = __nccwpck_require__(1102);

module.exports = {
  detect({env}) {
    return Boolean(env.CIRCLECI);
  },
  configuration({env}) {
    const pr = env.CIRCLE_PR_NUMBER || prNumber(env.CIRCLE_PULL_REQUEST || env.CI_PULL_REQUEST);
    const isPr = Boolean(pr);

    return {
      name: 'CircleCI',
      service: 'circleci',
      build: env.CIRCLE_BUILD_NUM,
      buildUrl: env.CIRCLE_BUILD_URL,
      job: `${env.CIRCLE_BUILD_NUM}.${env.CIRCLE_NODE_INDEX}`,
      commit: env.CIRCLE_SHA1,
      tag: env.CIRCLE_TAG,
      branch: isPr ? undefined : env.CIRCLE_BRANCH,
      pr,
      isPr,
      prBranch: isPr ? env.CIRCLE_BRANCH : undefined,
      slug: `${env.CIRCLE_PROJECT_USERNAME}/${env.CIRCLE_PROJECT_REPONAME}`,
    };
  },
};


/***/ }),

/***/ 3796:
/***/ ((module) => {

// https://cirrus-ci.org/guide/writing-tasks/#environment-variables

const CIRRUS_CI_DASHBOARD = 'https://cirrus-ci.com';

module.exports = {
  detect({env}) {
    return Boolean(env.CIRRUS_CI);
  },
  configuration({env}) {
    const pr = env.CIRRUS_PR;
    const isPr = Boolean(pr);

    return {
      name: 'Cirrus CI',
      service: 'cirrus',
      commit: env.CIRRUS_CHANGE_IN_REPO,
      tag: env.CIRRUS_TAG,
      build: env.CIRRUS_BUILD_ID,
      buildUrl: `${CIRRUS_CI_DASHBOARD}/build/${env.CIRRUS_BUILD_ID}`,
      job: env.CIRRUS_TASK_ID,
      jobUrl: `${CIRRUS_CI_DASHBOARD}/task/${env.CIRRUS_TASK_ID}`,
      branch: isPr ? env.CIRRUS_BASE_BRANCH : env.CIRRUS_BRANCH,
      pr,
      isPr,
      slug: env.CIRRUS_REPO_FULL_NAME,
      root: env.CIRRUS_WORKING_DIR,
    };
  },
};


/***/ }),

/***/ 5080:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const {head, branch} = __nccwpck_require__(533);

// https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html

module.exports = {
  detect({env}) {
    return Boolean(env.CODEBUILD_BUILD_ID);
  },
  configuration({env, cwd}) {
    return {
      name: 'AWS CodeBuild',
      service: 'codebuild',
      commit: head({env, cwd}),
      build: env.CODEBUILD_BUILD_ID,
      branch: branch({env, cwd}),
      buildUrl: `https://console.aws.amazon.com/codebuild/home?region=${env.AWS_REGION}#/builds/${env.CODEBUILD_BUILD_ID}/view/new`,
      root: env.PWD,
    };
  },
};


/***/ }),

/***/ 2902:
/***/ ((module) => {

// https://codefresh.io/docs/docs/codefresh-yaml/variables#system-provided-variables

module.exports = {
  detect({env}) {
    return Boolean(env.CF_BUILD_ID);
  },
  configuration({env}) {
    const pr = env.CF_PULL_REQUEST_NUMBER;
    const isPr = Boolean(pr);

    return {
      name: 'Codefresh',
      service: 'codefresh',
      commit: env.CF_REVISION,
      build: env.CF_BUILD_ID,
      buildUrl: env.CF_BUILD_URL,
      branch: isPr ? env.CF_PULL_REQUEST_TARGET : env.CF_BRANCH,
      pr,
      isPr,
      prBranch: isPr ? env.CF_BRANCH : undefined,
      slug: `${env.CF_REPO_OWNER}/${env.CF_REPO_NAME}`,
      root: env.CF_VOLUME_PATH,
    };
  },
};


/***/ }),

/***/ 896:
/***/ ((module) => {

// https://documentation.codeship.com/basic/builds-and-configuration/set-environment-variables/#default-environment-variables

module.exports = {
  detect({env}) {
    return env.CI_NAME && env.CI_NAME === 'codeship';
  },
  configuration({env}) {
    return {
      name: 'Codeship',
      service: 'codeship',
      build: env.CI_BUILD_NUMBER,
      buildUrl: env.CI_BUILD_URL,
      commit: env.CI_COMMIT_ID,
      branch: env.CI_BRANCH,
      slug: env.CI_REPO_NAME,
    };
  },
};


/***/ }),

/***/ 1384:
/***/ ((module) => {

// https://readme.drone.io/reference/environ

module.exports = {
  detect({env}) {
    return Boolean(env.DRONE);
  },
  configuration({env}) {
    const isPr = env.DRONE_BUILD_EVENT === 'pull_request';

    return {
      name: 'Drone',
      service: 'drone',
      commit: env.DRONE_COMMIT_SHA,
      tag: env.DRONE_TAG,
      build: env.DRONE_BUILD_NUMBER,
      buildUrl: env.DRONE_BUILD_LINK,
      branch: isPr ? env.DRONE_TARGET_BRANCH : env.DRONE_BRANCH,
      job: env.DRONE_JOB_NUMBER,
      jobUrl: env.DRONE_BUILD_LINK,
      pr: env.DRONE_PULL_REQUEST,
      isPr,
      prBranch: isPr ? env.DRONE_SOURCE_BRANCH : undefined,
      slug: `${env.DRONE_REPO_OWNER}/${env.DRONE_REPO_NAME}`,
      root: env.DRONE_WORKSPACE,
    };
  },
};


/***/ }),

/***/ 3866:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const {head, branch} = __nccwpck_require__(533);

module.exports = {
  configuration(options) {
    return {commit: head(options), branch: branch(options)};
  },
};


/***/ }),

/***/ 5562:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// https://help.github.com/en/articles/virtual-environments-for-github-actions#environment-variables
const {parseBranch} = __nccwpck_require__(1102);

const getPrEvent = ({env}) => {
  try {
    const event = env.GITHUB_EVENT_PATH ? require(env.GITHUB_EVENT_PATH) : undefined;

    if (event && event.pull_request) {
      return {
        branch: event.pull_request.base ? parseBranch(event.pull_request.base.ref) : undefined,
        pr: event.pull_request.number,
      };
    }
  } catch (_) {
    // Noop
  }

  return {pr: undefined, branch: undefined};
};

module.exports = {
  detect({env}) {
    return Boolean(env.GITHUB_ACTION);
  },
  configuration({env, cwd}) {
    const isPr = env.GITHUB_EVENT_NAME === 'pull_request';
    const branch = parseBranch(env.GITHUB_REF);

    return {
      name: 'GitHub Actions',
      service: 'github',
      commit: env.GITHUB_SHA,
      isPr,
      branch,
      prBranch: isPr ? branch : undefined,
      slug: env.GITHUB_REPOSITORY,
      root: env.GITHUB_WORKSPACE,
      ...(isPr ? getPrEvent({env, cwd}) : undefined),
    };
  },
};


/***/ }),

/***/ 4095:
/***/ ((module) => {

// https://docs.gitlab.com/ce/ci/variables/README.html

module.exports = {
  detect({env}) {
    return Boolean(env.GITLAB_CI);
  },
  configuration({env}) {
    const pr = env.CI_MERGE_REQUEST_ID;
    const isPr = Boolean(pr);

    return {
      name: 'GitLab CI/CD',
      service: 'gitlab',
      commit: env.CI_COMMIT_SHA,
      tag: env.CI_COMMIT_TAG,
      build: env.CI_PIPELINE_ID,
      buildUrl: `${env.CI_PROJECT_URL}/pipelines/${env.CI_PIPELINE_ID}`,
      job: env.CI_JOB_ID,
      jobUrl: `${env.CI_PROJECT_URL}/-/jobs/${env.CI_JOB_ID}`,
      branch: isPr ? env.CI_MERGE_REQUEST_TARGET_BRANCH_NAME : env.CI_COMMIT_REF_NAME,
      pr,
      isPr,
      prBranch: env.CI_MERGE_REQUEST_SOURCE_BRANCH_NAME,
      slug: env.CI_PROJECT_PATH,
      root: env.CI_PROJECT_DIR,
    };
  },
};


/***/ }),

/***/ 704:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const {head} = __nccwpck_require__(533);

// https://wiki.jenkins.io/display/JENKINS/Building+a+software+project

module.exports = {
  detect({env}) {
    return Boolean(env.JENKINS_URL);
  },
  configuration({env, cwd}) {
    const pr = env.ghprbPullId || env.gitlabMergeRequestId || env.CHANGE_ID;
    const isPr = Boolean(pr);
    const localBranch = env.GIT_LOCAL_BRANCH || env.GIT_BRANCH || env.gitlabBranch || env.BRANCH_NAME;

    return {
      name: 'Jenkins',
      service: 'jenkins',
      commit: env.ghprbActualCommit || env.GIT_COMMIT || head({env, cwd}),
      branch: isPr ? env.ghprbTargetBranch || env.gitlabTargetBranch : localBranch,
      build: env.BUILD_NUMBER,
      buildUrl: env.BUILD_URL,
      root: env.WORKSPACE,
      pr,
      isPr,
      prBranch: isPr ? env.ghprbSourceBranch || env.gitlabSourceBranch || localBranch : undefined,
    };
  },
};


/***/ }),

/***/ 3331:
/***/ ((module) => {

// https://docs.netlify.com/configure-builds/environment-variables/#git-metadata

module.exports = {
  detect({env}) {
    return Boolean(env.NETLIFY);
  },
  configuration({env}) {
    const isPr = Boolean(env.PULL_REQUEST);

    return {
      name: 'Netlify',
      service: 'netlify',
      commit: env.COMMIT_REF,
      build: env.BUILD_ID,
      buildUrl: env.DEPLOY_URL,
      branch: env.HEAD,
      pr: env.REVIEW_ID,
      isPr,
    };
  },
};


/***/ }),

/***/ 9619:
/***/ ((module) => {

// https://puppet.com/docs/pipelines-for-apps/enterprise/environment-variable.html

module.exports = {
  detect({env}) {
    return Boolean(env.DISTELLI_APPNAME);
  },
  configuration({env}) {
    return {
      name: 'Puppet',
      service: 'puppet',
      build: env.DISTELLI_BUILDNUM,
      buildUrl: env.DISTELLI_RELEASE,
      commit: env.DISTELLI_RELREVISION,
      branch: env.DISTELLI_RELBRANCH,
      root: env.DISTELLI_INSTALLHOME,
    };
  },
};


/***/ }),

/***/ 6148:
/***/ ((module) => {

// https://sail.ci/docs/environment-variables

module.exports = {
  detect({env}) {
    return Boolean(env.SAILCI);
  },
  configuration({env}) {
    const pr = env.SAIL_PULL_REQUEST_NUMBER;
    const isPr = Boolean(pr);

    return {
      name: 'Sail CI',
      service: 'sail',
      commit: env.SAIL_COMMIT_SHA,
      branch: isPr ? undefined : env.SAIL_COMMIT_BRANCH,
      pr,
      isPr,
      slug: `${env.SAIL_REPO_OWNER}/${env.SAIL_REPO_NAME}`,
      root: env.SAIL_CLONE_DIR,
    };
  },
};


/***/ }),

/***/ 406:
/***/ ((module) => {

// https://scrutinizer-ci.com/docs/build/environment-variables

module.exports = {
  detect({env}) {
    return Boolean(env.SCRUTINIZER);
  },
  configuration({env}) {
    const pr = env.SCRUTINIZER_PR_NUMBER;
    const isPr = Boolean(pr);

    return {
      name: 'Scrutinizer',
      service: 'scrutinizer',
      commit: env.SCRUTINIZER_SHA1,
      build: env.SCRUTINIZER_INSPECTION_UUID,
      branch: env.SCRUTINIZER_BRANCH,
      pr,
      isPr,
      prBranch: env.SCRUTINIZER_PR_SOURCE_BRANCH,
    };
  },
};


/***/ }),

/***/ 5736:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const {head} = __nccwpck_require__(533);

// 1.0: https://semaphoreci.com/docs/available-environment-variables.html
// 2.0: https://docs.semaphoreci.com/article/12-environment-variables

module.exports = {
  detect({env}) {
    return Boolean(env.SEMAPHORE);
  },
  configuration({env, cwd}) {
    const pr = env.SEMAPHORE_GIT_PR_NUMBER || env.PULL_REQUEST_NUMBER;
    const isPr = Boolean(pr);

    return {
      name: 'Semaphore',
      service: 'semaphore',
      commit: env.SEMAPHORE_GIT_SHA || head({env, cwd}),
      tag: env.SEMAPHORE_GIT_TAG_NAME,
      build: env.SEMAPHORE_JOB_ID || env.SEMAPHORE_BUILD_NUMBER,
      branch: env.SEMAPHORE_GIT_BRANCH || (isPr ? undefined : env.BRANCH_NAME),
      pr,
      isPr,
      prBranch: env.SEMAPHORE_GIT_PR_BRANCH || (isPr ? env.BRANCH_NAME : undefined),
      slug: env.SEMAPHORE_GIT_REPO_SLUG || env.SEMAPHORE_REPO_SLUG,
      root: env.SEMAPHORE_GIT_DIR || env.SEMAPHORE_PROJECT_DIR,
    };
  },
};


/***/ }),

/***/ 2907:
/***/ ((module) => {

// http://docs.shippable.com/ci/env-vars/#stdEnv

module.exports = {
  detect({env}) {
    return Boolean(env.SHIPPABLE);
  },
  configuration({env}) {
    const pr = env.IS_PULL_REQUEST === 'true' ? env.PULL_REQUEST : undefined;
    const isPr = Boolean(pr);

    return {
      name: 'Shippable',
      service: 'shippable',
      commit: env.COMMIT,
      tag: env.GIT_TAG_NAME,
      build: env.BUILD_NUMBER,
      buildUrl: env.BUILD_URL,
      branch: isPr ? env.BASE_BRANCH : env.BRANCH,
      job: env.JOB_NUMBER,
      pr,
      isPr,
      prBranch: isPr ? env.HEAD_BRANCH : undefined,
      slug: env.SHIPPABLE_REPO_SLUG,
      root: env.SHIPPABLE_BUILD_DIR,
    };
  },
};


/***/ }),

/***/ 2355:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// https://confluence.jetbrains.com/display/TCD10/Predefined+Build+Parameters

const javaProperties = __nccwpck_require__(7735);
const {branch} = __nccwpck_require__(533);

const PROPERTIES_MAPPING = {root: 'teamcity.build.workingDir', branch: 'teamcity.build.branch'};

const safeReadProperties = filePath => {
  try {
    return javaProperties.of(filePath);
  } catch (_) {
    return undefined;
  }
};

const getProperties = ({env, cwd}) => {
  const buildProperties = env.TEAMCITY_BUILD_PROPERTIES_FILE
    ? safeReadProperties(env.TEAMCITY_BUILD_PROPERTIES_FILE)
    : undefined;
  const configFile = buildProperties ? buildProperties.get('teamcity.configuration.properties.file') : undefined;
  const configProperties = configFile ? safeReadProperties(configFile) : configFile;

  return Object.keys(PROPERTIES_MAPPING).reduce(
    (result, key) =>
      Object.assign(result, {
        [key]:
          (buildProperties ? buildProperties.get(PROPERTIES_MAPPING[key]) : undefined) ||
          (configProperties ? configProperties.get(PROPERTIES_MAPPING[key]) : undefined) ||
          (key === 'branch' ? branch({env, cwd}) : undefined),
      }),
    {}
  );
};

module.exports = {
  detect({env}) {
    return Boolean(env.TEAMCITY_VERSION);
  },
  configuration({env, cwd}) {
    return {
      name: 'TeamCity',
      service: 'teamcity',
      commit: env.BUILD_VCS_NUMBER,
      build: env.BUILD_NUMBER,
      slug: env.TEAMCITY_BUILDCONF_NAME,
      ...getProperties({env, cwd}),
    };
  },
};


/***/ }),

/***/ 9445:
/***/ ((module) => {

// https://docs.travis-ci.com/user/environment-variables#default-environment-variables

module.exports = {
  detect({env}) {
    return Boolean(env.TRAVIS);
  },
  configuration({env}) {
    const pr = env.TRAVIS_PULL_REQUEST === 'false' ? undefined : env.TRAVIS_PULL_REQUEST;
    const isPr = Boolean(pr);

    return {
      name: 'Travis CI',
      service: 'travis',
      commit: env.TRAVIS_COMMIT,
      tag: env.TRAVIS_TAG,
      build: env.TRAVIS_BUILD_NUMBER,
      buildUrl: env.TRAVIS_BUILD_WEB_URL,
      branch: env.TRAVIS_BRANCH,
      job: env.TRAVIS_JOB_NUMBER,
      jobUrl: env.TRAVIS_JOB_WEB_URL,
      pr,
      isPr,
      prBranch: env.TRAVIS_PULL_REQUEST_BRANCH,
      slug: env.TRAVIS_REPO_SLUG,
      root: env.TRAVIS_BUILD_DIR,
    };
  },
};


/***/ }),

/***/ 2263:
/***/ ((module) => {

// https://vercel.com/docs/environment-variables

module.exports = {
  detect({env}) {
    return Boolean(env.VERCEL) || Boolean(env.NOW_GITHUB_DEPLOYMENT);
  },
  configuration({env}) {
    const name = 'Vercel';
    const service = 'vercel';

    if (env.VERCEL) {
      return {
        name,
        service,
        commit: env.VERCEL_GIT_COMMIT_SHA,
        branch: env.VERCEL_GIT_COMMIT_REF,
        slug: `${env.VERCEL_GIT_REPO_OWNER}/${env.VERCEL_GIT_REPO_SLUG}`,
      };
    }

    return {
      name,
      service,
      commit: env.NOW_GITHUB_COMMIT_SHA,
      branch: env.NOW_GITHUB_COMMIT_REF,
      slug: `${env.NOW_GITHUB_ORG}/${env.NOW_GITHUB_REPO}`,
    };
  },
};


/***/ }),

/***/ 3746:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// https://docs.microsoft.com/en-us/vsts/pipelines/build/variables
// The docs indicate that SYSTEM_PULLREQUEST_SOURCEBRANCH and SYSTEM_PULLREQUEST_TARGETBRANCH are in the long format (e.g `refs/heads/master`) however tests show they are both in the short format (e.g. `master`)
const {parseBranch} = __nccwpck_require__(1102);

module.exports = {
  detect({env}) {
    return Boolean(env.BUILD_BUILDURI);
  },
  configuration({env}) {
    const pr = env.SYSTEM_PULLREQUEST_PULLREQUESTID;
    const isPr = Boolean(pr);

    return {
      name: 'Visual Studio Team Services',
      service: 'vsts',
      commit: env.BUILD_SOURCEVERSION,
      build: env.BUILD_BUILDNUMBER,
      branch: parseBranch(isPr ? env.SYSTEM_PULLREQUEST_TARGETBRANCH : env.BUILD_SOURCEBRANCH),
      pr,
      isPr,
      prBranch: parseBranch(isPr ? env.SYSTEM_PULLREQUEST_SOURCEBRANCH : undefined),
      root: env.BUILD_REPOSITORY_LOCALPATH,
    };
  },
};


/***/ }),

/***/ 1562:
/***/ ((module) => {

// http://devcenter.wercker.com/docs/environment-variables/available-env-vars#hs_cos_wrapper_name

module.exports = {
  detect({env}) {
    return Boolean(env.WERCKER_MAIN_PIPELINE_STARTED);
  },
  configuration({env}) {
    return {
      name: 'Wercker',
      service: 'wercker',
      commit: env.WERCKER_GIT_COMMIT,
      build: env.WERCKER_MAIN_PIPELINE_STARTED,
      buildUrl: env.WERCKER_RUN_URL,
      branch: env.WERCKER_GIT_BRANCH,
      slug: `${env.WERCKER_GIT_OWNER}/${env.WERCKER_GIT_REPOSITORY}`,
      root: env.WERCKER_ROOT,
    };
  },
};


/***/ }),

/***/ 2746:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const cp = __nccwpck_require__(3129);
const parse = __nccwpck_require__(6855);
const enoent = __nccwpck_require__(4101);

function spawn(command, args, options) {
    // Parse the arguments
    const parsed = parse(command, args, options);

    // Spawn the child process
    const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);

    // Hook into child process "exit" event to emit an error if the command
    // does not exists, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
    enoent.hookChildProcess(spawned, parsed);

    return spawned;
}

function spawnSync(command, args, options) {
    // Parse the arguments
    const parsed = parse(command, args, options);

    // Spawn the child process
    const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);

    // Analyze if the command does not exist, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
    result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);

    return result;
}

module.exports = spawn;
module.exports.spawn = spawn;
module.exports.sync = spawnSync;

module.exports._parse = parse;
module.exports._enoent = enoent;


/***/ }),

/***/ 4101:
/***/ ((module) => {

"use strict";


const isWin = process.platform === 'win32';

function notFoundError(original, syscall) {
    return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
        code: 'ENOENT',
        errno: 'ENOENT',
        syscall: `${syscall} ${original.command}`,
        path: original.command,
        spawnargs: original.args,
    });
}

function hookChildProcess(cp, parsed) {
    if (!isWin) {
        return;
    }

    const originalEmit = cp.emit;

    cp.emit = function (name, arg1) {
        // If emitting "exit" event and exit code is 1, we need to check if
        // the command exists and emit an "error" instead
        // See https://github.com/IndigoUnited/node-cross-spawn/issues/16
        if (name === 'exit') {
            const err = verifyENOENT(arg1, parsed, 'spawn');

            if (err) {
                return originalEmit.call(cp, 'error', err);
            }
        }

        return originalEmit.apply(cp, arguments); // eslint-disable-line prefer-rest-params
    };
}

function verifyENOENT(status, parsed) {
    if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, 'spawn');
    }

    return null;
}

function verifyENOENTSync(status, parsed) {
    if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, 'spawnSync');
    }

    return null;
}

module.exports = {
    hookChildProcess,
    verifyENOENT,
    verifyENOENTSync,
    notFoundError,
};


/***/ }),

/***/ 6855:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const path = __nccwpck_require__(5622);
const resolveCommand = __nccwpck_require__(7274);
const escape = __nccwpck_require__(4274);
const readShebang = __nccwpck_require__(1252);

const isWin = process.platform === 'win32';
const isExecutableRegExp = /\.(?:com|exe)$/i;
const isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;

function detectShebang(parsed) {
    parsed.file = resolveCommand(parsed);

    const shebang = parsed.file && readShebang(parsed.file);

    if (shebang) {
        parsed.args.unshift(parsed.file);
        parsed.command = shebang;

        return resolveCommand(parsed);
    }

    return parsed.file;
}

function parseNonShell(parsed) {
    if (!isWin) {
        return parsed;
    }

    // Detect & add support for shebangs
    const commandFile = detectShebang(parsed);

    // We don't need a shell if the command filename is an executable
    const needsShell = !isExecutableRegExp.test(commandFile);

    // If a shell is required, use cmd.exe and take care of escaping everything correctly
    // Note that `forceShell` is an hidden option used only in tests
    if (parsed.options.forceShell || needsShell) {
        // Need to double escape meta chars if the command is a cmd-shim located in `node_modules/.bin/`
        // The cmd-shim simply calls execute the package bin file with NodeJS, proxying any argument
        // Because the escape of metachars with ^ gets interpreted when the cmd.exe is first called,
        // we need to double escape them
        const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);

        // Normalize posix paths into OS compatible paths (e.g.: foo/bar -> foo\bar)
        // This is necessary otherwise it will always fail with ENOENT in those cases
        parsed.command = path.normalize(parsed.command);

        // Escape command & arguments
        parsed.command = escape.command(parsed.command);
        parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));

        const shellCommand = [parsed.command].concat(parsed.args).join(' ');

        parsed.args = ['/d', '/s', '/c', `"${shellCommand}"`];
        parsed.command = process.env.comspec || 'cmd.exe';
        parsed.options.windowsVerbatimArguments = true; // Tell node's spawn that the arguments are already escaped
    }

    return parsed;
}

function parse(command, args, options) {
    // Normalize arguments, similar to nodejs
    if (args && !Array.isArray(args)) {
        options = args;
        args = null;
    }

    args = args ? args.slice(0) : []; // Clone array to avoid changing the original
    options = Object.assign({}, options); // Clone object to avoid changing the original

    // Build our parsed object
    const parsed = {
        command,
        args,
        options,
        file: undefined,
        original: {
            command,
            args,
        },
    };

    // Delegate further parsing to shell or non-shell
    return options.shell ? parsed : parseNonShell(parsed);
}

module.exports = parse;


/***/ }),

/***/ 4274:
/***/ ((module) => {

"use strict";


// See http://www.robvanderwoude.com/escapechars.php
const metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;

function escapeCommand(arg) {
    // Escape meta chars
    arg = arg.replace(metaCharsRegExp, '^$1');

    return arg;
}

function escapeArgument(arg, doubleEscapeMetaChars) {
    // Convert to string
    arg = `${arg}`;

    // Algorithm below is based on https://qntm.org/cmd

    // Sequence of backslashes followed by a double quote:
    // double up all the backslashes and escape the double quote
    arg = arg.replace(/(\\*)"/g, '$1$1\\"');

    // Sequence of backslashes followed by the end of the string
    // (which will become a double quote later):
    // double up all the backslashes
    arg = arg.replace(/(\\*)$/, '$1$1');

    // All other backslashes occur literally

    // Quote the whole thing:
    arg = `"${arg}"`;

    // Escape meta chars
    arg = arg.replace(metaCharsRegExp, '^$1');

    // Double escape meta chars if necessary
    if (doubleEscapeMetaChars) {
        arg = arg.replace(metaCharsRegExp, '^$1');
    }

    return arg;
}

module.exports.command = escapeCommand;
module.exports.argument = escapeArgument;


/***/ }),

/***/ 1252:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const fs = __nccwpck_require__(5747);
const shebangCommand = __nccwpck_require__(7032);

function readShebang(command) {
    // Read the first 150 bytes from the file
    const size = 150;
    const buffer = Buffer.alloc(size);

    let fd;

    try {
        fd = fs.openSync(command, 'r');
        fs.readSync(fd, buffer, 0, size, 0);
        fs.closeSync(fd);
    } catch (e) { /* Empty */ }

    // Attempt to extract shebang (null is returned if not a shebang)
    return shebangCommand(buffer.toString());
}

module.exports = readShebang;


/***/ }),

/***/ 7274:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const path = __nccwpck_require__(5622);
const which = __nccwpck_require__(4207);
const getPathKey = __nccwpck_require__(539);

function resolveCommandAttempt(parsed, withoutPathExt) {
    const env = parsed.options.env || process.env;
    const cwd = process.cwd();
    const hasCustomCwd = parsed.options.cwd != null;
    // Worker threads do not have process.chdir()
    const shouldSwitchCwd = hasCustomCwd && process.chdir !== undefined && !process.chdir.disabled;

    // If a custom `cwd` was specified, we need to change the process cwd
    // because `which` will do stat calls but does not support a custom cwd
    if (shouldSwitchCwd) {
        try {
            process.chdir(parsed.options.cwd);
        } catch (err) {
            /* Empty */
        }
    }

    let resolved;

    try {
        resolved = which.sync(parsed.command, {
            path: env[getPathKey({ env })],
            pathExt: withoutPathExt ? path.delimiter : undefined,
        });
    } catch (e) {
        /* Empty */
    } finally {
        if (shouldSwitchCwd) {
            process.chdir(cwd);
        }
    }

    // If we successfully resolved, ensure that an absolute path is returned
    // Note that when a custom `cwd` was used, we need to resolve to an absolute path based on it
    if (resolved) {
        resolved = path.resolve(hasCustomCwd ? parsed.options.cwd : '', resolved);
    }

    return resolved;
}

function resolveCommand(parsed) {
    return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
}

module.exports = resolveCommand;


/***/ }),

/***/ 1205:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var once = __nccwpck_require__(1223);

var noop = function() {};

var isRequest = function(stream) {
	return stream.setHeader && typeof stream.abort === 'function';
};

var isChildProcess = function(stream) {
	return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3
};

var eos = function(stream, opts, callback) {
	if (typeof opts === 'function') return eos(stream, null, opts);
	if (!opts) opts = {};

	callback = once(callback || noop);

	var ws = stream._writableState;
	var rs = stream._readableState;
	var readable = opts.readable || (opts.readable !== false && stream.readable);
	var writable = opts.writable || (opts.writable !== false && stream.writable);
	var cancelled = false;

	var onlegacyfinish = function() {
		if (!stream.writable) onfinish();
	};

	var onfinish = function() {
		writable = false;
		if (!readable) callback.call(stream);
	};

	var onend = function() {
		readable = false;
		if (!writable) callback.call(stream);
	};

	var onexit = function(exitCode) {
		callback.call(stream, exitCode ? new Error('exited with error code: ' + exitCode) : null);
	};

	var onerror = function(err) {
		callback.call(stream, err);
	};

	var onclose = function() {
		process.nextTick(onclosenexttick);
	};

	var onclosenexttick = function() {
		if (cancelled) return;
		if (readable && !(rs && (rs.ended && !rs.destroyed))) return callback.call(stream, new Error('premature close'));
		if (writable && !(ws && (ws.ended && !ws.destroyed))) return callback.call(stream, new Error('premature close'));
	};

	var onrequest = function() {
		stream.req.on('finish', onfinish);
	};

	if (isRequest(stream)) {
		stream.on('complete', onfinish);
		stream.on('abort', onclose);
		if (stream.req) onrequest();
		else stream.on('request', onrequest);
	} else if (writable && !ws) { // legacy streams
		stream.on('end', onlegacyfinish);
		stream.on('close', onlegacyfinish);
	}

	if (isChildProcess(stream)) stream.on('exit', onexit);

	stream.on('end', onend);
	stream.on('finish', onfinish);
	if (opts.error !== false) stream.on('error', onerror);
	stream.on('close', onclose);

	return function() {
		cancelled = true;
		stream.removeListener('complete', onfinish);
		stream.removeListener('abort', onclose);
		stream.removeListener('request', onrequest);
		if (stream.req) stream.req.removeListener('finish', onfinish);
		stream.removeListener('end', onlegacyfinish);
		stream.removeListener('close', onlegacyfinish);
		stream.removeListener('finish', onfinish);
		stream.removeListener('exit', onexit);
		stream.removeListener('end', onend);
		stream.removeListener('error', onerror);
		stream.removeListener('close', onclose);
	};
};

module.exports = eos;


/***/ }),

/***/ 1554:
/***/ ((module) => {

"use strict";


const isStream = stream =>
	stream !== null &&
	typeof stream === 'object' &&
	typeof stream.pipe === 'function';

isStream.writable = stream =>
	isStream(stream) &&
	stream.writable !== false &&
	typeof stream._write === 'function' &&
	typeof stream._writableState === 'object';

isStream.readable = stream =>
	isStream(stream) &&
	stream.readable !== false &&
	typeof stream._read === 'function' &&
	typeof stream._readableState === 'object';

isStream.duplex = stream =>
	isStream.writable(stream) &&
	isStream.readable(stream);

isStream.transform = stream =>
	isStream.duplex(stream) &&
	typeof stream._transform === 'function' &&
	typeof stream._transformState === 'object';

module.exports = isStream;


/***/ }),

/***/ 7126:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var fs = __nccwpck_require__(5747)
var core
if (process.platform === 'win32' || global.TESTING_WINDOWS) {
  core = __nccwpck_require__(2001)
} else {
  core = __nccwpck_require__(9728)
}

module.exports = isexe
isexe.sync = sync

function isexe (path, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  if (!cb) {
    if (typeof Promise !== 'function') {
      throw new TypeError('callback not provided')
    }

    return new Promise(function (resolve, reject) {
      isexe(path, options || {}, function (er, is) {
        if (er) {
          reject(er)
        } else {
          resolve(is)
        }
      })
    })
  }

  core(path, options || {}, function (er, is) {
    // ignore EACCES because that just means we aren't allowed to run it
    if (er) {
      if (er.code === 'EACCES' || options && options.ignoreErrors) {
        er = null
        is = false
      }
    }
    cb(er, is)
  })
}

function sync (path, options) {
  // my kingdom for a filtered catch
  try {
    return core.sync(path, options || {})
  } catch (er) {
    if (options && options.ignoreErrors || er.code === 'EACCES') {
      return false
    } else {
      throw er
    }
  }
}


/***/ }),

/***/ 9728:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = isexe
isexe.sync = sync

var fs = __nccwpck_require__(5747)

function isexe (path, options, cb) {
  fs.stat(path, function (er, stat) {
    cb(er, er ? false : checkStat(stat, options))
  })
}

function sync (path, options) {
  return checkStat(fs.statSync(path), options)
}

function checkStat (stat, options) {
  return stat.isFile() && checkMode(stat, options)
}

function checkMode (stat, options) {
  var mod = stat.mode
  var uid = stat.uid
  var gid = stat.gid

  var myUid = options.uid !== undefined ?
    options.uid : process.getuid && process.getuid()
  var myGid = options.gid !== undefined ?
    options.gid : process.getgid && process.getgid()

  var u = parseInt('100', 8)
  var g = parseInt('010', 8)
  var o = parseInt('001', 8)
  var ug = u | g

  var ret = (mod & o) ||
    (mod & g) && gid === myGid ||
    (mod & u) && uid === myUid ||
    (mod & ug) && myUid === 0

  return ret
}


/***/ }),

/***/ 2001:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = isexe
isexe.sync = sync

var fs = __nccwpck_require__(5747)

function checkPathExt (path, options) {
  var pathext = options.pathExt !== undefined ?
    options.pathExt : process.env.PATHEXT

  if (!pathext) {
    return true
  }

  pathext = pathext.split(';')
  if (pathext.indexOf('') !== -1) {
    return true
  }
  for (var i = 0; i < pathext.length; i++) {
    var p = pathext[i].toLowerCase()
    if (p && path.substr(-p.length).toLowerCase() === p) {
      return true
    }
  }
  return false
}

function checkStat (stat, path, options) {
  if (!stat.isSymbolicLink() && !stat.isFile()) {
    return false
  }
  return checkPathExt(path, options)
}

function isexe (path, options, cb) {
  fs.stat(path, function (er, stat) {
    cb(er, er ? false : checkStat(stat, path, options))
  })
}

function sync (path, options) {
  return checkStat(fs.statSync(path), path, options)
}


/***/ }),

/***/ 2340:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var realFetch = __nccwpck_require__(467);
module.exports = function(url, options) {
	if (/^\/\//.test(url)) {
		url = 'https:' + url;
	}
	return realFetch.call(this, url, options);
};

if (!global.fetch) {
	global.fetch = module.exports;
	global.Response = realFetch.Response;
	global.Headers = realFetch.Headers;
	global.Request = realFetch.Request;
}


/***/ }),

/***/ 7735:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.of = exports.PropertiesFile = void 0;

var _fs = _interopRequireDefault(__nccwpck_require__(5747));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/*
 * properties
 *
 * Copyright (c) 2013 Matt Steele
 * Licensed under the MIT license.
 */


class PropertiesFile {
  constructor(...args) {
    this.objs = {};

    if (args.length) {
      this.of.apply(this, args);
    }
  }

  makeKeys(line) {
    if (line && line.indexOf('#') !== 0) {
      //let splitIndex = line.indexOf('=');
      let separatorPositions = ['=', ':'].map(sep => {
        return line.indexOf(sep);
      }).filter(index => {
        return index > -1;
      });
      let splitIndex = Math.min(...separatorPositions);
      let key = line.substring(0, splitIndex).trim();
      let value = line.substring(splitIndex + 1).trim(); // if keys already exists ...

      if (this.objs.hasOwnProperty(key)) {
        // if it is already an Array
        if (Array.isArray(this.objs[key])) {
          // just push the new value
          this.objs[key].push(value);
        } else {
          // transform the value into Array
          let oldValue = this.objs[key];
          this.objs[key] = [oldValue, value];
        }
      } else {
        // the key does not exists
        const escapedValue = value.replace(/"/g, '\\"') // escape "
        .replace(/\\:/g, ':') // remove \ before :
        .replace(/\\=/g, '='); // remove \ before =

        this.objs[key] = unescape(JSON.parse('"' + escapedValue + '"'));
      }
    }
  }

  addFile(file) {
    let data = _fs.default.readFileSync(file, 'utf-8');

    let items = data.split(/\r?\n/);
    let me = this;

    for (let i = 0; i < items.length; i++) {
      let line = items[i];

      while (line.substring(line.length - 1) === '\\') {
        line = line.slice(0, -1);
        let nextLine = items[i + 1];
        line = line + nextLine.trim();
        i++;
      }

      me.makeKeys(line);
    }
  }

  of(...args) {
    for (let i = 0; i < args.length; i++) {
      this.addFile(args[i]);
    }
  }

  get(key, defaultValue) {
    if (this.objs.hasOwnProperty(key)) {
      if (Array.isArray(this.objs[key])) {
        let ret = [];

        for (let i = 0; i < this.objs[key].length; i++) {
          ret[i] = this.interpolate(this.objs[key][i]);
        }

        return ret;
      } else {
        return typeof this.objs[key] === 'undefined' ? '' : this.interpolate(this.objs[key]);
      }
    }

    return defaultValue;
  }

  getLast(key, defaultValue) {
    if (this.objs.hasOwnProperty(key)) {
      if (Array.isArray(this.objs[key])) {
        var lg = this.objs[key].length;
        return this.interpolate(this.objs[key][lg - 1]);
      } else {
        return typeof this.objs[key] === 'undefined' ? '' : this.interpolate(this.objs[key]);
      }
    }

    return defaultValue;
  }

  getFirst(key, defaultValue) {
    if (this.objs.hasOwnProperty(key)) {
      if (Array.isArray(this.objs[key])) {
        return this.interpolate(this.objs[key][0]);
      } else {
        return typeof this.objs[key] === 'undefined' ? '' : this.interpolate(this.objs[key]);
      }
    }

    return defaultValue;
  }

  getInt(key, defaultIntValue) {
    let val = this.getLast(key);

    if (!val) {
      return defaultIntValue;
    } else {
      return parseInt(val, 10);
    }
  }

  getFloat(key, defaultFloatValue) {
    let val = this.getLast(key);

    if (!val) {
      return defaultFloatValue;
    } else {
      return parseFloat(val);
    }
  }

  getBoolean(key, defaultBooleanValue) {
    function parseBool(b) {
      return !/^(false|0)$/i.test(b) && !!b;
    }

    let val = this.getLast(key);

    if (!val) {
      return defaultBooleanValue || false;
    } else {
      return parseBool(val);
    }
  }

  set(key, value) {
    this.objs[key] = value;
  }

  interpolate(s) {
    let me = this;
    return s.replace(/\\\\/g, '\\').replace(/\$\{([A-Za-z0-9\.\-\_]*)\}/g, function (match) {
      return me.getLast(match.substring(2, match.length - 1));
    });
  }

  getKeys() {
    let keys = [];

    for (let key in this.objs) {
      keys.push(key);
    }

    return keys;
  }

  getMatchingKeys(matchstr) {
    let keys = [];

    for (let key in this.objs) {
      if (key.search(matchstr) !== -1) {
        keys.push(key);
      }
    }

    return keys;
  }

  reset() {
    this.objs = {};
  }

} // Retain 'of' from v1 for backward compatibility


exports.PropertiesFile = PropertiesFile;

let of = function of(...args) {
  let globalFile = new PropertiesFile();
  globalFile.of.apply(globalFile, args);
  return globalFile;
};

exports.of = of;


/***/ }),

/***/ 2621:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { PassThrough } = __nccwpck_require__(2413);

module.exports = function (/*streams...*/) {
  var sources = []
  var output  = new PassThrough({objectMode: true})

  output.setMaxListeners(0)

  output.add = add
  output.isEmpty = isEmpty

  output.on('unpipe', remove)

  Array.prototype.slice.call(arguments).forEach(add)

  return output

  function add (source) {
    if (Array.isArray(source)) {
      source.forEach(add)
      return this
    }

    sources.push(source);
    source.once('end', remove.bind(null, source))
    source.once('error', output.emit.bind(output, 'error'))
    source.pipe(output, {end: false})
    return this
  }

  function isEmpty () {
    return sources.length == 0;
  }

  function remove (source) {
    sources = sources.filter(function (it) { return it !== source })
    if (!sources.length && output.readable) { output.end() }
  }
}


/***/ }),

/***/ 6047:
/***/ ((module) => {

"use strict";


const mimicFn = (to, from) => {
	for (const prop of Reflect.ownKeys(from)) {
		Object.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));
	}

	return to;
};

module.exports = mimicFn;
// TODO: Remove this for the next major release
module.exports.default = mimicFn;


/***/ }),

/***/ 467:
/***/ ((module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Stream = _interopDefault(__nccwpck_require__(2413));
var http = _interopDefault(__nccwpck_require__(8605));
var Url = _interopDefault(__nccwpck_require__(8835));
var https = _interopDefault(__nccwpck_require__(7211));
var zlib = _interopDefault(__nccwpck_require__(8761));

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

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
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
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
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = __nccwpck_require__(2877).convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
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
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream) ; else {
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
			return Object.assign(
			// Prevent copying
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
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
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

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
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
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
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
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
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
	}

	// Brand-checking and more duck-typing as optional condition.
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
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
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
}

// expose Promise
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
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
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
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
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
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
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

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
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
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url.parse;
const format_url = Url.format;

const streamDestructionSupported = 'destroy' in Stream.Readable.prototype;

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

		let parsedURL;

		// normalize input
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
		};

		// node-fetch-only options
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
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
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
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
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
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
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

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
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
		};

		// send request
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

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
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
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
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
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
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
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

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
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
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
			}

			// for br
			if (codings == 'br' && typeof zlib.createBrotliDecompress === 'function') {
				body = body.pipe(zlib.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
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
};

// expose Promise
fetch.Promise = global.Promise;

module.exports = exports = fetch;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.default = exports;
exports.Headers = Headers;
exports.Request = Request;
exports.Response = Response;
exports.FetchError = FetchError;


/***/ }),

/***/ 502:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const path = __nccwpck_require__(5622);
const pathKey = __nccwpck_require__(539);

const npmRunPath = options => {
	options = {
		cwd: process.cwd(),
		path: process.env[pathKey()],
		execPath: process.execPath,
		...options
	};

	let previous;
	let cwdPath = path.resolve(options.cwd);
	const result = [];

	while (previous !== cwdPath) {
		result.push(path.join(cwdPath, 'node_modules/.bin'));
		previous = cwdPath;
		cwdPath = path.resolve(cwdPath, '..');
	}

	// Ensure the running `node` binary is used
	const execPathDir = path.resolve(options.cwd, options.execPath, '..');
	result.push(execPathDir);

	return result.concat(options.path).join(path.delimiter);
};

module.exports = npmRunPath;
// TODO: Remove this for the next major release
module.exports.default = npmRunPath;

module.exports.env = options => {
	options = {
		env: process.env,
		...options
	};

	const env = {...options.env};
	const path = pathKey({env});

	options.path = env[path];
	env[path] = module.exports(options);

	return env;
};


/***/ }),

/***/ 1223:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var wrappy = __nccwpck_require__(2940)
module.exports = wrappy(once)
module.exports.strict = wrappy(onceStrict)

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  })
})

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  var name = fn.name || 'Function wrapped with `once`'
  f.onceError = name + " shouldn't be called more than once"
  f.called = false
  return f
}


/***/ }),

/***/ 9082:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const mimicFn = __nccwpck_require__(6047);

const calledFunctions = new WeakMap();

const onetime = (function_, options = {}) => {
	if (typeof function_ !== 'function') {
		throw new TypeError('Expected a function');
	}

	let returnValue;
	let callCount = 0;
	const functionName = function_.displayName || function_.name || '<anonymous>';

	const onetime = function (...arguments_) {
		calledFunctions.set(onetime, ++callCount);

		if (callCount === 1) {
			returnValue = function_.apply(this, arguments_);
			function_ = null;
		} else if (options.throw === true) {
			throw new Error(`Function \`${functionName}\` can only be called once`);
		}

		return returnValue;
	};

	mimicFn(onetime, function_);
	calledFunctions.set(onetime, callCount);

	return onetime;
};

module.exports = onetime;
// TODO: Remove this for the next major release
module.exports.default = onetime;

module.exports.callCount = function_ => {
	if (!calledFunctions.has(function_)) {
		throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
	}

	return calledFunctions.get(function_);
};


/***/ }),

/***/ 539:
/***/ ((module) => {

"use strict";


const pathKey = (options = {}) => {
	const environment = options.env || process.env;
	const platform = options.platform || process.platform;

	if (platform !== 'win32') {
		return 'PATH';
	}

	return Object.keys(environment).reverse().find(key => key.toUpperCase() === 'PATH') || 'Path';
};

module.exports = pathKey;
// TODO: Remove this for the next major release
module.exports.default = pathKey;


/***/ }),

/***/ 8341:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var once = __nccwpck_require__(1223)
var eos = __nccwpck_require__(1205)
var fs = __nccwpck_require__(5747) // we only need fs to get the ReadStream and WriteStream prototypes

var noop = function () {}
var ancient = /^v?\.0/.test(process.version)

var isFn = function (fn) {
  return typeof fn === 'function'
}

var isFS = function (stream) {
  if (!ancient) return false // newer node version do not need to care about fs is a special way
  if (!fs) return false // browser
  return (stream instanceof (fs.ReadStream || noop) || stream instanceof (fs.WriteStream || noop)) && isFn(stream.close)
}

var isRequest = function (stream) {
  return stream.setHeader && isFn(stream.abort)
}

var destroyer = function (stream, reading, writing, callback) {
  callback = once(callback)

  var closed = false
  stream.on('close', function () {
    closed = true
  })

  eos(stream, {readable: reading, writable: writing}, function (err) {
    if (err) return callback(err)
    closed = true
    callback()
  })

  var destroyed = false
  return function (err) {
    if (closed) return
    if (destroyed) return
    destroyed = true

    if (isFS(stream)) return stream.close(noop) // use close for fs streams to avoid fd leaks
    if (isRequest(stream)) return stream.abort() // request.destroy just do .end - .abort is what we want

    if (isFn(stream.destroy)) return stream.destroy()

    callback(err || new Error('stream was destroyed'))
  }
}

var call = function (fn) {
  fn()
}

var pipe = function (from, to) {
  return from.pipe(to)
}

var pump = function () {
  var streams = Array.prototype.slice.call(arguments)
  var callback = isFn(streams[streams.length - 1] || noop) && streams.pop() || noop

  if (Array.isArray(streams[0])) streams = streams[0]
  if (streams.length < 2) throw new Error('pump requires two streams per minimum')

  var error
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1
    var writing = i > 0
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err
      if (err) destroys.forEach(call)
      if (reading) return
      destroys.forEach(call)
      callback(error)
    })
  })

  return streams.reduce(pipe)
}

module.exports = pump


/***/ }),

/***/ 7032:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const shebangRegex = __nccwpck_require__(2638);

module.exports = (string = '') => {
	const match = string.match(shebangRegex);

	if (!match) {
		return null;
	}

	const [path, argument] = match[0].replace(/#! ?/, '').split(' ');
	const binary = path.split('/').pop();

	if (binary === 'env') {
		return argument;
	}

	return argument ? `${binary} ${argument}` : binary;
};


/***/ }),

/***/ 2638:
/***/ ((module) => {

"use strict";

module.exports = /^#!(.*)/;


/***/ }),

/***/ 4931:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// Note: since nyc uses this module to output coverage, any lines
// that are in the direct sync flow of nyc's outputCoverage are
// ignored, since we can never get coverage for them.
var assert = __nccwpck_require__(2357)
var signals = __nccwpck_require__(3710)
var isWin = /^win/i.test(process.platform)

var EE = __nccwpck_require__(8614)
/* istanbul ignore if */
if (typeof EE !== 'function') {
  EE = EE.EventEmitter
}

var emitter
if (process.__signal_exit_emitter__) {
  emitter = process.__signal_exit_emitter__
} else {
  emitter = process.__signal_exit_emitter__ = new EE()
  emitter.count = 0
  emitter.emitted = {}
}

// Because this emitter is a global, we have to check to see if a
// previous version of this library failed to enable infinite listeners.
// I know what you're about to say.  But literally everything about
// signal-exit is a compromise with evil.  Get used to it.
if (!emitter.infinite) {
  emitter.setMaxListeners(Infinity)
  emitter.infinite = true
}

module.exports = function (cb, opts) {
  assert.equal(typeof cb, 'function', 'a callback must be provided for exit handler')

  if (loaded === false) {
    load()
  }

  var ev = 'exit'
  if (opts && opts.alwaysLast) {
    ev = 'afterexit'
  }

  var remove = function () {
    emitter.removeListener(ev, cb)
    if (emitter.listeners('exit').length === 0 &&
        emitter.listeners('afterexit').length === 0) {
      unload()
    }
  }
  emitter.on(ev, cb)

  return remove
}

module.exports.unload = unload
function unload () {
  if (!loaded) {
    return
  }
  loaded = false

  signals.forEach(function (sig) {
    try {
      process.removeListener(sig, sigListeners[sig])
    } catch (er) {}
  })
  process.emit = originalProcessEmit
  process.reallyExit = originalProcessReallyExit
  emitter.count -= 1
}

function emit (event, code, signal) {
  if (emitter.emitted[event]) {
    return
  }
  emitter.emitted[event] = true
  emitter.emit(event, code, signal)
}

// { <signal>: <listener fn>, ... }
var sigListeners = {}
signals.forEach(function (sig) {
  sigListeners[sig] = function listener () {
    // If there are no other listeners, an exit is coming!
    // Simplest way: remove us and then re-send the signal.
    // We know that this will kill the process, so we can
    // safely emit now.
    var listeners = process.listeners(sig)
    if (listeners.length === emitter.count) {
      unload()
      emit('exit', null, sig)
      /* istanbul ignore next */
      emit('afterexit', null, sig)
      /* istanbul ignore next */
      if (isWin && sig === 'SIGHUP') {
        // "SIGHUP" throws an `ENOSYS` error on Windows,
        // so use a supported signal instead
        sig = 'SIGINT'
      }
      process.kill(process.pid, sig)
    }
  }
})

module.exports.signals = function () {
  return signals
}

module.exports.load = load

var loaded = false

function load () {
  if (loaded) {
    return
  }
  loaded = true

  // This is the number of onSignalExit's that are in play.
  // It's important so that we can count the correct number of
  // listeners on signals, and don't wait for the other one to
  // handle it instead of us.
  emitter.count += 1

  signals = signals.filter(function (sig) {
    try {
      process.on(sig, sigListeners[sig])
      return true
    } catch (er) {
      return false
    }
  })

  process.emit = processEmit
  process.reallyExit = processReallyExit
}

var originalProcessReallyExit = process.reallyExit
function processReallyExit (code) {
  process.exitCode = code || 0
  emit('exit', process.exitCode, null)
  /* istanbul ignore next */
  emit('afterexit', process.exitCode, null)
  /* istanbul ignore next */
  originalProcessReallyExit.call(process, process.exitCode)
}

var originalProcessEmit = process.emit
function processEmit (ev, arg) {
  if (ev === 'exit') {
    if (arg !== undefined) {
      process.exitCode = arg
    }
    var ret = originalProcessEmit.apply(this, arguments)
    emit('exit', process.exitCode, null)
    /* istanbul ignore next */
    emit('afterexit', process.exitCode, null)
    return ret
  } else {
    return originalProcessEmit.apply(this, arguments)
  }
}


/***/ }),

/***/ 3710:
/***/ ((module) => {

// This is not the set of all possible signals.
//
// It IS, however, the set of all signals that trigger
// an exit on either Linux or BSD systems.  Linux is a
// superset of the signal names supported on BSD, and
// the unknown signals just fail to register, so we can
// catch that easily enough.
//
// Don't bother with SIGKILL.  It's uncatchable, which
// means that we can't fire any callbacks anyway.
//
// If a user does happen to register a handler on a non-
// fatal signal like SIGWINCH or something, and then
// exit, it'll end up firing `process.emit('exit')`, so
// the handler will be fired anyway.
//
// SIGBUS, SIGFPE, SIGSEGV and SIGILL, when not raised
// artificially, inherently leave the process in a
// state from which it is not safe to try and enter JS
// listeners.
module.exports = [
  'SIGABRT',
  'SIGALRM',
  'SIGHUP',
  'SIGINT',
  'SIGTERM'
]

if (process.platform !== 'win32') {
  module.exports.push(
    'SIGVTALRM',
    'SIGXCPU',
    'SIGXFSZ',
    'SIGUSR2',
    'SIGTRAP',
    'SIGSYS',
    'SIGQUIT',
    'SIGIOT'
    // should detect profiler and enable/disable accordingly.
    // see #21
    // 'SIGPROF'
  )
}

if (process.platform === 'linux') {
  module.exports.push(
    'SIGIO',
    'SIGPOLL',
    'SIGPWR',
    'SIGSTKFLT',
    'SIGUNUSED'
  )
}


/***/ }),

/***/ 8174:
/***/ ((module) => {

"use strict";


module.exports = input => {
	const LF = typeof input === 'string' ? '\n' : '\n'.charCodeAt();
	const CR = typeof input === 'string' ? '\r' : '\r'.charCodeAt();

	if (input[input.length - 1] === LF) {
		input = input.slice(0, input.length - 1);
	}

	if (input[input.length - 1] === CR) {
		input = input.slice(0, input.length - 1);
	}

	return input;
};


/***/ }),

/***/ 4351:
/***/ ((module) => {

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
/* global global, define, System, Reflect, Promise */
var __extends;
var __assign;
var __rest;
var __decorate;
var __param;
var __metadata;
var __awaiter;
var __generator;
var __exportStar;
var __values;
var __read;
var __spread;
var __spreadArrays;
var __spreadArray;
var __await;
var __asyncGenerator;
var __asyncDelegator;
var __asyncValues;
var __makeTemplateObject;
var __importStar;
var __importDefault;
var __classPrivateFieldGet;
var __classPrivateFieldSet;
var __createBinding;
(function (factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function (exports) { factory(createExporter(root, createExporter(exports))); });
    }
    else if ( true && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
    }
    else {
        factory(createExporter(root));
    }
    function createExporter(exports, previous) {
        if (exports !== root) {
            if (typeof Object.create === "function") {
                Object.defineProperty(exports, "__esModule", { value: true });
            }
            else {
                exports.__esModule = true;
            }
        }
        return function (id, v) { return exports[id] = previous ? previous(id, v) : v; };
    }
})
(function (exporter) {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };

    __extends = function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    __rest = function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };

    __decorate = function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    __param = function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };

    __metadata = function (metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    };

    __awaiter = function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    __generator = function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };

    __exportStar = function(m, o) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
    };

    __createBinding = Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    });

    __values = function (o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };

    __read = function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };

    /** @deprecated */
    __spread = function () {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    };

    /** @deprecated */
    __spreadArrays = function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    __spreadArray = function (to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };

    __await = function (v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    };

    __asyncGenerator = function (thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    };

    __asyncDelegator = function (o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    };

    __asyncValues = function (o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    };

    __makeTemplateObject = function (cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    var __setModuleDefault = Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
        o["default"] = v;
    };

    __importStar = function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };

    __importDefault = function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };

    __classPrivateFieldGet = function (receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };

    __classPrivateFieldSet = function (receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    };

    exporter("__extends", __extends);
    exporter("__assign", __assign);
    exporter("__rest", __rest);
    exporter("__decorate", __decorate);
    exporter("__param", __param);
    exporter("__metadata", __metadata);
    exporter("__awaiter", __awaiter);
    exporter("__generator", __generator);
    exporter("__exportStar", __exportStar);
    exporter("__createBinding", __createBinding);
    exporter("__values", __values);
    exporter("__read", __read);
    exporter("__spread", __spread);
    exporter("__spreadArrays", __spreadArrays);
    exporter("__spreadArray", __spreadArray);
    exporter("__await", __await);
    exporter("__asyncGenerator", __asyncGenerator);
    exporter("__asyncDelegator", __asyncDelegator);
    exporter("__asyncValues", __asyncValues);
    exporter("__makeTemplateObject", __makeTemplateObject);
    exporter("__importStar", __importStar);
    exporter("__importDefault", __importDefault);
    exporter("__classPrivateFieldGet", __classPrivateFieldGet);
    exporter("__classPrivateFieldSet", __classPrivateFieldSet);
});


/***/ }),

/***/ 4207:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const isWindows = process.platform === 'win32' ||
    process.env.OSTYPE === 'cygwin' ||
    process.env.OSTYPE === 'msys'

const path = __nccwpck_require__(5622)
const COLON = isWindows ? ';' : ':'
const isexe = __nccwpck_require__(7126)

const getNotFoundError = (cmd) =>
  Object.assign(new Error(`not found: ${cmd}`), { code: 'ENOENT' })

const getPathInfo = (cmd, opt) => {
  const colon = opt.colon || COLON

  // If it has a slash, then we don't bother searching the pathenv.
  // just check the file itself, and that's it.
  const pathEnv = cmd.match(/\//) || isWindows && cmd.match(/\\/) ? ['']
    : (
      [
        // windows always checks the cwd first
        ...(isWindows ? [process.cwd()] : []),
        ...(opt.path || process.env.PATH ||
          /* istanbul ignore next: very unusual */ '').split(colon),
      ]
    )
  const pathExtExe = isWindows
    ? opt.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM'
    : ''
  const pathExt = isWindows ? pathExtExe.split(colon) : ['']

  if (isWindows) {
    if (cmd.indexOf('.') !== -1 && pathExt[0] !== '')
      pathExt.unshift('')
  }

  return {
    pathEnv,
    pathExt,
    pathExtExe,
  }
}

const which = (cmd, opt, cb) => {
  if (typeof opt === 'function') {
    cb = opt
    opt = {}
  }
  if (!opt)
    opt = {}

  const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt)
  const found = []

  const step = i => new Promise((resolve, reject) => {
    if (i === pathEnv.length)
      return opt.all && found.length ? resolve(found)
        : reject(getNotFoundError(cmd))

    const ppRaw = pathEnv[i]
    const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw

    const pCmd = path.join(pathPart, cmd)
    const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd
      : pCmd

    resolve(subStep(p, i, 0))
  })

  const subStep = (p, i, ii) => new Promise((resolve, reject) => {
    if (ii === pathExt.length)
      return resolve(step(i + 1))
    const ext = pathExt[ii]
    isexe(p + ext, { pathExt: pathExtExe }, (er, is) => {
      if (!er && is) {
        if (opt.all)
          found.push(p + ext)
        else
          return resolve(p + ext)
      }
      return resolve(subStep(p, i, ii + 1))
    })
  })

  return cb ? step(0).then(res => cb(null, res), cb) : step(0)
}

const whichSync = (cmd, opt) => {
  opt = opt || {}

  const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt)
  const found = []

  for (let i = 0; i < pathEnv.length; i ++) {
    const ppRaw = pathEnv[i]
    const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw

    const pCmd = path.join(pathPart, cmd)
    const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd
      : pCmd

    for (let j = 0; j < pathExt.length; j ++) {
      const cur = p + pathExt[j]
      try {
        const is = isexe.sync(cur, { pathExt: pathExtExe })
        if (is) {
          if (opt.all)
            found.push(cur)
          else
            return cur
        }
      } catch (ex) {}
    }
  }

  if (opt.all && found.length)
    return found

  if (opt.nothrow)
    return null

  throw getNotFoundError(cmd)
}

module.exports = which
which.sync = whichSync


/***/ }),

/***/ 2940:
/***/ ((module) => {

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k]
  })

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    var ret = fn.apply(this, args)
    var cb = args[args.length-1]
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k]
      })
    }
    return ret
  }
}


/***/ }),

/***/ 2877:
/***/ ((module) => {

module.exports = eval("require")("encoding");


/***/ }),

/***/ 2357:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 4293:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 3129:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 8614:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 5747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 8605:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 7211:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 2087:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 5622:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 1765:
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ 2413:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 8835:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 8761:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__nccwpck_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__nccwpck_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nccwpck_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__nccwpck_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/tslib/tslib.js
var tslib = __nccwpck_require__(4351);
;// CONCATENATED MODULE: ./node_modules/tslib/modules/index.js

const {
    __extends,
    __assign,
    __rest,
    __decorate,
    __param,
    __metadata,
    __awaiter,
    __generator,
    __exportStar,
    __createBinding,
    __values,
    __read,
    __spread,
    __spreadArrays,
    __spreadArray,
    __await,
    __asyncGenerator,
    __asyncDelegator,
    __asyncValues,
    __makeTemplateObject,
    __importStar,
    __importDefault,
    __classPrivateFieldGet,
    __classPrivateFieldSet,
} = tslib;


// EXTERNAL MODULE: ./node_modules/@relative-ci/env-ci/index.js
var env_ci = __nccwpck_require__(141);
var env_ci_default = /*#__PURE__*/__nccwpck_require__.n(env_ci);
// EXTERNAL MODULE: ./node_modules/isomorphic-fetch/fetch-npm-node.js
var fetch_npm_node = __nccwpck_require__(2340);
var fetch_npm_node_default = /*#__PURE__*/__nccwpck_require__.n(fetch_npm_node);
;// CONCATENATED MODULE: ./src/utils/logger.ts
let logger = {
    debug: console.debug,
    info: console.info,
    error: console.error,
};
function setLogger(newLogger) {
    logger = newLogger;
}
function getLogger() {
    return logger;
}

;// CONCATENATED MODULE: ./src/jira/auth.ts



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
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch_npm_node_default()('https://api.atlassian.com/oauth/token', {
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
        });
        if (res.status >= 400) {
            throw new Error(`Auth Error! Response ${res.status}:\n ${JSON.stringify(yield res.text(), null, 2)}`);
        }
        const { access_token } = yield res.json();
        return access_token;
    });
}
/**
 * @param jiraInstance
 * @returns
 * @see https://developer.atlassian.com/cloud/jira/software/integrate-jsw-cloud-with-onpremises-tools/#making-api-calls
 */
function getCloudId(jiraInstance) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch_npm_node_default()(`https://${jiraInstance}.atlassian.net/_edge/tenant_info`);
            const json = yield res.json();
            return json.cloudId;
        }
        catch (err) {
            getLogger().info(err, 'Could not get cloudId, check "jiraInstance" is correct');
            throw err;
        }
    });
}

;// CONCATENATED MODULE: ./src/jira/api.ts

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type */
/**
 * Generated from OpenAPI file and [fetch-openapi](https://github.com/kogosoftwarellc/open-api/tree/master/packages/fetch-openapi)
 * @see https://redocly.github.io/redoc/?url=https://developer.atlassian.com/cloud/jira/software/on-premise-swagger.json
 */



function createApi(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const logger = getLogger();
        const basePath = '/jira';
        const endpoint = 'https://api.atlassian.com';
        const cloudId = yield getCloudId(options.jiraInstance);
        logger.info(`Found cloudId: "${cloudId}"`);
        const securityHandlers = {
            atlassianCloudOauth: (headers) => __awaiter(this, void 0, void 0, function* () {
                headers['Authorization'] = `Bearer ${yield getJWT(options.clientId, options.clientSecret)}`;
                return true;
            }),
        };
        const handleSecurity = (security, headers, params, operationId) => __awaiter(this, void 0, void 0, function* () {
            for (let i = 0, ilen = security.length; i < ilen; i++) {
                const scheme = security[i];
                const schemeParts = Object.keys(scheme);
                for (let j = 0, jlen = schemeParts.length; j < jlen; j++) {
                    const schemePart = schemeParts[j];
                    const fulfilsSecurityRequirements = securityHandlers[schemePart]
                        ? yield securityHandlers[schemePart](headers, params, schemePart)
                        : false;
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
        const buildQuery = (obj) => {
            return Object.keys(obj)
                .filter(key => typeof obj[key] !== 'undefined')
                .map(key => {
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
                    }
                    else {
                        return '';
                    }
                }
                else {
                    return `${key}=${encodeURIComponent(value)}`;
                }
            })
                .join('&');
        };
        return {
            cloudId,
            submitBuilds(params, body) {
                return __awaiter(this, void 0, void 0, function* () {
                    const headers = {};
                    yield handleSecurity([{ atlassianCloudOauth: [] }], headers, params, 'submitBuilds');
                    const result = yield fetch_npm_node_default()(`${endpoint + basePath}/builds/0.1/cloud/${cloudId}/bulk`, {
                        method: 'POST',
                        headers: Object.assign(Object.assign({}, headers), { 'Content-Type': 'application/json' }),
                        body: JSON.stringify(body),
                    });
                    logger.debug(`Requesting url: ${result.url}}`);
                    const res = yield result.json();
                    if (result.status >= 400) {
                        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`);
                    }
                    return res;
                });
            },
            deleteBuildsByProperty(params) {
                return __awaiter(this, void 0, void 0, function* () {
                    const headers = {};
                    yield handleSecurity([{ atlassianCloudOauth: [] }], headers, params, 'deleteBuildsByProperty');
                    const result = yield fetch_npm_node_default()(`${endpoint + basePath}/builds/0.1/cloud/${cloudId}/bulkByProperties` +
                        `?${buildQuery({
                            _updateSequenceNumber: params._updateSequenceNumber,
                        })}`, {
                        method: 'DELETE',
                        headers,
                    });
                    logger.debug(`Requesting url: ${result.url}`);
                    const res = yield result.json();
                    if (result.status >= 400) {
                        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`);
                    }
                    return res;
                });
            },
            getBuildByKey(params) {
                return __awaiter(this, void 0, void 0, function* () {
                    const headers = {};
                    yield handleSecurity([{ atlassianCloudOauth: [] }], headers, params, 'getBuildByKey');
                    const result = yield fetch_npm_node_default()(`${endpoint + basePath}/builds/0.1/cloud/${cloudId}/pipelines/${params.pipelineId}/builds/${params.buildNumber}`, {
                        method: 'GET',
                        headers,
                    });
                    logger.debug(`Requesting url: ${result.url}`);
                    const res = yield result.json();
                    if (result.status >= 400) {
                        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`);
                    }
                    return res;
                });
            },
            deleteBuildByKey(params) {
                return __awaiter(this, void 0, void 0, function* () {
                    const headers = {};
                    yield handleSecurity([{ atlassianCloudOauth: [] }], headers, params, 'deleteBuildByKey');
                    const result = yield fetch_npm_node_default()(`${endpoint + basePath}/builds/0.1/cloud/${cloudId}/pipelines/${params.pipelineId}/builds/${params.buildNumber}` +
                        `?${buildQuery({
                            _updateSequenceNumber: params._updateSequenceNumber,
                        })}`, {
                        method: 'DELETE',
                        headers,
                    });
                    logger.debug(`Requesting url: ${result.url}`);
                    const res = yield result.json();
                    if (result.status >= 400) {
                        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`);
                    }
                    return res;
                });
            },
            storeDevelopmentInformation(params, body) {
                return __awaiter(this, void 0, void 0, function* () {
                    const headers = {};
                    yield handleSecurity([{ atlassianCloudOauth: [] }], headers, params, 'storeDevelopmentInformation');
                    const result = yield fetch_npm_node_default()(`${endpoint + basePath}/devinfo/0.1/cloud/${cloudId}/bulk`, {
                        method: 'POST',
                        headers: Object.assign(Object.assign({}, headers), { 'Content-Type': 'application/json' }),
                        body: JSON.stringify(body),
                    });
                    logger.debug(`Requesting url: ${result.url}`);
                    const res = yield result.json();
                    if (result.status >= 400) {
                        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`);
                    }
                    return res;
                });
            },
            getRepository(params) {
                return __awaiter(this, void 0, void 0, function* () {
                    const headers = {};
                    yield handleSecurity([{ atlassianCloudOauth: [] }], headers, params, 'getRepository');
                    const result = yield fetch_npm_node_default()(`${endpoint + basePath}/devinfo/0.1/cloud/${cloudId}/repository/${params.repositoryId}`, {
                        method: 'GET',
                        headers,
                    });
                    logger.debug(`Requesting url: ${result.url}`);
                    const res = yield result.json();
                    if (result.status >= 400) {
                        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`);
                    }
                    return res;
                });
            },
            deleteRepository(params) {
                return __awaiter(this, void 0, void 0, function* () {
                    const headers = {};
                    yield handleSecurity([{ atlassianCloudOauth: [] }], headers, params, 'deleteRepository');
                    const result = yield fetch_npm_node_default()(`${endpoint + basePath}/devinfo/0.1/cloud/${cloudId}/repository/${params.repositoryId}` +
                        `?${buildQuery({
                            _updateSequenceId: params._updateSequenceId,
                        })}`, {
                        method: 'DELETE',
                        headers,
                    });
                    logger.debug(`Requesting url: ${result.url}`);
                    const res = yield result.json();
                    if (result.status >= 400) {
                        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`);
                    }
                    return res;
                });
            },
            deleteByProperties(params) {
                return __awaiter(this, void 0, void 0, function* () {
                    const headers = {};
                    yield handleSecurity([{ atlassianCloudOauth: [] }], headers, params, 'deleteByProperties');
                    const result = yield fetch_npm_node_default()(`${endpoint + basePath}/devinfo/0.1/cloud/${cloudId}/bulkByProperties` +
                        `?${buildQuery({
                            _updateSequenceId: params._updateSequenceId,
                        })}`, {
                        method: 'DELETE',
                        headers,
                    });
                    logger.debug(`Requesting url: ${result.url}`);
                    const res = yield result.json();
                    if (result.status >= 400) {
                        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`);
                    }
                    return res;
                });
            },
            existsByProperties(params) {
                return __awaiter(this, void 0, void 0, function* () {
                    const headers = {};
                    yield handleSecurity([{ atlassianCloudOauth: [] }], headers, params, 'existsByProperties');
                    const result = yield fetch_npm_node_default()(`${endpoint + basePath}/devinfo/0.1/cloud/${cloudId}/existsByProperties` +
                        `?${buildQuery({
                            _updateSequenceId: params._updateSequenceId,
                        })}`, {
                        method: 'GET',
                        headers,
                    });
                    logger.debug(`Requesting url: ${result.url}`);
                    const res = yield result.json();
                    if (result.status >= 400) {
                        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`);
                    }
                    return res;
                });
            },
            deleteEntity(params) {
                return __awaiter(this, void 0, void 0, function* () {
                    const headers = {};
                    yield handleSecurity([{ atlassianCloudOauth: [] }], headers, params, 'deleteEntity');
                    const result = yield fetch_npm_node_default()(`${endpoint + basePath}/devinfo/0.1/cloud/${cloudId}/repository/${params.repositoryId}/${params.entityType}/${params.entityId}` +
                        `?${buildQuery({
                            _updateSequenceId: params._updateSequenceId,
                        })}`, {
                        method: 'DELETE',
                        headers,
                    });
                    logger.debug(`Requesting url: ${result.url}`);
                    const res = yield result.json();
                    if (result.status >= 400) {
                        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`);
                    }
                    return res;
                });
            },
            submitDeployments(params, body) {
                return __awaiter(this, void 0, void 0, function* () {
                    const headers = {};
                    yield handleSecurity([{ atlassianCloudOauth: [] }], headers, params, 'submitDeployments');
                    const result = yield fetch_npm_node_default()(`${endpoint + basePath}/deployments/0.1/cloud/${cloudId}/bulk`, {
                        method: 'POST',
                        headers: Object.assign(Object.assign({}, headers), { 'Content-Type': 'application/json' }),
                        body: JSON.stringify(body),
                    });
                    logger.debug(`Requesting url: ${result.url}`);
                    const res = yield result.json();
                    if (result.status >= 400) {
                        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`);
                    }
                    return res;
                });
            },
            deleteDeploymentsByProperty(params) {
                return __awaiter(this, void 0, void 0, function* () {
                    const headers = {};
                    yield handleSecurity([{ atlassianCloudOauth: [] }], headers, params, 'deleteDeploymentsByProperty');
                    const result = yield fetch_npm_node_default()(`${endpoint + basePath}/deployments/0.1/cloud/${cloudId}/bulkByProperties` +
                        `?${buildQuery({
                            _updateSequenceNumber: params._updateSequenceNumber,
                        })}`, {
                        method: 'DELETE',
                        headers,
                    });
                    logger.debug(`Requesting url: ${result.url}`);
                    const res = yield result.json();
                    if (result.status >= 400) {
                        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`);
                    }
                    return res;
                });
            },
            getDeploymentByKey(params) {
                return __awaiter(this, void 0, void 0, function* () {
                    const headers = {};
                    yield handleSecurity([{ atlassianCloudOauth: [] }], headers, params, 'getDeploymentByKey');
                    const result = yield fetch_npm_node_default()(`${endpoint + basePath}/deployments/0.1/cloud/${cloudId}/pipelines/${params.pipelineId}/environments/${params.environmentId}/deployments/${params.deploymentSequenceNumber}`, {
                        method: 'GET',
                        headers,
                    });
                    logger.debug(`Requesting url: ${result.url}`);
                    const res = yield result.json();
                    if (result.status >= 400) {
                        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`);
                    }
                    return res;
                });
            },
            deleteDeploymentByKey(params) {
                return __awaiter(this, void 0, void 0, function* () {
                    const headers = {};
                    yield handleSecurity([{ atlassianCloudOauth: [] }], headers, params, 'deleteDeploymentByKey');
                    const result = yield fetch_npm_node_default()(`${endpoint + basePath}/deployments/0.1/cloud/${cloudId}/pipelines/${params.pipelineId}/environments/${params.environmentId}/deployments/${params.deploymentSequenceNumber}` +
                        `?${buildQuery({
                            _updateSequenceNumber: params._updateSequenceNumber,
                        })}`, {
                        method: 'DELETE',
                        headers,
                    });
                    logger.debug(`Requesting url: ${result.url}`);
                    const res = yield result.json();
                    if (result.status >= 400) {
                        throw new Error(`Error Response:\n ${JSON.stringify(res, null, 2)}`);
                    }
                    return res;
                });
            },
        };
    });
}

;// CONCATENATED MODULE: ./src/jira/builds.ts


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function sendBuildInfo(jira, { name, commit, state, branchName, branchUrl, issueKeys, buildUrl, repoUrl, pipelineId, buildNumber, }) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const now = Date.now();
        const logger = getLogger();
        if (!issueKeys.length) {
            logger.info('No issue keys found to send "build" event for');
            return;
        }
        logger.info('Sending "build" event');
        const response = yield jira.submitBuilds({}, {
            builds: [
                {
                    schemaVersion: '1.0',
                    pipelineId,
                    buildNumber,
                    updateSequenceNumber: now,
                    displayName: name,
                    description: `${name} triggered for commit ${commit}`,
                    url: buildUrl,
                    state,
                    lastUpdated: new Date(now).toISOString(),
                    issueKeys,
                    // testInfo: {
                    //   totalNumber: 150,
                    //   numberPassed: 145,
                    //   numberFailed: 5,
                    //   numberSkipped: 0,
                    // },
                    references: [
                        Object.assign({ commit: {
                                id: commit,
                                repositoryUri: repoUrl,
                            } }, (branchName && branchUrl
                            ? {
                                ref: {
                                    name: branchName,
                                    uri: branchUrl,
                                },
                            }
                            : null)),
                    ],
                },
            ],
        });
        logger.debug(`Build Response:\n${JSON.stringify(response, null, 2)}`);
        if ((_a = response.rejectedBuilds) === null || _a === void 0 ? void 0 : _a.length) {
            throw new Error(`Invalid build generated:\n ${JSON.stringify(response.rejectedBuilds, null, 2)}`);
        }
        return (_b = response.acceptedBuilds) === null || _b === void 0 ? void 0 : _b[0];
    });
}

;// CONCATENATED MODULE: ./src/jira/deployments.ts


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function sendDeploymentInfo(jira, { name, commit, state, issueKeys, buildUrl, pipelineId, buildNumber, environment, }) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const now = Date.now();
        const logger = getLogger();
        if (!issueKeys.length) {
            logger.info('No issue keys found to send "deployment" event for');
            return;
        }
        logger.info('Sending "deployment" event');
        const response = yield jira.submitDeployments({}, {
            deployments: [
                {
                    schemaVersion: '1.0',
                    pipeline: {
                        id: pipelineId,
                        url: buildUrl,
                        displayName: name,
                    },
                    deploymentSequenceNumber: buildNumber,
                    environment: Object.assign(Object.assign({}, environment), { id: `${environment.displayName.toLowerCase()}-${pipelineId}` }),
                    updateSequenceNumber: now,
                    displayName: name,
                    description: `${name} triggered for commit ${commit}`,
                    url: buildUrl,
                    state,
                    lastUpdated: new Date(now).toISOString(),
                    issueKeys,
                },
            ],
        });
        logger.debug(`Deployment Response:\n${JSON.stringify(response, null, 2)}`);
        if ((_a = response.rejectedDeployments) === null || _a === void 0 ? void 0 : _a.length) {
            throw new Error(`Invalid deployment generated:\n ${JSON.stringify(response.rejectedDeployments, null, 2)}`);
        }
        return (_b = response.acceptedDeployments) === null || _b === void 0 ? void 0 : _b[0];
    });
}

;// CONCATENATED MODULE: ./src/utils/validator.ts
const validEvents = ['build', 'deployment'];
function validateInputs(inputs) {
    if (!inputs.jiraInstance) {
        throw new Error(`Missing input: JIRA_INSTANCE`);
    }
    if (!inputs.clientId || !inputs.clientSecret) {
        throw new Error(`Missing inputs: JIRA_CLIENT_ID or JIRA_CLIENT_SECRET`);
    }
    if (!validEvents.includes(inputs.event)) {
        throw new Error(`Invalid input: JIRA_EVENT_TYPE. Expected one of "${validEvents}", received "${inputs.event}".`);
    }
}
const validEnvTypes = ['development', 'testing', 'staging', 'production'];
function processEnvironmentTpe(slug, type) {
    if (!type) {
        if (slug.includes('prod') || slug.includes('production')) {
            type = 'production';
        }
        else if (slug.includes('stage') ||
            slug.includes('staging') ||
            slug.includes('stg')) {
            type = 'staging';
        }
        else if (slug.includes('test') || slug.includes('testing')) {
            type = 'testing';
        }
        else if (slug.includes('dev') ||
            slug.includes('develop') ||
            slug.includes('development')) {
            type = 'development';
        }
    }
    return (validEnvTypes.includes(type) ? type : 'unmapped');
}

;// CONCATENATED MODULE: ./src/docker/input.ts


const defaultEnv = 'Unknown';
function getEnvironment() {
    const label = process.env.CI_ENVIRONMENT_NAME ||
        process.env.DRONE_DEPLOY_TO ||
        process.env.BUILD_ENVIRONMENT ||
        defaultEnv;
    const type = process.env.BUILD_ENVIRONMENT_TYPE;
    const slug = (process.env.CI_ENVIRONMENT_TIER ||
        process.env.CI_ENVIRONMENT_SLUG ||
        label).toLowerCase();
    return {
        displayName: label,
        type: processEnvironmentTpe(slug, type),
    };
}
function getInputs() {
    const logger = getLogger();
    const jiraInstance = process.env.JIRA_INSTANCE;
    logger.info(`Connecting to Jira Instance "${jiraInstance}"...`);
    const clientId = process.env.JIRA_CLIENT_ID;
    const clientSecret = process.env.JIRA_CLIENT_SECRET;
    logger.info(`Connecting via Oauth`);
    let event = 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    process.env.JIRA_EVENT_TYPE;
    const environment = getEnvironment();
    logger.info(`Environment is "${environment.displayName}" (${environment.type})...`);
    // If we have env then it probably is a deployment rather than a build
    if (environment.displayName !== defaultEnv) {
        event = event || 'deployment';
    }
    else {
        event = event || 'build';
    }
    const inputs = {
        jiraInstance,
        clientId,
        clientSecret,
        event,
    };
    validateInputs(inputs);
    return inputs;
}

;// CONCATENATED MODULE: ./src/docker/utils.ts



// Using this type as this has the most supported fields
const env = env_ci_default()();
function getBranchName() {
    const branchName = env.branch;
    getLogger().debug(`BranchName: ${branchName}`);
    return branchName;
}
function getState() {
    // @ts-expect-error cast type
    const state = process.env.BUILD_STATE ||
        process.env.CI_JOB_STATUS ||
        process.env.DRONE_BUILD_STATUS ||
        'successful';
    return state === 'success' ? 'successful' : state;
}
/**
 * @see https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#push
 * @returns will give latest commit message if ̉push event
 */
function getCommitMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        const commitMessage = process.env.COMMIT_MESSAGE ||
            process.env.CI_COMMIT_MESSAGE ||
            process.env.DRONE_COMMIT_MESSAGE ||
            undefined;
        getLogger().debug(`CommitMessage: ${commitMessage}`);
        return commitMessage;
    });
}
function getIssueKeys() {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        const branchName = getBranchName();
        const commitMessage = yield getCommitMessage();
        const fromInput = (_b = (_a = process.env.JIRA_ISSUES) === null || _a === void 0 ? void 0 : _a.match(/(\w+)-(\d+)/g)) !== null && _b !== void 0 ? _b : [];
        const fromBranch = (_c = branchName === null || branchName === void 0 ? void 0 : branchName.match(/(\w+)-(\d+)/g)) !== null && _c !== void 0 ? _c : [];
        const fromCommit = (_d = commitMessage === null || commitMessage === void 0 ? void 0 : commitMessage.match(/(\w+)-(\d+)/g)) !== null && _d !== void 0 ? _d : [];
        const issueKeys = [...fromInput, ...fromBranch, ...fromCommit].filter((value, index, array) => {
            // Deduplicate and remove nill values
            return value && array.indexOf(value) === index;
        });
        if (!issueKeys.length && process.env.JIRA_DEFAULT_TEST_ISSUE) {
            issueKeys.push(process.env.JIRA_DEFAULT_TEST_ISSUE);
        }
        getLogger().debug(`IssueKeys: "${issueKeys}"`);
        return issueKeys;
    });
}

;// CONCATENATED MODULE: ./src/docker/main.ts

/* eslint-disable no-case-declarations */







function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            setLogger(console);
            const logger = getLogger();
            // Using this type as this has the most supported fields
            const env = env_ci_default()();
            const inputs = getInputs();
            const jira = yield createApi(inputs);
            const state = getState();
            const branchName = getBranchName();
            const issueKeys = yield getIssueKeys();
            const common = {
                name: process.env.BUILD_NAME || env.name,
                state,
                commit: env.commit,
                issueKeys,
                buildUrl: env.buildUrl,
                buildNumber: Number(env.build || env.job),
                pipelineId: `${env.service}-${env.slug}`,
            };
            switch (inputs.event) {
                case 'build':
                    const build = yield sendBuildInfo(jira, Object.assign(Object.assign({}, common), { branchName, repoUrl: env.slug }));
                    logger.info('Response', build);
                    break;
                case 'deployment':
                    const deployment = yield sendDeploymentInfo(jira, Object.assign(Object.assign({}, common), { environment: getEnvironment() }));
                    logger.info('Response', deployment);
                    break;
                default:
                    throw new Error(`Invalid event_type, "${inputs.event}"`);
            }
            logger.info('Done', new Date().toTimeString());
        }
        catch (error) {
            console.error(error, 'Failed to send event');
            process.exit(1);
        }
    });
}
run();

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map