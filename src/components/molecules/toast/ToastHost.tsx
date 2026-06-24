"use client";

import { useToast } from "@/store/toast.store";
import { Toast } from "./Toast";

/** Renders the active toast (if any). Mounted once in the layout. */
export function ToastHost() {
  const toast = useToast((s) => s.toast);
  if (!toast) return null;
  return <Toast msg={toast.msg} type={toast.type} />;
}
