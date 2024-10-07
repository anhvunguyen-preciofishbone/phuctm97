import type { Theme } from "react95/dist/types";

import { atom } from "jotai";
import originalTheme from "react95/dist/themes/original";

export const themeAtom = atom<Theme>(originalTheme);
