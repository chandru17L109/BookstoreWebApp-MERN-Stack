import React, { useState, useEffect } from "react";
import AddressItem from "./AddressItem";
import OrderSummary from "../components/OrderSummary";
import { Link } from "react-router-dom";
import * as actions from "../action/action";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Button,
  Card,
  Image,
  ListGroup,
  ListGroupItem,
  FormControl,
} from "react-bootstrap";

function AddressScreen(props) {
  const [arr, Setarr] = useState([]);
  const [radio, setRadio] = useState();
  const [add, Setadd] = useState(true);

  // form state for edit option
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pinCode, setPincode] = useState("");
  const [houseNumber, setflatno] = useState("");
  const [locality, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [id, SetId] = useState("");
  const [address, SetAddress] = useState("");

  //Form Validations
  const pincodereg = new RegExp("[0-9]{6}");
  const [pinstyle, setPinstyle] = useState({ borderColor: "transparent" });

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

    resetform();
  };

  const editaddress = (id, arr) => {
    console.log("id", id);
    setArea(arr.locality);
    setPincode(arr.pinCode);
    setflatno(arr.houseNumber);
    setCity(arr.city);
    setState(arr.state);
    SetId(id);
    SetAddress(arr);
    Setadd(false)
    console.log("Set id", id);
  };

  const updateaddress = () => {
    props.OnEditAddress(
      id,
      new sendaddress(pinCode, houseNumber, locality, city, state),
      props.userdetail.email
    );
    resetform();
    // Setadd(false);
  };

  const resetform = () => {
    setName("");
    setArea("");
    setCity("");
    setMobile("");
    setPincode("");
    setState("");
    setflatno("");
  };

  useEffect(() => {
    props.onAddressLoad(props.userdetail.email);

    props.onCartLoad(props.userdetail.email);
  }, []);

  const deleteAddress = (_id) => {
    props.onDeleteAddress(_id, props.userdetail.email);
  };

  return (

    <div className="address">
      <h2>Select a delivery address</h2>
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
      <div className="new-address">
        <br></br>
        <div className="form">
          <h2> Address Form</h2>

          <input
            style={pinstyle}
            value={pinCode}
            onChange={(e) => {
              setPincode(e.target.value);
            }}
            onBlur={(e) => {
              var pinbool = pincodereg.test(e.target.value);
              if (!pinbool) {
                setPinstyle({ borderColor: "red" });
              } else {
                setPinstyle({ borderColor: "transparent" });
              }
            }}
            placeholder="Pincode"
            maxlength="6"
          ></input>
          <input
            value={houseNumber}
            onChange={(e) => {
              setflatno(e.target.value);
            }}
            placeholder="House Number"
          ></input>
          <input
            value={locality}
            onChange={(e) => {
              setArea(e.target.value);
            }}
            placeholder="Area /Colony/Street"
          ></input>

          <input
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            placeholder="Town/City"
          ></input>
          <select
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
          {add ? (
            <button
              onClick={addAddress}
              type="button"
              className="btn btn-warning"
            >
              Add Address
            </button>
          ) : (
            <button
              onClick={updateaddress}
              type="button"
              className="btn btn-info"
            >
              Update Address
            </button>
          )}
        </div>
        <Col md={5}>
          <Card>
            <ListGroup variant="flush">
              <h3> &nbsp; order Summary</h3>
              <ListGroupItem>
                {props.cartItems.map(function (item) {
                  return (
                    <>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} fluid rounded />
                        </Col>
                        <Col md={3}>
                          <p>{item.title}</p>
                        </Col>
                        <Col md={3}>
                          <p>Rs {item.price}</p>
                        </Col>
                        <Col md={3}>
                          <p>Qty:{item.quantity}</p>
                        </Col>
                      </Row>
                      <h1></h1>
                    </>
                  );
                })}
              </ListGroupItem>

              <ListGroupItem>
                <OrderSummary />
                <h5 className="text-primary">Cart Total Rs.{props.amount}</h5>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("Inside", state);
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
