export interface IViewerState {
	viewer: IViewer | undefined
	setViewer: (viewer: IViewer) => void
}

export interface IViewer {
	id: string
	email: string
	isActivated: boolean
}
