import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import instance from '../api/axios_instance';

const Profile = () => {
    const [profile, setProfile] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {

            try {
                await instance({
                    // url of the api endpoint (can be changed)
                    url: "/user/profile/",
                    method: "GET",
                }).then((response) => {
                    // handle success
                    const userInfo = response.data;
                    setProfile(userInfo);
                });
            } catch (error) {
                // handle error
                console.error(error);
                alert("Login Required To See Profile")
                navigate("/login")
            }
        }
        getData()
    }, []);

    const signOut = () => {
        // Sign-out request
        localStorage.clear()
        navigate("/")
    }

    return (
        <div>
            <Navbar />
            <div className="flex flex-col justify-center  items-center h-[calc(100vh-72px)] bg-gradient-to-r bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Profile Details</h3>
                        <ul className="text-gray-700">
                            <li className="flex justify-between border-b py-2">
                                <span>User ID:</span>
                                <span>{profile.id}</span>
                            </li>
                            <li className="flex justify-between border-b py-2">
                                <span>Username:</span>
                                <span>{profile.username}</span>
                            </li>
                            <li className="flex justify-between border-b py-2">
                                <span>Email:</span>
                                <span>{profile.email}</span>
                            </li>
                            <li className="flex justify-between border-b py-2">
                                <span>Total Tasks:</span>
                                <span>{profile.totalTask}</span>
                            </li>
                            <li className="flex justify-between border-b py-2">
                                <span>Tasks Completed:</span>
                                <span>{profile.taskCompleted}</span>
                            </li>
                            <li className="flex justify-between py-2">
                                <span>Tasks Remaining:</span>
                                <span>{profile.taskRemaining}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <button onClick={signOut} className="mt-4 p-2 bg-red-500 text-white rounded">Sign out</button>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;
