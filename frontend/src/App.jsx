import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Landing from "./pages/landing.jsx";
import Navbar from "./components/layout.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar>
          <Routes>
            <Route path="/" element=<Landing /> />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Navbar>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
