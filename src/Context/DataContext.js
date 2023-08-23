import { createContext , useState} from "react";
import APIService from '../APIService'


export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [snackOpen, setSnackOpen] = useState(true);
    const [snackType, setSnackType] = useState("info");
    const [snackMessage, setSnackMessage] = useState("Welcome");
    if(localStorage.loginToken){
        // console.log(localStorage.loginToken)
        APIService.checklogin(localStorage.loginToken).then(response =>{
            console.log(response)
            if(response.data.status === "active"){
                setIsLoggedIn(true)
            }
        })
    }
    return (
        <DataContext.Provider value={{ isLoggedIn  ,snackOpen , snackType , snackMessage ,setSnackOpen ,setSnackType ,setSnackMessage}} >{children}</DataContext.Provider>
    )
}

export default DataContextProvider;