import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import { SignUp } from './components/SignUp';
import Welcom from './components/Welcom';
import Login from './components/Login';
import PrivateComp from './components/PrivateComp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route element={<PrivateComp/>}>
            <Route path='/home' element={<Home />} />
          </Route>

          <Route path='/signUp' element={<SignUp />} />
          <Route path='/logIn' element={<Login />} />
          <Route path='/' element={<Welcom />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
