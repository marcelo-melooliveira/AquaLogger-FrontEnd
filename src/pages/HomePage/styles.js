import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 0 10px;

  img {
    width: 100%;
    height: auto;
  }
`;

export const DadosContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  background-color: #FFF;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;

  h3 {
    align-self: center;
  };

  h2 {
    align-self: center;
  }

`;


export const GraficoContainer = styled.div`
  display: flex;
  width: 96%;
  align-self: center;
  background-color: #FFF;
  padding-top: 20px;
  padding-left: 20px;
  border-radius: 20px;
  overflow-x: auto;
  scroll-behavior: 
 
`;

export const CarrouselContainer = styled.div`
  display: flex;
  max-width: 500px;
  min-width: 350px;
  margin-top: 20px;
  background-color: #FFF;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 10px;
`;

export const CarrouselContainer2 = styled.div`
  display: flex;
  max-width: 500px;
  margin-top: 20px;
  background-color: #FFF;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 10px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  min-width: 350px;
  background-color: #FFF;
  align-self: center;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 10px;
`;

export const LoadContainer = styled.div`
  height:350px;
  width: 1200px;
  justify-content:center;
  align-items:center;
  display: flex;
  

  strong {
      color: #fff;
      font-size: 20px;
      margin: 0 15px;
      font-weight:bold;
    }
  ;`