
import { Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { IoIosHeart } from 'react-icons/io';

const Nav = () => {
    return <Stack >
        <Stack bgcolor={'#723f5fe6'}>
            <Typography color={'#dfd7d7'} fontFamily={'Bitter,Georgia,Cambria,Times New Roman,Times,serif'} padding={'10px 0 10px 0'} textAlign={'center'} fontWeight={'bold'} ><IoIosHeart color="orange" size={10} /> OUR RECIPES, YOUR INBOX.</Typography>
        </Stack>
        <Stack padding={'0 270px 0 '} >
            <Stack width={'100%'} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Stack >
                    <Typography fontSize={'50px'} color={'#723f5fe6'} fontFamily={'Bitter,Georgia,Cambria,Times New Roman,Times,serif'}>pinch <Typography component="span" display={'inline'} fontSize={'30px'} color="#723f5f40">of</Typography> yum</Typography>
                </Stack>
                <Stack direction={'row'} spacing={4} >
                    <NavLink to={'/'} style={({ isActive }) => ({
                        color: isActive ? '#723f5fe6' : 'black',
                        textDecoration: 'none'
                    })}><Typography fontWeight={'bold'} variant="h5" fontFamily={'Times New Roman,Times,serif'}>Home</Typography></NavLink>
                    <NavLink to={'/addRecipe'} style={({ isActive }) => ({
                        color: isActive ? '#723f5fe6' : 'black',
                        textDecoration: 'none'
                    })}><Typography fontWeight={'bold'} variant="h5" fontFamily={'Times New Roman,Times,serif'}>Add Recipe</Typography></NavLink>
                </Stack>
            </Stack>
        </Stack>
        <Stack paddingTop={'25px'} borderBottom={'1px solid #e6e6e6'}></Stack>
    </Stack>
}
export default Nav;