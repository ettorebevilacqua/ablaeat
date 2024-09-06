import { z } from "zod";
import * as tsPattern from "ts-pattern";
import * as errors from "./error"

export const unused = z.string().describe(
  `This lib is currently not used as we use drizzle-zod for simple schemas
   But as your application grows and you need other validators to share
   with back and frontend, you can put them in here
  `,
);

export {errors, tsPattern}

