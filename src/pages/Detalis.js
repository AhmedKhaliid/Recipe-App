
import { Stack, Typography, Rating } from "@mui/material";
import { useState, useEffect } from "react";
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import pic from './../meal-icon.jpg';



const Detalis = () => {
    const [detalieRecipe, setDetaliRecipe] = useState([]);
    const [showDescription, setShowDescription] = useState(true);
    const [showIngrediants, setShowIngrediants] = useState(false);


    const handleMouseEnterDes = () => {
        setShowDescription(true);
        setShowIngrediants(false);
    };
    const handleMouseEnterIng = () => {
        setShowIngrediants(true);
        setShowDescription(false);
    };


    const { id } = useParams();
    const { data } = useQuery('repoData', () =>
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
                })
            }
            const recipe = getRecipe.filter(re => re.id === id)
            setDetaliRecipe(recipe)
        }
    }, [data, id])

    return <Stack padding={'30px'}>
        {detalieRecipe.map(recipe => {

            return <Stack key={recipe.id} paddingLeft={'100px'} spacing={5}>
                <Stack direction={'row'} spacing={15}>
                    <Stack >
                        <img src={recipe.image === '' ? `${pic}` : `data:image/jpeg;base64,${recipe.image}`} width={'350px'} height={'300px'} style={{ borderRadius: '10px' }} alt={`${recipe.title}`} />
                    </Stack>
                    <Stack spacing={1}>
                        <Typography fontStyle={'italic'} fontWeight={'bold'} variant="h6" color='#873e6c' >
                            {recipe.title}
                        </Typography>
                        <Rating
                            readOnly
                            value={5}
                        />
                    </Stack>
                </Stack>

                <Stack spacing={3}>
                    <Stack direction={'row'} width={'300px'} justifyContent={'space-between'}>
                        <Typography width={'fit-content'} variant="h6" sx={{ color: '#873e6c', borderBottom: showDescription && '2px solid #873e6c', '&:hover': { borderBottom: '2px solid #873e6c', cursor: 'pointer' } }}
                            onClick={handleMouseEnterDes}
                        >
                            Description
                        </Typography>
                        <Typography width={'fit-content'} variant="h6" sx={{ color: '#873e6c', borderBottom: showIngrediants && '2px solid #873e6c', '&:hover': { borderBottom: '2px solid #873e6c ', cursor: 'pointer' } }}
                            onClick={handleMouseEnterIng}
                        >
                            Ingredients
                        </Typography>
                    </Stack>
                    <Stack width={'400px'}>
                        {showDescription && <Stack width={'fit-content'}  >
                            <Typography variant="body2" color="text.secondary" >
                                {recipe.description}
                            </Typography>
                        </Stack>}
                        {showIngrediants && <Stack paddingLeft={'200px'}>
                            {recipe.ingredients.map((ing, index) => {
                                return <Typography key={index} variant="body2" color="text.secondary">
                                    - {ing}
                                </Typography>
                            })}
                        </Stack>}
                    </Stack>
                </Stack>

            </Stack>
        })}
    </Stack>

}
export default Detalis;