import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import instance from '../api/axios_instance';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import Loader from './Loader';

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [otpSend, setOtpSend] = useState(false)
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();

   // Watch password and confirmPassword fields for custom validation
   const password = watch("resetPassword");
   const email = watch("email")
    // To handle Show
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // To Handle Otp
    const handleChangePasswordOtp = async () => {
        setOtpSend(true)
        try {
            await instance({
                url: "/reset-password-otp/",
                method: "POST",
                data:{ email},
            })
                .then(async (response) => {
                    // handle success
                    toast.success("Otp Send");
                    setOtpSend(false)
                });
        } catch (error) {
            // handle error
            if (error.response) {
                console.error('Server Response:', error.response.data);
                toast.error(error.response.data.message);
            } else if (error.request) {
                console.error('No Response:', error.request);
            } else {
                console.error('Request Error:', error.message);
            }
        }
    }

    // To Handle Submit
    const onSubmit = async (data) => {
        try {
            await instance({
                url: "/reset-password/",
                method: "POST",
                data: data,
            })
                .then(async (response) => {
                    // handle success
                    toast.success("Password changed successfully");
                    setTimeout(() => {
                        navigate("/login");
                    }, 1500);
                });
        } catch (error) {
            // handle error
            if (error.response) {
                console.error('Server Response:', error.response.data);
                toast.error(error.response.data.message);
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
            {otpSend && <Loader />}
            {isSubmitting && <Loader />}
            <div className=" max-w-sm  mx-auto p-8 my-4 bg-white shadow-xl rounded-lg">

                <h1 className="text-2xl font-bold mb-4" >Change Password</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-1">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input name='email'  {...register("email", { required: true })} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@gmail.com" required />
                    </div>
                    <button
                        type="button"
                        onClick={handleChangePasswordOtp}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 mb-2 w-full dark:focus:ring-blue-800">Verify Email
                    </button>
                    <input {...register("otp", { required: true })} type="text" id="otp" name='otp' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Otp" required />
                    <div className="mb-5 relative">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...register("resetPassword", {
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
                    <button type="submit" disabled={isSubmitting} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 my-4  w-full dark:focus:ring-blue-800">Change Password</button>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default ChangePassword