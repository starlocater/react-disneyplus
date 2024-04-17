import Nav from './components/Nav'
import Banner from './components/Banner';
import styled from 'styled-components';
import './App.css';
import Category from './components/Category';

function App() {
  return (
    <div className="App">
      <MainContainer>
        <Nav/>
        <Banner/>
        <Category/>
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