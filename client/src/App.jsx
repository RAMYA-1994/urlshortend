import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './component/Login';
import Register from './component/Register';
import ForgotPassword from './component/ForgotPassword';
import ResetPassword from './component/ResetPassword';
import Dashboard from './component/Dashboard';
import CreateURL from './component/CreateURL';
// import ListURLs from './component/ListURLs';

import AppNavbar from './component/Navbar';

function App() {
  return (
    <Router>
      <AppNavbar />
      {/* <div className="container"> */}
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/reset-password/:token" element={<ResetPassword/>} />
          <Route path="/dashboard" elemen={<Dashboard/>} />
          <Route path="/create" element={<CreateURL/>} />
          <Route path="/create" element={<CreateURL/>} />
          {/* <Route path="/list" element={<ListURLs/>} /> */}
        </Routes>
      {/* </div> */}
    </Router>
  );
}

export default App;
