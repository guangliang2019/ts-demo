import { Consumer } from "../context";
import { HeadlessTabsContext, HeadlessTabsContentProps } from "./interface";

export default class HeadlessTabsContent
  extends Consumer<HeadlessTabsContext>
  implements HeadlessTabsContentProps
{
  protected _key = "headless-tabs";
  private _value: string = "unset";
  get value() {
    return this._value;
  }

  private _handleContextChanged = (context: HeadlessTabsContext) => {
    if (this._value === context.value) {
      this.setAttribute("data-state", "active");
    } else {
      this.setAttribute("data-state", "inactive");
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this._value = this.getAttribute("value") || "unset";
    this._handleContextChanged(this._contextValue);
    this.addContextListener(this._handleContextChanged);
  }

  disconnectedCallback() {
    this.removeContextListener(this._handleContextChanged);
    super.disconnectedCallback();
  }
}

customElements.define("headless-tabs-content", HeadlessTabsContent);
