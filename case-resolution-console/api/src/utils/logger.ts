/**
 * logger.ts
 * Lightweight logger using pino-like API but implemented with `console` here to avoid adding heavy deps.
 * Replace with `pino` or `winston` in production for JSON structured logs and transports.
 */

// Try to load Node's util.inspect at runtime; fall back to JSON.stringify when not available.
let nodeUtil: any = null;
try {
  // Dynamically require 'util' using eval to avoid TypeScript resolving it at build-time.
  const req: any = eval("require");
  nodeUtil = req('util');
} catch (e) {
  nodeUtil = null;
}
import config from '../config';

export const logger = {
  debug: (...args: any[]) => {
    if (['debug'].includes(config.logging.level)) {
      console.debug('[DEBUG]', ...format(args));
    }
  },
  info: (...args: any[]) => {
    if (['debug', 'info'].includes(config.logging.level)) {
      console.info('[INFO]', ...format(args));
    }
  },
  warn: (...args: any[]) => {
    if (['debug', 'info', 'warn'].includes(config.logging.level)) {
      console.warn('[WARN]', ...format(args));
    }
  },
  error: (...args: any[]) => {
    console.error('[ERROR]', ...format(args));
  },
};

function format(args: any[]) {
  return args.map(a => {
    if (typeof a === 'object') {
      if (nodeUtil && typeof nodeUtil.inspect === 'function') {
        return nodeUtil.inspect(a, { depth: 5, colors: false });
      }
      try {
        return JSON.stringify(a, null, 2);
      } catch (_) {
        try {
          return String(a);
        } catch (e) {
          return '[uninspectable]';
        }
      }
    }
    return a;
  });
}

// A writable stream for morgan to use
export const stream = {
  write: (message: string) => {
    // morgan prints a trailing newline; trim to keep logs tidy
    logger.info(message.trim());
  },
};
