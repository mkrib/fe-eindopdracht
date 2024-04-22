import {Link} from "react-router-dom";
import './Profile.css';
import Button from "../../components/buttons/Button.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import formatDateWithWeekday from "../../helpers/formatDateWithWeekday.jsx";
import formatTimeWithoutSeconds from "../../helpers/formatTimeWithoutSeconds.jsx";
import AddReviewForm from "../../components/review/AddReviewForm.jsx";

const Profile = () => {
    const [reservations, setReservations] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    async function fetchReservations() {
        try {
            const result = await axios.get('http://localhost:8080/reservations');
            console.log(result);
            const sortedReservations = result.data.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });
            setReservations(sortedReservations);
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }
    }

    async function fetchReviews() {
        try {
            const result = await axios.get('http://localhost:8080/reviews');
            console.log(result);
            setReviews(result.data);
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }
    }

    async function cancelReservation(id) {
        try {
            const result = await axios.delete(`http://localhost:8080/reservations/${id}`);
            console.log(result);
            await fetchReservations();
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }
    }

    async function deleteReview(id) {
        try {
            const result = await axios.delete(`http://localhost:8080/reviews/${id}`);
            console.log(result);
            await fetchReviews();
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchReservations();
        fetchReviews();
    }, []);

    return (
        <>
            {/*Onderstaande code runnen wanneer een admin is ingelogd*/}

            <div className="profile-side-nav">
                <ul>
                    <li><a href="#id-reservations">Reserveringen</a></li>
                    <li><a href="#id-reviews">Reviews</a></li>
                    <li><a href="#id-add-blog">Blog toevoegen</a></li>
                    <li><Link to="/">Log uit</Link></li>
                </ul>
            </div>

            <section className="profile-content" id="id-reservations">
                <h2>Reserveringen</h2>
                <div className="display-profile-content">
                    <ul className="ul-reservations">
                        {reservations && reservations.map((reservation) => {
                            return (
                                <li key={reservation.id}>
                                    <p>{formatDateWithWeekday(reservation.date)} om {formatTimeWithoutSeconds(reservation.startTime)}</p>
                                    <p>{reservation.amountOfGuests} personen</p>
                                    <p>Speciale verzoeken: {reservation.specialRequest}</p>
                                    <Button
                                        lightOrDark="btn-dark"
                                        type="button"
                                        handleClick={() => cancelReservation(reservation.id)}
                                    >
                                        Annuleer
                                    </Button>
                                </li>
                            )
                        })}

                        {reservations.length === 0 && <p>Er zijn momenteel geen reserveringen.</p>}

                        {error && <p>Oeps, er ging iets mis met het ophalen van de reserveringen...</p>}
                    </ul>
                </div>
            </section>

            <section className="profile-content" id="id-reviews">
                <h2>Reviews</h2>
                <div className="display-profile-content">

                    <ul className="ul-reviews">
                        {reviews && reviews.map((review) => {
                            return (
                                <li key={review.id}>
                                    <p>{review.content}</p>
                                    <p className="name-reviewer">{review.fullName}</p>
                                    <p>{formatDateWithWeekday(review.issueDate)}</p>
                                    <Button
                                        lightOrDark="btn-dark"
                                        type="button"
                                        handleClick={() => deleteReview(review.id)}
                                    >
                                        Verwijder
                                    </Button>
                                </li>
                            )
                        })}

                        {reviews.length === 0 && <p>Er zijn momenteel geen reviews.</p>}

                        {error && <p>Oeps, er ging iets mis met het ophalen van de reviews...</p>}
                    </ul>
                </div>
            </section>

            <section className="profile-content" id="id-add-blog">
                <h2>Blog toevoegen</h2>
                <div className="display-profile-content">
                    <form className="form-add-blog">
                        <label htmlFor="title">Titel</label>
                        <input type="text" id="title" name="title" required/>
                        <label htmlFor="content">Content</label>
                        <textarea className="textarea-blog-content" id="content" name="content" required></textarea>
                        <label htmlFor="previewText">Tekst voorvertoning</label>
                        <textarea className="textarea-blog-previewtext" id="previewText" name="previewText"
                                  required></textarea>
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

            {/*    Onderstaande code runnen wanneer een gast is ingelogd */}

            {/*<div className="profile-side-nav profile-side-nav-guest">*/}
            {/*    <ul>*/}
            {/*        <li><a href="#id-reservations">Reserveringen</a></li>*/}
            {/*        <li><a href="#id-leave-review">Review achterlaten</a></li>*/}
            {/*        <li><a href="#id-personal-details">Persoonlijke gegevens</a></li>*/}
            {/*        <li><Link to="/">Log uit</Link></li>*/}
            {/*    </ul>*/}
            {/*</div>*/}

            <section className="profile-content" id="id-reservations">
                <h2>Reserveringen</h2>
                <div className="display-profile-content">
                    <ul className="ul-reservations">
                        {/*{reservations && reservations.filter((reservation) => {*/}
                        {/*    return (*/}
                        {/*        <li key={reservation.id}>*/}
                        {/*            <p>{formatDateWithWeekday(reservation.date)} om {formatTimeWithoutSeconds(reservation.startTime)}</p>*/}
                        {/*            <p>{reservation.amountOfGuests} personen</p>*/}
                        {/*            <p>Speciale verzoeken: {reservation.specialRequest}</p>*/}
                        {/*            <Button*/}
                        {/*                lightOrDark="btn-dark"*/}
                        {/*                type="button"*/}
                        {/*                handleClick={() => cancelReservation(reservation.id)}*/}
                        {/*            >*/}
                        {/*                Annuleer*/}
                        {/*            </Button>*/}
                        {/*        </li>*/}
                        {/*    )*/}
                        {/*})}*/}

                        {/*{reservations.length === 0 && <p>U heeft momenteel geen reserveringen.</p>}*/}

                        {/*{error && <p>Oeps, er ging iets mis met het ophalen van de reserveringen...</p>}*/}
                    </ul>
                </div>
            </section>

            <section className="profile-content" id="id-leave-review">
                <h2>Review achterlaten</h2>
                <div className="display-profile-content display-profile-content-small">
                    <AddReviewForm/>
                </div>
            </section>

            <section className="profile-content" id="id-personal-details">
                <h2>Persoonlijke gegevens</h2>
                <div className="display-profile-content display-profile-content-small">
                    <table>
                        <tbody>
                        <tr>
                            <th>Voor- en achternaam:</th>
                            <td>Naam en achternaam</td>
                        </tr>
                        <tr>
                            <th>Emailadres:</th>
                            <td>Emailadres</td>
                        </tr>
                        <tr>
                            <th>Telefoonnummer:</th>
                            <td>Tel nummer</td>
                        </tr>
                        <tr>
                            <th>Geboortedatum:</th>
                            <td>xx-xx-xxxx</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section>

        </>
    );
};

export default Profile;