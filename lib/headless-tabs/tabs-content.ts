import { RequestTabsContextDetail, TabsContentProps } from "./interface";

export default class HeadlessTabsContent
  extends HTMLElement
  implements TabsContentProps
{
  private _value: string = "unset";
  get value() {
    return this._value;
  }

  private _onTabChanged = (value: string) => {
    if (value === this._value) {
      this.style.display = "flex";
      this.setAttribute("data-state", "active");
    } else {
      this.style.display = "none";
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
        },
      })
    );
  }

  disconnectedCallback() {}
}

customElements.define("headless-tabs-content", HeadlessTabsContent);
