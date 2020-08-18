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

export const VideoContainer = styled.div`
  display: flex;
  width: 96%;
  flex-direction: column;
  background-color: #FFF;
  padding-top: 20px;
  padding-left: 50px;
  border-radius: 20px;
  align-self: center;
  align-items: center;
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