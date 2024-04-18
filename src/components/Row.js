import React, {useState, useEffect, useCallback} from 'react'
import axios from '../api/axios';
import './Row.css';
import MovieModal from './MovieModal';

const Row = ({title, id, fetchURL}) => {
  // Save movies as state for each Row
  const [movies, setMovies] = useState([]);
  // manage movie detail modal page popup as state
  const [modalOpen, setModalOpen] = useState(false);
  // save selected movie as state
  const [movieSelected, setMovieSelected] = useState({});

  const fetchMovieData = useCallback(async () => {
    const response = await axios.get(fetchURL);
    setMovies(response.data.results);
    // console.log(response);
  }, [fetchURL]); 

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const handleClick = (movie) => {
    setMovieSelected(movie);
    setModalOpen(true);
  }


  return (
    <div>
      <h2>{title}</h2>
      <div className='slider'>
        <div className='slider__arrow_left'>
          <span className='arrow' onClick={() => {document.getElementById(id).scrollLeft -= window.innerWidth - 80 }}>
            {"<"}
          </span>
        </div>
        <div id={id} className='row__posters'>
          {movies.map((movie) => (
            <img key={movie.id} src={`${base_url}${movie.backdrop_path}`} alt={movie.name} className='row__poster' onClick={() => handleClick(movie)} />
          ))}
        </div>
        <div className='slider__arrow_right'>
          <span className='arrow' onClick={() => {document.getElementById(id).scrollLeft += window.innerWidth - 80 }}>
            {">"}
          </span>
        </div>
      </div>
      {modalOpen && 
        <MovieModal 
          setModalOpen={setModalOpen}
          {...movieSelected}
        />
      }
    </div>
  )
}

export default Row


const base_url = 'https://image.tmdb.org/t/p/original/';

