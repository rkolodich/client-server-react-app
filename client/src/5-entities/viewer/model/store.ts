import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { IS_DEV } from "@shared/config";
import { createViewerSlice } from "./slice";
import { IViewerState } from "./types";

export const useViewerStore = IS_DEV
	? create(devtools(immer<IViewerState>(createViewerSlice)))
	: create(immer<IViewerState>(createViewerSlice))
