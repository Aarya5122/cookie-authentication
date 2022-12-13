import { useState } from "react"
import axios from "axios"

const Signup = () => {

    const [userDetails, setUserDetails] = useState({
        name:"",
        email: "",
        password: ""
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post("http://localhost:4000/register", userDetails, {withCredentials: true})
            console.log(response);
            setUserDetails({
                name:"",
                email: "",
                password: ""
            })
        } catch (error) {
            console.log("Error in registration request!");
            console.log("Error: ", error);
        }
    }

    return(
        <div className="h-screen flex flex-col justify-center">
            <h1 className="text-lg font-semibold mx-auto mb-2 -mt-4">Signup Page</h1>
            <form className="flex flex-col w-11/12 border gap-2 mx-auto py-3 rounded" onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <input className="border w-11/12 block mx-auto px-2 py-1" type="text" name="name" id="name" placeholder="Enter user name"
                    value={userDetails.name}
                    onChange={(event)=>setUserDetails({...userDetails, name:event.target.value})}/>
                </label>
                <label htmlFor="email">
                    <input className="border w-11/12 block mx-auto px-2 py-1" type="email" name="email" id="email" placeholder="Enter user email"
                    value={userDetails.email}
                    onChange={(event)=>setUserDetails({...userDetails, email:event.target.value})}/>
                </label>
                <label htmlFor="password">
                    <input className="border w-11/12 block mx-auto px-2 py-1" type="password" name="password" id="password" placeholder="Enter password"
                    value={userDetails.password}
                    onChange={(event)=>setUserDetails({...userDetails, password:event.target.value})}/>
                </label>
                <button className="border w-11/12 block mx-auto p-2 rounded bg-green-400">Create Account</button>
            </form>
        </div>
    )
}

export default Signup