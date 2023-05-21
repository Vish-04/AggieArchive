import React from "react";

const Discussion = ({username, content}) =>{

    return(
        <div style={{padding: 15, borderStyle: 'solid', display: 'flex', flexDirection: 'column'}}>
            <h1> {username} </h1>
            <p>{content}</p>

        </div>
    );

}

export default Discussion;