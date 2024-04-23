import React, { useEffect, useState } from 'react'
import axios from '../../api/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchPage.css';
import { useDebounce } from '../../hooks/useDebounce';

const SearchPage = () => {
  // 검색 결과
  const [searchResults, setSearchResults] = useState([]);


  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  const searchTerm = query.get('q');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const navigate = useNavigate();

  useEffect(() => {
    if(debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm])

  const fetchSearchMovie = async (debouncedSearchTerm) => {
    try {
      const response = await axios.get(`/search/movie?include_adult=false&language=ko-KR&query=${debouncedSearchTerm}`);
      setSearchResults(response.data.results);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  if(searchResults.length > 0) {
    return (
      <section className='search-container'>
        {searchResults.map((movie) => {
          if(movie.backdrop_path !== null & movie.media_type !== "person" ) {
            const movieImageURL= "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className='movie' key={movie.id}>
                <div className='movie__column-poster' onClick={() => navigate(`/${movie.id}`)}>
                  <img src={movieImageURL} alt="movieImageURL" className='movie_poster' />
                </div>
              </div>  
            )
            }
        })}
      </section>
    )
  }else{
    return (
      <section className='no-results'>
        <div className='no-results__text'>
          <p>
            There is no data for "{debouncedSearchTerm}".
          </p>
        </div>
      </section>
    )
  }


}

export default SearchPage