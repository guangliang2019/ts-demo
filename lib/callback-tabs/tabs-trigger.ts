import { RequestTabsContextDetail, TabsTriggerProps } from "./interface";

export default class HeadlessTabsTrigger
  extends HTMLElement
  implements TabsTriggerProps
{
  private _value: string = "unset";
  private _changeTab: (value: string) => void = () => {};
  get value() {
    return this._value;
  }

  private _onTabChanged = (value: string) => {
    if (value === this._value) {
      this.setAttribute("data-state", "active");
    } else {
      this.setAttribute("data-state", "inactive");
    }
  };

  connectedCallback() {
    this._value = this.getAttribute("value") || "unset";
    this.dispatchEvent(
      new CustomEvent<RequestTabsContextDetail>("request-tabs-context", {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: {
          ref: this,
          onTabChanged: this._onTabChanged,
          setChangeTab: (changeTab) => {
            this._changeTab = changeTab;
          },
        },
      })
    );

    this.addEventListener("click", () => {
      this._changeTab(this._value);
    });
  }

  disconnectedCallback() {}
}

customElements.define("headless-tabs-trigger", HeadlessTabsTrigger);
