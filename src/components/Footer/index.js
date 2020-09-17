import React from 'react';
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai"
import { FiMapPin } from "react-icons/fi"

import { Footer } from './styles';

function redireciona(id){
  if(id === 1){
    window.open('https://www.facebook.com/ifcequixada', '_blank')
  }

  if(id === 2){
    window.open('https://www.instagram.com/ifcequixada/?hl=pt-br', '_blank')
  }

  if(id === 3){
    window.open('https://goo.gl/maps/BdJP4GpFYrkHy9nq8', '_blank')
  }
 
}

export default function FooterBar() {
  return (
      <Footer className='fixed-bottom'>
        <button type="button" onClick={() => redireciona(1)}>
          <AiFillFacebook size={35} color="#FFF" />
        </button>
        <div style={{paddingLeft: 15}} />
        <button type="button" onClick={() => redireciona(2)}>
          <AiFillInstagram size={35} color="#FFF" />
        </button>
        <div style={{paddingLeft: 15}} />
        <button type="button" onClick={() => redireciona(3)}>
        <FiMapPin size={35} color="#FFF" />
      </button>
      </Footer>
     
      
    
  );
}

