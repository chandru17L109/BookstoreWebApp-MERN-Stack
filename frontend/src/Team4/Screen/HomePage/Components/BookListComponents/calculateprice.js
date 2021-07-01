const SellingPrice = (costprice, pricediscount) =>{
    return Math.round(costprice - (costprice * pricediscount/100))
}

export default SellingPrice 