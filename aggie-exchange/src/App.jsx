import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import {RecoilRoot} from "recoil";
import LoginForm from "./Login/loginForm"
import SignupForm from "./Login/signupForm";


function App() {

  return (
    <RecoilRoot>
      <Router>
        
        
        <Routes>
          <Route path="login"  element={<LoginForm />} />
          <Route path="signup" element={<SignupForm />} />
        </Routes>
      </Router>
    </RecoilRoot>
  )
}

export default App
