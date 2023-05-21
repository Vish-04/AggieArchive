import React, { useState } from "react";
import Cow from "../imgs/Cow-Moon.jpg"

const Loading = () =>{

    return (
        <div style={{display: 'flex', flexDirection:'column',width: '100vw', height: '100vh', backgroundImage: `url(${Cow})`,backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: '100% auto', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
            
        </div> 
    );
}

export default Loading;