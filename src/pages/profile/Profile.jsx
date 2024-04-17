import {Link} from "react-router-dom";
import './Profile.css';
import Button from "../../components/buttons/Button.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

const Profile = () => {
    // const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);

    async function fetchReservations() {
        try {
            const result = await axios.get('http://localhost:8080/reservations');
            console.log(result);
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchReservations();
    }, []);

    return (
        <>
            <div className="profile-side-nav">
                <ul>
                    <li><Link to="/">Reserveringen</Link></li>
                    <li><Link to="/">Reviews</Link></li>
                    <li><Link to="/">Blog toevoegen</Link></li>
                    <li><Link to="/">Log uit</Link></li>
                </ul>
            </div>

            <section className="profile-content">
                <h2>Reserveringen</h2>
                <div className="display-profile-content">
                    <ul>
                        <li>
                            <p>Datum en tijd</p>
                            <p>Aantal personen</p>
                            <p>Naam gast</p>
                            <p>Speciale verzoeken: </p>
                        </li>

                        <li>
                            <p>Datum en tijd</p>
                            <p>Aantal personen</p>
                            <p>Naam gast</p>
                            <p>Speciale verzoeken: </p>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="profile-content">
                <h2>Reviews</h2>
                <div className="display-profile-content">
                    <ul>
                        <li>
                            <p>Bericht review</p>
                            <p>Naam reviewer</p>
                            <p>Datum van review</p>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="profile-content">
                <h2>Blog toevoegen</h2>
                <div className="display-profile-content">
                    <form className="form-add-blog">
                        <label htmlFor="title">Titel</label>
                        <input type="text" id="title" name="title" required/>
                        <label htmlFor="content">Content</label>
                        <textarea className="textarea-content" id="content" name="content" required></textarea>
                        <label htmlFor="previewText">Tekst voorvertoning</label>
                        <textarea className="textarea-previewtext" id="previewText" name="previewText" required></textarea>
                        <label htmlFor="image">Afbeelding</label>
                        <input type="file" id="image" name="image" required/>
                        <Button
                        lightOrDark="btn-light"
                        type="submit"
                        >
                            Voeg toe
                        </Button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Profile;