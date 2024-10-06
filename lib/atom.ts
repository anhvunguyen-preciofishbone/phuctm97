import { atom } from "jotai";

export const valueThemes = {
    original: "original",
    blackWhite: "black&white"
}

export const themeAtom = atom(valueThemes.original);
