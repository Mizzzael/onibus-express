import {useTheme} from "next-themes";

const useDarkMode = (): boolean => {
    const { theme } = useTheme()
    return theme === 'dark'
}

export default useDarkMode