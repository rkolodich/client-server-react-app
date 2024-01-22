import { useViewerStore } from "./store";


export const useViewer = () => {
	return useViewerStore(state => state.viewer)
}

export const useAuth = () => {
	const viewer = useViewer()
	return !!viewer
}

export const useIsViewerActive = () => {
	const viewer = useViewer()
	return viewer?.isActivated
}
