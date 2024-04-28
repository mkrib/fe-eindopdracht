import './Login.css'
import Button from "../../components/buttons/Button.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../contexts/AuthContext.jsx";
import {Link, useNavigate} from "react-router-dom";

const Login = () => {
    const [formValues, setFormValues] = useState({
        emailLogin: '',
        passwordLogin: '',
    });
    const [loginError, setLoginError] = useState(null);

    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    function handleFormChange(e) {
        const changedFieldName = e.target.name;
        const newValue = e.target.value;

        setFormValues({
            ...formValues,
            [changedFieldName]: newValue,
        });
    }

    async function handleSubmitLogin(event) {
        event.preventDefault();

        try {
            const result = await axios.post('http://localhost:8080/authenticate', {
                username: formValues.emailLogin,
                password: formValues.passwordLogin,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (result.status === 200) {
                login(result.data.jwt);
                navigate("/profile");
            }
        } catch (error) {
            console.error(error.message);
            setLoginError(error.message);
        }
    }


    return (
        <>
            <main className="outer-container">
                <section className="inner-container">

                    <h3>Inloggen</h3>
                    <form className="form-login" onSubmit={handleSubmitLogin}>
                        <label htmlFor="emailLogin">Emailadres</label>
                        {/*TODO type uiteindelijk veranderen naar email*/}
                        <input type="text"
                               id="emailLogin"
                               name="emailLogin"
                               value={formValues.emailLogin}
                               onChange={handleFormChange}
                               required/>

                        <label htmlFor="passwordLogin">Wachtwoord</label>
                        <input type="password"
                               id="passwordLogin"
                               name="passwordLogin"
                               value={formValues.passwordLogin}
                               onChange={handleFormChange}
                               required/>

                        <Button
                            lightOrDark="btn-light"
                            type="submit"
                        >
                            Login
                        </Button>

                        {loginError && <p className="p-error">De combinatie is onjuist. Probeer het opnieuw.</p>}
                    </form>

                    <h3>Nog geen account?</h3>
                    <Link className="a-register" to={"/register"}>Klik hier om te registeren</Link>

                </section>
            </main>
        </>
    );
};

export default Login;