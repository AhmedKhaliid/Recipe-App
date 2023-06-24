
import { Stack, Typography, TextField, Card, CardContent, Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputAdornment from '@mui/material/InputAdornment';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    title: yup.string().required('This Field Required.'),
    ingre: yup.string().required('This Field Required.'),
    dis: yup.string().required('This Field Required.')
}).required();
const AddRecipe = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });
    const [ingredients, setIngredients] = useState([]);
    const onSubmit = data => {
        data['ingre'] = ingredients;
        console.log(data)
        reset();
        setIngredients([]);
    };

    const addIng = () => {
        let ingerd = watch('ingre')
        if (ingerd.trim().length > 0) {
            setIngredients(old => [...old, ingerd])
        }
    }

    const deleteIngredientsHandler = (ing) => {
        const newIngredientsArr = ingredients.filter(ingre => ingre !== ing);
        setIngredients(newIngredientsArr)
    }

    return <Stack paddingTop={'30px'} alignItems={'center'}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} width={'800px'}>
                <Stack direction={'row'} spacing={1} justifyContent={'space-between'}>
                    <Typography fontSize={'20px'} fontWeight={'bold'} color={'#873e6c'}>Title:</Typography>
                    <Stack>
                        <TextField {...register('title')} type="text" sx={{ width: '600px' }} />
                        <Typography color={'#c94343'}>{errors.title?.message}</Typography>
                    </Stack>
                </Stack>
                <Stack spacing={1} justifyContent={'space-between'}>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography fontSize={'20px'} fontWeight={'bold'} color={'#873e6c'}>Ingredients:</Typography>
                    </Stack >
                    <Stack>
                        <Stack alignItems={'flex-end'}>
                            <Card sx={{ width: '600px', minHeight: "150px" }}>
                                <CardContent>
                                    <Stack alignItems={'center'}>
                                        <TextField
                                            {...register('ingre')}
                                            sx={{ width: '500px' }}
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Button onClick={addIng} variant="contained">
                                                            Add
                                                        </Button>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Stack>
                                    <ul>
                                        {ingredients.map((ing, index) => {
                                            return <li key={index}>
                                                <Stack direction={'row'} spacing={1} justifyContent={'space-between'} alignItems={'center'}>
                                                    <Typography >{ing}</Typography>
                                                    <Button onClick={() => deleteIngredientsHandler(ing)}>delete</Button>
                                                </Stack>
                                            </li>
                                        })}
                                    </ul>
                                </CardContent>
                            </Card>

                        </Stack>
                        <Stack paddingLeft={'200px'} >
                            <Typography color={'#c94343'}>{errors.ingre?.message}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography fontSize={'20px'} fontWeight={'bold'} color={'#873e6c'}>Description:</Typography>
                    <Stack>
                        <TextField
                            {...register('dis')}
                            multiline
                            rows={4}
                            variant="outlined"
                            sx={{ width: "600px" }}
                        />
                        <Typography color={'#c94343'}>{errors.dis?.message}</Typography>
                    </Stack>
                </Stack>
                <Stack direction={'row'} justifyContent={'flex-end'}>
                    <Button variant="outlined" type="submit">Add</Button>
                </Stack>
            </Stack>
        </form>
    </Stack>
}
export default AddRecipe;