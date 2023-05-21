import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import {RecoilRoot} from "recoil";
import LoginForm from "./Login/loginForm"
import SignupForm from "./Login/signupForm";
import ClassLandingPage from './ClassLandingPage/classLandingPage';
import ProfilePage from './Profile/profilePage';

function App() {

  return (
    <RecoilRoot>
      <Router>
        
        
        <Routes>
          <Route path="login"  element={<LoginForm />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="classLanding" element={<ClassLandingPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </RecoilRoot>
  )
}

export default App
