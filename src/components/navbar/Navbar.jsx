import {NavLink} from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    return (
        <>
            <nav>
                <div className="nav-inner-wrapper">
                    <h1 className="logo"><NavLink to="/">The restaurant</NavLink></h1>
                    <ul>
                        <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/menu">Menukaart</NavLink></li>
                        <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/blogs">Blogs</NavLink></li>
                        <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/">Contact</NavLink></li>
                        <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/make-reservation">Reserveer</NavLink></li>
                        <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/login">Login</NavLink></li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;