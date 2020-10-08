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
import { Digital } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import {format, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';
import Ws from '@adonisjs/websocket-client';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import api from '../../services/api'
import HeaderBar from '../../components/HeaderBar';
import { GraficoContainer, DadosContainer, LoadContainer} from './styles';
import '../../../node_modules/react-vis/dist/style.css';


function HomePage() {
 
  const [dataAtual, setdataAtual] = useState(new Date());
  const [dadosPrimarios, setDadosPrimarios] = useState([]);
  const [data_grafico, setDataGrafico] = useState([]);
  const [value, setValue] = useState([]);
  const [load, setLoad] = useState(true);
  
  


  function formata_dados(dados){
    let soma_consumo = 0;
    if(dados){
      console.log('*** entrou no if do formata dados');
      // console.tron.log('entrou no if do formata dados!')
      // console.tron.log(dados)
        const aux_dados = [];
        for(let i=0; i<dados.length; i+=1){
          soma_consumo += dados[i].consumo;
          aux_dados.push({y: soma_consumo, x: Date.parse(dados[i].data_criacao)})
        }
         console.log(aux_dados)
      setDataGrafico(aux_dados);
      setValue(soma_consumo.toFixed(2));
      setLoad(false);
      
    }
  }

async function data_fetch(){
  const aux_date = format(dataAtual, "yyyy'-'MM'-'dd")
    const res = await api.get('consumo-diario',{
      params : { date: aux_date }
    });
    console.log('*** data fetch');
    console.log(res.data);
    if(res.data){
      formata_dados(res.data);
    }else{
      alert('Erro ao carregar os dados!')
    }
  }

  


useEffect(() => {
  const ws = Ws('ws://mellus.com.br:3333').connect();
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
  setValue(y.toFixed(2));
};

function rememberValue (aux_value) {
   const { y } = aux_value
   setValue(y.toFixed(2)); 
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
            <XYPlot height={350} width={(data_grafico.length*20) + 350} margin={{ left:75}} style={{overflowX:'auto'}}>
              <VerticalGridLines />
              <HorizontalGridLines />
             
              <XAxis tickTotal={25} tickFormat={ (d)=>{ return format( new Date(d + 10800000), "HH':'mm")}} tickLabelAngle={-45} />
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
          }
        </GraficoContainer>
        </div>
      </ParallaxLayer>
  </Parallax>
    
  );
}

export default HomePage;