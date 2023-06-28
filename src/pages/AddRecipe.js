
import { Stack, Typography, TextField, Card, CardContent, Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputAdornment from '@mui/material/InputAdornment';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { MdDelete } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaArrowsAltV } from "react-icons/fa"
import { AiFillCloseCircle } from "react-icons/ai"

// const schema = yup.object({
//     title: yup.string().required('This Field Required.'),
//     ingre: ingredients.length > 0 ? "" : yup.string().required('This Field Required.'),
//     des: yup.string().required('This Field Required.')
// }).required();
const AddRecipe = () => {
    const [ingredients, setIngredients] = useState([]);

    const schema = yup.object({
        title: yup.string().required('This Field Required.'),
        ingre: ingredients.length > 0 ? "" : yup.string().required('This Field Required.'),
        des: yup.string().required('This Field Required.')
    }).required();

    const { register, handleSubmit, watch, formState: { errors }, reset, resetField } = useForm({
        resolver: yupResolver(schema)
    });

    const [backEndData, setBackEndData] = useState({});

    const onSubmit = data => {

        setBackEndData({
            title: data.title,
            ingredients: ingredients.map(ing => ing.content),
            description: data.des
        })
        console.log(data)
        reset();
        setIngredients([]);
    };

    const addIng = () => {
        let ingerd = watch('ingre')
        if (ingerd.trim().length > 0) {
            setIngredients(old => [...old, { id: `${Math.random()}`, content: ingerd }])
        }

    }
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const reorderedItems = Array.from(ingredients);
        const [removed] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, removed);
        console.log('reorderedItemsk', reorderedItems)

        setIngredients(reorderedItems);
        console.log('result', result)
        console.log("reorderedItems", reorderedItems)
    };

    const deleteInputIngredients = () => {
        resetField('ingre')
    }

    const deleteIngredientsHandler = (ind) => {
        const newIngredientsArr = ingredients.filter((_, index) => index !== ind);
        setIngredients(newIngredientsArr)
    }
    console.log("backEndData", backEndData)
    console.log("ingredients", ingredients)

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
                <Stack direction={'row'} spacing={1} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography fontSize={'20px'} fontWeight={'bold'} color={'#873e6c'}>Ingredients:</Typography>
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
                                                        <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                                            <AiFillCloseCircle cursor={'pointer'} onClick={deleteInputIngredients} />
                                                            <Button onClick={addIng} variant="contained">
                                                                Add
                                                            </Button>
                                                        </Stack>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Stack>
                                    <DragDropContext onDragEnd={onDragEnd}>
                                        <Droppable droppableId={`${ingredients}`}>
                                            {(provided) => (
                                                <ul style={{ listStyleType: 'none' }}  {...provided.droppableProps} ref={provided.innerRef}>
                                                    {ingredients.map((ing, index) => {
                                                        return <Draggable key={ing.id} draggableId={ing.id} index={index}>
                                                            {(provided) => (
                                                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                                                    <Stack direction={'row'} spacing={2} justifyContent={'space-between'} alignItems={'center'}>
                                                                        <Typography ><FaArrowsAltV /> {ing.content}</Typography>
                                                                        <MdDelete size={20} cursor={'pointer'} onClick={() => deleteIngredientsHandler(index)} />
                                                                    </Stack>
                                                                </li>
                                                            )}
                                                        </Draggable>
                                                    })}
                                                    {provided.placeholder}
                                                </ul>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                </CardContent>
                            </Card>

                        </Stack>
                        <Stack  >
                            <Typography color={'#c94343'}>{errors.ingre?.message}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography fontSize={'20px'} fontWeight={'bold'} color={'#873e6c'}>Description:</Typography>
                    <Stack>
                        <TextField
                            {...register('des')}
                            multiline
                            rows={4}
                            variant="outlined"
                            sx={{ width: "600px" }}
                        />
                        <Typography color={'#c94343'}>{errors.des?.message}</Typography>
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