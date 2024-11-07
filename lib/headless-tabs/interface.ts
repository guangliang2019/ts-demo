export interface HeadlessTabsProps {
  defaultValue: string;
  onTabChanged: (value: string) => void;
}

export interface HeadlessTabsTriggerProps {
  value: string;
}

export interface HeadlessTabsContentProps {
  value: string;
}

export interface HeadlessTabsContext {
  value: string;
  changeTab: (value: string) => void;
}
