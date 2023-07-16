
import { Stack, Typography, TextField, Card, CardContent, Button, Alert } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import InputAdornment from '@mui/material/InputAdornment';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { MdDelete } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaArrowsAltV } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { useMutation } from 'react-query';
import { getBase64 } from "../utilities/getBase64";

const AddRecipe = () => {
    const [ingredients, setIngredients] = useState([]);
    const [image, setImage] = useState(null);
    const [valueInput, setValueInput] = useState('');
    const [ingArrEmpty, setIngArrEmpty] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    const schema = yup.object({
        title: yup.string().required('This Field Required.'),
        des: yup.string().required('This Field Required.')
    }).required();

    const { register, handleSubmit, watch, formState: { errors }, reset, resetField } = useForm({
        resolver: yupResolver(schema)
    });

    const { mutate, isLoading, error } = useMutation((backEndData) =>
        fetch('https://react-http-68f50-default-rtdb.firebaseio.com/recipe.json', {
            method: 'POST',
            body: JSON.stringify(backEndData),
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            res.json()
            if (res.ok) {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
                reset();
                setIngredients([]);
                setImage(null)
                setIngArrEmpty(false)
                setValueInput('')
                setAlertMessage({ type: "success", message: "the recipe is successfully added" })

            }
        }
        ))
    useEffect(() => {
        if (ingredients.length > 0) {
            setIngArrEmpty(false)
        }
    }, [ingredients])

    const onSubmit = async (data) => {
        if (ingredients.length === 0) {
            setIngArrEmpty(true)
            return
        }
        const backEndData = {
            title: data.title,
            ingredients: ingredients.map(ing => ing.content),
            description: data.des,
            image: data.image[0] ? await getBase64(data.image[0]) : '',
        }
        mutate(backEndData);
    };

    const addIng = () => {
        if (watch('ingre') && watch('ingre').trim().length > 0) {
            setIngredients(old => [...old, { id: `${Math.random()}`, content: watch('ingre') }])
        }
        resetField('ingre')
    }

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const reorderedItems = Array.from(ingredients);
        const [removed] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, removed);

        setIngredients(reorderedItems);
    };

    const deleteInputIngredients = () => {
        resetField('ingre')
    }

    const deleteIngredientsHandler = (ind) => {
        const newIngredientsArr = ingredients.filter((_, index) => index !== ind);
        setIngredients(newIngredientsArr)
    }

    const onImageChange = (event) => {
        event.preventDefault();
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
        setValueInput(event.target.value)
    }
    useEffect(() => {
        if (error) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            setAlertMessage({ type: "error", message: `${error.message} — check it out!` })
        }
    }, [error]);

    useEffect(() => {
        if (alertMessage)
            setInterval(() => {
                setAlertMessage(null)
            }, 5000)
    }, [alertMessage]);


    return <Stack paddingTop={'30px'} paddingBottom={'30px'} alignItems={'center'}>
        {alertMessage && <Stack alignItems={'center'} margin={'20px'} >
            <Alert sx={{ width: '300px' }} severity={alertMessage.type} onClose={() => { }}>{alertMessage.message}</Alert>
        </Stack>}
        <Card>
            <CardContent>
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
                                                <Droppable droppableId={`${Math.random()}`}>
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
                                    {ingArrEmpty && <Typography color={'#c94343'}>Please enter at least one ingredient.</Typography>}
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
                                    columns={1}
                                    variant="outlined"
                                    sx={{ width: "600px" }}
                                />
                                <Typography color={'#c94343'}>{errors.des?.message}</Typography>
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} spacing={1} justifyContent={'space-between'}>
                            <Typography fontSize={'20px'} fontWeight={'bold'} color={'#873e6c'}>Upload Image:</Typography>
                            <Stack spacing={2}>
                                <Card sx={{ width: '600px' }}>
                                    <CardContent>
                                        <Stack direction={'row'} justifyContent={'space-between'}>
                                            <input value={valueInput} {...register("image")} onChange={onImageChange} type="file" accept='image/*' />
                                            <AiFillCloseCircle cursor={'pointer'} onClick={() => {
                                                setImage(null);
                                                setValueInput('')
                                            }} />
                                        </Stack>
                                    </CardContent>
                                </Card>
                                {image && <Card sx={{ width: '600px', minHeight: "150px" }}>
                                    <CardContent>
                                        <img src={image} alt="uploaded imag" style={{
                                            objectFit: "contain",
                                            width: '100%',
                                            height: '300px'
                                        }} />
                                    </CardContent>
                                </Card>}
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} justifyContent={'flex-end'}>
                            <Stack direction={'row'} spacing={1}>
                                <Button disabled={isLoading ? true : false} variant="outlined" type="submit" >Add </Button>
                                <Stack justifyContent={'center'}>
                                    {isLoading && <CircularProgress size={15} />}
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </form >
            </CardContent>
        </Card>
    </Stack >
}
export default AddRecipe;