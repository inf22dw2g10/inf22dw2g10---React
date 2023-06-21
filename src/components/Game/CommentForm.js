import styles from '../../pages/styles/Game.module.css'
import axios from 'axios';
import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import thumbsUp from '../../images/thumb-up.png'
import thumbsDown from '../../images/thumb-down.png'
import { useState } from 'react';


const CommentForm = ({gameId, commentCreate}) => {

    const [axiosError, setAxiosError] = useState(null)
    const [commentCreated, setCommentCreated] = useState(null)

    const commentSchema = yup.object().shape({
        text: yup.string().required('You have to write your review first!'),
        rating: yup.number().min(0).max(1).required('You have to give a rating to the game!')
    });
      
    const { register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(commentSchema)
    });

    const commentSubmit = async (data) =>{    
        const text = data.text
        const rating = data.rating

        try{
            await axios.post(
                `http://${window.location.hostname}:5000/comments/game/${gameId}`,
                {
                    text:text,
                    rating:rating,
                },{
                    withCredentials: true
                }
            )
            commentCreate()
            setCommentCreated(true)
        }catch(err){
            if(err.response.status === 400){
                setAxiosError('You can only comment once per game!')
            }
        }

    }
    return (
        <div className={styles.commentFormContainer}>
                <form action="" method="post" onSubmit={handleSubmit(commentSubmit)}>

                    {errors.text &&
                        <p style={{textAlign:'center',color:'red'}}>{errors.text?.message}</p>
                    }
                    {axiosError &&
                        <p style={{textAlign:'center',color:'red'}}>{axiosError}</p>
                    }
                    {commentCreated &&
                        <p style={{textAlign:'center',color:'green'}}>Comentário foi submetido com sucesso</p>
                    }
                    <textarea name="comment" {...register('text')} id='comment'  autoComplete='off' rows='7' placeholder='Write your review here' />
                    {errors.rating &&
                        <p style={{textAlign:'center',color:'red'}}>{errors.rating?.message}</p>
                    }
                    <div>
                        <div>
                            <input type="radio" className={styles.ratingO} id='ratingO'  name="rating" value="1" {...register('rating')}/>
                            <label htmlFor='ratingO'><img src={thumbsUp} alt='Thumbs Up'/>Good</label>
                            <input type="radio" name="rating" value="0" className={styles.ratingZ} id='ratingZ' {...register('rating')}/>
                            <label htmlFor='ratingZ'><img src={thumbsDown} alt='Thumbs Down'/>Bad</label>
                        </div>
                        <input type="submit" value="Send Comment"/>
                    </div>
                </form>
        </div>
    )
}

export default CommentForm;