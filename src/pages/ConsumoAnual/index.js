import React, {useEffect, useState, useRef} from 'react';
// import { Link } from 'react-router-dom';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import {XYPlot,
        LineMarkSeries,
        VerticalBarSeries,
        VerticalGridLines,
        HorizontalGridLines,
        XAxis,
        YAxis,
        Hint
      } from 'react-vis';
import {format, parseISO, getDay} from 'date-fns';
import pt from 'date-fns/locale/pt';
import Ws from '@adonisjs/websocket-client';
import { Digital } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import api from '../../services/api'
import HeaderBar from '../../components/HeaderBar';
import { GraficoContainer, DadosContainer, LoadContainer} from './styles';
import '../../../node_modules/react-vis/dist/style.css';


function ConsumoAnual() {
 
  const [dataAtual, setdataAtual] = useState(new Date());
  const [consumoFinal, setConsumoFinal] = useState();
  const [data_grafico, setDataGrafico] = useState([]);
  const [value, setValue] = useState([]);
  const [load, setLoad] = useState(true)
  
  


  function formata_dados(dados){
    const aux_dados = [];
    // const aux_dados = [{2020: {y:0, x: "2020"}, 2021: {y:0, x: "2021"}, 2022: {y:0, x: "2020"}}];
    if(dados){  
      for(let i=0; i<dados.length; i+=1){
          aux_dados.push({y: dados[i].consumo, x: `${dados[i].ano}`})   
      }
       
        // let soma_consumo = 0;
        // for(let i=0; i<dados.length; i+=1){
        //   if(i === dados.length - 1){
        //     soma_consumo += dados[dados.length - 1].consumo;
        //     setConsumoFinal(dados[i].consumo);
        //   } else if( getMonth(parseISO(dados[i].data_criacao)) !== getMonth(parseISO(dados[i+1].data_criacao)) ){
        //        soma_consumo += dados[i].consumo;
        //      }     
        // }
        // aux_dados.push({y: soma_consumo, x: getMonth(parseISO(dados[0].data_criacao))})
     // console.tron.log(aux_dados);
      setDataGrafico(aux_dados);
      setConsumoFinal(dados[dados.length- 1].consumo);
      setValue(dados[dados.length- 1].consumo);
      setLoad(false);
      
    }
  }

async function data_fetch(){
  const aux_date = format(dataAtual, "yyyy'-'MM'-'dd")
    const res = await api.get('consumo-anual',{
      params : { date: aux_date }
    });
    if(res.data){
      formata_dados(res.data);
    }
  }

  


useEffect(() => {
//   const ws = Ws('ws://localhost:3333').connect();
//   const socket_consumo = ws.subscribe('consumo');
//   ws.on('open', ()=>{// alert('entrou no websocket');
//  })
//  ws.on('error', ()=>{ alert('erro no websocket');
//  })
//  ws.on('close', ()=>{  alert('fechou o websocket');
//  })
 

//   socket_consumo.on('new', (dataa)=> {
   
//     formata_dados(dataa);
//   });
  
  data_fetch();
   // monta_dados_grafico();
}, [])




function forgetValue () {
  setValue(consumoFinal);
};

function rememberValue (aux_value) {
   const { y } = aux_value
   setValue(y); 
};

let parallax = null;
const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`
return (

  <Parallax ref={ref => (parallax = ref)} pages={2}>
  <ParallaxLayer offset={0} speed={0} factor={3} style={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }}/>

    <ParallaxLayer
      offset={0}
      speed={0.1}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <HeaderBar />

      <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
      
      <DadosContainer>
        <h2>{format(new Date(), "dd'/'MM'/'yyyy")}</h2>
        <h3>Consumo: {value} m³</h3>
      </DadosContainer>   

      <GraficoContainer>
      {load ? (<LoadContainer><Digital color='#9F81F7' size={40} /></LoadContainer>) : 
          <XYPlot xType="ordinal" height={350} width={(data_grafico.length * 300)} margin={{ left:75}}>
            <VerticalGridLines />
            <HorizontalGridLines />
           
            <XAxis 
              attr="x"
              attrAxis="y"
              orientation="bottom"
             />
            <YAxis tickFormat={ (d)=>{ return `${d} m³`}} />
            <VerticalBarSeries 
              data={data_grafico} 
              onValueMouseOver={(valor)=> rememberValue(valor)}
              onValueMouseOut={()=> forgetValue()}
              />
            
         </XYPlot>
        }
      </GraficoContainer>
      </div>
    </ParallaxLayer>
</Parallax>
  
);
}

export default ConsumoAnual;