"use client"
import {Button} from "@heroui/react";
import {HiMiniSun} from "react-icons/hi2";
import {useTheme} from "next-themes";
import clsx from "clsx";
import {useState} from "react";
import {useEffect} from "react";
import {HiMoon} from "react-icons/hi2";

export default function ThemeSwitch() {
    const [ isLightTheme, setLightTheme ] = useState<boolean>(false);
    const {theme, setTheme} = useTheme();

    useEffect(() => {
        if (theme) setLightTheme(theme === "light")
    }, [theme])

    return (
        <Button
            isIconOnly
            size={"sm"}
            variant={"ghost"}
            className={clsx({
                "shadow-sm ring": true,
                "bg-[#fbc531] ring-[#FAB905]": isLightTheme,
                "bg-[#353b48] ring-(--dark-ring-color)": !isLightTheme,
            })}

            onPress={() => {
                setTheme(!isLightTheme ? "light" : "dark");
            }}
        >
            {isLightTheme ? (<HiMiniSun style={{ color: "#fff" }} />) : (<HiMoon style={{ color: "#fff" }} />)}
        </Button>
    )
}