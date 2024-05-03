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

            const { username, apiKey, roles, profile } = result.data;
            const { email, firstname, lastname, phoneNumber, dateOfBirth } = profile || {};

            setAuth({
                ...auth,
                isAuth: true,
                user: {
                    username,
                    apiKey,
                    roles: roles[0].role,
                    // TODO technische keuze om hier te checken of de user een profile heeft en de waarden anders als lege string mee te geven, zodat wanneer er een admin inlogt die geen profiel heeft, de app niet crasht en de gebruikers toch via dezelfde wijze kunnen inloggen. Een andere reden dat ik ervoor heb gekozen om hier de profielgegevens op te halen in plaats van in het profiel zelf, is dat er nu de gegevens meteen worden gevuld voordat de profile pagina wordt geladen en dat de gegevens dan al beschikbaar zijn.
                    email: email || '',
                    firstname: firstname || '',
                    lastname: lastname || '',
                    phoneNumber: phoneNumber || '',
                    dateOfBirth: dateOfBirth || ''
                },
                status: "done"
            });

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

    useEffect(() => {
        const storedToken = localStorage.getItem("jwt");
        if (storedToken && checkTokenValidity(storedToken)) {
            void login(storedToken);
        } else {
            logout();
        }
    }, []);

    return (
        <AuthContext.Provider value={data}>
            {children}
            {/*{auth.status === "done" ? children : <p>Loading...</p>}*/}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;

