import './MakeReservation.css';
import Button from "../../components/buttons/Button.jsx";
const MakeReservation = () => {
    return (
        <>
            <main className="outer-container">
                <section className="inner-container">

                    <h3>Reserveren</h3>
                    <form className="form-make-reservation">
                        <label htmlFor="date">Datum</label>
                        <input type="date" id="date" name="date" required/>
                        <label htmlFor="time">Tijd</label>
                        <input type="time" id="time" name="time" required/>
                        <label htmlFor="persons">Aantal personen</label>
                        <select id="persons" name="persons" required>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        </select>
                        <label htmlFor="special-request">Speciaal verzoek</label>
                        <textarea id="special-request" name="special-request"/>
                        <Button
                        lightOrDark="btn-light"
                        type="submit"
                        >
                            Reserveer
                        </Button>
                    </form>
                </section>

            </main>
        </>
    );
};

export default MakeReservation;