import { ProviderProps, RequestContextDetail } from "./interface";
import { ContextManager } from "./manager";

export default class Provider<T extends Record<string, any>>
  extends HTMLElement
  implements ProviderProps<T>
{
  // _key 一致的 provider 和 consumer 之间可以产生订阅关系
  protected _key: string = "";
  get key() {
    return this._key;
  }

  private _setContext = (context: Partial<T>) => {
    const changeKeys = Object.keys(context);
    Object.assign(this._contextValue, context);
    ContextManager.getInstance().notifyContextListeners(
      this,
      this._contextValue,
      changeKeys
    );
  };
  get setContext() {
    return this._setContext;
  }

  protected _contextValue: T = {} as T;
  get contextValue() {
    return this._contextValue;
  }

  private _handleRequestContext = (
    event: CustomEvent<RequestContextDetail<T>>
  ) => {
    if (this._key === event.detail.consumer.key) {
      // TODO: 截停事件，然后建立订阅关系
      event.stopPropagation();
      ContextManager.getInstance().addConsumer(this, event.detail.consumer);
    }
  };

  connectedCallback() {
    ContextManager.getInstance().addProvider(this);
    this.addEventListener(
      "request-context",
      this._handleRequestContext as EventListener
    );
  }

  disconnectedCallback() {}
}
