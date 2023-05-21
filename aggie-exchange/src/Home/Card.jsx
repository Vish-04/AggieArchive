import React from 'react';
import axios from "axios";

const Card = ({ course_id, course_name}) => {

  console.log("COURSE_NAME: ",course_name)

  const handleCardRender = async() =>{
      const result =  await axios.get("http://localhost:3000/courses/"+course_id);
      console.log("RESULT :", result.data);
      window.location.href = "/class/" + result.data._id;
  }
  
  return (
    <div className="card" onClick={handleCardRender}>
        <h3 className='card-text'>{course_id}</h3>
        <p className='card-text'>{course_name}</p>
    </div>
  );
}

export default Card;