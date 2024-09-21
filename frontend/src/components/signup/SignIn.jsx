import React, { useState } from 'react'
import './signup.css'
import HeadingComp from './HeadingComp'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authActions } from '../../store'
import { useDispatch } from 'react-redux'

const SignIn = () => {
    const dispatch = useDispatch();
    const history = useNavigate()
    const [Inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const change = (e) => {
        const {name, value} = e.target;
        setInputs({...Inputs, [name]: value});
    }
    
    const submit = async (e) => {
        e.preventDefault();
        // await axios.post(`http://127.0.0.1:1000/api/v1/signin`, Inputs)
        await axios.post(`${window.location.origin}/api/v1/signin`, Inputs)
        .then((response) => {
            sessionStorage.setItem("id", response.data.others._id);
            dispatch(authActions.login());
            history("/todo");
        })
        .catch((error) => {
            console.log(error.response.data); // Log the error response from the backend
        });
    }
    return (
        <div>
            <div className='signup'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 column col-left d-none d-lg-flex justify-content-center align-items-center">
                            <HeadingComp first="Sign" second="In" />
                        </div>
                        <div className="col-lg-8 column d-flex justify-content-center align-items-center">
                            <div className='d-flex flex-column w-100 p-3'> 
                                <input 
                                className='p-2 my-3 input-signup' 
                                type="email" 
                                placeholder='Enter Your Email' 
                                name='email' 
                                value={Inputs.email}
                                onChange={change}
                                />

                                <input 
                                className='p-2 my-3 input-signup' 
                                type="password" 
                                placeholder='Enter Your Password' 
                                name='password' 
                                value={Inputs.password}
                                onChange={change}
                                />

                                <button className='btn-signup p-2' onClick={submit}>Sign In</button>

                                <p className='text-info'>Don't have an account yet ?<span><Link className="text-danger" aria-current="page" to="/signup"> Create one.</Link></span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
