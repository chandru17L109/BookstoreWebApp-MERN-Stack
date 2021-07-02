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

  // form state for edit option
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pinCode, setPincode] = useState("");
  const [houseNumber, setflatno] = useState("");
  const [locality, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [id, SetId] = useState("");
  const [address, SetAddress] = useState("");

  //Form Validations
  const pincodereg = new RegExp("[0-9]{6}");
  const [pinstyle, setPinstyle] = useState({ borderColor: "transparent" });
  const mobilereg = new RegExp("^[7,8,9][0-9]{9}");
  const [mobstyle, setMobstyle] = useState({ borderColor: "transparent" });

  class sendaddress {
    constructor(name, mobile, pinCode, houseNumber, locality, landmark, city, state) {
      this.name = name;
      this.mobile = mobile;
      this.pinCode = pinCode;
      this.houseNumber = houseNumber;
      this.locality = locality;
      this.landmark = landmark;
      this.city = city;
      this.state = state;
    }
  }

  const addAddress = () => {
    props.onAddAddress(
      new sendaddress(
        // name,
        // mobile,
        pinCode,
        houseNumber,
        locality,
        // landmark,
        city,
        state
      )
    );

    resetform();
  };

  const editaddress = (id, arr) => {
    console.log("id", id);
    setName(arr.name);
    setArea(arr.locality);
    setMobile(arr.mobile);
    setPincode(arr.pinCode);
    setflatno(arr.houseNumber);
    setLandmark(arr.landmark);
    setCity(arr.city);
    setState(arr.state);
    SetId(id);
    SetAddress(arr);
    console.log("Set id", id);
  };

  const updateaddress = () => {
    props.OnEditAddress(
      id,
      new sendaddress(
        name,
        mobile,
        pinCode,
        houseNumber,
        locality,
        landmark,
        city,
        state
      )
    );
    resetform();
  };

  const resetform = () => {
    setName("");
    setArea("");
    setLandmark("");
    setCity("");
    setMobile("");
    setPincode("");
    setState("");
    setflatno("");
  };

  useEffect(() => {
    props.onAddressLoad();
  }, []);

  const deleteAddress = (_id) => {
    props.onDeleteAddress(_id);
  };

  return (
    <div className="address">
      <h2>Select a delivery adress</h2>
      {props.Books.map((element) => {
        return (
          <AddressItem
            key={element._id}
            arr={element}
            radio={radio}
            setRadio={setRadio}
            delete={deleteAddress}
            editaddress={editaddress}
          ></AddressItem>
        );
      })}
      <div className="new-address">
        <br></br>
        <div className="form">
          <h2> Address Form</h2>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Full Name"
          ></input>
          <input
            style={mobstyle}
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
            }}
            onBlur={(e) => {
              console.log("onblur triggere");
              var mobbool = mobilereg.test(e.target.value);
              if (!mobbool) {
                setMobstyle({ borderColor: "red" });
                console.log("if in mob triggered");
              } else {
                console.log("else in mob triggered");
                setMobstyle({ borderColor: "transparent" });
              }
            }}
            placeholder="Mobile Number"
            maxlength="10"
          ></input>
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
            placeholder="Flat, House no, Building, Comapany, Apartment"
          ></input>
          <input
            value={locality}
            onChange={(e) => {
              setArea(e.target.value);
            }}
            placeholder="Area /Colony/Street"
          ></input>
          <input
            value={landmark}
            onChange={(e) => {
              setLandmark(e.target.value);
            }}
            placeholder="Landmark"
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
          <button
            onClick={addAddress}
            type="button"
            className="btn btn-warning"
          >
            Add Address
          </button>
          <button
            onClick={updateaddress}
            type="button"
            className="btn btn-info"
          >
            Update Address
          </button>
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
                        <Col md={1}>
                          <Image src={item.imageUrl} fluid rounded />
                        </Col>
                        <Col md={4}>
                          <p>{item.name}</p>
                        </Col>
                        <Col md={2}>
                          <p>${item.price}</p>
                        </Col>
                        <Col md={2}>
                          <p>Qty:{item.qty}</p>
                        </Col>
                      </Row>
                      <h1></h1>
                    </>
                  );
                })}
              </ListGroupItem>

              <ListGroupItem>
                <OrderSummary />
              </ListGroupItem>
              {/* <Link to="/address">
                                <Button type="button" className="btn-block">
                                    Proceed to Payment
                                </Button>
                            </Link> */}
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
    Books: state.BookReducerCart.books,
    cartItems: state.BookReducerCart.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddressLoad: () => dispatch(actions.onAddressLoadAction()),

    onDeleteAddress: (_id) => dispatch(actions.onDeleteAddressAction(_id)),

    onAddAddress: (obj) => dispatch(actions.onAddAddressAction(obj)),
    OnEditAddress: (id, elem) =>
      dispatch(actions.OnEditAddressAction(id, elem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressScreen);
