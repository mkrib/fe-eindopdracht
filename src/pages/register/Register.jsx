import Button from "../../components/buttons/Button.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import './Register.css';

const Register = () => {
    const [formValues, setFormValues] = useState({
        firstname: '',
        lastname: '',
        phonenumber: '',
        dateOfBirth: '',
        email: '',
        username: '',
        password: '',
        repeatPassword: ''
    });

    const [registerSuccess, setRegisterSuccess] = useState(null);
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);

    function handleFormChange(e) {
        const changedFieldName = e.target.name;
        const newValue = e.target.value;

        setFormValues({
            ...formValues,
            [changedFieldName]: newValue,
        });

        if (changedFieldName === 'repeatPassword') {
            setPasswordMatch(newValue === formValues.password);
        }
    }

    useEffect(() => {
        if (registerSuccess) {
            const timer = setTimeout(() => {
                navigate("/login");
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [registerSuccess, navigate]);

    async function handleSubmitRegister(event) {
        event.preventDefault();

        try {
            const result = await axios.post('http://localhost:8080/users', {
                username: formValues.username,
                password: formValues.password,
                profile: {
                    firstname: formValues.firstname,
                    lastname: formValues.lastname,
                    phoneNumber: formValues.phonenumber,
                    dateOfBirth: formValues.dateOfBirth,
                    email: formValues.email
                }
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setIsSubmitted(true);
            if (result.status === 201) {
                setRegisterSuccess(true);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            <main className="outer-container">
                <section className="inner-container">

                    <h3>Registeren</h3>

                    {!isSubmitted && !registerSuccess &&
                        <form className="form-register" onSubmit={handleSubmitRegister}>
                            <label htmlFor="firstname">Voornaam</label>
                            <input type="text"
                                   id="firstname"
                                   name="firstname"
                                   value={formValues.firstname}
                                   onChange={handleFormChange}
                                   required
                            />

                            <label htmlFor="lastname">Achternaam</label>
                            <input type="text"
                                   id="lastname"
                                   name="lastname"
                                   value={formValues.lastname}
                                   onChange={handleFormChange}
                                   required
                            />

                            <label htmlFor="phonenumber">Telefoonnummer</label>
                            <input type="tel"
                                   id="phonenumber"
                                   name="phonenumber"
                                   value={formValues.phonenumber}
                                   onChange={handleFormChange}
                                   required
                            />

                            <label htmlFor="dateOfBirth">Geboortedatum</label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formValues.dateOfBirth}
                                onChange={handleFormChange}
                                required
                            />

                            <label htmlFor="email">Emailadres</label>
                            <input type="email"
                                   id="email"
                                   name="email"
                                   value={formValues.email}
                                   onChange={handleFormChange}
                                   required/>

                            <label htmlFor="username">Gebruikersnaam</label>
                            <input type="text"
                                   id="username"
                                   name="username"
                                   value={formValues.username}
                                   onChange={handleFormChange}
                                   required
                            />

                            <label htmlFor="password">Wachtwoord</label>
                            <input type="password"
                                   id="password"
                                   name="password"
                                   value={formValues.password}
                                   onChange={handleFormChange}
                                   required/>

                            <label htmlFor="repeatPassword">Herhaal wachtwoord</label>
                            <input type="password"
                                   id="repeatPassword"
                                   name="repeatPassword"
                                   value={formValues.repeatPassword}
                                   onChange={handleFormChange}
                            />

                            {!passwordMatch && <p className="p-error">Wachtwoorden komen niet overeen.</p>}

                            <Button
                                lightOrDark="btn-dark"
                                type="submit"
                            >
                                Registreer
                            </Button>

                        </form>}

                    {isSubmitted && registerSuccess &&
                        <p className="p-success">U bent succesvol geregistreerd. U wordt doorgestuurd naar de login
                            pagina.</p>}
                </section>
            </main>
        </>
    );
};

export default Register;