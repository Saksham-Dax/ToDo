import React, { useState } from 'react'
import './signup.css'
import HeadingComp from './HeadingComp'
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"
const Signup = () => {
    const history = useNavigate()
    const [Inputs, setInputs] = useState({
        email: "",
        username: "",
        password: "",
    });
    const change = (e) => {
        const {name, value} = e.target;
        setInputs({...Inputs, [name]: value});
    }
    
    const submit = async (e) => {
        e.preventDefault();
        // await axios.post(`http://127.0.0.1:1000/api/v1/signup`, Inputs)
        await axios.post(`${window.location.origin}/api/v1/signup`, Inputs)
        .then((response) => {
            if(response.data.message === "User Already Exists"){
                alert(response.data.message)
            }
            else{
                alert(response.data.message);
                setInputs({
                    email: "",
                    username: "",
                    password: "",
                });
                history("/signin")
            }
            
        })
        .catch((error) => {
            console.log(error.response.data); // Log the error response from the backend
        });
    }
    
    return (
        <div className='signup'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 column d-flex justify-content-center align-items-center">
                        <div className='d-flex flex-column w-75 p-3'>
                            <input
                                className='p-2 my-3 input-signup'
                                type="email"
                                placeholder='Enter Your Email'
                                name='email'
                                onChange={change}
                                value={Inputs.email}
                            />
                            <input
                                className='p-2 my-3 input-signup'
                                type="username"
                                placeholder='Enter Your Username'
                                name='username'
                                onChange={change}
                                value={Inputs.username}
                            />
                            <input
                                className='p-2 my-3 input-signup'
                                type="password"
                                placeholder='Enter Your Password'
                                name='password'
                                onChange={change}
                                value={Inputs.password}
                            />
                            <button className='btn-signup p-2' onClick={submit}>Sign Up</button>
                            <p className='text-info'>Already have an account? <span><Link className="text-danger" aria-current="page" to="/signin"> Sign in</Link></span></p>
                        </div>
                    </div>
                    
                    <div className="col-lg-4 column col-left d-lg-flex justify-content-center align-items-center d-none">
                        <HeadingComp first="Sign" second="Up" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
