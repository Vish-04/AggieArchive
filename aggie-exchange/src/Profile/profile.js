import axios from 'axios';
import bcrypt from 'bcryptjs'

export const updateUsername = async(oldUsername, newUsername) => {
    let user;

    // validation checks
    if (!newUsername.trim()) {
        return {value: true, message: "Error: username cannot be empty"};
    }

    // see if username exists
    try{
        user = await axios.get('http://localhost:3000/users/'+newUsername,{
            headers: {
              'Access-Control-Allow-Origin': 'http://127.0.0.1:5173'
            }
          });
    } catch (error) {
        return {value: true, message:"Error: unable to crosscheck username"};
    }

    if(user.data != null){
        return {value: true, message:"Error: Username already exists"}
    }

    try{

        user = await axios.get('http://localhost:3000/users/'+oldUsername,{
            headers: {
              'Access-Control-Allow-Origin': 'http://127.0.0.1:5173'
            }
          });

        await axios.post('http://localhost:3000/users/update/'+user.data._id,{
            username: newUsername,
            password: null,
            headers: {
              'Access-Control-Allow-Origin': 'http://127.0.0.1:5173'
            }
        });


        console.log("CLEARING AND CREATING SESSION OBJECT")
        sessionStorage.clear()
        var now = new Date();
        var expires = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes from now
        var sessionObject = {
        expiresAt: expires,
        userInfo: {
            username: newUsername,
            id: user.data._id,
            }
        }
        sessionStorage.setItem('sessionObject', JSON.stringify(sessionObject));

        return {value:false, message:""}

    } catch (error){
        console.log(error)
        return {value: true, message:"Error: unable to update username"};
    }

}


export const updatePassword = async(username, oldPassword, newPassword, confirmPassword) => {
    let user;

    // see if username exists
    try{
        user = await axios.get('http://localhost:3000/users/'+username,{
            headers: {
              'Access-Control-Allow-Origin': 'http://127.0.0.1:5173'
            }
          });
    } catch (error) {
        return {value: true, message:"Error: unable to crosscheck username"};
    }

    // validation checks
    if (!oldPassword.trim()) {
        return {value: true, message: "Error: old password cannot be empty"};
    }

    if (newPassword.length < 8) {
        return {value: true, message: "Error: new password must be at least 8 characters long"};
    }
    
    if (!confirmPassword.trim()) {
        return {value: true, message: "Error: confirm password cannot be empty"};
    }

    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(newPassword)) {
        return {value: true, message: "Error: new password must contain at least one uppercase letter, one lowercase letter, and one number"};
    }

    if (confirmPassword == newPassword){
        try{

            if (bcrypt.compareSync(oldPassword, user.data.password)){
                console.log("INSIDE COMPARE")
                try {
                    const hashedPassword = bcrypt.hashSync(newPassword, 10);
                    await axios.post('http://localhost:3000/users/update/'+user.data._id,{
                        username: null,
                        password: hashedPassword,
                        headers: {
                        'Access-Control-Allow-Origin': 'http://127.0.0.1:5173'
                        }
                    });
                    var now = new Date();
                    var expires = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes from now
                    var sessionObject = {
                    expiresAt: expires,
                    userInfo: {
                        username: user.data.username,
                        id: user.data._id,
                        }
                    }
                    sessionStorage.setItem('sessionObject', JSON.stringify(sessionObject));
                    
                } catch (error){
                    return {value: true, message:"Error: unable to update pass"};
                }
                
                return{value:false, message:""}
            } else{
                return {value:true, message:"Error: Old Password does not match"}
            }


        } catch (error){

            return {value: true, message:"Error: unable to update username"};

        }
    } else{

        return {value: true, message: "Error: confirm password and password do not match"}

    }
}

export const deleteUser = async (user_id) =>{

    try{
        await axios.get("http://localhost:3000/users/delete/"+user_id)
        console.log("USER DELETED")
    } catch (error){
        console.log("UNABLE TO DELTE USER: ", error);
    }

}