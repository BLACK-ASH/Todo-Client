import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import axios from "axios"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();

    // To Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // To Post The User Data To The Server

        axios.post('https://todo-server-ikof.onrender.com/api/login/', { email, password },{withCredentials:true})
        .then(response => {
            console.log('Success:', response.data)
            if(response.data.status === "success"){
                navigate("/dashboard")
            }
          
        })
        .catch(error => {
          if (error.response) {
            console.error('Server Response:', error.response.data);
          } else if (error.request) {
            console.error('No Response:', error.request);
          } else {
            console.error('Request Error:', error.message);
          }
        });
      
        // To Clear The Inputs
        setEmail("");
        setPassword("")
    }

    // To Handle Show
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <Navbar />
            <div className="max-w-sm mx-auto p-8 my-4 bg-white shadow-xl rounded-lg">
                <h1 className='text-3xl font-semibold my-3'>Login</h1>
                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="name@gmail.com"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-5 relative">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute bottom-[10px] right-2 focus:outline-none"
                        >
                            {showPassword ? (
                                <img src="/img/unhide.svg" alt="show" />
                            ) : (
                            <img src="/img/hide.svg" alt="hide" />
                            )}
                        </button>
                    </div>

                    <div>
                        <span>Don't have an account? <Link to="/register" className="text-blue-600 hover:underline dark:text-blue-500">Go To Register</Link></span>
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 my-4 w-full dark:focus:ring-blue-800"
                    >
                        Login
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};


export default Login