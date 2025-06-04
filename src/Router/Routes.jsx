import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home";
import AllPost from "../Pages/AllPost/AllPost";
import AddVolunteer from "../Pages/AddVolunteer/AddVolunteer";

export const Router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayouts,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'posts',
                Component: AllPost,
                loader: () => fetch('http://localhost:3000/posts')
            },
            {
                path: 'addVolunteer',
                Component: AddVolunteer
            },
        ]
    }
])