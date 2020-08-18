import React from 'react';
import PropTypes from 'prop-types';
import HeaderBar from '../../../components/HeaderBar';
import FooterBar from '../../../components/Footer';

import { Wrapper, Container } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <Container>
      
      <Wrapper>
        {children}
      </Wrapper>
      <FooterBar/>
    </Container>
   
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
