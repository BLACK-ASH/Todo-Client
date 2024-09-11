import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import instance from '../api/axios_instance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaSave } from 'react-icons/fa';


const Profile = () => {
    const [profile, setProfile] = useState({});
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [isEditing, setIsEditing] = useState(true);
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
                    setUsername(userInfo.username);
                    toast.success('Profile loaded successfully!');
                });
            } catch (error) {
                // handle error
                console.error(error);
                toast.error('Failed to load profile. Please log in.');
                localStorage.clear()
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }
        }
        getData()
    }, []);

    const signOut = () => {
        // Sign-out request
        toast.info('Signed out successfully!');
        localStorage.clear()
        setTimeout(() => {
            navigate("/");
        }, 3000);
    }

    const handleSave = async () => {
        setIsEditing(!isEditing);
        if(profile.username === username) return;
        if (username.trim() === '') return;
        try {
            await instance({
                // url of the api endpoint (can be changed)
                url: "/user/profile/",
                method: "PUT",
                data: { username: username },
            }).then((response) => {
                // handle success
                toast.success('Profile Updated successfully!');
            });
        } catch (error) {
            // handle error
            console.error(error);
            toast.error('Failed to update profile.');
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="flex flex-col justify-center  items-center h-[calc(100vh-72px)] bg-gradient-to-r bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                    <div className="mt-6">
                        <div className="flex justify-between">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Profile Details</h3>
                            {isEditing ?
                                <FaEdit onClick={() => setIsEditing(!isEditing)} />
                                :
                                <FaSave onClick={handleSave} />
                            }
                        </div>
                        <ul className="text-gray-700">
                            <li className="flex justify-between border-b py-2">
                                <span>User ID:</span>
                                <span>{profile.id}</span>
                            </li>
                            <li className="flex justify-between border-b py-2">
                                <span>Username:</span>
                                <input className={`${isEditing ? "" :'border border-blue-500' } bg-transparent text-end`} type="text" autoFocus disabled={isEditing} onChange={(e) => setUsername(e.target.value)} value={username} />
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
