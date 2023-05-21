import axios from "axios";

export const addLink = async (urlName, urlValue, description, course_id) =>{

    var sessionObject = JSON.parse(sessionStorage.getItem("sessionObject"));
    if (!sessionObject){
        return {value: true, message: "Please log in to post resource"}
    }
    if(!urlName.trim()){
        return {value:true, message: "URL name is empty"}
    }

    if(!urlValue.trim()){
        return {value:true, message: "URL is empty"}
    }

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlRegex.test(urlValue)) {
      return { value: true, message: "Invalid URL format" };
    }

try{

    const Resource = {
        resource_name: urlName,
        resource: urlValue,
        up: [sessionObject.userInfo.username],
        down: [""],
        course_id: course_id,
        description: description,
        user_id: sessionObject.userInfo.id,
        file: false,

    }

    await axios.post("http://localhost:3000/resources/add", Resource)

    return {value: false, message: ""}
} catch (error){
    console.log(error);
    return {value: true, message: "Server Error: failed to add resource, try again later"}
}


}

export const addFile = async (fileName, fileValue, description, course_id) =>{

    var sessionObject = JSON.parse(sessionStorage.getItem("sessionObject"));
    if (!sessionObject){
        return {value: true, message: "Please log in to post resource"}
    }
    if(!fileName.trim()){
        return {value:true, message: "URL name is empty"}
    }

    if(!fileValue.trim()){
        return {value:true, message: "URL is empty"}
    }

try{

    const Resource = {
        resource_name: fileName,
        resource: fileValue,
        up: [sessionObject.userInfo.username],
        down: [""],
        course_id: course_id,
        description: description,
        user_id: sessionObject.userInfo.id,
        file: true,

    }

    await axios.post("http://localhost:3000/resources/add", Resource)

    return {value: false, message: ""}
} catch (error){
    console.log(error);
    return {value: true, message: "Server Error: failed to add resource, try again later"}
}


}

const defaultExport = () =>{

}

export default defaultExport;