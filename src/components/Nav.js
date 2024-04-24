import React, { useEffect,useState, useRef } from 'react'
import styled, {StyleSheetManager} from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';


const Nav = () => {
    // Navigation 창을 표시할지 안할지를 결정하는 state
    const [show, setShow] = useState(false);
    const location = useLocation();
    // 검색어를 저장하는 state
    // Extract the 'q' query parameter to initialize searchValue
    const searchParams = new URLSearchParams(location.search);
    const initialSearchValue = searchParams.get('q') || ""; // Default to an empty string if 'q' is not present
    const [searchValue, setSearchValue] = useState(initialSearchValue);
    // 검색한 값을 바탕으로 페이지를 이동시키는 상수
    const navigate = useNavigate();
    const inputRef = useRef(null);
    // Firebase 구글 로그인 인스턴스
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    // localStorage에 userDat가 있으면 저장하는 상수
    const initialUserData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {};
    // Firebase 로그인 시 로그인한 유저의 정보를 저장하는 State
    const [userData, setUserData] = useState(initialUserData);

    

    const handleLogoClick = () => {
      if (inputRef.current) {
        inputRef.current.blur();
      }
      window.location.href = "/main";
    };

    // Scroll 시 Nav창을 표시하게 만드는 함수
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    // 검색창 입력값에 따라 url 경로를 자동으로 바꿔주는 함수
    const handleChange = (e) => {
      setSearchValue(e.target.value);
      navigate(`/search?q=${e.target.value}`);
    };

    const handleClick = () => {
      navigate('/search')
    };


    // Login redirection
    useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
        if(currentUser) {
          if(location.pathname === '/') {
            navigate('/main');
          }
        } else {
          navigate('/');
        }
      })
    }, [auth, navigate, location.pathname]);

    useEffect(() => { // Step 3: Use useEffect to set focus when pathname changes
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, [location.pathname]);



    useEffect(() => {
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll);
      }
    }, [show]);

    const handleAuth = () => {
      signInWithPopup(auth, provider)
      .then((result) => {
        setUserData(result.user);
        localStorage.setItem('userData', JSON.stringify(result.user));
      })
      .catch((error) => {
        alert(error.message);
      })
    };

    const handleLogOut = () => {
      signOut(auth).then(() => {
        setUserData({});
        navigate('/');
      }).catch((error) => {
        alert(error.message);
      });
    };
    

  return (
    <StyleSheetManager shouldForwardProp={(prop) => !['show'].includes(prop)}>
      <NavWrapper show={show}>
          <Logo>
              <img alt="Disney plus Logo" src="/images/logo.svg" onClick={handleLogoClick}/>
          </Logo>

          {location.pathname === "/" ? (<Login onClick={handleAuth}>Login</Login>) : 
          <Input ref={inputRef} value={searchValue} onChange={handleChange} onClick={handleClick} className='nav__input' type='text' placeholder='Search'/>}

          {location.pathname !== "/" && userData ? (
          <SignOut>
            <UserImg src={userData.photoURL} alt={userData.displayName} />
            <Dropdown>
              <span onClick={handleLogOut}>Sign Out</span>
            </Dropdown>
          </SignOut>
          ) : null}
      </NavWrapper>
    </StyleSheetManager>
  )
}

export default Nav

const NavWrapper = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: ${props => props.show ? "#090b13" : "transparent"};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
`;

const Logo = styled.a`
    cursor: pointer;
    padding:0;
    width: 80px;
    margin-top: 4px;
    max-height: 70px;
    font-size: 0;
    display: inline-block;
    img {
        display: block;
        width: 100%;
    }
`

const Login = styled.a`
    background-color: rgba(0,0,0,0.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    transition: all 0.2s ease 0s;
    cursor: pointer;

    &:hover {
      background-color: #f9f9f9;
      color: gray;
      border-color: transparent;
    }
`;

const Input = styled.input`
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: rgba(0,0,0, 0.582);
    border-radius: 5px;
    color: white; 
    padding: 5px;
    border: none;
    box-shadow: 0 0 8px rgba(0, 255, 255, 0.8), /* Inner glow */
                0 0 20px rgba(0, 255, 255, 0.8), /* Mid glow */
                0 0 30px rgba(0, 255, 255, 0.8), /* Outer glow */
                0 0 40px rgba(0, 0, 255, 0.6), /* Deep blue outer glow */
                0 0 70px rgba(0, 0, 255, 0.6); /* Wider deep blue glow */
`;

const Dropdown = styled.div`
    position: absolute;
    top: 48px;
    right: 0px;
    background: rgb(19, 19, 19);
    border: 1px solid rgba(151, 151, 151, 0.34);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 3px;
    width: 100%;
    opacity: 0;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    ${Dropdown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;



