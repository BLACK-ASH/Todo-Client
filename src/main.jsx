import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import TermsAndConditions from './components/TermsAndConditions';
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import About from './components/About.jsx';
import Profile from './components/Profile.jsx';
import Dashboard from './components/Dashboard.jsx'; 

const sampleProfileData = {
  username: 'john_doe',
  id: '123456',
  email: 'john.doe@example.com',
  totalTasks: 10,
  tasksCompleted: 6,
  tasksRemaining: 4,
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/terms-and-conditions',
    element: <TermsAndConditions />,
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/about',
    element: <About/>,
  },
  {
    path: '/profile',
    element: <Profile profileData={sampleProfileData}/>,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
