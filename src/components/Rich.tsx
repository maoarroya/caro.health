import { Fragment } from "react";

/** Texto con *asteriscos* → cursiva. Es el único formato que admite el builder. */
export function Rich({ text }: { text: string }) {
  return text
    .split(/\*([^*]+)\*/g)
    .map((part, i) => (i % 2 ? <em key={i}>{part}</em> : <Fragment key={i}>{part}</Fragment>));
}
