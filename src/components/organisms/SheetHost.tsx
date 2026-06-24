"use client";

import { ItemDetailSheet } from "./ItemDetailSheet";
import { CallWaiterSheet } from "./CallWaiterSheet";

/** Mounts the global bottom sheets once per branch. */
export function SheetHost() {
  return (
    <>
      <ItemDetailSheet />
      <CallWaiterSheet />
    </>
  );
}
