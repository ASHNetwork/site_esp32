/* eslint-disable @typescript-eslint/no-explicit-any */
import { lang } from "./lang/fr";

type RecursiveKey<T, Prev extends string = ""> = T extends Record<
  infer V,
  unknown
>
  ? V extends string
    ? RecursiveKey<
        T[V],
        T[V] extends Record<string, unknown> ? `${Prev}${V}.` : `${Prev}${V}`
      >
    : Prev
  : Prev;
type Splitted<
  Value extends string,
  Sep extends string
> = Value extends `${infer Left}${Sep}${infer Right}`
  ? [Left, ...Splitted<Right, Sep>]
  : [Value];
type FRType = typeof lang;
type RecursiveKeyOrSplitted<T> =
  | RecursiveKey<T>
  | Splitted<RecursiveKey<T>, ".">;

function isString(val: unknown): val is string {
  return typeof val === "string" || val instanceof String;
}

export function t(label: RecursiveKeyOrSplitted<FRType>): string {
  type Split = Splitted<RecursiveKey<FRType>, ".">;
  let indices: Split;
  if (isString(label)) {
    indices = label.split(".") as Split;
  } else {
    indices = label;
  }
  return (indices.reduce as any)((acc: any, val: any) => acc[val], lang) as any;
}
