import Form from 'react-bootstrap/Form';
import React, { Component } from 'react';
import Button from './Button';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import { useState } from 'react';
import './CardComponent.css';

const CardComponent = () => {

    const [state, setState] = useState({
        nameInput: "",
        dateInput: "",
        cvvInput: ""
    })
    const [clickstate, setclickstate] = useState({        
        nameInput : true,
        cvvInput : true
    })

    const [clickcvv, setclickcvv] = useState(true);
    const [clickname, setclickname] = useState(true);
    const [cardNumberErrorstate, setcardNumberErrorstate] = useState(true);
    
    const [errorstate, seterrorstate] = useState(true);
    
    const inputclickHandler = (event) => {
        
        if((state.nameInput.trim.length===0) || (state.cvvInput.trim.length===0)){
            seterrorstate(true);
        }
        else{
            seterrorstate(false);
        }

        setclickstate({            
            ...state,
            [event.target.name]: false
        });
        
    }
    
   

    const inputChangeHandler = (event) => {
        
        
            
            if((state.nameInput.length===0) || (state.cvvInput.length===0)){
                seterrorstate(true);
            }
            else{
                seterrorstate(false);
            }
           
            setState({
                ...state,
                [event.target.name]: event.target.value
            });
            console.log(state.nameInput);

        
       
    }


    const formHandler = (event) => {
        event.preventDefault();
        const formdata = {
            name: `${state.nameInput}`,
            price: `${state.priceInput}`,
            date: `${state.dateInput}`
        }
        

    }

    const onError = (error,erroredInputs) => {
        console.log(error)
        if(error) {
            setcardNumberErrorstate(true);
        }
    }

    const {
        wrapperProps,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps
    } = usePaymentInputs({onError});

   
    
    return (
        <div className='card-container'>
            <div className='card-input-container'>
                <h2>Add New Card</h2>
            </div>

            <form onSubmit={formHandler}>
                <div className='card-input-container'>
                    <h4>Enter Card Number</h4>
                    <PaymentInputsWrapper {...wrapperProps}>
                        <svg {...getCardImageProps({ images })} />
                        <input {...getCardNumberProps()} style={{ width: '100%' }} />
                        
                    </PaymentInputsWrapper>
                     {/* <input type="text"  onChange={inputChangeHandler} name='nameInput' onClick={inputclickHandler}  val={state.nameInput} /> */}
                </div>
                <div className='card-input-container'>
                    <h4>Enter Name on Card</h4>
                    <input type="text"  onChange={inputChangeHandler} name='nameInput' onClick={inputclickHandler}  val={state.nameInput} />
                    
                    {(Boolean(clickstate.nameInput)) || (Boolean(state.nameInput.length) || (                   
                        <div className="err-msg">
                            Please enter name
                        </div>
                    ))}
                </div>
                <div>
                    <div className='card-input-container' style={{ width: '50%' }}>
                        <h4>Valid through</h4>
                        <input {...getExpiryDateProps()} />
                    </div>
                    <div className='card-input-container' style={{ width: '50%' }}>
                        <h4>Enter CVV</h4>
                        <input type='password' name='cvvInput' onClick={inputclickHandler} onChange={inputChangeHandler} val={state.cvvInput} placeholder='CVV' maxLength='3' />
                      
                        {(Boolean(clickstate.cvvInput)) || (Boolean(state.cvvInput.length) ||  (
                            
                            <div className="err-msg">
                                Please enter CVV
                            </div>
                        ))}
                        
                    </div> 

                </div>
            


            </form>
           

            <Button disable={Boolean(errorstate&&cardNumberErrorstate)}>Pay Amount</Button>
        </div>
    );
}

export default CardComponent;