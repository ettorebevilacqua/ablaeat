/*
const catchError = (error: unknown) => {
  match(error)
    .with(error instanceof SyntaxError, () => error.message)
    .with(error instanceof TypeError, () => error.message)
    .with(error instanceof SyntaxError, () => error.message)
    .otherwise(() => 'unknow error' />)
}
    */

/*
My TypeScript version is under 4.0, and I can't make it work again, 
then I created an auxiliar function to normalize the errors, like following:
*/
import {match} from "ts-pattern";

interface INormalizedError {
  err: unknown;  // Original error.  
  isError: boolean; // Is error instance? 
  error?: Error; // Error object.
  stack?: Error['stack']; // Call stack.
  message: string; // Error message.
  toString(): string; // Normalize error.
}

/**
 * @param err Error instance.
 * @returns Normalized error object.
 */
export type ErrorTypes = Error | string | Record<string, unknown> | null
export function normalizeError(err: unknown): Readonly<INormalizedError> {
  const result: INormalizedError = {
    err,
    message: '',
    isError: false,
    toString() {
      return this.message;
    }
  };
  if (err === null) return result;
  if (err instanceof Error) {
    result.error = err;
    result.message = err.message;
    result.stack = err.stack;
    result.isError = true;
    result.toString = () => err.toString();
  } else if (typeof err === 'string') {

    result.error = new Error(err);
    result.message = err;
    result.stack = result.error.stack;

  } else {
    const aErr = err as any;
    if (typeof err === 'object' && err !==null) {
      result.message = aErr?.message ? aErr.message : String(aErr);
      result.toString = () => {
        const m = typeof err.toString === 'function' ? err.toString() : result.message;
        return (m === '[object Object]') ? result.message : m;
      };

    } else if (typeof err === 'function') {
      return normalizeError(err());
    } else {
      result.message = String(`[${typeof err}] ${aErr}`);
    }

    result.error = new Error(result.message);
    result.stack = aErr?.stack ? aErr.stack : result.error.stack;

  }

  return result;
}