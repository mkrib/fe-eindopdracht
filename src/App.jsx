import './App.css'
import Home from "./pages/home/Home.jsx";
import {Routes, Route, Navigate} from 'react-router-dom';
import Navbar from "./components/navbar/Navbar.jsx";
import BlogsOverview from "./pages/blogsOverview/BlogsOverview.jsx";
import BlogDetailpage from "./pages/blogDetailpage/BlogDetailpage.jsx";
import LoginRegister from "./pages/loginRegister/LoginRegister.jsx";
import Menu from "./pages/menu/Menu.jsx";
import MakeReservation from "./pages/makeReservation/MakeReservation.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import Profile from "./pages/profile/Profile.jsx";
import {AuthContext} from "./contexts/AuthContext.jsx";
import {useContext} from "react";

function App() {

    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <Navbar/>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/menu" element={<Menu/>}/>
                <Route path="/blogs" element={<BlogsOverview/>}/>
                <Route path="/blog/:id" element={<BlogDetailpage/>}/>
                <Route path="/make-reservation" element={<MakeReservation/>}/>
                <Route path="/login" element={<LoginRegister/>}/>
                <Route path="/profile" element={<Profile/>}/>
                {/*TODO uiteindelijk onderstaande route gebruiken*/}
                {/*<Route path="/profile" element={isAuth? <Profile/> : <Navigate to="/login"/> }/>*/}
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>
    )
}

export default App
