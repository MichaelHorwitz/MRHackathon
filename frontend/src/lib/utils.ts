import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FormRecord = {
  [key: string]: FormDataEntryValue | FormDataEntryValue[] | undefined;
};

/** Helper function to transform FormData into a JavaScript object. */
export function getFormObject(form: FormData): FormRecord {
  const result: FormRecord = {};
  for (const [key, value] of form.entries()) {
    const cur = result[key];
    if (cur === undefined) {
      // Not present in object
      result[key] = value;
    } else if (cur instanceof Array) {
      // Multiple values already present
      cur.push(value);
    } else {
      // First occurence o multiple values
      result[key] = [cur, value];
    }
  }

  return result;
}
