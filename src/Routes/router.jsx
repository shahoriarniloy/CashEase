import {
    createBrowserRouter,
  } from "react-router-dom";
import RouteNotFound from "./RouteNotFound";
import Main from "../Layout/Main";
import Login from '../Components/Login'
import Register from '../Components/Register'


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<RouteNotFound></RouteNotFound>,
      children: [
        {
            path: "/",
            element: <Login></Login>,
        },
        {
            path: "/register",
            element: <Register></Register>,
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