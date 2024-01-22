import { ButtonProps } from "flowbite-react";

export type onSuccess = () => void

export type onError = (e: Error) => void

export type BaseButtonProps = ButtonProps & {
	onSuccess?: onSuccess
	onError?: onError
}
