import React, { useState } from 'react';
import '../css/popup.css';
import addResource from './addResource';

function Popup(props) {
  const [urlName, setUrlName] = useState('');
  const [urlValue, setUrlValue] = useState('');
  const [filePath, setFilePath] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [error, setError] = useState({ value: false, message: '' });
  const [success, setSuccess] = useState(false);
  const [selectedOption, setSelectedOption] = useState('url');


  const handleSubmit = async () => {
    console.log('URL Name:', urlName);
    console.log('URL Value:', urlValue);
    console.log('Description Value:', descriptionValue);
    const url = window.location.href.split('/');
    const courseId = url[url.length - 1];

    const result = await addResource(
      urlName,
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
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
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
          {selectedOption === 'url' ? (
            <div>
              <input
                type="text"
                value={urlName}
                className="popup-input"
                onChange={(event) => {
                  setUrlName(event.target.value);
                }}
                placeholder="Enter a name for URL..."
              />
              <input
                type="text"
                value={urlValue}
                className="popup-input"
                onChange={(event) => {
                  setUrlValue(event.target.value);
                }}
                placeholder="Enter URL..."
              />
            </div>
          ) : (
            <input
              type="file"
              className="popup-input"
              onChange={(event) => {
                setFilePath(event.target.files[0]);
                console.log("FILE PATH: ", event.target.files)
                // Handle file upload logic here
              }}
            />
          )}

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
