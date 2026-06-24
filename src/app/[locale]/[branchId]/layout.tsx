import { SheetHost } from "@/components/organisms/SheetHost";

/** Branch shell — the scrollable screen mount plus the global sheets. */
export default function BranchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="no-scrollbar absolute inset-0 overflow-y-auto overflow-x-hidden">{children}</div>
      <SheetHost />
    </>
  );
}
