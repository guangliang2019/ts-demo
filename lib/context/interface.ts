import Consumer from "./consumer";

export type RequestContextDetail<T extends Record<string, any>> = {
  consumer: Consumer<T>;
};

export interface ProviderProps<T extends Record<string, any>> {
  readonly key: string;
  readonly contextValue: T;
  readonly setContext: (context: Partial<T>) => void;
}

export interface ConsumerProps<T extends Record<string, any>> {
  readonly key: string;
  readonly contextValue: T;
  readonly addContextListener: (contextListener: ContextListener<T>) => void;
  readonly removeContextListener: (contextListener: ContextListener<T>) => void;
}

export type ContextListener<T extends Record<string, any>> = (
  context: T,
  changeKeys: Array<keyof T>
) => void;
