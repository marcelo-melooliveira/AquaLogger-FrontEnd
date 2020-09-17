import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import HomePage from '../pages/HomePage'
import ConsumoSemanal from '../pages/ConsumoSemanal'
import ConsumoMensal from '../pages/ConsumoMensal'
import ConsumoAnual from '../pages/ConsumoAnual'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/semanal" component={ConsumoSemanal}/>
      <Route path="/mensal" component={ConsumoMensal}/>
      <Route path="/anual" component={ConsumoAnual}/>

      <Route path="/" component={() => <h1>404 - Page not found</h1>} />
    </Switch>
  );
}
