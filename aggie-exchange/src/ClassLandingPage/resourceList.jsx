import React from "react";
import Resource from "./resource";

const ResourceList = ({resources}) =>{
   
    console.log("RESOURCES: ", resources);

    if(resources){

        console.log("RESOURCE NAME", )
        return(
            <div className="flex-container">
                {resources.map(resource =>(
                            <Resource
                            key={resource._id}
                            urlName={resource.resource_name}
                            urlValue={resource.resource}
                            description={resource.description}
                            up={resource.up}
                            down={resource.down}
                            id = {resource._id}
                            />))}
            </div>
        );
    } else{
        return(<>
        </>);
    }
}


export default ResourceList;