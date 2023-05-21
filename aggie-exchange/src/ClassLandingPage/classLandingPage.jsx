import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/classLanding.css';
import Popup from './resourcepopup'; // Import the Popup component
import Navbar from '../Navbar/navbar';
import ResourceList from './resourceList';
import Cow from "../imgs/Cow.png"
import Footer from "../Footer/footer"
import DiscussionList from './discussionList';


const ClassLandingPage = () => {
  const [course, setCourse] = useState(null);
  const [resources, setResources] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {

    
    const fetchCourse = async () => {
      try {
        console.log("IN")
        const url = window.location.href.split("/");
        const userId = url[url.length - 1];
        const response = await axios.get("http://localhost:3000/courses/id/" + userId);
        setCourse(response.data);
        console.log( "THIS THE DATA", response.data);
      } catch (error) {
        console.log(error);
      }
      console.log("PASS")
    };
    
    const fetchResources = async() =>{
      try{
        const url = window.location.href.split("/");
        const courseId = url[url.length - 1];
        const response = await axios.get("http://localhost:3000/resources/course/" + courseId);
        setResources(response.data);
      } catch(error){
        console.log(error);
      }
    }

    const fetchDiscussion = async () => {
      try{
        const url = window.location.href.split("/");
        const courseId = url[url.length - 1];
        const response = await axios.get("http://localhost:3000/discussions/course/" + courseId);
        setDiscussions(response.data);

      } catch(error){
        console.log(error);
      }
    }

    fetchCourse();
    fetchResources();
    fetchDiscussion();
  }, []);

  const handleCreatePost = async () =>{
    const url = window.location.href.split("/");
    const courseId = url[url.length - 1];
    const sessionObject = sessionStorage.getItem('sessionObject');
    console.log("SESSION OBJECT IN HANDLE THING: ", sessionObject)
    if(!sessionObject){
      setError("Log In to Post");
      setSuccess(false);
    } else{

      if (!descriptionValue.trim()){
        setError('Post content cannot be empty');
      } else{
        try{
          console.log("USERNAME IN HERE: ")
          console.log("COURSE_ID:", courseId);
          console.log("CONTENT: ", descriptionValue)

          const Discussion = {
            username: "anon",
            content: descriptionValue,
            course_id: courseId,
          }
          const response = await axios.post("http://localhost:3000/discussions/add", Discussion);
          console.log("RESPONSE", response.data)
          setSuccess(true);
          setError('');

          // location.reload();

      } catch(e){
        setError(e.message);
        setSuccess(false)
      }
      }
    }
  }




  if (!course) {
    return (<div>
      <Navbar />
      Loading...
      </div>); // Display a loading indicator while fetching the course
  }

  // console.log("THIS THE COURSE", course)
  // console.log("COURSE TO GO INTO THESE VARIABLES", course)
  const courseID = course.course_id || 'Default Course ID';
  const courseName = course.course_name|| 'Default Course Name';
  const courseUnits = course.course_units|| 'Default Course Units';
  const courseDescription = course.course_description || 'Default Course Description';
  const courseDetails = course.course_details || 'Default Course Details';
  // console.log("Course Details:", courseID, courseName, courseUnits,courseDescription,courseDetails )

  return (
    <div className="container">
      <Navbar />
      <div style={{display: 'flex', background: 'linear-gradient(#0064b5, #2596be)', flexDirection:'row',textAlign: 'left', padding: '0px 20px 20px 20px', marginBottom: '30px'}}>
        <div>
          <h1 style={{color: 'white'}} className="heading">{courseID} {courseName} {courseUnits}</h1>
          <p className='heading-text'>Course Description: {courseDescription} </p>
          <p className='heading-text'>Course Details: {courseDetails}</p>
        </div >
        <div style={{width: '20vw', height: '30vh',  backgroundImage: `url(${Cow})`, marginRight: '5%',
    backgroundPosition: 'bottom', 
    backgroundRepeat: 'no-repeat', 
    backgroundSize: '100% auto',}}>

        </div>
      </div>
      <div style={{color: "black"}}></div>
      <div className="course-info">
      </div>
      <div className="course-info">
      </div>
      {resources? <ResourceList resources={resources} /> : <h3>There are no resources. Want to add one?</h3>}
      {discussions? <DiscussionList discussions={discussions} /> : <h3>There are no discussions. Want to add one?</h3>}
      <textarea
            value={descriptionValue}
            className="popup-input"
            onChange={(event) => {
              setDescriptionValue(event.target.value);
            }}
            placeholder="Enter post"
          />
          {error ? (
            <p style={{ color: 'red', fontSize: 16, textAlign: 'center' }}>
              {error}
            </p>
          ) : null}
          {success ? (
            <p style={{ color: 'green', fontSize: 16, textAlign: 'center' }}>
              Added Post Successfully!
            </p>
          ) : null}
          <button onClick={handleCreatePost}>POST</button>
      <button className="add-resource-button" onClick={() => setButtonPopup(!buttonPopup)}>
        Add Resource 
      </button>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h3></h3>
        
      </Popup>
      <Footer />
    </div>
  );
};

export default ClassLandingPage;
