import styles from '../../pages/styles/AdminDashboard.module.css'
import SearchGame from './SearchGame'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

const EditGame = () => {

  const [editSuccessful, setEditSuccessful] = useState(false)
  const [gameId, setGameId] = useState(null)
  const [game, setGame] = useState({})

  const handlePropChange = (gameId) => {
    setGameId(gameId)
  };

  // Handling Form

  const editGameSchema = yup.object().shape({
    title: yup.string(),
    description:yup.string(),
    cover: yup.string(),
    genre: yup.string(),
    year: yup.string(),
    price: yup.string(),
  });
  
  

  const { register, handleSubmit , reset,} = useForm({
    resolver: yupResolver(editGameSchema)
  });

  const editGameSubmit = async (data) =>{

    if(data.title === "" && data.description === "" && data.cover === "" && data.genre === ""  && data.year === "" && data.price === "" ){
      console.log('Erro')
    }else{
      await axios.put(
        `http://${window.location.hostname}:5000/games/${gameId}`,
        {
          title: data.title === "" ? game.title : data.title,
          description: data.description === "" ? game.description : data.description,
          cover: data.cover === "" ? game.cover : data.cover,
          genre: data.genre === "" ? game.genre : data.genre, 
          year: data.year === "" ? game.year : parseInt(data.year),
          price: data.price === "" ? game.price : parseFloat(data.price).toFixed(2),
        },{
          withCredentials: true
        }
      ).then((result) => {
        setEditSuccessful(true)
      })
      .catch((err)=>{

      })
    }
    reset();
  }

  const deleteGame = async () =>{
    await axios.delete(`http://${window.location.hostname}:5000/games/${game.id}`,{withCredentials: true})
    .then((result) => {
      window.location.reload(false)
    }).catch((err) => {
    });
  }

  useEffect(() => {
    setEditSuccessful(false)
    if(gameId != null){
      axios.get(`http://${window.location.hostname}:5000/games/${gameId}`).then((res) => {
        setGame(res.data)
      }).catch((err) => {
      });
    }
    reset();
  }, [gameId,reset, editSuccessful])

  return (
    <div className={styles.editGameContainer}>
        <SearchGame onPropChange={handlePropChange}/>
        <h2>Edit {game.title}</h2>
        <br/>
        <form action="" method="post" onSubmit={handleSubmit(editGameSubmit)}>
            <input type="text" name="title"  {...register('title')} placeholder={game.title}  autoComplete='off'/>
            <textarea name="Description" {...register('description')} placeholder={game.description} autoComplete='off'  cols="30" rows="10"/>
            <input type="text" name="cover" {...register('cover')} placeholder={game.cover} autoComplete='off' />
            <input type="text" name="genre"  {...register('genre')} placeholder={game.genre}  autoComplete='off'  />
            <input type="number" name="year" {...register('year')} placeholder={game.year}  autoComplete='off' />
            <input type="text" name="price" {...register('price')} placeholder={game.price} autoComplete='off'/>
            <input type="submit" value="Edit Game" />
        </form>
        <button onClick={deleteGame}>Delete {game.title}</button>
    </div>
  )
}

export default EditGame