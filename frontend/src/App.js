import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Home from './Team4/Screen/HomePage/home'
import Header from './Team4/Screen/Header/MainHeader/header';
import SecondHeader from './Team4/Screen/Header/SubHeader/secondheader';
import PopularPage from './Team4/Screen/PopularBooksPage/popularpage';
import Footer from './Team4/Screen/Footer/footer';
import AllBooksPage from './Team4/Screen/MixedCollectionsPage/allbookspage'
import TodayDealsPage from './Team4/Screen/TodayDealsPage/todaydealspage'
import ProductDetailspage from './Team4/Screen/DescriptionPage/description.js';
import NewRelease from './Team4/Screen/NewReleasesPage/newrelease.js';
import Headersearch from './Team4/Screen/Header/MainHeader/headersearch.js';
// import Login from "./Team4/Screen/LoginPage/login";
// ---------------------------------------------------------------------------------
import { Container } from 'react-bootstrap';
import LoginScreen from './Team1/screens/LoginScreen';
import RegisterScreen from './Team1/screens/RegisterScreen';
import ProfileScreen from './Team1/screens/ProfileScreen';

import ForgotPasswordScreen from './Team1/screens/ForgotPasswordScreen';
import NewPasswordScreen from './Team1/screens/NewPasswordScreen';
// import CartPage from "./Team4/Screen/cartlist/cartlist";
import WishPage from "./Team4/Screen/wishlist/wishlist";

import CartScreen from "./Team2/screens/CartScreen";
import WishScreen from "./Team2/screens/WishScreen";
import AddressScreen from "./Team2/screens/AddressScreen";
import PaymentScreen from './Team2/screens/PaymentScreen';
import LastScreen from './Team2/screens/LastScreen';


function App() {
  return (
    <div className="app">
      <Router>
        <Header/>
        <SecondHeader/> 
              <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/allbookspage" component={AllBooksPage}></Route>
                <Route path="/todaydealspage" component={TodayDealsPage}></Route>
                <Route path="/popularpage" component={PopularPage}></Route> 
                <Route path="/description" component={ProductDetailspage}></Route>
                <Route path="/newrelease" component={NewRelease}></Route>
                <Route path="/headersearchresults/:searchelement" component={Headersearch}></Route>
                <Route path="/description" component={ProductDetailspage}></Route>
                <Route path="/wishlist" component={WishPage}></Route>
                {/* <Route path="/cartlist" component={CartPage}></Route> * */}



                <Route path='/login' component={LoginScreen}></Route>
                <Route path='/register' component={RegisterScreen}></Route>
                <Route path='/profile' component={ProfileScreen} />
                <Route path='/forgotPassword' component={ForgotPasswordScreen} exact />
                <Route path='/resetPassword/:token' component={NewPasswordScreen} exact />  


                <Route exact path="/cartlist" component={CartScreen} />
                {/* <Route exact path="/wishlist" component={WishScreen} /> */}
                <Route exact path="/address" component={AddressScreen} />
                <Route exact path="/payment" component={PaymentScreen} />
                <Route exact path="/lastScreen" component={LastScreen} />
                
              </Switch>        
        <Footer/>
      </Router>
    </div>
   
  );
}

export default App;


