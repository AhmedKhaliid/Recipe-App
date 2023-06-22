
import { Stack, Typography } from "@mui/material";
import { SlNotebook } from 'react-icons/sl';

const Home = () => {
    return <Stack>
        <Stack direction={'row'} justifyContent={'center'} paddingTop={'40px'} >
            <Stack direction={'row'} spacing={2}><SlNotebook size={35} color="#f1bf62" />
                <Typography fontWeight={'bold'} fontSize={'25px'} color={'#873e6c'}> ALL RECIPES
                </Typography>
            </Stack>
        </Stack>
    </Stack>
}
export default Home;