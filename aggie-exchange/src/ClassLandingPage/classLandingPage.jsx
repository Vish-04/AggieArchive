import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/classLanding.css';
import Popup from './resourcepopup'; // Import the Popup component
import Navbar from '../Navbar/navbar';
import ResourceList from './resourceList';


const ClassLandingPage = () => {
  const [course, setCourse] = useState(null);
  const [resources, setResources] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);

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

    fetchCourse();
    fetchResources();
  }, []);




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
      <div style={{textAlign: 'left', backgroundColor: 'aliceblue', marginTop: '100px', padding: '20px'}}>
        <h1 className="heading">{courseID} {courseName} {courseUnits}</h1>
        <p className='heading-text'>Course Description: {courseDescription}</p>
        <p className='heading-text'>Course Details: {courseDetails}</p>
      
      </div>
      <div className="course-info">
      </div>
      <div className="course-info">
      </div>
      {resources? <ResourceList resources={resources} /> : <h3>There are no resources. Want to add one?</h3>}
      <button className="add-resource-button" onClick={() => setButtonPopup(!buttonPopup)}>
        Add Resource 
      </button>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h3></h3>
        
      </Popup>
    </div>
  );
};

export default ClassLandingPage;
