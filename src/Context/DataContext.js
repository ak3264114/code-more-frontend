import { createContext , useState} from "react";
import APIService from '../APIService'


export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const [userName, setUserName] = useState(false);
    const [snackType, setSnackType] = useState("");
    const [snackMessage, setSnackMessage] = useState("");
    if(localStorage.loginToken){
        // console.log(localStorage.loginToken)
        APIService.checklogin(localStorage.loginToken).then(response =>{
            console.log(response)
            if(response.data.status === "active"){
                setIsLoggedIn(true)
                setUserName(response.data.username)

            }
        })
    }
    return (
        <DataContext.Provider value={{userName , isLoggedIn  ,snackOpen , snackType , snackMessage ,setSnackOpen ,setSnackType ,setSnackMessage}} >{children}</DataContext.Provider>
    )
}

export default DataContextProvider;