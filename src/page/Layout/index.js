import { Outlet } from "react-router-dom";
import { Button } from "antd-mobile";
const Layout = () => {
    return (
        <div>
            Layout
            <Outlet />
            <Button color="primary">测试</Button>
        </div>
    )
}

export default Layout;