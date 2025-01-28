import React , {createContext , useState} from "react"

//create a context
export const UserContext = createContext();

//create a provider component
export const UserProvider = ({children}) =>{
    const data = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "" ; 
    const [userData , setUserData] = useState(data);
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : "";
    return(
        <UserContext.Provider value={{userData ,token ,data}}>
            {children}
        </UserContext.Provider>
    )
}