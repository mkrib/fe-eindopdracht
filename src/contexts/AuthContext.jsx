import {createContext, useState} from "react";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, setIsAuth] = useState(false);

    function login() {
        setIsAuth(true);
    }

    function logout() {
        setIsAuth(false);
    }

    const data = {
        isAuth,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={{data}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;

