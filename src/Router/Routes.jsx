import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";

export const Router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayouts,
    }
])