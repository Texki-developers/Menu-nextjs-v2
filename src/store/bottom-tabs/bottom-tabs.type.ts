import { BottomTabId } from "@/components/organisms/bottom-tabs/bottom-tabs.config";

export interface BottomTabsStore {
  activeTab: BottomTabId;
  setActiveTab: (tabId: BottomTabId) => void;
}
