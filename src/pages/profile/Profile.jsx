import {Link, useNavigate} from "react-router-dom";
import './Profile.css';
import Button from "../../components/buttons/Button.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import formatDateWithWeekday from "../../helpers/formatDateWithWeekday.jsx";
import formatTimeWithoutSeconds from "../../helpers/formatTimeWithoutSeconds.jsx";
import AddReviewForm from "../../components/review/AddReviewForm.jsx";
import {AuthContext} from "../../contexts/AuthContext.jsx";
import formatDateWithoutWeekday from "../../helpers/formatDateWithoutWeekday.jsx";

const Profile = () => {
    const [reservations, setReservations] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    const {logout, user, isAuth} = useContext(AuthContext);

    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
        repeatPassword: ''
    });

    const [registerSuccess, setRegisterSuccess] = useState(null);
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

    async function handleSubmitRegister(event) {
        event.preventDefault();

        try {
            const result = await axios.post('http://localhost:8080/users/admin', {
                username: formValues.username,
                password: formValues.password,
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

    async function fetchReservations() {
        try {
            const result = await axios.get('http://localhost:8080/reservations');
            // console.log(result);
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
            // console.log(result);
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
            {/*PROFILE ADMIN*/}

            {isAuth && user.roles === "ROLE_ADMIN" &&

                <>

                    <div className="profile-side-nav">
                        <ul>
                            <li className="p-username">{isAuth && user.username}</li>
                            <li><a href="#reservations">Reserveringen</a></li>
                            <li><a href="#reviews">Reviews</a></li>
                            <li><a href="#add-blog">Blog toevoegen</a></li>
                            <li><a href="#add-account">Nieuw account</a></li>
                            <li className="li-logout" onClick={logout}>Log uit</li>
                        </ul>
                    </div>

                    <section className="profile-content" id="reservations">
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

                    <section className="profile-content" id="reviews">
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

                    <section className="profile-content" id="add-blog">
                        <h2>Blog toevoegen</h2>
                        <div className="display-profile-content">

                            <form className="form-add-blog">
                                <label htmlFor="title">Titel</label>
                                <input type="text" id="title" name="title" required/>
                                <label htmlFor="content">Content</label>
                                <textarea className="textarea-blog-content" id="content" name="content"
                                          required></textarea>
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

                    <section className="profile-content" id="add-account">
                        <h2>Nieuw account toevoegen</h2>
                        <div className="display-profile-content display-profile-content-small">

                            {!isSubmitted &&
                                <form className="form-register" onSubmit={handleSubmitRegister}>
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

                            {isSubmitted &&
                                <p className="p-success">De nieuwe admin is succesvol geregistreerd. Het account kan nu worden gebruikt.</p>}

                        </div>
                    </section>
                </>
            }

            {/*PROFILE USER*/}

            {isAuth && user.roles === "ROLE_USER" &&

                <>

                    <div className="profile-side-nav">
                        <ul>
                            <li className="p-username">{isAuth && user.username}</li>
                            <li><a href="#reservations">Reserveringen</a></li>
                            <li><a href="#leave-review">Review achterlaten</a></li>
                            <li><a href="#personal-details">Persoonlijke gegevens</a></li>
                            <li className="li-logout" onClick={logout}>Log uit</li>
                        </ul>
                    </div>

                    <section className="profile-content" id="reservations">
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

                    <section className="profile-content" id="leave-review">
                        <h2>Review achterlaten</h2>
                        <div className="display-profile-content display-profile-content-small">
                            <AddReviewForm/>
                        </div>
                    </section>

                    <section className="profile-content" id="personal-details">
                        <h2>Persoonlijke gegevens</h2>
                        <div className="display-profile-content display-profile-content-small">
                            <table>
                                <tbody>
                                <tr>
                                    <th>Gebruikersnaam:</th>
                                    {user.username && <td>{user.username}</td>}
                                </tr>
                                <tr>
                                    <th>Voornaam:</th>
                                    {user.firstname && <td>{user.firstname}</td>}
                                </tr>
                                <tr>
                                    <th>Achternaam:</th>
                                    {user.lastname && <td>{user.lastname}</td>}
                                </tr>
                                <tr>
                                    <th>Emailadres:</th>
                                    {user.email && <td>{user.email}</td>}
                                </tr>
                                <tr>
                                    <th>Telefoonnummer:</th>
                                    {user.phoneNumber && <td>{user.phoneNumber}</td>}
                                </tr>
                                <tr>
                                    <th>Geboortedatum:</th>
                                    {user.dateOfBirth && <td>{formatDateWithoutWeekday(user.dateOfBirth)}</td>}
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </>
            }

            {!isAuth &&
                <>
                <p className="p-no-auth">U bent niet (langer) ingelogd. </p>
                <p className="p-no-auth"><Link to="/login">Klik hier om naar de inlogpagina te gaan</Link></p>
                </>
            }

        </>
    );
};

export default Profile;