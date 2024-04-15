import './LoginRegister.css'

const LoginRegister = () => {
    return (
        <>
            <main className="outer-container">
                <section className="inner-container">

                    <h3>Inloggen</h3>
                    <form className="form-login">
                        <label htmlFor="email">Emailadres</label>
                        <input type="email" id="email" name="email" required/>
                        <label htmlFor="password">Wachtwoord</label>
                        <input type="password" id="password" name="password" required/>
                        <button className="btn-login" type="submit">Login</button>
                    </form>

                    <h3>Nog geen account?</h3>
                    <form className="form-register">
                        <label htmlFor="fullname">Voor- en achternaam</label>
                        <input type="text" id="fullname" name="fullname" required/>
                        <label htmlFor="phonenumber">Telefoonnummer</label>
                        <input type="tel" id="phonenumber" name="phonenumber" required/>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required/>
                        <label htmlFor="password">Wachtwoord</label>
                        <input type="password" id="password" name="password" required/>
                        <label htmlFor="password">Herhaal wachtwoord</label>
                        <input type="password" id="password" name="password" required/>
                        <button className="btn-register" type="submit">Registreer</button>
                    </form>
                </section>

            </main>
        </>
    );
};

export default LoginRegister;