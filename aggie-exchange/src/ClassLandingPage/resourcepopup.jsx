import React, { useState } from 'react';
import '../css/popup.css';
import {addLink, addFile} from './resourceFunc';
import axios from 'axios';

function Popup(props) {
  const [name, setName] = useState('');
  const [urlValue, setUrlValue] = useState('');
  const [filePath, setFilePath] = useState('');
  const [fileName, setFileName] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [error, setError] = useState({ value: false, message: '' });
  const [success, setSuccess] = useState(false);
  const [selectedOption, setSelectedOption] = useState('url');


  const handleSubmit = async () => {
    if (urlValue){
      console.log('URL Name:', name);
      console.log('URL Value:', urlValue);
      console.log('Description Value:', descriptionValue);
      const url = window.location.href.split('/');
      const courseId = url[url.length - 1];

      const result = await addLink(
        name,
        urlValue,
        descriptionValue,
        courseId
      );
      setError(result);
      console.log(result);

      if (!result.value) {
        setSuccess(true);

        props.setTrigger(false);
        location.reload();
      } else {
        setSuccess(false);
      }
    } else{
      console.log("FILE NAME:", fileName);
      console.log("FILE PATH:", filePath);
      console.log('Description Value:', descriptionValue);
      const url = window.location.href.split('/');
      const courseId = url[url.length - 1];
      const extension = fileName.substring(fileName.length - 4)
      console.log("EXTENSION", extension);

      // const result = await addFile(
      //   fileName,
      //   filePath,
      //   descriptionValue,
      //   courseId
      // )

      // setError(result);
      // console.log(result);


      const data = new FormData();
      data.set("name", name);
      data.set("course_id", courseId);
      data.set("extension", extension);
      data.set("file", filePath);

      // await axios.post("https://httpbin.org/anything", data).then((res)=>{console.log(res)}).catch(err=>console.log(err));
      console.log("NOT PAST")

      try{
        const response = await fetch('http://localhost:3000/resources/upload',{
            method: "POST",
            body: data
        })
        console.log(response)

      } catch(e){
        console.log(e);
      }
      // await axios.post("http://localhost:3000/resources/upload", data);

      console.log("PAST")
      
      // if (!result.value) {
      //   setSuccess(true);

      //   props.setTrigger(false);
      //   location.reload();
      // } else {
      //   setSuccess(false);
      // }

    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value == 'url'){
      setFilePath('');
    } else {
      setUrlValue('')
    }
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <h2>Add Resource</h2>
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          Close
        </button>
        <form>
          <div>
            <input
              type="radio"
              id="urlOption"
              name="option"
              value="url"
              checked={selectedOption === 'url'}
              onChange={handleOptionChange}
            />
            <label htmlFor="urlOption">URL</label>
          </div>
          <div>
            <input
              type="radio"
              id="fileOption"
              name="option"
              value="file"
              checked={selectedOption === 'file'}
              onChange={handleOptionChange}
            />
            <label htmlFor="fileOption">File</label>
          </div>
        </form>
        <div className="popup-content">
          <div>
            <input
              type="text"
              value={name}
              className="popup-input"
              onChange={(event) => {
                setName(event.target.value);
              }}
              placeholder="Enter a name for the resource..."
            />
          {selectedOption === 'url' ? (
              <input
                type="text"
                value={urlValue}
                className="popup-input"
                onChange={(event) => {
                  setUrlValue(event.target.value);
                }}
                placeholder="Enter URL..."
              />
          ) : (
            <input
              type="file"
              accept='.pdf,.txt,.doc,.docx,.jpg,.jpeg,.png'
              className="popup-input"
              onChange={(event) => {
                setFileName(event.target.value);
                setFilePath(event.target.files[0]);
                console.log("FILE PATH: ", event.target.files[0]);
                console.log("FILE NAME: ", event.target.value);
                // Handle file upload logic here
              }}
            />
          )}
          </div>


          <textarea
            value={descriptionValue}
            className="popup-input"
            onChange={(event) => {
              setDescriptionValue(event.target.value);
            }}
            placeholder="Enter resource description..."
          />
        </div>
        <div className="popup-footer">
          {error.value ? (
            <p style={{ color: 'red', fontSize: 16, textAlign: 'center' }}>
              {error.message}
            </p>
          ) : null}
          {success ? (
            <p style={{ color: 'green', fontSize: 16, textAlign: 'center' }}>
              Added Resource Successfully!
            </p>
          ) : null}

          <button onClick={handleSubmit}>Submit</button>
        </div>
        {props.children}
      </div>
    </div>
  ) : null;
}

export default Popup;
