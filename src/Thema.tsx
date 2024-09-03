import React from "react";
import { useTheme } from "./contexts/theme/theme-context";
import App from "./App";
import { useSelector } from "react-redux";
import { RootState } from "./store";

const ThemedApp: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const themaStored = useSelector((state: RootState) => state.thema.thema);
    if (themaStored) {
        setTheme(themaStored);
    }

    React.useEffect(() => {
        document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    }, [theme]);

    return <App />;
};

export default ThemedApp;