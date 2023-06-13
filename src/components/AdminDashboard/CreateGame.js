import styles from '../../pages/styles/AdminDashboard.module.css'
import axios from 'axios'
import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

const CreateGame = () => {



  const createGameSchema = yup.object().shape({
    title: yup.string().required(),
    description:yup.string().required(),
    cover: yup.string().required(),
    genre: yup.string().required(),
    year: yup.number().required(),
    price: yup.mixed().required(),
  });
  
  

  const { register, handleSubmit , reset} = useForm({
    resolver: yupResolver(createGameSchema)
  });

  const createGameSubmit = async(data) =>{
    console.log(parseFloat(data.price).toFixed(2))
    await axios.post(
      `http://${window.location.hostname}:5000/games/`,
      {
        title:  data.title,
        description: data.description,
        cover: data.cover,
        genre:  data.genre, 
        year: parseInt(data.year),
        price: parseFloat(data.price).toFixed(2),
      },{
        withCredentials: true
      }
    ).then((result) => {
      reset()
    })
  }

  return (
    <div className={styles.createGameContainer}>
        <h2>Create Game</h2>
        <form action="" method="post" onSubmit={handleSubmit(createGameSubmit)}>
            <input type="text" name="title" placeholder="Title" {...register('title')} autoComplete='off'/>
            <textarea name="Description" placeholder="Description" {...register('description')} cols="30" rows="10" autoComplete='off'/>
            <input type="text" name="cover" placeholder="Cover" {...register('cover')} autoComplete='off' />
            <input type="text" name="genre" placeholder="Genre" {...register('genre')} autoComplete='off'/>
            <input type="number" name="year" placeholder="Year"  {...register('year')}  autoComplete='off'/>
            <input type="text" name="price" placeholder="Price" {...register('price')}  autoComplete='off' />
            <input type="submit" value="Create Game" />
        </form>
    </div>

  )
}

export default CreateGame