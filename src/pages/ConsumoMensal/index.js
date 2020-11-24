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
import {format, parseISO, addHours} from 'date-fns';
import isBefore from 'date-fns/isBefore'
import pt from 'date-fns/locale/pt';
import Ws from '@adonisjs/websocket-client';
import { Digital } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import { FiCalendar } from 'react-icons/fi';
import DatePicker, {registerLocale} from "react-datepicker";
import api from '../../services/api'
import HeaderBar from '../../components/HeaderBar';
import { GraficoContainer,
         DadosContainer,
         LoadContainer,
         DownloadContainer,
         ButtonDownload,
         InputContainer,
         CustomInput
        } from './styles';
import '../../../node_modules/react-vis/dist/style.css';
import "react-datepicker/dist/react-datepicker.css";


function ConsumoMensal() {
 
  const [dataAtual, setdataAtual] = useState(new Date());
  const [consumoFinal, setConsumoFinal] = useState();
  const [data_grafico, setDataGrafico] = useState([]);
  const [value, setValue] = useState([]);
  const [load, setLoad] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());
  const [loadDownload, setLoadDownload] = useState(false);
  
  


  function formata_dados(dados){
    const aux_dados = [{y: 0, x:'Janeiro'},{y: 0, x:'Fevereiro'},{y: 0, x:'Março'},{y: 0, x:'Abril'},{y: 0, x:'Maio'},{y: 0, x:'Junho'},{y: 0, x:'Julho'},{y: 0, x:'Agosto'},{y: 0, x:'Setembro'},{y: 0, x:'Outubro'},{y: 0, x:'Novembro'},{y: 0, x:'Dezembro'}];
       
    if(dados){     
        for(let i=0; i<dados.length; i+=1){
           aux_dados[dados[i].mes].y = dados[i].consumo;
        }
    }
        // for(let i=0; i<dados.length; i+=1){
        //   if(i === dados.length - 1){
        //     aux_dados[getMonth(parseISO(dados[i].data_criacao))].y = dados[i].consumo;
        //     setConsumoFinal(dados[i].consumo);
        //   } else if( getMonth(parseISO(dados[i].data_criacao)) !== getMonth(parseISO(dados[i+1].data_criacao)) ){
        //     aux_dados[getMonth(parseISO(dados[i].data_criacao))].y = dados[i].consumo;
        //      }
        // }
     // console.tron.log(aux_dados);
      setDataGrafico(aux_dados);
      setConsumoFinal(dados[dados.length- 1].consumo);
      setValue(dados[dados.length- 1].consumo);
      setLoad(false);
  }

async function data_fetch(){
  const aux_date = format(dataAtual, "yyyy'-'MM'-'dd")
    const res = await api.get('consumo-mensal',{
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


function download_csv(dados) {
  //   const dados = [
  //     ['Marcelo', 'Quixadá'],
  //     ['Cadmiel', 'Oiticica'],
  //     ['Tales', 'Pedra e cal']
  //  ];
  
    let csv = 'Consumo(m3);Mes;DataDeCriacao\n';
    dados.forEach( (row) => {
           // csv += row.join(';');
           csv += `${row.consumo};${row.mes + 1};${format(addHours(parseISO(row.data_criacao), 3), "dd'/'MM'/'yyyy'")}`;
            csv += "\n";
    });
    setLoadDownload(false);
     // console.log(csv);
    const hiddenElement = document.createElement('a');
    hiddenElement.href = `data:text/csv;charset=utf-8,${  encodeURI(csv)}`;
    hiddenElement.target = '_blank';
    hiddenElement.download = 'download-consumo-mensal.csv';
    hiddenElement.click();
  }
  
  
  async function fetch_download_csv() {
    const is_before = isBefore(startDate, finalDate)
    if(!is_before){
      alert('A "Data Inicial" deve ser anterior e diferente ao da "Data Final"!');
      return
    }
    setLoadDownload(true);
  const inicial_fomated = format(startDate, "yyyy'-'MM'-'dd");
  const final_fomated = format(finalDate, "yyyy'-'MM'-'dd");
  // alert(`${inicial_fomated} e ${final_fomated}`)
  
  const res = await api.get('download-mensal',{
    params : { data_ref_inicial: inicial_fomated,
               data_ref_final: final_fomated
     }
  });
  if(res.data.length === 0){
    setLoadDownload(false);
    alert('Nenhum dado foi encontrado no intervalo de tempo')
  }else{
    // console.log(res.data);
    download_csv(res.data);
  }
  
  
  }

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
            <XYPlot xType="ordinal" height={350} width={1200} margin={{ left:75}}>
              <VerticalGridLines />
              <HorizontalGridLines />
             
              <XAxis 
                attr="x"
                attrAxis="y"
                orientation="bottom"
               />
              <YAxis tickFormat={ (d)=>{ return `${d} m³`}} />
              <VerticalBarSeries 
              animation = {{damping: 9,stiffness: 300}}
                size={3}
                data={data_grafico} 
                onValueMouseOver={(valor)=> rememberValue(valor)}
                onValueMouseOut={()=> forgetValue()}
                />
              
           </XYPlot>
          }
        </GraficoContainer>
        </div>
      </ParallaxLayer>

      <ParallaxLayer
      offset={1}
      speed={0}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
     <DownloadContainer>
     <h3>Download CSV</h3>
      <div style={{display:'flex', flexDirection:'row', padding: 10}}>
          <InputContainer>
          <h3>Data Inicial</h3>
          <div style={{display: 'flex'}}>
          <FiCalendar size={18} color="#0B0B61" />
          <DatePicker
          selected={startDate}
          popperPlacement="top-start"
          onChange={date => {setStartDate(date)}}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          locale="pt"
          />
        </div>
          </InputContainer>
              <div style={{padding:10}}/>
          <InputContainer>
          <h3>Data Final</h3>
          <div style={{display: 'flex'}}>
            <FiCalendar size={18} color="#0B0B61" />
            <DatePicker
            selected={finalDate}
            popperPlacement="top-start"
            onChange={date => {setFinalDate(date)}}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            locale="pt"
            />
          </div>
          
          </InputContainer>
      </div>    
      <ButtonDownload onClick={()=> {fetch_download_csv()}}>
      {loadDownload ? (<LoadContainer><Digital color='#FFF' size={20} />
      <h3>Buscando</h3>
      </LoadContainer>) :
          <h1>Download</h1>
    }
      </ButtonDownload>  
      </DownloadContainer>   
     </ParallaxLayer>

  </Parallax>
    
  );
}

export default ConsumoMensal;