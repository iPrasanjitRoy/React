import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'; 


const Login = (props) => {
    const host = "http://localhost:5000";
  

    const [credentials, setCredentials] = useState({email : "", password : ""}) 
    let navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();


        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}) 
        });
        const data = await response.json()
        console.log(data);  
        
        if (data.success) {
            localStorage.setItem('token', data.authtoken);
            props.showAlert("Sucessfully Login", "success");
            navigate("/");



        } else {
            props.showAlert("Invaild Credentials", "danger")

        }

    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div>


            <form onSubmit={handleSubmit}> 
                <div className="mb-3">

                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />

                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange}  id="password" name="password" />
                </div>



                <button type="submit" className="btn btn-primary" >Login</button>
            </form>



        </div>
    )
}

export default Login
