import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

import { Button, buttonVariants } from "./button";
// import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import FormField from "./forms/FormField";

export type { FormFieldProps } from "./forms/typesForm";

const cn = (...inputs: Parameters<typeof cx>) => twMerge(cx(inputs));

export { cn, Button, FormField };
