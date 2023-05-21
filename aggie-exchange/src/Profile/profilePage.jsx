import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { updatePassword, updateUsername, deleteUser } from './profile';
import Navbar from '../Navbar/navbar';
import LoginArtwork from '../imgs/Login-Artwork.jpg'



const ProfilePage = () =>{

    const sessionObject = JSON.parse(sessionStorage.getItem("sessionObject"));
    console.log("SESSIONOBJECT:", sessionObject);
    if (sessionObject != null){
        var username = sessionObject.userInfo.username;
        console.log("USERNAME: ", username);
        
        const [newUsername, setNewUsername] = useState("")
        const [oldPassword, setOldPassword] = useState("")
        const [newPassword, setNewPassword] = useState("")
        const [confirmPassword, setConfirmPassword] = useState("")
        const [errorUsername, setErrorUsername] = useState({value: false, message:""})
        const [errorPassword, setErrorPassword] = useState({value: false, message:""})
        const [usernameSuccess, setUsernameSuccess ] = useState(false);
        const [passwordSuccess, setPasswordSuccess ] = useState(false);
    
        const handleUsernameSubmit = async () =>{
          console.log("IN")
          const result = await updateUsername(username, newUsername);
            setErrorUsername(result);
            if (!result.value){
                setUsernameSuccess(true);
            } else{
                setPasswordSuccess(false);
            }
        }
        const handlePasswordSubmit = async () =>{
            console.log("IN")
            const result = await updatePassword(username, oldPassword, newPassword, confirmPassword);
            setErrorPassword(result);
            if (!result.value){
                setPasswordSuccess(true);
            }else{
                setPasswordSuccess(false);
            }
        }
        
        const handleAccountDeletion = async () =>{
          await deleteUser(sessionObject.userInfo.id)
          handleLogOut();
        }

        const handleLogOut = () =>{
          sessionStorage.removeItem("sessionObject");
          window.location.href = "/";
        }
    

        return(
          <>
          <Navbar />
        <div style={styles.container}>
        <h1 style={styles.title}>Welcome, {username}!</h1>
        
        <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Update Username</h2>
        <div style={styles.form}>
          <input
            type="text"
            placeholder="Enter new username"
            value={newUsername}
            onChange={(e)=>{setNewUsername(e.target.value)}}
            style={styles.input}
          />
            {errorUsername.value ? <p style={{color:"red", fontSize: 16, textAlign: "center" }}>{errorUsername.message}</p> : null}
            {usernameSuccess && !errorUsername.value ? <p style={{color:"green", fontSize: 16, textAlign: "center" }}>Username Changed!</p> : null}
          <button 
            style={styles.submitButton}
            onClick={handleUsernameSubmit}
        >Update</button>
        </div>
        </div>
        <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Update Password</h2>
            <div style={styles.form}>
            <input
                type="password"
                placeholder="Enter old password"
                value={oldPassword}
                onChange={(e)=>{setOldPassword(e.target.value)}}
                style={styles.input}
            />
            <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e)=>{setNewPassword(e.target.value)}}
                style={styles.input}
            />
            <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                style={styles.input}
            />
            {errorPassword.value ? <p style={{color:"red", fontSize: 16, textAlign: "center" }}>{errorPassword.message}</p> : null}
            {passwordSuccess && !errorPassword.value? <p style={{color:"green", fontSize: 16, textAlign: "center" }}>Password Changed!</p> : null}
            <button 
                style={styles.submitButton}
                onClick={handlePasswordSubmit}
            >Update</button>
            </div>
        </div>  
        <div style={{display: 'flex', gap: '20px'}}>
          <button 
            style={styles.redButton}
            onClick={handleAccountDeletion}
          >Delete Account</button>  
          <button 
            style={styles.redButton}
            onClick={handleLogOut}
          >Log Out</button>  
        </div>  
      </div>
      </>
    );


    } else{


        return(
            <div style={styles.container}>
                <h1 style={styles.title}>User Not Logged In</h1>
                <p style={styles.description}>Please log in to view your profile.</p>
                <Link style={styles.button} to="/login">
                    Log In
                </Link>
            </div>
        );
    }
}

export default ProfilePage;

const styles = {
    container: {
      backgroundImage: `url(${LoginArtwork})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      // justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#f1f1f1',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      gap: 10
    },
    section:{
      display:'flex', 
      flexDirection:'row', 
      gap: 50, 
      alignItems: 'center', 
      boxShadow: ' 0 2px 4px rgba(0, 0, 0, 0.2)', 
      padding: 10, 
      backgroundColor: 'rgba(255,255,255,0.5)'
    },
    title: {
      marginTop: '50px',
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: 'white'
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    description: {
      fontSize: '20px',
      marginBottom: '40px',
      textAlign: 'center',
    },
    button: {
      padding: '10px 20px',
      fontSize: '18px',
      fontWeight: 'bold',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      textDecoration: 'none', // Remove underline from text
    },
    redButton: {
      padding: '10px 20px',
      fontSize: '18px',
      fontWeight: 'bold',
      backgroundColor: '#EE4B2B',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      textDecoration: 'none', // Remove underline from text
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '20px',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      marginBottom: '10px',
      width: '400px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      backgroundColor: 'rgba(255,255,255,0.5)'
    },
    submitButton: {
      padding: '10px 20px',
      width: '400px',
      fontSize: '18px',
      fontWeight: 'bold',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };
  