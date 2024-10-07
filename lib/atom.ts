import type { Theme } from "react95/dist/types";

import { atom } from "jotai";
import originalTheme from "react95/dist/themes/original";

export type ThemeType = "original" | "black&white" | "modernDark";

export interface ThemeDefinition {
    type: ThemeType,
    value: Theme
}

export const themeAtom = atom<ThemeDefinition>({ type: "original", value: originalTheme });
