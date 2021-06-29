const decidecartlist = (bookid) => {
    if(!this.props.Email){
      alert("Please Login to add item to cartlist !")
      this.props.history.push('/login')
    }else{
      console.log("this.props.Email and bookid",this.props.Email.email, bookid)
      this.props.onAddcartlist(this.props.Email.email, bookid);
    }  
}

const decidewishlist = (bookid) => {
  if(!this.props.Email){
      alert("Please Login  to add item to wishlist !")
      this.props.history.push('/login')
    }else{
      console.log("this.props.Email and bookid",this.props.Email.email, bookid)
      this.props.onAddwishlist(this.props.Email.email, bookid);
    }
}

export default {decidecartlist, decidewishlist}

