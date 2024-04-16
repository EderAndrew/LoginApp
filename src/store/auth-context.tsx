import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
type SessionContextType = {
    token: string,
    isAuthenticated: boolean,
    authenticate: (value:string) => void,
    logout: () => void
}

export const AuthContext = createContext<SessionContextType | null>(null)

const AuthContextProvider = ({children}:{children: React.ReactNode}) => {
    const [authToken, setAuthToken] = useState('')

    const authenticate = (token: string) => {
        setAuthToken(token)
        AsyncStorage.setItem('authToken', token)
    }

    const logout = () => {
        setAuthToken('')
        AsyncStorage.removeItem('authToken')
    }

    const provider = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate,
        logout: () => setAuthToken('')
    }
    return(
        <AuthContext.Provider value={provider}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider