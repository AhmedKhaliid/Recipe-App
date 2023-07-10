
import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import {QueryClient,QueryClientProvider} from "react-query";

const queryClient = new QueryClient();
const Root = () => {

    return <QueryClientProvider client={queryClient}>
    <Stack height={'100vh'}>
        <Nav />
        <Outlet />
    </Stack>
    </QueryClientProvider>
}
export default Root;