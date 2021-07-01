//This file is temperory not used any where

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

const mapDispatchToProps = (dispatch) => {
  return {
      onAddcartlist : (email,bookid) =>  dispatch(actions.Addtocartlist(email,bookid)),
      onAddwishlist : (email,bookid) =>  dispatch(actions.Addtowishlist(email,bookid)),
  }
}

export default {decidecartlist, decidewishlist}

