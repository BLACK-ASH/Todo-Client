import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import axios from 'axios';
import instance from '../api/axios_instance';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [username, setUsername] = useState("");
    const [otp, setOtp] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // To Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            console.info({ email, password, repeatPassword, username });
            //   To Post The User Data To The Server
            if (emailVerified) {
                if (username.length >= 5) {
                    if (password.length <= 12) {
                        if (password.length >= 8) {
                            try {
                                await instance({
                                    url: "register/",
                                    method: "POST",
                                    data: { email, username, password },
                                })
                                    .then((response) => {
                                        // handle success
                                        console.log('Success:', response.data)
                                        if (response.data.status === "success") {
                                            alert("Registration Successfull")
                                            navigate("/")
                                        }
                                    });
                            } catch (error) {
                                // handle error
                                if (error.response) {
                                    console.error('Server Response:', error.response.data);
                                } else if (error.request) {
                                    console.error('No Response:', error.request);
                                } else {
                                    console.error('Request Error:', error.message);
                                }
                            }

                            // To Clear The Inputs
                            setEmail("");
                            setPassword("");
                            setRepeatPassword("");
                            setUsername("")
                            setEmailVerified(false)
                        }
                        else {
                            alert("Password Must Be Atleast 8 Characters")
                        }
                    }
                    else {
                        alert("Password Cannot Be Above 12 Characters")
                    }
                }
                else {
                    alert("Username Must Be Atleast 5 Characters")
                }
            }
            else {
                alert("Email Not Verified")
            }
        }
        else {
            return alert("Password Not Match");
        }
    }

    // To Handle Show
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // TO handle Otp
    const handleOtp = async () => {

        try {
            await instance({
                url: "/register-otp/",
                method: "POST",
                data: { email },
            })
                .then((response) => {
                    // handle success
                    console.log('Success:', response.data)
                    alert(`otp send to your email ${email}`)
                });
        } catch (error) {
            // handle error
            if (error.response) {
                console.error('Server Response:', error.response.data);
            } else if (error.request) {
                console.error('No Response:', error.request);
            } else {
                console.error('Request Error:', error.message);
            }
        }
    }
    // To Verifiy Otp
    const handleOtpSubmit = async () => {

        try {
            await instance({
                url: "/verify-otp/",
                method: "POST",
                data: { email, otp },
            })
                .then((response) => {
                    // handle success
                    setEmailVerified(true)
                    alert(response.data)
                });
        } catch (error) {
            // handle error
            if (error.response) {
                console.error('Server Response:', error.response.data);
                alert(error.response.data)
            } else if (error.request) {
                console.error('No Response:', error.request);
            } else {
                console.error('Request Error:', error.message);
            }
        }
    }


    return (
        <>
            <Navbar />

            <div className="max-w-sm  mx-auto p-8 my-4 bg-white shadow-xl rounded-lg">
                <h1 className='text-3xl font-semibold my-3' >Register</h1>
                <form onSubmit={handleSubmit} >
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input name='email' value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@gmail.com" required />
                    </div>
                    <button
                        type="button"
                        onClick={handleOtp}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 mb-2 w-full dark:focus:ring-blue-800">Verify Email</button>
                    <div className="mb-5">
                        <label htmlFor="Otp" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Otp Verification</label>
                        <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" id="otp" name='otp' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Otp" required />
                        <button
                            type="button"
                            onClick={handleOtpSubmit}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 my-2 w-full dark:focus:ring-blue-800">Verify Otp</button>
                    </div>



                    <div className="mb-5">
                        <label htmlFor="Username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input name='username' value={username} onChange={(e) => setUsername(e.target.value)} type="text" id="Username" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Username" required autoComplete='name' />
                    </div>
                    <div className="mb-5 relative">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name='password'
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
                    <div className="mb-5">
                        <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                        <input name='password' value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} type="text" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                    </div>
                    <div className="flex items-start mb-5">
                        <div className="flex items-center h-5">
                            <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                        </div>
                        <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <Link to="/terms-and-conditions" className="text-blue-600 hover:underline dark:text-blue-500">Terms and Conditions</Link> </label>
                    </div>
                    <div>
                        <span>Already have a account ?<Link to="/login" className="text-blue-600 hover:underline dark:text-blue-500">Go To Login</Link>  </span>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 my-4  w-full dark:focus:ring-blue-800">Register new account</button>
                </form>
            </div>
            <Footer />
        </>

    )
}

export default Register