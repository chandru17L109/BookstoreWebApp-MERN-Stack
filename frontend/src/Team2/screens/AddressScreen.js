import React, { useState, useEffect } from "react";
import AddressItem from "./AddressItem";
import './AddressScreen.css'
import OrderSummary from "../components/OrderSummary";
import * as actions from "../action/action";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

import CustomizedSnackbars from '../../Team4/alert_notify/alert';

function AddressScreen(props) {
  const [arr, Setarr] = useState([]);
  const [radio, setRadio] = useState();
  const [add, Setadd] = useState(true);

  // form state for edit option
  const [pinCode, setPincode] = useState("");
  const [houseNumber, setflatno] = useState("");
  const [locality, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [id, SetId] = useState("");
  const [address, SetAddress] = useState("");

  //Form Validations
  const [pinError, Setpinerror] = useState(false);
  const [houseNumberError, SethouseNumbererror] = useState(false);
  const [localityError, Setlocalityerror] = useState(false);
  const [cityError, Setcityerror] = useState(false);
  const [addresserror, SetAddresserror] = useState(false);
  const [notify, setNotify] = useState(null)


  class sendaddress {
    constructor(pinCode, houseNumber, locality, city, state) {
      this.pinCode = pinCode;
      this.houseNumber = houseNumber;
      this.locality = locality;
      this.city = city;
      this.state = state;
    }
  }

  const addAddress = () => {

    if (!(pinError || houseNumberError || localityError || cityError) && (pinCode && houseNumber && locality && city && state)) {

      props.onAddAddress(
        new sendaddress(
          pinCode,
          houseNumber,
          locality,
          city,
          state
        ),
        props.userdetail.email,
        props.userdetail.name,
        props.userdetail.phone
      );
      setNotify(<CustomizedSnackbars open={true} message={"Address added successfully"} />)

      setTimeout(() => {
        setNotify(null)
      }, 2000)


    }
    else {
      setNotify(<CustomizedSnackbars open={true} message={"Enter valid address"} />)

      setTimeout(() => {
        setNotify(null)
      }, 2000)
      SetAddresserror(true);
    }


    resetform();
  };

  const editaddress = (id, arr) => {


    setArea(arr.locality);
    setPincode(arr.pinCode);
    setflatno(arr.houseNumber);
    setCity(arr.city);
    setState(arr.state);
    SetId(id);
    SetAddress(arr);
    Setadd(false)

  };

  const updateaddress = () => {
    if (!(pinError || houseNumberError || localityError || cityError) && (pinCode && houseNumber && locality && city && state)) {

      props.OnEditAddress(
        id,
        new sendaddress(pinCode, houseNumber, locality, city, state),
        props.userdetail.email
      );
      setNotify(<CustomizedSnackbars open={true} message={"Address updated "} />)

      setTimeout(() => {
        setNotify(null)
      }, 2000)

    }
    else {
      setNotify(<CustomizedSnackbars open={true} message={"Enter valid address"} />)

      setTimeout(() => {
        setNotify(null)
      }, 2000)
      SetAddresserror(true);
    }


    resetform();
    Setadd(true);
  };

  const resetform = () => {

    setArea("");
    setCity("");
    setPincode("");
    setState("");
    setflatno("");
  };

  useEffect(() => {
    props.onAddressLoad(props.userdetail.email);

    props.onCartLoad(props.userdetail.email);
  }, []);

  const deleteAddress = (_id) => {
    setNotify(<CustomizedSnackbars open={true} message={"Address delted"} />)

    setTimeout(() => {
      setNotify(null)
    }, 2000)

    props.onDeleteAddress(_id, props.userdetail.email);
  };

  const pinCodeValid = (e) => {
    const expression = new RegExp('^[0-9]{6}$')
    let pinValue = e.target.value;
    if (!expression.test(pinValue)) {
      setPincode(pinValue);
      Setpinerror(true)
    } else {
      setPincode(pinValue);
      Setpinerror(false)
    }

  }
  const houseNumberValid = (e) => {
    const expression = new RegExp('^[0-9]')
    let houseNumberValue = e.target.value;
    if (!expression.test(houseNumberValue)) {
      setflatno(houseNumberValue);
      SethouseNumbererror(true)
    } else {
      setflatno(houseNumberValue);
      SethouseNumbererror(false)
    }

  }

  const localityValid = (e) => {
    const expression = new RegExp('[a-zA-Z]')
    let localityValue = e.target.value;
    if (!expression.test(localityValue)) {
      setArea(localityValue);
      Setlocalityerror(true)
    } else {
      setArea(localityValue);
      Setlocalityerror(false)
    }

  }

  const cityValid = (e) => {
    const expression = new RegExp('[a-zA-Z]')
    let cityValue = e.target.value;
    if (!expression.test(cityValue)) {
      setCity(cityValue);
      Setcityerror(true)
    } else {
      setCity(cityValue);
      Setcityerror(false)
    }

  }

  return (

    <div className='wrapper-container' >
      {notify}
      <div className='address-container'>
        <div className='address-list'>
          <h2 className="text-primary">Select a delivery address</h2>
          {props.address ? (props.address.map((element) => {
            return (
              <AddressItem
                key={element._id}
                arr={element}
                radio={radio}
                setRadio={setRadio}
                delete={deleteAddress}
                editaddress={editaddress}
                Setadd={Setadd}
              ></AddressItem>
            );
          }
          )) : <br></br>}
          <br></br>
          <br></br>
        </div>
        <div className="form">
          <h2 className="text-primary"> Address Form</h2>
          {addresserror ? <p>Enter valid Address</p> : <span></span>}



          <div class="form-group">
            <label for="exampleInputPassword1" className="form-label mt-0 text-primary">House Number</label>

            <input
              className="form-control"
              value={houseNumber}
              onChange={houseNumberValid}
              placeholder="Enter House Number"
            ></input>
            {houseNumberError ? (<p className="text-danger">Enter valid House Number</p>) : (<span></span>)}
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1" className="form-label mt-1 text-primary">Locality</label>

            <input
              className="form-control"
              value={locality}
              onChange={localityValid}
              placeholder="Area /Colony/Street"
            ></input>
            {localityError ? (<p className="text-danger">Enter valid Locality</p>) : (<span></span>)}

          </div>
          <Row>
            <Col>
              <div class="form-group">
                <label for="exampleInputPassword1" className="form-label mt-1 text-primary">City</label>

                <input
                  value={city}
                  className="form-control"
                  onChange={cityValid}
                  placeholder="Town/City"
                ></input>
                {cityError ? (<p className="text-danger">Enter valid City</p>) : (<span></span>)}

              </div>
            </Col>
            <Col>
              <div class="form-group">
                <label for="exampleInputPassword1" className="form-label mt-1 text-primary">Pincode</label>
                <input
                  className="form-control"
                  value={pinCode}
                  onChange={pinCodeValid}
                  placeholder="Enter Pincode"
                  maxlength="6"
                ></input>
                {pinError ? (<p className="text-danger" >Enter valid pincode</p>) : (<span></span>)}

              </div>
            </Col>
            <Col>
              <div class="form-group">
                <label for="exampleSelect1" className="form-label mt-1 text-primary">Select State</label>
                <select
                  className="form-select"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                  name="State"
                  id="cars"
                >
                  <option value="">Select State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam </option>
                  <option value="Bihar">Bihar </option>
                  <option value="Chhattisgarh	">Chhattisgarh </option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh	">Himachal Pradesh </option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
              </div>
            </Col>
          </Row>
          {add ? (
            <div className='button-wrapper'>
              <button
                onClick={addAddress}
                type="button"
                className="btn btn-primary"
              >
                Add Address
              </button>
            </div>

          ) : (
            <button
              onClick={updateaddress}
              type="button"
              className="btn btn-warning"
            >
              Update Address
            </button>
          )

          }
        </div>
      </div>
      <div className="order-container">
        <ListGroup variant="flush">
          <h2 className='heading' > &nbsp; Order Summary</h2>
          <ListGroupItem className='Book-style'>
            {props.cartItems.map(function (item) {
              return (
                <>
                  <div className='book-container'>
                    <div className='book-img-container'>
                      <Image src={item.image} fluid rounded />
                    </div>
                    <div className='book-text'>
                      <p>{item.title}</p>
                    </div>
                    <div className='book-text'>
                      <p>Rs.{item.price}</p>
                    </div>
                    <div className='book-text'>
                      <p>Qty:{item.quantity}</p>
                    </div>
                  </div>
                  <h1></h1>
                </>
              );
            })}
          </ListGroupItem>

          <div>
            <OrderSummary />
            <h5 className="heading">Cart Total Rs.{props.amount}</h5>

          </div>

        </ListGroup>

      </div>


    </div>
  );
}

const mapStateToProps = (state) => {

  return {
    address: state.BookReducerCart.address,
    cartItems: state.BookReducerCart.cart,
    userdetail: state.userLogin.userInfo,
    amount: state.BookReducerCart.amount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddressLoad: (useremail) => dispatch(actions.onAddressLoadAction(useremail)),
    onCartLoad: (useremail) => dispatch(actions.onCartLoadAction(useremail)),
    onDeleteAddress: (_id, useremail) => dispatch(actions.onDeleteAddressAction(_id, useremail)),

    onAddAddress: (obj, useremail, username, userphone) => dispatch(actions.onAddAddressAction(obj, useremail, username, userphone)),
    OnEditAddress: (id, elem, useremail) =>
      dispatch(actions.OnEditAddressAction(id, elem, useremail)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressScreen);
