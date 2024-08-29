import { z } from "zod";
import { match } from 'ts-pattern'
export * from "ts-pattern";

export const unused = z.string().describe(
  `This lib is currently not used as we use drizzle-zod for simple schemas
   But as your application grows and you need other validators to share
   with back and frontend, you can put them in here
  `,
);

type ErrorWithMessage = { message: string }

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage =>
  typeof error === 'object' &&
  error !== null
  && 'message' in error
  && typeof (error as Record<string, unknown>).message === 'string'

  function toErrorWithMessage(maybeError:unknown):ErrorWithMessage{
    if (isErrorWithMessage(maybeError)) return maybeError
    try {
      return  new Error(JSON.stringify(maybeError))
    } catch {
      return  new Error(String(maybeError))
    }
  }

function  getErrorMessage(error: unknown){
  return toErrorWithMessage(error).message
}

/*
const catchError = (error: unknown) => {
  match(error)
    .with(error instanceof SyntaxError, () => error.message)
    .with(error instanceof TypeError, () => error.message)
    .with(error instanceof SyntaxError, () => error.message)
    .otherwise(() => 'unknow error' />)
}
    */


My TypeScript version is under 4.0, and I can't make it work again, then I created an auxiliar function to normalize the errors, like following:

interface INormalizedError {

  /**

   * Original error.

   */

  err: unknown;

  /**

   * Is error instance?

   */

  isError: boolean;

  /**

   * Error object.

   */

  error?: Error;

  /**

   * Call stack.

   */

  stack?: Error['stack'];

  /**

   * Error message.

   */

  message: string;

  toString(): string;

}

/**

 * Normalize error.

 *

 * @param err Error instance.

 * @returns Normalized error object.

 */

function normalizeError(err: unknown): Readonly<INormalizedError> {

  const result: INormalizedError = {

    err,

    message: '',

    isError: false,

    toString() {

      return this.message;

    }

  };

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

    if (typeof err === 'object') {

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