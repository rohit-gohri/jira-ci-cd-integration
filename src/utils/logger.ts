let logger = {
  debug: console.debug,
  info: console.info,
}

export function setLogger(newLogger: typeof logger): void {
  logger = newLogger
}

export function getLogger(): typeof logger {
  return logger
}
