import type { ReactNode } from "react";
import type { SelectOption } from "react95/dist/Select/Select.types";
import type { Theme } from "react95/dist/types";

import type { ThemeType } from "~/lib/atom";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { GroupBox, Select } from "react95";

import { themeAtom } from "~/lib/atom";
import { Window } from "~/lib/window";

const themeOptions: SelectOption<ThemeType>[] = [
    { label: "Default", value: "original" },
    { label: "Black and white", value: "black&white" },
    { label: "Modern Dark", value: "modernDark" }
];

export function ControlPanel(): ReactNode {
    const [theme, setTheme] = useAtom(themeAtom);
    const [selectedTheme, setSelectedTheme] = useState<ThemeType>("original");

    useEffect(() => {
        setSelectedTheme(theme.type);
    }, [theme.type]);

    const handleThemeChange = async (selectedOption: SelectOption<ThemeType>): Promise<void> => {
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
        setTheme({ type: selectedOption.value, value: newTheme });
        setSelectedTheme(selectedOption.value);
    };

    const handleThemeChangeSync = (selectedOption: SelectOption<ThemeType>): void => {
        handleThemeChange(selectedOption).catch((error: unknown) => {
            console.error("Error handling theme change:", error);
        });
    };

    return (
        <Window window="Control Panel" overflowVisible widthAuto>
            <GroupBox label="Theme" css={{ overflow: "visible" }}>
                <Select
                    options={themeOptions}
                    onChange={handleThemeChangeSync}
                    value={selectedTheme}
                    css="z-index=2"
                />
            </GroupBox>
        </Window>
    );
}
