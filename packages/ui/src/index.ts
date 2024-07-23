import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import {Button, buttonVariants} from './button'

const cn = (...inputs: Parameters<typeof cx>) => twMerge(cx(inputs));

export { cn, Button };
