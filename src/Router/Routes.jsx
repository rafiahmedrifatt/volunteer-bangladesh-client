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
                Component: AllPost
            },
            {
                path: 'addVolunteerPosts',
                Component: AddVolunteer
            },
            {
                path: 'posts/:id',
                Component: PostDetails,
                loader: ({ params }) => fetch(`http://localhost:3000/posts/${params.id}`)
            },
            {
                path: 'neededPosts',
                Component: MyNeededPost,
            },
            {
                path: 'applications',
                Component: MyApplications
            }
        ]
    }
])