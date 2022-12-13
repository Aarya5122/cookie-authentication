import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post("http://localhost:4000/login", userDetails)
            console.log(response);
            setUserDetails({
                email: "",
                password: ""
            })
            navigate("/")
        } catch (error) {
            console.log("Error in login request!");
            console.log("Error: ", error);
        }
    }

    return(
        <div className="h-screen flex flex-col justify-center">
            <h1 className="text-lg font-semibold mx-auto mb-2 -mt-4">Login Page</h1>
            <form className="flex flex-col w-11/12 border gap-2 mx-auto py-3 rounded" onSubmit={handleSubmit}>
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
                <button className="border w-11/12 block mx-auto p-2 rounded bg-green-400">Login</button>
            </form>
        </div>
    )
}

export default Login