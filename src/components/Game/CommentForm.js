import styles from '../../pages/styles/Game.module.css'
import axios from 'axios';
import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import thumbsUp from '../../images/thumb-up.png'
import thumbsDown from '../../images/thumb-down.png'


const CommentForm = ({gameId}) => {

    const commentSchema = yup.object().shape({
        text: yup.string().required(),
        rating: yup.number().min(0).max(1).required()
    });
      
    const { register, handleSubmit} = useForm({
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
            window.location.reload(false)
        }catch(err){

        }

    }
    return (
        <div className={styles.commentFormContainer}>
                <form action="" method="post" onSubmit={handleSubmit(commentSubmit)}>
                    <div>
                        <input type="radio" name="rating" value="0" className={styles.ratingZ} id='ratingZ' {...register('rating')}/>
                        <label htmlFor='ratingZ'><img src={thumbsDown} alt='Thumbs Down'/></label>
                        <input type="radio" className={styles.ratingO} id='ratingO'  name="rating" value="1" {...register('rating')}/>
                        <label htmlFor='ratingO'><img src={thumbsUp} alt='Thumbs Up'/></label>
                    </div>
                    <input type='text' name="comment" {...register('text')} id='comment'  autoComplete='off' />
                    <input type="submit" value="Send Comment"/>
                </form>
        </div>
    )
}

export default CommentForm;