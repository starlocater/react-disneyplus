import React from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { useState, useEffect } from 'react';

const DetailPage = () => {
  let { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchMovie() {
      const response = await axios.get(`/movie/${movieId}`);
      // console.log(response, 'response');
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
    </section>
  )
}

export default DetailPage