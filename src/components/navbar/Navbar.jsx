import {NavLink} from "react-router-dom";
import './Navbar.css';
import {AuthContext} from "../../contexts/AuthContext.jsx";
import {useContext} from "react";

const Navbar = () => {
    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <nav>
                <div className="nav-inner-wrapper">
                    <p className="logo"><NavLink to="/">The restaurant</NavLink></p>
                    <ul>
                        <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                     to="/menu">Menukaart</NavLink></li>
                        <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                     to="/blogs">Blogs</NavLink></li>
                        <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                     to="/make-reservation">Reserveer</NavLink></li>
                        {isAuth ?

                            <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                         to="/profile">Profiel</NavLink></li>
                            :
                            <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                         to="/login">Login</NavLink></li>
                        }
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;