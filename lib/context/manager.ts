import Consumer from "./consumer";
import Provider from "./provider";
import { initConsumerContext } from "./consumer";
import { ContextListener } from "./interface";
// 单例模式
export class ContextManager {
  private static _instance: ContextManager | null = null;
  private _providers: Map<string, WeakSet<Provider<any>>>;
  private _consumers: Map<Provider<any>, WeakSet<Consumer<any>>>;
  private _contextListeners: Map<Provider<any>, Set<ContextListener<any>>>;

  private constructor() {
    this._providers = new Map();
    this._consumers = new Map();
  }

  static getInstance() {
    if (this._instance === null) {
      this._instance = new ContextManager();
    }
    return this._instance;
  }

  addProvider<T extends Record<string, any>>(provider: Provider<T>) {
    if (!this._providers.has(provider.key)) {
      this._providers.set(provider.key, new WeakSet());
    }
    this._providers.get(provider.key)?.add(provider);
  }

  removeProvider<T extends Record<string, any>>(provider: Provider<T>) {
    if (this._providers.has(provider.key)) {
      this._providers.get(provider.key)?.delete(provider);
    }
  }

  addConsumer<T extends Record<string, any>>(
    provider: Provider<T>,
    consumer: Consumer<T>
  ) {
    if (!this._consumers.has(provider)) {
      this._consumers.set(provider, new WeakSet());
    }
    // 建立 provider 和 consumer 之间的联系
    this._consumers.get(provider)?.add(consumer);
    // 初始化 consumer 的 contextValue
    consumer[initConsumerContext](provider);
  }

  removeConsumer<T extends Record<string, any>>(
    provider: Provider<T>,
    consumer: Consumer<T>
  ) {
    if (this._consumers.has(provider)) {
      this._consumers.get(provider)?.delete(consumer);
    }
  }

  addContextListener<T extends Record<string, any>>(
    provider: Provider<T>,
    contextListener: ContextListener<T>
  ) {
    if (!this._contextListeners.has(provider)) {
      this._contextListeners.set(provider, new Set());
    }
    this._contextListeners.get(provider)?.add(contextListener);
  }

  removeContextListener<T extends Record<string, any>>(
    provider: Provider<T>,
    contextListener: ContextListener<T>
  ) {
    if (this._contextListeners.has(provider)) {
      this._contextListeners.get(provider)?.delete(contextListener);
    }
  }

  notifyContextListeners<T extends Record<string, any>>(
    provider: Provider<T>,
    contextValue: Partial<T>,
    changeKeys: (keyof T)[]
  ) {
    if (this._contextListeners.has(provider)) {
      this._contextListeners.get(provider)?.forEach((contextListener) => {
        contextListener(contextValue, changeKeys);
      });
    }
  }
}
