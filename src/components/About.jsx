import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const About = () => {
    return (
        <div>
            <Navbar />
            <div className="md:h-[calc(100vh-72px)] p-2 max-sm:mb-14 overflow-auto custom-scrollbar bg-gray-100 flex flex-col justify-center items-center">
                <div className=" mx-auto my-3  text-center p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="text-4xl  font-bold text-gray-900 mb-6">About Our To-Do App</h1>
                    <p className="text-lg text-gray-700 mb-4">
                        Welcome to the To-Do List App, your go-to solution for managing tasks and staying organized!
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                        This application was built with simplicity and efficiency in mind, allowing you to focus on what
                        matters most - getting things done. Whether you're managing your daily tasks, planning a project,
                        or just trying to keep track of your to-dos, our app provides the tools you need to stay on top of it all.
                    </p>
                    <div className="text-lg text-gray-700 mb-4">
                        Features include:
                        <ul className="list-disc list-inside mt-2 text-left mx-auto max-w-md">
                            <li>Easy task creation and management</li>
                            <li>Edit and delete tasks with ease</li>
                            <li>Mark tasks as complete to track your progress</li>
                            <li>Filter tasks by status: completed or pending</li>
                            <li>Secure user authentication and data storage</li>
                        </ul>
                    </div>
                    <p className="text-lg text-gray-700 mb-6">
                        We aim to continuously improve the app with new features and enhancements based on user feedback.
                        Thank you for choosing our To-Do List App to help you stay organized and productive!
                    </p>
                    <p className="text-lg text-gray-700">
                        For any questions, suggestions, or feedback, feel free to contact us at blackash.github@gmail.com
                    </p>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default About