import React from 'react';
import PropTypes from 'prop-types';
import HeaderBar from '../../../components/HeaderBar';
import { Wrapper, Content } from './styles';

export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      
      <HeaderBar/>
      <Content>{children}</Content>
    </Wrapper>
  );
} 

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
