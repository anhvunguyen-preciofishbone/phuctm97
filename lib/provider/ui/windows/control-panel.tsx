import type { ReactNode } from "react";
import type { SelectOption } from "react95/dist/Select/Select.types";
import type { Theme } from "react95/dist/types";

import { useSetAtom } from "jotai";
import { useState } from "react";
import { GroupBox, Select } from "react95";

import { themeAtom } from "~/lib/atom";
import { Window } from "~/lib/window";

type ThemeValue = "original" | "black&white" | "modernDark";

const themeOptions: SelectOption<ThemeValue>[] = [
    { label: "Default", value: "original" },
    { label: "Black and white", value: "black&white" },
    { label: "Modern Dark", value: "modernDark" }
];

export function ControlPanel(): ReactNode {
    const setTheme = useSetAtom(themeAtom);
    const [selectedTheme, setSelectedTheme] = useState<ThemeValue>("original");

    const handleThemeChange = async (selectedOption: SelectOption<ThemeValue>): Promise<void> => {
        const themes = await import("react95/dist/themes");

        let newTheme: Theme;
        switch (selectedOption.value) {
            case "original": {
                newTheme = themes.default.original;
                break;
            }
            case "black&white": {
                newTheme = themes.default.blackAndWhite;
                break;
            }
            case "modernDark": {
                newTheme = themes.default.modernDark;
                break;
            }
            default: {
                newTheme = themes.default.original;
            }
        }
        setTheme(newTheme);
        setSelectedTheme(selectedOption.value);
    };

    const handleThemeChangeSync = (selectedOption: SelectOption<ThemeValue>): void => {
        handleThemeChange(selectedOption).catch((error: unknown) => {
            console.error("Error handling theme change:", error);
        });
    };

    return (
        <Window window="Control Panel" defaultWidth={300} defaultHeight={300}>
            <GroupBox label="Theme">
                <Select
                    options={themeOptions}
                    onChange={handleThemeChangeSync}
                    value={selectedTheme}
                />
            </GroupBox>
        </Window>
    );
}
