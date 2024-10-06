import type { ReactNode } from "react";

import { useAtom, useSetAtom } from "jotai";
import { useState } from "react";
import { Button, Separator } from "react95";
import blackAndWhite from "react95/dist/themes/blackAndWhite";
import originalTheme from "react95/dist/themes/original";
import styled from "styled-components";

import { themeAtom, valueThemes } from "~/lib/atom";
import { closeWindowAtom, Window } from "~/lib/window";

const StyledWindow = styled(Window)`
  padding: 6px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px;
`;

const StyledButton = styled(Button)`
  width: 120px;
  height: 40px;
  font-size: 14px;
`;

const buttonsData = [
    { id: 0, value: valueThemes.original, label: "Original" },
    { id: 1, value: valueThemes.blackWhite, label: "Black & White" }
];

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
  margin-right: 4px;
`;

export function Themes(): ReactNode {
    const [theme, setTheme] = useAtom(themeAtom);
    const [currentTheme, setCurrentTheme] = useState(theme);
    const closeWindow = useSetAtom(closeWindowAtom);

    const handleThemeChange = (value: string): void => {
        setTheme(value);
        setCurrentTheme(value);
    };

    const saveTheme = (): void => {
        localStorage.setItem("theme", currentTheme);
    }

    const closeSetting = (): void => {
        closeWindow("Themes");
    }

    return (
        <StyledWindow window="Themes">
            <ButtonWrapper>
                {buttonsData.map((button) => (
                    <StyledButton key={button.label} theme={button.id == 0 ? originalTheme : blackAndWhite} onClick={() => { handleThemeChange(button.value); }}>
                        {button.label}
                    </StyledButton>
                ))}
            </ButtonWrapper>
            <Separator css="margin-top: 16px; margin-bottom: 16px" />
            <Footer>
                <Button css="margin-right: 10px;" variant="raised" onClick={saveTheme}>Save</Button>
                <Button onClick={closeSetting}>Cancel</Button>
            </Footer>
        </StyledWindow>

    );
}
