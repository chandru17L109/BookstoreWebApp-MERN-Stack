import React, { Component } from 'react';
import './NetBanking.css'
import { ReactComponent as ReactHdfcLogo } from '../Icons/hdfc-bank-logo.svg';
import { ReactComponent as ReactIciciLogo } from '../Icons/icici-1.svg';
import { ReactComponent as ReactAxisLogo } from '../Icons/Axis_Bank-Logo.wine.svg';

import { ReactComponent as ReactSbiLogo } from '../Icons/sbi-state-bank-of-india.svg';
import { useState,useRef,useEffect} from 'react';
import Button from './Button';


const NetBanking = () => {
    const box = useRef(null);
    const box2 = useRef(null)
    useOutsideAlerter(box);
   
   

    function useOutsideAlerter(ref) {
        useEffect(() => {
        
        
          function handleOutsideClick(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              setbankState('');
              setdisablebutton(true)
            
            }
          }
        
          // Adding click event listener
          document.addEventListener("click", handleOutsideClick);
        
        }, [ref]);
      }

    const [bankState, setbankState] = useState('');
    const [disablebutton,setdisablebutton] = useState(true);
    const [optionValue, setoptionValue] = useState('Other Banks');

    const optionChangeHandler = (event) =>  {          
        setdisablebutton(false);
          
    }
    

    return (
      
        
            <div className="Main-container"  >
                <h2>Select Bank</h2>
                <div ref={box}>
                <div className={`bank-vector-container ${bankState === 'HDFC' ? 'active-bank':''}`} onClick={() =>{
                     setbankState('HDFC');
                     setdisablebutton(false);
                     }}> <ReactHdfcLogo />
                    <h5>HDFC</h5>
                </div>

                <div className={`bank-vector-container ${bankState === 'ICICI' ? 'active-bank':''}`} onClick={() => {
                    setbankState('ICICI')
                    setdisablebutton(false);
                }}> <ReactIciciLogo />
                    <h5>Icici</h5>
                </div>

                <div className={`bank-vector-container ${bankState === 'Axis' ? 'active-bank': ''}`} onClick={() => {
                    setbankState('Axis')
                    setdisablebutton(false);
                }}> <ReactAxisLogo />
                    <h5>Axis</h5>
                </div>

                <div className={`bank-vector-container ${bankState === 'SBI' ? 'active-bank' : ''}`} onClick={() => {

                setbankState('SBI')
                setdisablebutton(false);
            }}> <ReactSbiLogo />
                    <h5>SBI</h5>
                </div>
                </div>

                <div >
                    <select name="bank-selection"  onChange={optionChangeHandler} size="1">
                        <option selected='true'>Other Banks</option>                       
                        <option  value="canara-bank">Canara Bank</option>
                        <option  value="Kotak-Mahindra-bank">Kotak Mahindra Bank</option>
                        <option  value="SBI-bank">South India Bank</option>
                    </select>

                </div>
                <Button disable={disablebutton}>Pay amount</Button>
            
            </div>


       


    );
}

export default NetBanking;


