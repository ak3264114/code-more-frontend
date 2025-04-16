import { createContext, useState, useEffect } from "react";
import APIService from "../APIService";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("loginToken");
        if (token) {
            APIService.checklogin(token).then((response) => {
                console.log(response);
                if (response.data.status === "active") {
                    setIsLoggedIn(true);
                    setUserName(response.data.username);
                }
            }).catch((error) => {
                console.error("Login check failed:", error);
            });
        }
    }, []);

    return (
        <DataContext.Provider
            value={{
                userName,
                isLoggedIn,
                setIsLoggedIn, // ✅ add this
                snackOpen,
                setSnackOpen
            }}
        >
            {children}
        </DataContext.Provider>

    );
};

export default DataContextProvider;
