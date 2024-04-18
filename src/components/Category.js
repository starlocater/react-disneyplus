import React, { useRef } from 'react';
import styled from 'styled-components';

const Category = () => {

  // Create a ref for each video
  const disneyRef = useRef(null);
  const marvelRef = useRef(null);
  const pixarRef = useRef(null);
  const starwarsRef = useRef(null);
  const nationalRef = useRef(null);

  // Play video function
  const playVideo = (videoRef) => {
    if (videoRef && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(_ => {
          // Automatic playback started!
        }).catch(error => {
          // Auto-play was prevented
          // Show a UI element to let the user manually start playback
        });
      }
    }
  };

  // Pause video function
  const rewindVideo = (videoRef) => {
    if (videoRef && videoRef.current && !videoRef.current.paused) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  };

  return (
    <Container>
      <Wrap onMouseEnter={() => playVideo(disneyRef)} onMouseLeave={() => rewindVideo(disneyRef)}>
        <img src="/images/viewers-disney.png" alt="disney"/>
        <video ref={disneyRef} loop muted>
          <source src="/videos/disney.mp4" type="video/mp4"/>
        </video>
      </Wrap>
      <Wrap onMouseEnter={() => playVideo(marvelRef)} onMouseLeave={() => rewindVideo(marvelRef)}>
        <img src="/images/viewers-marvel.png" alt="marvel"/>
        <video ref={marvelRef} loop muted>
          <source src="/videos/marvel.mp4" type="video/mp4"/>
        </video>
      </Wrap>
      <Wrap onMouseEnter={() => playVideo(pixarRef)} onMouseLeave={() => rewindVideo(pixarRef)}>
        <img src="/images/viewers-pixar.png" alt="pixar"/>
        <video ref={pixarRef} loop muted>
          <source src="/videos/pixar.mp4" type="video/mp4"/>
        </video>
      </Wrap>
      <Wrap onMouseEnter={() => playVideo(starwarsRef)} onMouseLeave={() => rewindVideo(starwarsRef)}>
        <img src="/images/viewers-starwars.png" alt="starwars"/>
        <video ref={starwarsRef} loop muted>
          <source src="/videos/star-wars.mp4" type="video/mp4"/>
        </video>
      </Wrap>
      <Wrap onMouseEnter={() => playVideo(nationalRef)} onMouseLeave={() => rewindVideo(nationalRef)}>
        <img src="/images/viewers-national.png" alt="national-geographic"/>
        <video ref={nationalRef} loop muted>
          <source src="/videos/national-geographic.mp4" type="video/mp4"/>
        </video>
      </Wrap>
    </Container>
  )
}

export default Category


const Container = styled.div`
  margin-top: 30px;
  padding: 30px 0px 26px;
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(5, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
              rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  border: 3px solid rgba(249, 249, 249, 0.1);
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  // inset은 top bottom left right을 한번에 쓰는 옵션
  img {
    inset: 0px;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    opacity: 1;
    z-index: 1;
    transition: opacity 500ms ease-in-out 0s;
  }
  video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 0;
  }
  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px, rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    cursor: pointer;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
    video {
      opacity: 1;
    }
`;

