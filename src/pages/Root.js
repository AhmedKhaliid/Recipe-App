
import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const Root = () => {

    return <Stack height={'100vh'}>
        <Nav />
        <Outlet />
    </Stack>
}
export default Root;