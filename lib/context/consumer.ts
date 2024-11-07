import {
  ConsumerProps,
  ContextListener,
  RequestContextDetail,
} from "./interface";
import { ContextManager } from "./manager";
import Provider from "./provider";

export const consumerRequestContext = Symbol("consumerRequestContext");
export const initConsumerContext = Symbol("initConsumerContext");

export default abstract class Consumer<T extends Record<string, any>>
  extends HTMLElement
  implements ConsumerProps<T>
{
  // _key 一致的 provider 和 consumer 之间可以产生订阅关系
  protected abstract _key: string;
  private _provider: Provider<T> | null = null;
  private _listeners: Set<ContextListener<T>> = new Set([]);
  get key() {
    return this._key;
  }

  protected _contextValue: T = {} as T;
  get contextValue() {
    return this._contextValue;
  }

  private _addContextListener = (contextListener: ContextListener<T>) => {
    if (this._provider === null)
      throw Error(
        `${Consumer.name} should use within a Provider that key is ${this._key}`
      );
    ContextManager.getInstance().addContextListener(
      this._provider,
      contextListener
    );
    this._listeners.add(contextListener);
  };
  get addContextListener() {
    return this._addContextListener;
  }

  private _removeContextListener = (contextListener: ContextListener<T>) => {
    if (this._provider === null)
      throw Error(
        `${Consumer.name} should use within a Provider that key is ${this._key}`
      );
    ContextManager.getInstance().removeContextListener(
      this._provider,
      contextListener
    );
    this._listeners.delete(contextListener);
  };
  get removeContextListener() {
    return this._removeContextListener;
  }

  [consumerRequestContext] = () => {
    this.dispatchEvent(
      new CustomEvent<RequestContextDetail<T>>("request-context", {
        bubbles: true,
        detail: {
          consumer: this,
        },
      })
    );
  };

  [initConsumerContext] = (provider: Provider<T>) => {
    this._provider = provider;
    this._contextValue = provider.contextValue;
  };

  connectedCallback() {
    this[consumerRequestContext]();
  }

  disconnectedCallback() {
    this._listeners.forEach((listener) => {
      ContextManager.getInstance().removeContextListener(
        this._provider as Provider<T>,
        listener
      );
    });
  }
}
