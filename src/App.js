import Nav from './components/Nav'
import Banner from './components/Banner';
import styled from 'styled-components';
import './App.css';
import Category from './components/Category';
import Row from './components/Row';
import requests from './api/request';

function App() {
  return (
    <div className="App">
      <MainContainer>
        <Nav/>
        <Banner/>
        <Category/>
        <Row title="Trending Now" id="TN" fetchURL={requests.fetchTrending}/>
        <Row title="Top Rated" id="TR" fetchURL={requests.fetchTopRated}/>
        <Row title="Action" id="AC" fetchURL={requests.fetchActionMovies}/>
        <Row title="Comedy" id="CM" fetchURL={requests.fetchComedyMovies}/>
        <Row title="Horror" id="HR" fetchURL={requests.fetchHorrorMovies}/>
        <Row title="Romance" id="RM" fetchURL={requests.fetchRomanceMovies}/>
        <Row title="Documentary" id="DM" fetchURL={requests.fetchDocumentaries}/>
      </MainContainer>
    </div>
  );
}

export default App;


const MainContainer = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;  
  // Nav의 높이가 70이므로
  padding: 0 calc( 3.5vw + 5px );

  &:after {
    background: url("/images/home-background.png") center center / cover no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;