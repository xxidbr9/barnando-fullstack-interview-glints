
import { RootState } from "@redux-state/index"

export const isMobile = (state:RootState) => state.screenReducer.screen_type === "mobile" || state.screenReducer.screen_type !== "tablet"