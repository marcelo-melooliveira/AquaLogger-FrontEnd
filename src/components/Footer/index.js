import React from 'react';
import { AiFillFacebook } from "react-icons/ai"
import { FiMapPin } from "react-icons/fi"

import { Footer } from './styles';

function redireciona(id){
  if(id === 1){
    window.open('https://www.facebook.com/MuseuTertulianodeMelo', '_blank')
  }

  if(id === 2){
    window.open('https://goo.gl/maps/NCStbZJjEYMReDsGA', '_blank')
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
        <FiMapPin size={35} color="#FFF" />
      </button>
      </Footer>
     
      
    
  );
}

