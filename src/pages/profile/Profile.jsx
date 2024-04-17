import {Link} from "react-router-dom";
import './Profile.css';

const Profile = () => {
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
                        <label htmlFor="content">Inhoud</label>
                        <textarea id="content" name="content" required></textarea>
                        <label htmlFor="previewText">Tekst voorvertoning</label>
                        <textarea id="previewText" name="previewText" required></textarea>
                        <button className="btn-light" type="submit">Verstuur</button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Profile;