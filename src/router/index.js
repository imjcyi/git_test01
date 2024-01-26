import Layout from "@/page/Layout";
import Month from "@/page/Month";
import Year from "@/page/Year";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Month />,
            },
            {
                path: "year",
                element: <Year />,
            }
        ]
    }
])

export default router;