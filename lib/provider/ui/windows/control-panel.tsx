import type { ReactNode } from "react";
import type { SelectOption } from "react95/dist/Select/Select.types";
import type { Theme } from "react95/dist/types";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { GroupBox, Select } from "react95";
import styled from "styled-components";

import { themeAtom } from "~/lib/atom";
import { Window } from "~/lib/window";

type ThemeType = "original" | "blackAndWhite" | "modernDark";

const themeOptions: SelectOption<ThemeType>[] = [
    { label: "Default", value: "original" },
    { label: "Black and white", value: "blackAndWhite" },
    { label: "Modern Dark", value: "modernDark" }
];

const StyledWindow = styled(Window)`
  overflow: visible;
`;

export function ControlPanel(): ReactNode {
    const [theme, setTheme] = useAtom(themeAtom);
    const [selectedTheme, setSelectedTheme] = useState<ThemeType>("original");
    const [themesMap, setThemesMap] = useState<Record<ThemeType, Theme>>({} as Record<ThemeType, Theme>);

    useEffect(() => {
        const loadThemes = async (): Promise<void> => {
            const themes = await import("react95/dist/themes");

            setThemesMap({
                original: themes.default.original,
                blackAndWhite: themes.default.blackAndWhite,
                modernDark: themes.default.modernDark,
            });
        };

        void loadThemes();
    }, []);

    useEffect(() => {
        const currentThemeType = Object.keys(themesMap).find(
            (key) => themesMap[key as ThemeType] === theme
        ) as ThemeType;

        setSelectedTheme(currentThemeType);
    }, [theme, themesMap]);

    const handleThemeChange = (selectedOption: SelectOption<ThemeType>): void => {
        setTheme(themesMap[selectedOption.value]);
        setSelectedTheme(selectedOption.value);

        console.log("Change Theme:", themesMap[selectedOption.value])
    };

    return (
        <StyledWindow window="Control Panel" overflowVisible widthAuto>
            <GroupBox label="Theme" css={{ zIndex: 100 }}>
                <Select
                    options={themeOptions}
                    onChange={handleThemeChange}
                    value={selectedTheme}
                    css="z-index=2"
                />
            </GroupBox>
        </StyledWindow>
    );
}
