import { createContext , useState} from "react";
import APIService from '../APIService'


export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const [userName, setUserName] = useState(false);
    if(localStorage.loginToken){
        APIService.checklogin(localStorage.loginToken).then(response =>{
            console.log(response)
            if(response.data.status === "active"){
                setIsLoggedIn(true)
                setUserName(response.data.username)

            }
        })
    }
    return (
        <DataContext.Provider value={{userName , isLoggedIn  ,snackOpen , setSnackOpen }} >{children}</DataContext.Provider>
    )
}

export default DataContextProvider;