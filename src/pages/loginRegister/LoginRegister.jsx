import './LoginRegister.css'
import Button from "../../components/buttons/Button.jsx";
import {useState} from "react";
import axios from "axios";

const LoginRegister = () => {
    const [formValues, setFormValues] = useState({
        // fullname: '',
        // phonenumber: '',
        emailLogin: '',
        passwordLogin: '',

        emailRegister: '',
        passwordRegister: ''
    });
    const [loginError, setLoginError] = useState(null);

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
                // fullname: formValues.fullname,
                // phonenumber: formValues.phonenumber,
                username: formValues.emailLogin,
                password: formValues.passwordLogin,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(result);
        } catch (error) {
            console.error(error.message);
            setLoginError(error.message);
        }
    }

    async function handleSubmitRegister(event) {
        event.preventDefault();

        try {
            const result = await axios.post('http://localhost:8080/users', {
                // fullname: formValues.fullname,
                // phonenumber: formValues.phonenumber,
                username: formValues.emailRegister,
                password: formValues.passwordRegister,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(result);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            <main className="outer-container">
                <section className="inner-container">

                    <h3>Inloggen</h3>
                    <form className="form-login" onSubmit={handleSubmitLogin}>
                        <label htmlFor="emailLogin">Emailadres</label>
                        <input type="emailLogin"
                               id="emailLogin"
                               name="emailLogin"
                               value={formValues.emailLogin}
                               onChange={handleFormChange}
                               required/>

                        <label htmlFor="passwordLogin">Wachtwoord</label>
                        <input type="passwordLogin"
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

                    {/*TODO de velden met persoonlijke gegevens weer op required zetten, wanneer de relatie met het profiel staat*/}
                    <h3>Nog geen account?</h3>
                    <form className="form-register" onSubmit={handleSubmitRegister}>
                        <label htmlFor="fullname">Voor- en achternaam</label>
                        <input type="text" id="fullname" name="fullname"/>

                        <label htmlFor="phonenumber">Telefoonnummer</label>
                        <input type="tel" id="phonenumber" name="phonenumber"/>

                        <label htmlFor="emailRegister">Emailadres</label>
                        <input type="emailRegister"
                               id="emailRegister"
                               name="emailRegister"
                               value={formValues.emailRegister}
                               onChange={handleFormChange}
                               required/>

                        <label htmlFor="passwordRegister">Wachtwoord</label>
                        <input type="passwordRegister"
                               id="passwordRegister"
                               name="passwordRegister"
                               value={formValues.passwordRegister}
                               onChange={handleFormChange}
                               required/>

                        <label htmlFor="repeatPassword">Herhaal wachtwoord</label>
                        <input type="repeatPassword" id="repeatPassword" name="repeatPassword"/>
                        <Button
                            lightOrDark="btn-dark"
                            type="submit"
                        >
                            Registreer
                        </Button>
                    </form>
                </section>

            </main>
        </>
    );
};

export default LoginRegister;