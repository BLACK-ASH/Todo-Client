import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [display, setDisplay] = useState(true);
  const navigate = useNavigate();

  const signOut = () => {
    // Sign-out request
    toast.info('Signed out successfully!');
    localStorage.clear()
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/img/favicon.ico" className="h-8" alt="Flowbite Logo" />
          <img src="/img/logo.png" className="h-8" alt="Flowbite Logo" />
        </div>
        <button
          onClick={() => setDisplay(!display)}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={display ? "false" : "true"}
        >
          <span className="sr-only">Open main menu</span>
          {display ? (
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          )}
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 items-center md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded  ${isActive ? ' text-blue-700' : 'text-gray-900'}`
                }
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded  ${isActive ? ' text-blue-700' : 'text-gray-900'}`
                }
                aria-current="page"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded  ${isActive ? ' text-blue-700' : 'text-gray-900'}`
                }
                aria-current="page"
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded  ${isActive ? ' text-blue-700' : 'text-gray-900'}`
                }
                aria-current="page"
              >
                Profile
              </NavLink>
            </li>
            {localStorage.getItem("token") ?
              <li>
                <button onClick={signOut} className="p-1 px-2 bg-red-500 text-white rounded">
                  Sign out
                </button>
              </li>
              :
              ""
            }

          </ul>
        </div>
        <div
          className={`${display ? 'hidden' : 'block'} w-full md:hidden md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded  ${isActive ? ' text-blue-700' : 'text-gray-900'}`
                }
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded  ${isActive ? ' text-blue-700' : 'text-gray-900'}`
                }
                aria-current="page"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded  ${isActive ? ' text-blue-700' : 'text-gray-900'}`
                }
                aria-current="page"
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded  ${isActive ? ' text-blue-700' : 'text-gray-900'}`
                }
                aria-current="page"
              >
                Profile
              </NavLink>
            </li>
            {localStorage.getItem("token") ?
              <li>
                <button onClick={signOut} className="p-1 px-2 bg-red-500 text-white rounded">
                  Sign out
                </button>
              </li>
              :
              ""
            }
          </ul>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </nav>
  );
};

export default Navbar;
