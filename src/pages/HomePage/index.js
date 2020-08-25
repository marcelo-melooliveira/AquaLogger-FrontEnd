import React, {useEffect, useState, useRef} from 'react';
// import { Link } from 'react-router-dom';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import {XYPlot,
        LineMarkSeries,
        AreaSeries,
        VerticalGridLines,
        HorizontalGridLines,
        XAxis,
        YAxis,
        Hint
      } from 'react-vis';
import {format} from 'date-fns';
import pt from 'date-fns/locale/pt';
import Ws from '@adonisjs/websocket-client';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import api from '../../services/api'
import HeaderBar from '../../components/HeaderBar';
import { GraficoContainer, DadosContainer} from './styles';
import '../../../node_modules/react-vis/dist/style.css';

const ws = Ws('ws://localhost:3333').connect();

function HomePage() {
 
  const [dataAtual, setdataAtual] = useState(new Date());
  const [dadosPrimarios, setDadosPrimarios] = useState([]);
  const [data_grafico, setDataGrafico] = useState([]);
  const [value, setValue] = useState([]);
  
  


  function formata_dados(dados){
    if(dados){
      console.tron.log('entrou no if do formata dados!')
      console.tron.log(dados)
        const aux_dados = [];
        for(let i=0; i<dados.length; i+=1){
          aux_dados.push({y: dados[i].consumo, x: Date.parse(dados[i].data_criacao)})
        }
         console.log(aux_dados)
      setDataGrafico(aux_dados);
      setValue(dados[dados.length- 1].consumo);
      
    }
  }

async function data_fetch(){
  const aux_date = format(dataAtual, "yyyy'-'MM'-'dd")
    const res = await api.get('consumo-diario',{
      params : { date: aux_date }
    });
    if(res.data){
      formata_dados(res.data);
    }
  }

  


useEffect(() => {
  const socket_consumo = ws.subscribe('consumo');
  ws.on('open', ()=>{// alert('entrou no websocket');
 })
 ws.on('error', ()=>{ alert('erro no websocket');
 })
 ws.on('close', ()=>{  alert('fechou o websocket');
 })
  // socket_consumo.on('message', (dataa)=> {
  //   alert(dataa);
  // });

  socket_consumo.on('new', (dataa)=> {
    // console.tron.log(dataa)
    formata_dados(dataa);
  });
  //  socket_consumo.emit('message', 'Vindo do frontend!')
  
  data_fetch();
   // monta_dados_grafico();
}, [])




function forgetValue () {
 const { y } = data_grafico[data_grafico.length - 1];
  setValue(y);
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
          <h1>{format(new Date(), "dd'/'MM'/'yyyy")}</h1>
          <h2>Consumo: {value} m³</h2>
        </DadosContainer>   

        <GraficoContainer>
            <XYPlot height={350} width={(data_grafico.length*20) + 350} margin={{ left:75}} style={{overflowX:'auto'}}>
              <VerticalGridLines />
              <HorizontalGridLines />
             
              <XAxis tickTotal={10} tickFormat={ (d)=>{return format(new Date(d), "HH':'mm")}} tickLabelAngle={-45} />
              <YAxis tickFormat={ (d)=>{ return `${d} m³`}} />
              <LineMarkSeries 
                style={{}}
                curve='curveLinear' 
                size={3}
                data={data_grafico} 
                onValueMouseOver={(valor)=> rememberValue(valor)}
                onValueMouseOut={()=> forgetValue()}
                />
              {// value ? <Hint value={value} /> : null
            }
           </XYPlot>
        </GraficoContainer>
        </div>
      </ParallaxLayer>
  </Parallax>
    
  );
}

export default HomePage;