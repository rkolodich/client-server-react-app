import { AxiosResponse } from "axios";

export type TResponse<T> = Promise<AxiosResponse<T>> | never

export type TVoidResponse = TResponse<void>
