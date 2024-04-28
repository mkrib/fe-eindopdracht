import Button from "../../components/buttons/Button.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import './Register.css';

const Register = () => {
    const [formValues, setFormValues] = useState({
        fullnameRegister: '',
        phonenumberRegister: '',
        emailRegister: '',
        passwordRegister: ''
    });

    const [registerSuccess, setRegisterSuccess] = useState(null);
    const navigate = useNavigate();

    function handleFormChange(e) {
        const changedFieldName = e.target.name;
        const newValue = e.target.value;

        setFormValues({
            ...formValues,
            [changedFieldName]: newValue,
        });
    }

    async function handleSubmitRegister(event) {
        event.preventDefault();

        try {
            const result = await axios.post('http://localhost:8080/users', {
                username: formValues.emailRegister,
                password: formValues.passwordRegister,
                profile: {
                    fullName: formValues.fullnameRegister,
                    phoneNumber: formValues.phonenumberRegister,
                    email: formValues.emailRegister
                }
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(result);
            if(result.status === 201) {
                setRegisterSuccess(true);
                navigate("/login");
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
       <>
           <main className="outer-container">
               <section className="inner-container">

       {/*TODO de velden met persoonlijke gegevens weer op required zetten, wanneer de relatie met het profiel staat*/}
       <h3>Registeren</h3>
       <form className="form-register" onSubmit={handleSubmitRegister}>
           <label htmlFor="fullnameRegister">Voor- en achternaam</label>
           <input type="text"
                  id="fullnameRegister"
                  name="fullnameRegister"
                  value={formValues.fullnameRegister}
                  onChange={handleFormChange}
           />

           <label htmlFor="phonenumberRegister">Telefoonnummer</label>
           <input type="tel"
                  id="phonenumberRegister"
                  name="phonenumberRegister"
                  value={formValues.phonenumberRegister}
                  onChange={handleFormChange}
           />

           <label htmlFor="emailRegister">Emailadres</label>
           <input type="email"
                  id="emailRegister"
                  name="emailRegister"
                  value={formValues.emailRegister}
                  onChange={handleFormChange}
                  required/>

           <label htmlFor="passwordRegister">Wachtwoord</label>
           <input type="password"
                  id="passwordRegister"
                  name="passwordRegister"
                  value={formValues.passwordRegister}
                  onChange={handleFormChange}
                  required/>

           <label htmlFor="repeatPassword">Herhaal wachtwoord</label>
           <input type="password" id="repeatPassword" name="repeatPassword"/>

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

export default Register;