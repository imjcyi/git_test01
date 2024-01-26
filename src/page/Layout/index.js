import { Outlet } from "react-router-dom";
import { Button } from "antd-mobile";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBillList } from "@/store/modules/billStore";


const Layout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBillList())
    }, [dispatch])
    return (
        <div>
            Layout
            <Outlet />
            <Button color="primary">测试</Button>
        </div>
    )
}

export default Layout;