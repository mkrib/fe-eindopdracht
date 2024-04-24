import './MakeReservation.css';
import Button from "../../components/buttons/Button.jsx";
import {useState} from "react";
import axios from "axios";

const MakeReservation = () => {
    const [formValues, setFormValues] = useState({
        date: '',
        time: '',
        amountOfGuests: 1,
        specialRequest: ''

    //     TODO username meegeven wanneer login is opgezet

    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);

    function handleFormChange(e) {
        const changedFieldName = e.target.name;
        const newValue = e.target.value;

        console.log(changedFieldName, newValue);

        setFormValues({
            ...formValues,
            [changedFieldName]: newValue,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const result = await axios.post('http://localhost:8080/reservations', {
                date: formValues.date,
                startTime: formValues.time,
                amountOfGuests: formValues.amountOfGuests,
                specialRequest: formValues.specialRequest,
            },{
                headers: {
                    'Content-Type': 'application/json'
            }
            });
            console.log(result);
            setIsSubmitted(true);
        } catch (error) {
            console.error(error.message);
            // setError(error.message);
        }
    }

    return (
        <>
            <main className="outer-container">
                <section className="inner-container">

                    <h3>Reserveren</h3>

                    {!isSubmitted &&
                    <form className="form-make-reservation" onSubmit={handleSubmit}>
                        <label htmlFor="date">Datum</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formValues.date}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="time">Tijd</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            value={formValues.time}
                            onChange={handleFormChange}
                            required/>

                        <label htmlFor="amountOfGuests">Aantal personen</label>
                        <select id="amountOfGuests"
                                name="amountOfGuests"
                                value={formValues.amountOfGuests}
                                onChange={handleFormChange}
                                required>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>

                        <label htmlFor="specialRequest">Speciaal verzoek (optioneel)</label>
                        <textarea
                            id="specialRequest"
                            name="specialRequest"
                            value={formValues.specialRequest}
                            onChange={handleFormChange}
                        />

                        <Button
                            lightOrDark="btn-light"
                            type="submit"
                        >
                            Reserveer
                        </Button>

                        {error && <p className="p-error">Er ging iets mis met het versturen van uw reservering. Probeer het opnieuw.</p>}

                    </form>
                    }

                    {isSubmitted && <p>Bedankt voor uw reservering!</p>}

                </section>

            </main>
        </>
    );
};

export default MakeReservation;