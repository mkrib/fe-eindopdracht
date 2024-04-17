import './MakeReservation.css';
import Button from "../../components/buttons/Button.jsx";
import {useState} from "react";

const MakeReservation = () => {
    const [formValues, setFormValues] = useState({
        date: '',
        time: '',
        persons: '',
        specialRequest: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    // const [error, setError] = useState(null);

    function handleFormChange(e) {
        const changedFieldName = e.target.name;
        const newValue = e.target.value;

        console.log(changedFieldName, newValue);

        setFormValues({
            ...formValues,
            [changedFieldName]: newValue,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        console.log(
            `Datum: ${formValues.date}
            Tijd: ${formValues.time}
            Aantal personen: ${formValues.persons}
            Speciale verzoeken: ${formValues.specialRequest}`
        );

        setIsSubmitted(true);
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

                        <label htmlFor="persons">Aantal personen</label>
                        <select id="persons"
                                name="persons"
                                value={formValues.persons}
                                onChange={handleFormChange}
                                required>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>

                        <label htmlFor="specialRequest">Speciaal verzoek</label>
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
                    </form>
                    }

                    {isSubmitted && <p>Bedankt voor uw reservering!</p>}

                </section>

            </main>
        </>
    );
};

export default MakeReservation;