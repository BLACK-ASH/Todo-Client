import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import instance from '../api/axios_instance';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import Loader from './Loader';

const Register = () => {
    const [otp, setOtp] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [displayOtpBox, setDisplayOtpBox] = useState(false);
    const [otpSend, setOtpSend] = useState(true)
    const [timeLeft, setTimeLeft] = useState(120); // 120 seconds = 2 minutes
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();

    // To Handle Show
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    // Watch password and confirmPassword fields for custom validation
    const password = watch("password");
    const email = watch("email")

    // TO handle Otp


    const handleOtp = async () => {
        toast.success("Otp Sending")
        setOtpSend(false)
        try {
            await instance({
                url: "/register-otp/",
                method: "POST",
                data: { email },
            })
                .then((response) => {
                    // handle success
                    setOtpSend(true)
                    setDisplayOtpBox(true)
                    toast.success("Otp Send", {
                        position: "top-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
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
    // To Resend Otp
    const handleResendOtp = async () => {
        setIsDisabled(true);
        try {
            toast.success("Otp Sending")
            await instance({
                url: "/resend-otp/",
                method: "POST",
                data: { email },
            })
                .then((response) => {
                    // handle success
                    setTimeLeft(120);
                    setOtpSend(true)
                    setDisplayOtpBox(true)
                    toast.success("Otp Resend", {
                        position: "top-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
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

    // To Show Resend Otp
    useEffect(() => {
        if (timeLeft === 0) {
            setIsDisabled(false);
            return;
        }
        const timerId = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timerId);
    }, [timeLeft]);

    // To Format Time
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds} m`;
    };

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
                    toast.success(response.data, {
                        position: "top-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setDisplayOtpBox(false)
                });
        } catch (error) {
            // handle error
            if (error.response) {
                console.error('Server Response:', error.response.data);
                toast.error(error.response.data, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else if (error.request) {
                console.error('No Response:', error.request);
            } else {
                console.error('Request Error:', error.message);
            }
        }
    }

    // To Handle Submit
    const onSubmit = async (data) => {
        if (emailVerified) {
            try {
                await instance({
                    url: "register/",
                    method: "POST",
                    data: data,
                }).then((response) => {
                    // handle success
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem("username", response.data.payload.username);
                    toast.success("Registration Successful", {
                        position: "top-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    if (response.data.status === "success") {
                        setEmailVerified(false);
                        setTimeout(() => {
                            navigate("/");
                        }, 1500);
                    }
                });
            } catch (error) {
                // handle error
                if (error.response) {
                    console.error('Server Response:', error.response.data);
                    toast.error(error.response.data.message, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else if (error.request) {
                    console.error('No Response:', error.request);
                } else {
                    console.error('Request Error:', error.message);
                }
            }
        };
    }



    return (
        <>
            <Navbar />
            {isSubmitting && <Loader />}
            {!otpSend && <Loader />}
            <div className={`${displayOtpBox ? "block" : "hidden"} max-w-sm mx-auto p-8 my-4 bg-white shadow-xl rounded-lg`}>
                <h3 className='text-2xl text-center my-1' >Otp Verfication</h3>
                <p className=' my-2' >Enter the OTP sent to <span className='font-bold text-blue-600 ' >{email}</span></p>
                <label htmlFor="Otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Otp</label>
                <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" id="otp" name='otp' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Otp" required />
                <button
                    type="button"
                    onClick={handleOtpSubmit}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 my-2 w-full dark:focus:ring-blue-800">Verify Otp</button>
                <div className='flex justify-between items-center' >
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 my-2 w-fit dark:focus:ring-blue-800" onClick={() => setDisplayOtpBox(false)}>Go Back</button>
                    {isDisabled ?
                        <p>Resend Otp in <span className='font-bold text-red-600 ' >{formatTime(timeLeft)}</span></p>
                        :
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 my-2 w-fit dark:focus:ring-blue-800" onClick={handleResendOtp} >Resend Otp</button>
                    }

                </div>
            </div>
            <div className={`${displayOtpBox ? "hidden" : "block"} max-w-sm  mx-auto p-8 my-4 bg-white shadow-xl rounded-lg`}>
                <h1 className='text-3xl font-semibold my-3' >Register</h1>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="mb-1">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input disabled={emailVerified} name='email'  {...register("email", { required: true })} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@gmail.com" required />
                    </div>
                    {
                        emailVerified ?
                            <span className="text-green-600 text-sm font-semibold rounded-md" >Email Verified !</span>
                            :
                            <button
                                type="button"
                                onClick={handleOtp}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 mb-2 w-full dark:focus:ring-blue-800">Verify Email
                            </button>
                    }


                    <div className="mb-5">
                        <label htmlFor="Username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input name='username' {...register("username", { required: true, maxLength: { value: 12, message: "Maximum 12 Character Allowed" }, minLength: { value: 5, message: "Username Must Be Atleast 5 Character" } })} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Username" required autoComplete='name' />
                        {errors.username && (
                            <span className="text-red-600 text-sm font-semibold  p-2 rounded-md">
                                {errors.username.message}
                            </span>
                        )}
                    </div>
                    <div className="mb-5 relative">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...register("password", {
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/i,
                                    message:
                                        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
                                },
                                validate: {
                                    noSpaces: (value) => !/\s/.test(value) || "Password must not contain spaces.",
                                },
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long.",
                                },
                                maxLength: {
                                    value: 12,
                                    message: "Password cannot be more than 12 characters long.",
                                },
                            })}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            required
                        />

                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute top-9 right-2 focus:outline-none"
                        >
                            {showPassword ? (
                                <img src="/img/unhide.svg" alt="show" />
                            ) : (
                                <img src="/img/hide.svg" alt="hide" />
                            )}
                        </button>
                        {errors.password && (
                            <span className="text-red-600 text-sm font-semibold  p-2 rounded-md">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    <div className="mb-5">
                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <input name='confirmPassword'  {...register("confirmPassword",
                            {
                                required: true, maxLength: { value: 12, message: "Maximum 12 Character Allowed" },
                                minLength: { value: 8, message: "Password Must Be Atleast 8 Character" },
                                validate: value => value === password || "Passwords do not match"
                            })} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        {errors.confirmPassword && (
                            <span className="text-red-600 text-sm font-semibold  p-2 rounded-md">
                                {errors.confirmPassword.message}
                            </span>
                        )}
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
                    <button type="submit" disabled={isSubmitting} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 my-4  w-full dark:focus:ring-blue-800">Register</button>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default Register