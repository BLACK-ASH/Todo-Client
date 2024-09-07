import { useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Link } from 'react-router-dom';
import axios from "axios"


function App() {
  const [Username, setUsername] = useState('');

  useEffect(() => {
    axios.get('https://todo-server-ikof.onrender.com/api/user/profile/', { withCredentials: true })
      .then((response) => {
        const userInfo = response.data.username;
        setUsername(userInfo)
      })
      .catch((err) => {

      })
  }, []);


  return (
    <>
      <Navbar />

      <div className="md:h-[calc(100vh-72px)] p-2 max-sm:mb-14 overflow-auto custom-scrollbar bg-gray-100 flex flex-col justify-center items-center">
        <div className="max-w-4xl  my-3  mx-auto text-center p-8 bg-white shadow-lg rounded-lg max-sm:m-2 ">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">Welcome to Your To-Do List App
            <p className=' text-blue-600'  >{Username}</p>
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Organize your tasks, boost your productivity, and never miss a deadline. Register or log in to start managing your to-do list!
          </p>
          {
            Username ?
              <div className="flex justify-center space-x-4">
                <Link to="/dashboard" className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-700">
                  Dashboard
                </Link>
              </div>
              :
              <div className="flex justify-center space-x-4">
                <Link to="/login" className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-700">
                  Log In
                </Link>
                <Link to="/register" className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-green-700">
                  Sign Up
                </Link>
              </div>
          }

        </div>

        <div className="mt-12 px-2 py-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Task Management</h3>
              <p className="text-gray-700">
                Add, edit, delete, and mark tasks as complete with ease.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Stay Organized</h3>
              <p className="text-gray-700">
                Filter your tasks by status: completed or pending.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Secure Storage</h3>
              <p className="text-gray-700">
                Your tasks are securely saved in our database, accessible only to you.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
