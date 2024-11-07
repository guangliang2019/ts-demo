import { Consumer } from "../context";
import { HeadlessTabsContext, HeadlessTabsTriggerProps } from "./interface";

export default class HeadlessTabsTrigger
  extends Consumer<HeadlessTabsContext>
  implements HeadlessTabsTriggerProps
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

  private _handleClick = (_: MouseEvent) => {
    this._contextValue.changeTab(this._value);
  };

  connectedCallback() {
    super.connectedCallback();
    this._value = this.getAttribute("value") || "unset";
    this._handleContextChanged(this._contextValue);
    this.addContextListener(this._handleContextChanged);
    this.addEventListener("click", this._handleClick);
  }

  disconnectedCallback() {
    this.removeContextListener(this._handleContextChanged);
    this.removeEventListener("click", this._handleClick);
    super.disconnectedCallback();
  }
}

customElements.define("headless-tabs-trigger", HeadlessTabsTrigger);
