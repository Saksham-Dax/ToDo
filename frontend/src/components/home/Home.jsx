import React from 'react'
import "./home.css"
const Home = () => {
  return (
    <div className='home d-flex justify-content-center align-items-center'>
        <div className="container">
            <h1>
                Organise Your <br/> Work and life, Easily.
            </h1>
            <p> Become focused, organised and calm with <br/>
            ToDo app. Manage your task here</p>
            <button className='home-btn p-2'>Make ToDo List</button>
        </div>
    </div>
  )
}

export default Home
