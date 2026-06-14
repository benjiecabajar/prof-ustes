import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import LandingPage from './pages/landingPage';
import LoginPage from './pages/loginPage' ;
import SignupPage from './pages/signupPage';
import ForgotPassword from './pages/forgotPassword';  
import StudentHome from './pages/studentUser/studentHome';
import Navbar from './components/navbar';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<StudentHome />} />
      </Routes>
    </Router>
  );
}

export default App
