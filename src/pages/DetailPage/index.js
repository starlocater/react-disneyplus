import React from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { useState, useEffect } from 'react';
import './DetailPage.css';

const DetailPage = () => {
  let { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchMovie() {
      const response = await axios.get(`/movie/${movieId}`);
      console.log(response, 'response');
      setMovie(response.data);
    }
    try{
      fetchMovie();
    } catch (error) {
      console.log(error);
    }
  }, [movieId]);

  if(!movie) return <p>Null</p>

  return (
    <section>
      <img className='modal__poster-img' src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="img"
      ></img>
      <div>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <p> Release Date: {movie.release_date}</p>
        <p> Rating: {movie.vote_average}</p>
      </div>
    </section>
  )
}

export default DetailPage