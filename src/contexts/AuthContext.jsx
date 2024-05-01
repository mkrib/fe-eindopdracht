import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import checkTokenValidity from "../helpers/checkTokenValidity.jsx";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("jwt");
        if (storedToken && checkTokenValidity(storedToken)) {
           void login(storedToken);
        } else {
            logout();
        }
    }, []);

    async function login(jwtToken) {
        const decodedToken = (jwtDecode(jwtToken));
        localStorage.setItem("jwt", jwtToken);

        try {
            const result = await axios.get(`http://localhost:8080/users/${decodedToken.sub}`, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${jwtToken}`
                },
            });
            setAuth({
                ...auth,
                isAuth: true,
                user: {
                    username: result.data.username,
                    apiKey: result.data.apiKey,
                    roles: result.data.roles[0].role,
                    email: result.data.profile.email,
                    fullName: result.data.profile.fullName,
                    phoneNumber: result.data.profile.phoneNumber,
                    dateOfBirth: result.data.profile.dateOfBirth,
                },
                status: "done"
            });

            // console.log(result.data.roles[0].role);

        } catch (error) {
            console.error(error.message);
        }
    }

    function logout() {
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
            status: "done",
        });
        localStorage.clear();
        navigate("/login");
    }

    const data = {
        isAuth: auth.isAuth,
        user: auth.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
            {/*{auth.status === "done" ? children : <p>Loading...</p>}*/}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;

