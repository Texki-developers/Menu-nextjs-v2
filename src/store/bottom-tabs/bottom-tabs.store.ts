"use client";

import { create } from "zustand";
import { BottomTabsStore } from "./bottom-tabs.type";
import { BottomTabId } from "@/components/organisms/bottom-tabs/bottom-tabs.config";

export const useBottomTabsStore = create<BottomTabsStore>((set) => ({
  activeTab: BottomTabId.HOME,
  setActiveTab: (tabId: BottomTabId) => set({ activeTab: tabId }),
}));
