import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Register from './pages/Register';

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path='/register' element={<Register/>} />
          <Route path='/' element={<Home/>} />
        </Routes>
      </Router>
  )
};


export default App;
