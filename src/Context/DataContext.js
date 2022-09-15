import { createContext , useState} from "react";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
    const [username, setUserName] = useState("Simran");

    return (
        <DataContext.Provider value={{ username }} >{children}</DataContext.Provider>
    )
}

export default DataContextProvider;