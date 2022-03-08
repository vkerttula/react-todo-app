import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import AuthProvider from './contex/auth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/' element={<Home/>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
};


export default App;
