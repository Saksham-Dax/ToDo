import React, { useCallback, useEffect, useState } from 'react'
import "./todo.css"
import TodoCards from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';
// import { useDispatch, useSelector } from 'react-redux';
// import { authActions } from '../../store';
import axios from 'axios';

let id = sessionStorage.getItem("id");
let toUpdateArray = [];
const Todo = () => {
    const [Inputs, setInputs] = useState({ title: "", body: "" });
    const [Array, setArray] = useState([]);


    const show = () => {
        document.getElementById("textarea").style.display = "block";
    };

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    };

    const submit = useCallback( async () => {
        if (Inputs.title === "" || Inputs.body === "") {
            toast.error("Title OR Body is missing !");
        }
        else {
            if (id) {
                await axios
                    // .post("http://127.0.0.1:1000/api/v2/addTask", {
                    .post(`${window.location.origin}/api/v2/addTask`, {
                        title: Inputs.title,
                        body: Inputs.body,
                        id: id,
                    })
                    .then((response) => {
                        console.log(response);
                    });

                setInputs({ title: "", body: "" });
                toast.success("Your Task is ADDED.");
            } else {
                setArray([...Array, Inputs]);
                setInputs({ title: "", body: "" });
                toast.success("Your Task is ADDED.");
                toast.error("Sign In to save it !");
            }

        }
    }, [Inputs, Array]);

    const del = async (Cardid) => {
        if(id){
            await axios
            // .delete(`http://127.0.0.1:1000/api/v2/deleteTask/${Cardid}`, {
            .delete(`${window.location.origin}/api/v2/deleteTask/${Cardid}`, {
                data: { id: id },
            })
            .then(() => {
                toast.success("Your Task is DELETED.");
            });
        }
        else {
            toast.error("SignUp to delete");
        }
    };

    const dis = (value) => {
        document.getElementById("todo-update").style.display = value;
    }

    const update = (value) => {
        toUpdateArray= Array[value];
    }

    useEffect(() => {
        if(id){
            const fetch = async () => {
                await axios
                    // .get(`http://127.0.0.1:1000/api/v2/getTask/${id}`)
                    .get(`${window.location.origin}/api/v2/getTask/${id}`)
                    .then((response) => {
                        setArray(response.data.list);
                    });
            };
            fetch();
        }
    }, [submit]);
    return (
        <>
            <div className='todo'>
                <ToastContainer />
                <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
                    <div className='d-flex flex-column todo-inputs-div w-100 p-1'>
                        <input
                            type="text"
                            placeholder='TITLE'
                            className='my-2 p-2 todo-inputs'
                            onClick={show}
                            name='title'
                            value={Inputs.title}
                            onChange={change}
                        />
                        <textarea
                            id='textarea'
                            type="text"
                            placeholder='BODY'
                            className='my-2 p-2 todo-inputs'
                            name='body'
                            value={Inputs.body}
                            onChange={change}
                        />
                    </div>
                    <div className="w-lg-50 w-100 d-flex justify-content-end mt-2">
                        <button className="home-btn px-2 py-1 fs-5" onClick={submit}>Add</button>
                    </div>
                </div>
                <div className="todo-body">
                    <div className="container-fluid">
                        <div className="row">
                            {Array &&
                                Array.map((item, index) => (
                                    <div className="col-lg-3 col-11 mx-lg-5 mx-3 my-2" key={index}>
                                        <TodoCards
                                            title={item.title}
                                            body={item.body}
                                            id={item._id}
                                            delid={del}
                                            display={dis}
                                            updateId={index}
                                            toBeUpdate={update}
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="todo-update" id='todo-update'>
                <div className="container update">
                    <Update display={dis} update ={toUpdateArray} />
                </div>
            </div>
        </>
    )
}

export default Todo