import { Provider } from "../context";
import { HeadlessTabsContext, HeadlessTabsProps } from "./interface";

export default class HeadlessTabs
  extends Provider<HeadlessTabsContext>
  implements HeadlessTabsProps
{
  protected _key = "headless-tabs";

  private _defaultValue: string = "unset";
  // prettier-ignore
  get defaultValue() { return this._defaultValue; }

  protected _contextValue: HeadlessTabsContext = {
    value: "unset",
    changeTab: (value) => {
      this.onTabChanged();
      this.setContext({ value });
    },
  };

  onTabChanged = () => {};

  connectedCallback() {
    super.connectedCallback();
    this._defaultValue = this.getAttribute("default-value") || "unset";
    this._contextValue.value = this._defaultValue;
  }
}

customElements.define("headless-tabs", HeadlessTabs);
