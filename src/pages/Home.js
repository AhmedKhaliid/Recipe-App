
import { Stack, Typography, Card, Rating } from "@mui/material";
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import { SlNotebook } from 'react-icons/sl';
import { useQuery } from 'react-query';
import pic from './../meal-icon.jpg';
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();
    const [allRrecipe, setAllRecipe] = useState([]);
    const { isLoading, isFetching, error, data } = useQuery('repoData', () =>
        fetch('https://react-http-68f50-default-rtdb.firebaseio.com/recipe.json').then(res =>
            res.json()
        )
    )
    useEffect(() => {
        if (data) {
            let getRecipe = [];
            for (let prop in data) {
                getRecipe.push({
                    id: prop,
                    title: data[prop].title,
                    description: data[prop].description,
                    ingredients: data[prop].ingredients,
                    image: data[prop].image,
                    rating: data[prop].rating
                })
            }
            setAllRecipe(getRecipe)
        }
    }, [data])
    return <Stack paddingBottom={'20px'} spacing={2}>
        <Stack direction={'row'} justifyContent={'center'} paddingTop={'40px'} >
            <Stack direction={'row'} spacing={2}><SlNotebook size={35} color="#f1bf62" />
                <Typography fontWeight={'bold'} fontSize={'25px'} color={'#873e6c'}> ALL RECIPES
                </Typography>
            </Stack>
        </Stack>
        <Stack alignItems={'center'}>
            {(isLoading || isFetching) && <Stack direction={'row'} spacing={1} alignItems={'center'}>
                <Typography fontWeight={'bold'} color={'#873e6c'}>Loading</Typography>
                <CircularProgress size={15} />
            </Stack>}
            {error && <Typography fontWeight={'bold'} color={'#873e6c'}>An error has occurred: {error.message}</Typography>}
        </Stack>
        <Grid container spacing={2} width={"80%"} alignSelf={"center"}  >
            {allRrecipe.map(recipe => {
                return <Grid item key={recipe.id} xs={4}>

                    <Card onClick={() => navigate(recipe.id)} sx={{
                        backgroundImage: recipe.image === '' ? `url(${pic})` : `url(data:image/jpeg;base64,${recipe.image})`,
                        backgroundSize: 'cover',
                        cursor: 'pointer',
                        width: 370,
                        height: 400,
                        boxShadow: '10px 10px 10px #00000070',
                        '&:hover': {
                            opacity: 0.6
                        },
                    }} variant="outlined">
                        <Stack width={'100%'} height={'100%'} color={'white'} spacing={1} alignItems={'center'} marginTop={'300px'} sx={{ backgroundColor: '#0000008f' }} >
                            <Typography marginTop={'15px'} variant="h6" >
                                {recipe.title}
                            </Typography>
                            <Rating
                                readOnly
                                value={5}
                            />
                        </Stack>
                    </Card>
                </Grid>
            })}
        </Grid>
    </Stack>
}
export default Home;
