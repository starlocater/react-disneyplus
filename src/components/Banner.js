import React, {useEffect, useState} from 'react'
import axios from '../api/axios'
import requests from '../api/request'
import './Banner.css'
import styled from 'styled-components'

const Banner = () => {
    // 배너에 표시할 영화 정보를 fetch 후 무작위로 선택하기 위한 state
    const [movie, setMovie] = useState([]);
    // 예고편 보기 버튼을 클릭했을 때 return 되는 페이지를 비디오로 변환하기 위한 state
    const [isClicked, setIsClicked] = useState(false);
    useEffect(() => {    
        fetchData();
    }, [])
    
    const fetchData = async() => {
        // 현재 상영중인 영화 정보 가져오기
        const response = await axios.get(requests.fetchNowPlaying);
        // 현재 상영중인 영화 중 무작위로 하나를 골라 Id를 가져오기
        const RandomMovieId=response.data.results[Math.floor(Math.random() * response.data.results.length)].id;
        // console.log(response);
        // 특정 영화의 더 상세한 정보를 가져오기(비디오 정보도 포함)
        const { data: movieDetail } = await axios.get(`movie/${RandomMovieId}`, { params: { append_to_response: "videos"}
    });
    setMovie(movieDetail);
    }
    
    // 영화의 개요가 100글자가 넘으면 그 이후는 ...으로 변환
    const truncate = (str, n) => {
        return str?.length > n ? str.substring(0, n) + "..." : str;
    }
 
    if (isClicked) {
        return (
            <>
                <Container>
                    <HomeContainer>
                        <Iframe src={`https://www.youtube.com/embed/${movie?.videos?.results[0]?.key}?controls=0&autoplay=1&mute=1&loop=1&playlist=${movie.videos.results[0].key}`}
                        frameborder="0"
                        allow="autoplay; fullscreen"
                        width="640"
                        height="360"
                        />
                    </HomeContainer>
                </Container>
                    <button onClick={() => setIsClicked(false)}>
                        X
                    </button>
            </>
        )
    } else {
        return (
            <header
            className='banner'
            style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: "top center",
                backgroundSize: "cover"
            }}>
                <div className='banner_contents'>
                    <h1 className='banner_title'>
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>
                
                    <div className='banner_buttons'>
                        {movie?.videos?.results[0]?.key &&
                            <button className='banner_button play' onClick={() => setIsClicked(true)}>
                                <span>예고편 보기</span>
                            </button>
                        }
                    </div>
        
                    <p className='banner_description'>
                        { truncate(movie.overview,100) }
                    </p>
        
                </div>
                        <div className='banner_fadeBottom' />
            </header>
          )
        };
    }


  

export default Banner;


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`;

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.65;
    border: none;

    %::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;

