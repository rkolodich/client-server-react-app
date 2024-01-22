import { ImmerStateCreator } from "@shared/models/zustand"
import { IViewer, IViewerState } from "./types"

export const createViewerSlice: ImmerStateCreator<IViewerState> = (set) => ({
	viewer: undefined,
	setViewer(viewer: IViewer) {
		set(state => {
			state.viewer = viewer
		})
	}
})
