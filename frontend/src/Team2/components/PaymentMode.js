import React from 'react';
import CardComponent from './Cardcomponent';
import NetBanking from './NetBanking';
import CodComponent from './CodComponent';
import UpiComponent from './UpiComponent';

const PaymentMode = (props) => {
    console.log(props.comp)
  
  switch(props.comp){
    case('Card') :
        return(<CardComponent/>);
    case('NB') :
        return(<NetBanking/>);
    case('UPI') :
        return(<UpiComponent/>);       
    case('COD') :
        return(<CodComponent/>);
  }
   
}

export default PaymentMode
