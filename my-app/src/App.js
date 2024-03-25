import logo from "./logo.svg";
import "./css/App.css";
import "./css/Navbar.css";
import "./css/Form.css";
import "./css/DarkMode.css";
import './css/About.css';

import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import DarkMode from "./components/DarkMode";
import About from "./components/About";

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


let name = "Prasanjit";

function App() {
  return (
    <>
      <Router>
        <Navbar
          HomeLinkText="Home"
          ServicesLinkText="Services"
        />
        <div className="Blank">
          <h1>Hello, My Self {name}</h1>;
        </div>

      



        <Routes>
          {/* Use Routes instead of Switch */}
          {/* Initially, do not render the About component */}
          {/* It will be rendered when the user clicks the link */}
          {/* If you want it to be initially rendered, just use <Route> instead */}
          <Route path="/About" element={<About />} />

          <Route path="/" element={<>
            <TextForm />
            <DarkMode />
          </>} /> 


        </Routes>

      </Router>

    </>
  );
}

export default App;
