import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
// import SignupPage from './pages/Signup';
import Login from '../src/pages/login/Login';
import Register from '../src/pages/register/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from './pages/admin/Admin';
function App() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center">
    <div className="w-full h-full">
     <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/dashboard" element={<Admin/>} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  </div>
  );
}

export default App;