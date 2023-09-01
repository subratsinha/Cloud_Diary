import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
import { useState } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';


function App() {
  const [alert, setalert] = useState(null);
  const showAlert = (message, type) =>{
    setalert({
      msg: message,
      type: type
    })

    setTimeout(() => {
      setalert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className='container'>
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />

              <Route exact path="/about" element={<About />} />

              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />

              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />



            </Routes>
          </div>
        </Router>
        
      </NoteState>
    </>
  );
}

export default App;
