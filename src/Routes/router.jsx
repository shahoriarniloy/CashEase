import {
    createBrowserRouter,
  } from "react-router-dom";
import RouteNotFound from "./RouteNotFound";
import Main from "../Layout/Main";
import Login from '../Components/Login'
import Register from '../Components/Register'
import UserHome from '../Components/UserHome'
import Dashboard from "../Components/Dashboard";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<RouteNotFound></RouteNotFound>,
      children: [
        {
            path: "/",
            element: <Dashboard></Dashboard>,
        },
        {
            path: "/register",
            element: <Register></Register>,
        },
        {
          path: "/login",
          element: <Login></Login>,
      },
        
      ]
    },
    // {
    //     path:'/dashboard',
    //     element: <Dashboard></Dashboard>,
    //     children:[
    //         {
    //             path:'/dashboard',
    //             element:<Login></Login>
    //         },
           
            
           
            
           
    //     ]

    // }
  ]);