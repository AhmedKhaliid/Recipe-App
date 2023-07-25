
import { Stack, Typography, Card, Rating, OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, Select, Checkbox } from "@mui/material";
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import { SlNotebook } from 'react-icons/sl';
import { useQuery } from 'react-query';
import pic from './../meal-icon.jpg';
import { useNavigate } from "react-router-dom";
import { BiCategory } from 'react-icons/bi';


const Home = () => {
    const navigate = useNavigate();
    const [allRrecipe, setAllRecipe] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectCategory, setSelectCategory] = useState([]);

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
                    category: data[prop].category
                })
            }
            setAllRecipe(getRecipe)
            if (selectCategory.length > 0) {
                const recipeFilterCategory = getRecipe.filter(rec => selectCategory.includes(rec.category))
                setAllRecipe(recipeFilterCategory)
            }
        }
    }, [data, selectCategory])


    const { data: category } = useQuery('repoDatas', () =>
        fetch('https://react-http-68f50-default-rtdb.firebaseio.com/category.json').then(res =>
            res.json()
        )
    )
    useEffect(() => {
        if (category) {
            let cate = [];
            for (let prop in category) {
                cate.push({
                    id: prop,
                    title: category[prop]
                })
            }
            setCategories(cate);
        }
    }, [category])

    const selectCategoryHandler = (event) => {
        const {
            target: { value },
        } = event;
        setSelectCategory(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return <Stack paddingBottom={'20px'} spacing={2}>

        <Stack direction={'row'} justifyContent={'center'} paddingTop={'40px'} alignItems={'center'}>
            <Stack direction={'row'} spacing={2}><SlNotebook size={35} color="#f1bf62" />
                <Typography fontWeight={'bold'} fontSize={'25px'} color={'#873e6c'}> ALL RECIPES
                </Typography>
            </Stack>
            {/* <Stack  >
                <SelectCategory selectCategoryHandler={selectCategoryHandler} categories={categories} selectCategory={selectCategory} />
            </Stack> */}
        </Stack>
        <Stack direction={'row'} spacing={1} justifyContent={'center'} alignItems={'center'}>
            <BiCategory size={30} />
            <SelectCategory selectCategoryHandler={selectCategoryHandler} categories={categories} selectCategory={selectCategory} />
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



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const SelectCategory = (props) => {

    return <Stack>
        <FormControl sx={{ m: 1, width: 150 }}>
            <InputLabel id="demo-multiple-checkbox-label">categories</InputLabel>
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={props.selectCategory}
                onChange={props.selectCategoryHandler}
                input={<OutlinedInput label="categories" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >
                {props.categories.map((categ) => (
                    <MenuItem key={categ.id} value={categ.title}>
                        <Checkbox checked={props.selectCategory.indexOf(categ.title) > -1} />
                        <ListItemText primary={categ.title} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </Stack>

}
