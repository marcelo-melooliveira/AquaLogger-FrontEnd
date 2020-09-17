import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '~/store/modules/auth/actions';
// import Notifications from '../Notifications';

import logo from '../../assets/logo ifce_ok.png'

import { Container, Content, Profile } from './styles';

export default function HeaderBar() {



  return (
    <div className='container-fluid p-0 fixed-top'>
    <nav className='navbar navbar-expand-md navbar-dark bg-light'>
    <img style={{width:159, height:50}} className='nav-brand' src={logo} alt="GoBarber" />
    <button style={{outline: 'none'}} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMainToggler"
            aria-controls="navbarMainToggler" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon "/>
    </button>

    <section className="collapse navbar-collapse" id="navbarMainToggler">
      <div className='navbar-nav ml-auto'>
          <Link className='nav-item nav-link text-primary' to="/">CONSUMO DIÁRIO</Link>
          <Link className='nav-item nav-link text-primary' to="/semanal">CONSUMO SEMANAL</Link>
          <Link className='nav-item nav-link text-primary' to="/mensal">CONSUMO MENSAL</Link>
          <Link className='nav-item nav-link text-primary' to="/anual">CONSUMO ANUAL</Link>
        </div>
    </section> 
    </nav>
  </div>
  );
}
