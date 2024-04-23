import './App.css';
import { Route, Routes, Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import CategoryDetail from './components/CategoryDetail';

const Layout = () => {
  return (
    <div>
      <Nav/>

      <Outlet/>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="main" element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="category/:categoryName" element={<CategoryDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

