import React from "react";
import BottomTabs from "@/components/organisms/bottom-tabs/BottomTabs";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="pb-18 max-h-dvh  scrollbar-hide overflow-y-auto">{children}</div>;
      <BottomTabs />
    </>
  );
};

export default layout;
