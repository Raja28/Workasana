
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import 'bootstrap/dist/css/bootstrap.css';
// import "bootstrap/dist/js/bootstrap.min.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// import "bootstrap-icons/font/bootstrap-icons.css";


import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import VerifyOTP from './pages/VerifyOTP.jsx';
import { Toaster } from 'react-hot-toast';

import OpenRoute from './components/core/auth/OpenRoute.jsx';
import PrivateRoute from './components/core/auth/PrivateRoute.jsx';
import MyProfile from './pages/MyProfile.jsx';
import Dashboard from './pages/Dashboard.jsx';
import TaskDetails from './pages/TaskDetails.jsx';
import AddTask from './pages/AddTask.jsx';
import Report from './pages/Report.jsx';
import Layout from './Layout.jsx';

const router = createBrowserRouter([

  { path: '/', element: <OpenRoute><App /></OpenRoute> },
  {
    path: "/", element: <Layout />, children: [
      { path: "/login", element: <OpenRoute> <Login /> </OpenRoute> },
      { path: "/signup", element: <OpenRoute> <Signup /> </OpenRoute> },
      { path: "/signup/verification/", element: <OpenRoute><VerifyOTP /></OpenRoute> },
      { path: "/dashboard/taskDetails/:taskId/", element: <PrivateRoute> <TaskDetails /></PrivateRoute> },
      { path: "/dashboard/", element: <PrivateRoute><Dashboard /></PrivateRoute> },
      { path: "/dashboard/profile/", element: <PrivateRoute> <MyProfile /></PrivateRoute> },

      { path: "/dashboard/addTask/", element: <AddTask /> },
      { path: "/dashboard/updatetask/:taskId/", element: <AddTask /> },
      { path: "/dashboard/report", element: <Report /> },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>

    <Toaster position='top-center' />
    <RouterProvider router={router}>
    </RouterProvider>

  </Provider>
)
