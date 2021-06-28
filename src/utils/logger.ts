let logger = {
  debug: console.debug,
  info: console.info,
  error: console.error,
}

export function setLogger(newLogger: typeof logger): void {
  logger = newLogger
}

export function getLogger(): typeof logger {
  return logger
}
