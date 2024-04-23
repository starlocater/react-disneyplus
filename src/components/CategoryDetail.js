import React from 'react'
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
// 스타워즈는 TMDb collection 사용, 마블은 keyword 사용, 
// 디즈니 : 329234, 마블: 180547, 픽사:307513, 스타워즈:10, 내셔널 지오그래픽:284177 

const CategoryDetail = () => {
    const { categoryName } = useParams(); // Access the category parameter
    // const response = await axios.get(`/${categoryName}/movies`);
  return (
    <Sorry>
      <SorryText> {categoryName} 키워드를 가진 영화들을 보여드리고 싶은데요, TMDb에 키워드 등록이 어설프게 되어있어서 불가능하네요.. 미안합니다. </SorryText>
    </Sorry>
  )
}

export default CategoryDetail;

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// `;

// const ModalContent = styled.div`
//   background: white;
//   padding: 20px;
//   border-radius: 5px;
// `;

const Sorry = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
`;

const SorryText = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
`;


// 소회: useParams를 사용해서 router에 등록해놓은 경로를 변수로 빼와서 사용하는 방식을 학습한것에 의의가 있다.