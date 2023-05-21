import React, {useState, useEffect}from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./Home/homePage"
import LoginForm from "./Login/loginForm"
import SignupForm from "./Login/signupForm";
import { RecoilRoot } from "recoil";
import ProfilePage from "./Profile/profilePage";
import ClassLandingPage from "./ClassLandingPage/classLandingPage";
import Loading from "./Loading/loading";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    var sessionObject = JSON.parse(sessionStorage.getItem("sessionObject"));
    
    if (sessionObject != null){
      
      const currentDate = new Date();
  
      if( Date.parse(currentDate) < Date.parse(sessionObject.expiresAt)){
        sessionObject.expiresAt = new Date(currentDate.getTime() + 30 * 60 * 1000);
        sessionStorage.setItem('sessionObject', JSON.stringify(sessionObject));
        console.log("Session extended")
      } else{
        sessionStorage.removeItem('sessionObject');
        console.log('Session expired');
        window.location.href = "/login"
      }
    } else{
      console.log("Not logged in")
    }

  })

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("LOADING")
    }, 700); // Set an appropriate time to show the loading screen
  }, []);

  return (
    <RecoilRoot>
      <Router>
        {isLoading ?  
          <Loading /> :

        
        <Routes>
          {/* <Navbar /> */}
          {/* <HomePage /> */}
          <Route path="/" exact element={<HomePage />} />
          <Route path="login"  element={<LoginForm />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="class/:id" element={<ClassLandingPage />} />
          {/* <Footer/> */}
          {/* <LoginForm />  */}
        </Routes>
        }
      </Router>
    </RecoilRoot>
  )
  }
export default App;
