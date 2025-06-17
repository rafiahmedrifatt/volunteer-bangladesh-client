import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home";
import AllPost from "../Pages/AllPost/AllPost";
import AddVolunteer from "../Pages/AddVolunteer/AddVolunteer";
import PostDetails from "../Pages/PostDetails/PostDetails";
import MyNeededPost from "../Pages/MyPosts/MyNeededPost";
import MyApplications from "../Pages/MyPosts/MyApplications";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

export const Router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayouts,
        errorElement: <ErrorPage />,
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
                Component: AllPost
            },
            {
                path: 'addVolunteerPosts',
                element:
                    <PrivateRoute>
                        <AddVolunteer />
                    </PrivateRoute>
            },
            {
                path: 'posts/:id',
                element: <PrivateRoute><PostDetails /></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:3000/posts/${params.id}`)
            },
            {
                path: 'neededPosts',
                element: <PrivateRoute><MyNeededPost /></PrivateRoute>
            },
            {
                path: 'applications',
                element: <PrivateRoute><MyApplications /></PrivateRoute>
            }
        ]
    }
])