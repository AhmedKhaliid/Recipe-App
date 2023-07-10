
import { Stack, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { SlNotebook } from 'react-icons/sl';
import { useQuery } from 'react-query'
const Home = () => {
    const [allRrecipe, setAllRecipe] = useState([]);

    const { isLoading, error, data } = useQuery('repoData', () =>
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
                    image: data[prop].image
                })
            }
            setAllRecipe(getRecipe)
        }
    }, [data])


    return <Stack>
        <Stack direction={'row'} justifyContent={'center'} paddingTop={'40px'} >
            <Stack direction={'row'} spacing={2}><SlNotebook size={35} color="#f1bf62" />
                <Typography fontWeight={'bold'} fontSize={'25px'} color={'#873e6c'}> ALL RECIPES
                </Typography>
            </Stack>
        </Stack>
        <Stack alignItems={'center'}>
            {isLoading && <Typography fontWeight={'bold'} color={'#873e6c'}>Loading...</Typography>}
            {error && <Typography fontWeight={'bold'} color={'#873e6c'}>An error has occurred: {error.message}</Typography>}
        </Stack>
        <Stack padding={'30px'} direction={'row'} gap={3} flexWrap={'wrap'}>
            {allRrecipe.map(recipe => {
                return <Card key={recipe.id} sx={{ minWidth: 300, maxWidth: 345 }} >
                    <CardMedia
                        sx={{ height: 220, objectFit: "cover" }}
                        image={`data:image/jpeg;base64,${recipe.image}`}
                        title={recipe.image === "" ? 'no image uploaded' : recipe.title}
                        component="img"

                    />
                    <CardContent>
                        <Stack spacing={1}>
                            <Typography gutterBottom variant="h4" >
                                {recipe.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Description: {recipe.description}
                            </Typography>
                            <Stack direction={'row'} spacing={0.5}>
                                <Typography variant="body2" color="text.secondary">
                                    Ingredients:
                                </Typography>
                                <Stack>
                                    {recipe.ingredients.map((ing, index) => {
                                        return <Typography key={index} variant="body2" color="text.secondary">
                                            - {ing}
                                        </Typography>
                                    })}
                                </Stack>
                            </Stack>
                            {/* <Typography variant="body2" color="text.secondary">
                            Ingredients: {recipe.ingredients.toString()}
                        </Typography> */}
                        </Stack>
                    </CardContent>
                </Card>
            })}
        </Stack>
    </Stack>
}
export default Home;