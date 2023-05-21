import React from "react";
import Discussion from "./discussion"

const DiscussionList = ({discussions}) =>{

    console.log("DISCUSSION: ", discussions);

    if(discussions){

        return(
        <>
            <div className="discussion-container">
                {discussions.map(discussion =>(
                            <Discussion
                            key={discussion._id}
                            username={discussion.username}
                            content={discussion.content}
                            />))}
            </div>
        </>
        );
    } else{
        return(<>
        </>);
    }

}

export default DiscussionList;