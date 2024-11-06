export interface TabsProps {
  /**
   * 当前默认激活的 Tab 的值
   */
  defaultValue?: string;
}

export interface TabsTriggerProps {
  /**
   * 点击 TabTrigger 会让 Tabs 切换当前激活的值为 TabTrigger 的 value
   */
  value: string;
}
export interface TabsContentProps {
  /**
   * TabContent 的值与当前激活的值一致时，会显示自己
   */
  value: string;
}

export interface TabsContext {
  /**
   * 当前激活的 Tab 的值
   */
  value: string;

  /**
   * 更换 Tab 的方法
   */
  changeTab: (value: string) => void;
}

export type RequestTabsContextDetail = {
  ref: HTMLElement;
  onTabChanged: (value: string) => void;
  setChangeTab?: (changeTab: (value: string) => void) => void;
};
