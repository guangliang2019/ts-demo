import { RequestTabsContextDetail, TabsProps } from "./interface";

export default class HeadlessTabs extends HTMLElement implements TabsProps {
  private _defaultValue: string = "unset";
  private _onTabChangedList: ((value: string) => void)[] = [];
  private _value: string = "unset";
  get value() {
    return this._value;
  }

  private _changeTab: (value: string) => void = (value) => {
    this._value = value;
    this._onTabChangedList.forEach((callback) => callback(value));
  };

  get defaultValue() {
    return this._defaultValue;
  }

  connectedCallback() {
    this._defaultValue = this.getAttribute("default-value") || "unset";
    this._value = this._defaultValue;

    this.addEventListener("request-tabs-context", (e: Event) => {
      const event = e as CustomEvent<RequestTabsContextDetail>;
      this._onTabChangedList.push(event.detail.onTabChanged);
      event.detail.onTabChanged(this._defaultValue);
      if (event.detail.setChangeTab) {
        event.detail.setChangeTab(this._changeTab);
      }
      e.stopPropagation();
    });
  }

  disconnectedCallback() {
  }
}

customElements.define("headless-tabs", HeadlessTabs);
