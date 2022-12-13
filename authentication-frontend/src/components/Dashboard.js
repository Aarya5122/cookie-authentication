import { useState, useEffect } from "react";
import axios from "axios"

const Dashboard = () => {

    const [user, setUser] = useState({})

    const fetchUser = async () => {
        try {
            const response = await axios.get("https://cookie-auth-aarya.up.railway.app/dashboard", {withCredentials:true} )
            console.log(response);
            setUser(response.data.user)
        } catch (error) {
            console.log("Error in dashboard request!");
            console.log("Error: ", error);
        }
    }

    useEffect(()=>{
        fetchUser()
    }, [])

    return(
        <div className="border w-11/12 mx-auto p-2">
            <p className="text-xl text-center font-medium mb-4">Welcome to dashboard</p>
            <p><span className="font-medium">Name: </span>{user.name}</p>
            <p><span className="font-medium">Email: </span>{user.email}</p>
        </div>
    )
}

export default Dashboard