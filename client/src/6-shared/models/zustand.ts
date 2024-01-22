import { StateCreator, StoreApi } from "zustand";

export type TGetState<T> = StoreApi<T>['getState']

export type TSetState<T> = StoreApi<T>['setState']

export type ImmerStateCreator<T> = StateCreator<
  T,
  [["zustand/immer", never], never],
  [],
  T
>
