import './App.css'
import Home from "./pages/home/Home.jsx";
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar.jsx";

function App() {

    return (
        <>
            <Navbar/>

            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </>
    )
}

export default App
