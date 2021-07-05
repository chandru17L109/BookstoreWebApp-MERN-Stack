export const ON_PAGE_LOAD = "ON_PAGE_LOAD";
export const ON_ADD_CARTITEM = "ON_ADD_CARTITEM";

export const ON_DELETE_ITEM = " ON_DELETE_ITEM";
export const ON_MOVE_ITEM = " ON_MOVE_ITEM";
export const ON_CART_LOAD = " ON_CART_LOAD";
export const ADJUST_ITEM_QTY = " ADJUST_QTY";

export const ON_WISH_LOAD = " ON_WISH_LOAD";
export const ON_ADD_CART_WISH = " ON_ADD_CART_WISH";

export const ON_ADDRESS_LOAD = " ON_ADDRESS_LOAD";
export const ON_DELETE_ADDRESS = " ON_DELETE_ADDRESS";
export const ON_ADD_ADDRESS = " ON_ADD_ADDRESS";
export const ON_EDIT_ADDRESS = " ON_EDIT_ADDRESS";

export const ORDER_SUMMARY = " ORDER_SUMMARY";

export const DELIVERY_ADDRESS = " DELIVERY_ADDRESS";

export const ON_CONFIRM_PAYMENT = " ON_CONFIRM_PAYMENT";
export const ON_AMOUNT = " ON_AMOUNT";
export const ON_APPLY_COUPON = "ON_APPLY_COUPON"

export const onOpenLoadAction = () => {
    return (dispatch) => {
        return fetch("http://localhost:8080/api/v1/products/")
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: ON_PAGE_LOAD,
                    payload: data.data,
                });
            });
    };
};

export const addCartitemAction = (product) => {
    console.log("product", product);
    return (dispatch) => {
        return fetch("http://localhost:8080/api/v1/cartItems/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                name: product.name,
                imageUrl: product.imageUrl,
                price: product.price,
                description: product.description,
                countInStock: product.countInStock,
                qty: "1",
            }),
        }).then((res) => {
            fetch("http://localhost:8080/api/v1/products/")
                .then((res) => res.json())
                .then((data) => {
                    dispatch({
                        type: ON_PAGE_LOAD,
                        payload: data.data,
                    });
                });
        });
    };
};

export const onCartLoadAction = (useremail) => {
    return (dispatch) => {
        return fetch(
            `http://localhost:8080/api/v1/cartItems/${useremail}`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
                dispatch({
                    type: ON_CART_LOAD,
                    payload: data.data,
                });
            });
    };
};

export const onDeleteItemAction = (_id, useremail) => {
    console.log("ProductId", _id);
    return (dispatch) => {
        return fetch(
            `http://localhost:8080/api/v1/cartItems/${useremail}`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                method: "DELETE",
                body: JSON.stringify({ bookid: _id }),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log("before fetch", data);
                fetch(`http://localhost:8080/api/v1/cartItems/${useremail}`, {
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log("data", data);
                        dispatch({
                            type: ON_DELETE_ITEM,
                            payload: data.data,
                        });
                    });
            });
    };
};

export const onMoveItemAction = (_id, useremail) => {
    return (dispatch) => {
        return fetch(
            `http://localhost:8080/api/v1/cartItems/${useremail}`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                method: "DELETE",
                body: JSON.stringify({ bookid: _id }),
            }
        ).then((res) => {
            fetch(`http://localhost:8080/api/v1/wishItems/${useremail}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ bookid: _id }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    fetch(`http://localhost:8080/api/v1/cartItems/${useremail}`, {
                        headers: {
                            Accept: "application/json",
                            "Content-type": "application/json",
                        },
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            console.log("data", data);
                            dispatch({
                                type: ON_MOVE_ITEM,
                                payload: data.data,
                            });
                        });
                });
        });
    };
};

export const onWishLoadAction = () => {
    return (dispatch) => {
        return fetch("http://localhost:8080/api/v1/wishItems/", {})
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: ON_WISH_LOAD,
                    payload: data.data,
                });
            });
    };
};

export const addCartitemWishAction = (wishItem) => {
    return (dispatch) => {
        return fetch("http://localhost:8080/api/v1/cartItems/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                name: wishItem.name,
                imageUrl: wishItem.imageUrl,
                price: wishItem.price,
                description: wishItem.description,
                countInStock: wishItem.countInStock,
            }),
        }).then((res) => {
            fetch("http://localhost:8080/api/v1/wishItems/")
                .then((res) => res.json())
                .then((data) => {
                    dispatch({
                        type: ON_ADD_CART_WISH,
                        payload: data.data,
                    });
                });
        });
    };
};

export const onAddressLoadAction = (useremail) => {
    return (dispatch) => {
        return fetch(`http://localhost:8080/api/v1/adr/${useremail}`, {
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: ON_ADDRESS_LOAD,
                    payload: data.res,
                });
            });
    };
};

export const onDeleteAddressAction = (_id, useremail) => {
    console.log("ProductId", _id);
    return (dispatch) => {
        return fetch("http://localhost:8080/api/v1/adr/", {
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            method: "DELETE",
            body: JSON.stringify({ email: useremail, id: _id }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("before fetch", data);
                fetch(`http://localhost:8080/api/v1/adr/${useremail}`, {
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        dispatch({
                            type: ON_DELETE_ADDRESS,
                            payload: data.res,
                        });
                    });
            });
    };
};

export const onAddAddressAction = (obj, useremail, username, userphone) => {
    return (dispatch) => {
        console.log("object", obj);
        return fetch("http://localhost:8080/api/v1/adr/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },

            body: JSON.stringify({ email: useremail, addresses: obj, name: username, phone: 8887871212 }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("before fetch", data);
                fetch(`http://localhost:8080/api/v1/adr/${useremail}`, {
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        dispatch({
                            type: ON_ADD_ADDRESS,
                            payload: data.res,
                        });
                    });
            });
    };
};

export const OnEditAddressAction = (id, elem, useremail) => {
    return (dispatch) => {
        return fetch("http://localhost:8080/api/v1/adr/", {
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            method: "PATCH",
            body: JSON.stringify({ email: useremail, id: id, address: elem }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("before fetch", data);
                fetch(`http://localhost:8080/api/v1/adr/${useremail}`, {
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        dispatch({
                            type: ON_DELETE_ADDRESS,
                            payload: data.res,
                        });
                    });
            });
    };
};



export const onQuantityChangeAction = (_id, useremail, QuantityChange, max) => {
    return (dispatch) => {
        return fetch(
            `http://localhost:8080/api/v1/cartItems/${useremail}`, {
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            method: "PATCH",

            body: JSON.stringify({ bookid: _id, QuantityChange: QuantityChange, max: max }),
        }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                fetch(`http://localhost:8080/api/v1/cartItems/${useremail}`, {
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        dispatch({
                            type: ADJUST_ITEM_QTY,
                            payload: data.data,
                        });
                    });
            });
    };
}



export const OrderSummaryAction = (
    totalPrice,
    totalItems,
    charges,
    cartTotal
) => {
    return {
        type: ORDER_SUMMARY,
        payload: {
            totalPrice: totalPrice,
            totalItems: totalItems,
            charges: charges,
            cartTotal: cartTotal,
        },
    };
};

export const OndeliverToAddressAction = (id, arr) => {
    return {
        type: DELIVERY_ADDRESS,
        payload: arr,
    };
};

export const OnconfirmPaymentAction = (cartItems, address, amount, useremail) => {
    console.log("address", address);
    return (dispatch) => {
        return fetch("http://localhost:8080/api/v1/orders/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email: useremail,
                books: cartItems,
                address: address,
                amount: amount,
            }),
        }).then((res) => {
            fetch("http://localhost:8080/api/v1/orders/")
                .then((res) => res.json())
                .then((data) => {
                    dispatch({
                        type: ON_CONFIRM_PAYMENT,
                        payload: data.data,
                    });
                });
        });
    };
};

export const amountAction = (cartTotal, useremail) => {
    console.log("cartTotal and email", cartTotal, useremail);
    return (dispatch) => {
        return fetch(
            `http://localhost:8080/api/v1/cartItems/${useremail}/amount`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                method: "PATCH",

                body: JSON.stringify({ amount: cartTotal }),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
                dispatch({
                    type: ON_AMOUNT,
                    payload: cartTotal,
                });
            });
    };
};

export const onApplycouponAction = (code) => {

    return dispatch => {
        console.log("couponcode", code);
        return fetch('http://localhost:8080/api/v1/coupons/compare/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ couponcode: code }),

        })

            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: ON_APPLY_COUPON,
                    payload: data.result
                });

            });

    }
}