import React from 'react'
import './UpiComponent.css'
import { ReactComponent as ReactPaytmLogo } from '../Icons/Paytm-Logo.svg';
import { ReactComponent as ReactPhonepeLogo } from '../Icons/Phonepe-logo.svg';
import { ReactComponent as ReactGpayLogo } from '../Icons/gpay-logo.svg';
import { useState,useEffect,useRef } from 'react';
import Button from './Button';

const UpiComponent = () => {

    const box = useRef(null);
    useOutsideAlerter(box);

    function useOutsideAlerter(ref) {
        useEffect(() => {
        
        
          function handleOutsideClick(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              setupiState('');
              setdisablebutton(true)            
            }
          }
        
          // Adding click event listener
          document.addEventListener("click", handleOutsideClick);
        
        }, [ref]);
      }
     
     const [disablebutton,setdisablebutton] = useState(true);

    const [upiState, setupiState] = useState('');
    return (
        <div className='upi-container'>
            <h4>Enter your UPI Id</h4>
            <input type='text' onChange={() => setdisablebutton(false)} placeholder='1234567890@upi'></input>
            <h4>Other UPI apps</h4>
            <div ref={box}>
                <div className={`upi-vector-container ${upiState === 'Paytm' && 'active-UPI'}`} onClick={() => {
                    setupiState('Paytm')
                    setdisablebutton(false)}}> <ReactPaytmLogo />

                </div>

                <div className={`upi-vector-container ${upiState === 'Phonepe' && 'active-UPI'}`} onClick={() => {
                    setupiState('Phonepe')
                    setdisablebutton(false)}}> <ReactPhonepeLogo />

                </div>

                <div className={`upi-vector-container ${upiState === 'Gpay' && 'active-UPI'}`} onClick={() => {
                    setupiState('Gpay')
                    setdisablebutton(false)}}> <ReactGpayLogo />
                </div>
            </div>
            <Button disable={disablebutton}>Pay amount</Button>
        </div>

    )
}

export default UpiComponent
