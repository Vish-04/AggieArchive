import React, { useState } from "react";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import axios from "axios";



const Resource = ({urlName, urlValue, description, up, down, id}) => {
    if (down.includes('')){
        down.splice('', 1);
    }

    // const [upvoted, setUpvoted] = useState(false);
    // const [downvoted, setDownvoted] = useState(false);
    const [upvoteNumber, setUpvoteNumber] = useState(up.length)
    const [downvoteNumber, setDownvoteNumber] = useState(down.length)

    // console.log("URLNAME", urlName)
    // console.log("URLVAL", urlValue)
    // console.log("DESCRIPTION", description)
    // console.log("UP", up)
    // console.log("DOWN", down);
    // console.log("ID", id);
    
    const sessionObject = JSON.parse(sessionStorage.getItem("sessionObject"));
    

    const handleUpvote = async() => {
        if(sessionObject != null){
            try{
                const result = await axios.put("http://localhost:3000/resources/upvote/"+id, {username:sessionObject.userInfo.username});
                // setUpvoted(result.data === -1)
                if (!up.includes(sessionObject.userInfo.username)){
                    up.push(sessionObject.userInfo.username);
                } else{
                    up.splice(sessionObject.userInfo.username, 1);
                }
                setUpvoteNumber(up.length);
            } catch (error){
                console.log(error);
            }
        } else{
            console.log("USER NOT LOGGED IN");
        }
    }

    const handleDownvote = async () =>{
        if(sessionObject != null){
            try{
                const result = await axios.put("http://localhost:3000/resources/downvote/"+id, {username:sessionObject.userInfo.username});
                // setDownvoted(result.data !== -1)
                if (!down.includes(sessionObject.userInfo.username)){
                    down.push(sessionObject.userInfo.username);
                } else{
                    down.splice(sessionObject.userInfo.username, 1);
                }
                setDownvoteNumber(down.length)
            } catch (error){
                console.log(error);
            }
        } else{
            console.log("USER NOT LOGGED IN");
        }

    }

    return(
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 5, justifyContent: 'center' }}>
            <div className="flex-item">
                <div style={{fontSize: '26px'}}>
                    <a style={{color: '#0060ac'}} href= {urlValue}><b>{urlName}</b></a>
                    <p style={{fontSize: '18px'}}>{description}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 3, alignContent: "center", justifyContent:'right', textAlign:'center'}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent:"center"}}>
                        <div onClick={handleUpvote}><ArrowCircleUpIcon className="vote" style={{fontSize: '3rem'}} /></div>
                        <h3>{upvoteNumber}</h3>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent:"center"}}>
                        <div onClick={handleDownvote}><ArrowCircleDownIcon className="vote" style={{fontSize: '3rem'}} /></div>
                        <h3>{downvoteNumber}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Resource;