import React, { useEffect, useState } from "react";
import { postReview } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
// import "./addReview.module.css";
import { Box, FormControl, FormLabel, Input, Button, FormErrorMessage } from '@chakra-ui/react';
import { Rating } from '@mui/material';


const PostReview = ({courseId}) => {
    const [input, setInput] = useState({
        userId: 0, 
        courseId: 0, 
        score:0, 
        title:'', 
        comments:''
    });

    const [errors, setErrors] = useState({ });
    const dispatch = useDispatch();
    const {user} = useAuth0();
    const allUser = useSelector((state) => state.allUsers);

    const usuario = user && allUser.find(u => u.email === user.email)

    useEffect(() => {

        if(usuario){
            setInput({
                userId: usuario.id,
                courseId: courseId
            })
        }
    }, [usuario]);


    function validate(input) {
        let errors = {};

        if (!input.title) {
            errors.title = "Please add a title.";
        }
        if (!input.score) {
            errors.score = "Please add a score";
        }
        if(!input.comments){ 
            errors.comments = "Please add your comments";
        }
        return errors
    }

    function handleChange(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value

        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (input.title.length > 1
            && !errors.hasOwnProperty("title") //devuelve un buleano si el objeto tiene la propiedad especificada 
            && !errors.hasOwnProperty("score")
            && !errors.hasOwnProperty("comments")
        ) {
            if(input.userId > 0){
                // console.log(input);
                dispatch(postReview(input))
                alert("Thank you for your review!")
                setInput({
                    title: "",
                    score: 0,
                    comments: "",
                })
            } else {alert("You must login.")}
        }
    }

    return ( 
        <Box 
        maxW='sm' 
        borderWidth='1px' 
        borderRadius='lg' 
        overflow='hidden'
        onSubmit={(e) => handleSubmit(e)}
        >
          <FormControl isRequired>
            <FormLabel>Rating: </FormLabel>
            {/* <Input
              type = "number"
              value= {input.score}
              name = "score"
              onChange={(e) => handleChange(e)}
            /> */}
            <Rating  
            defaultValue={2.5} precision={0.5} size="large"
            id="outlined-helperText"
            label="Puntuación:"
            htmlFor="score"
            value={input.score}
            onChange={(e) => handleChange(e)}
            name="score"
            type="number"
            InputLabelProps={{
            shrink: true,
            }}
            />

             <FormErrorMessage> { errors.score && ( <p>{errors.score}</p> )}</FormErrorMessage>

             <FormLabel>Add a title: </FormLabel>
              <Input
              type = "text"
              value= {input.title}
              name = "title"
              onChange={(e) => handleChange(e)}
            />
            <FormErrorMessage> { errors.title && ( <p>{errors.title}</p> )}</FormErrorMessage>

            <FormLabel>Add your comments: </FormLabel>
            <Input
              type = "text"
              value= {input.comments}
              name = "comments"
              onChange={(e) => handleChange(e)}
            />
            <FormErrorMessage> { errors.comments && ( <p>{errors.comments}</p> )}</FormErrorMessage>

            <Button
            mt={4}
            colorScheme='teal'
            // isLoading={props.isSubmitting}
            type='submit'
            > Submit </Button>
          </FormControl>
        </Box>


        // <div>
        //     <h1>Rate your course!</h1>
        //         <form  onSubmit={(e) => handleSubmit(e)} >
        //         <div>
        //         <label>Rating : </label>
        //             <input
        //             type = "number"
        //             value= {input.score}
        //             name = "score"
        //             onChange={(e) => handleChange(e)}
        //             />
        //               { errors.score && (
        //             <p>{errors.score}</p>
        //         )}
        //         </div>

        //         <div>
        //         <label>Add a title: </label>
        //             <input
        //             type = "text"
        //             value= {input.title}
        //             name = "title"
        //             onChange={(e) => handleChange(e)}
        //             />
        //               { errors.title && (
        //             <p>{errors.title}</p>
        //         )}
        //         </div>

        //         <div>
        //         <label>Add your comments: </label>
        //             <input
        //             type = "text"
        //             value= {input.comments}
        //             name = "comments"
        //             onChange={(e) => handleChange(e)}
        //             />
        //               { errors.comments && (
        //             <p>{errors.comments}</p>
        //         )}
        //         </div>
        //         <button type="submit">Send Review</button>
        //         <div>

        //         </div>
        //     </form>
        //     </div>

    )            
}

export default PostReview;