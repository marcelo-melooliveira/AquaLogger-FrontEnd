import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
// import { Container } from './styles';

function CarouselImage() {
  return (
    <Carousel indicators={false} slide >

  <Carousel.Item>
    <img
      className="d-block w-70"
      src={require('../../assets/FotosNetoMelo/netomelo1.jpg')}
      alt="First slide"
    />
  </Carousel.Item>


  <Carousel.Item>
    <img
      className="d-block w-70"
      src={require('../../assets/FotosNetoMelo/netomelo2.jpg')}
      alt="Third slide"
    />
  </Carousel.Item>

  <Carousel.Item>
    <img
      className="d-block w-70"
      src={require('../../assets/FotosNetoMelo/netomelo3.jpg')}
      alt="Third slide"
    />
  </Carousel.Item>

  <Carousel.Item>
    <img
      className="d-block w-70"
      src={require('../../assets/FotosNetoMelo/netomelo4.jpg')}
      alt="Third slide1"
    />
  </Carousel.Item>

  <Carousel.Item>
    <img
      className="d-block w-70"
      src={require('../../assets/FotosNetoMelo/netomelo5.jpg')}
      alt="Third slide2"
    />
  </Carousel.Item>
</Carousel>
  );
}

export default CarouselImage;