import React, { Component } from 'react';
import Faq from 'react-faq-component';
import {CardColumns,Card,Container} from 'react-bootstrap';

import '../../../Styles/freq.css';

import SellImage1 from '../../../images/sellImage1.png'
import SellImage2 from '../../../images/sellImage2.png'
import SellImage3 from '../../../images/sellImage3.png'
import DealsForYouImage1 from '../../../images/dealsForYouImage1.jpg'
import DealsForYouImage2 from '../../../images/dealsForYouImage2.jpg'
import DealsForYouImage3 from '../../../images/dealsForYouImage3.jpg'
import DealsForYouImage4 from '../../../images/dealsForYouImage4.jpg'
import DealsForYouImage5 from '../../../images/dealsForYouImage5.jpg'
import DealsForYouImage6 from '../../../images/dealsForYouImage6.jpg'

import {Link} from "react-router-dom";


const data = {
  title: "Frequently Asked Questions",
  rows: [
    {
      title: "What is Bookstore Books?",
      content: "Bookstore Books is all about discovery. We’ve applied over twenty years of experience as a customer-focused, online retailer to build a store that integrates the benefits of offline and online shopping and spurs discovery of great books, Bookstore devices and customer favorites from Bookstore.com. "
    },
    {
      title: "What can you buy at Bookstore Books?",
      content: "We carry a highly-curated selection of books, devices, toys and games that our customers love. All of our products are rated 4 stars and above by our customers, or are bestsellers, or new releases."
    },
    {
      title: "What kind of things are not at Bookstore Books?",
      content: "Currently, you won’t find any food! But, customers can visit any of our Bookstore Go stores or one of the many Whole Foods Markets across the country."
    },
    {
      title: "What makes Bookstore Books unique?",
      content: "Bookstore Books is a customer-focused store, designed to spur discovery; a place where customers can find great books and products, and learn more about our devices. To give you more information as you browse, we’ve created unique features to highlight what people are reading, how they are reading and what they are loving, to help customers discover great new books."
    },
    {
      title: "How is it different to Bookstore Go or Bookstore 4-star?",
      content: "First and foremost, we’re a bookstore! All the books in our stores are bestsellers, new releases, or rated 4 stars and above by Bookstore.com customers. To help you discover books you’ll love, our curators have developed familiar product groupings like you would see online that highlight what customers are reading, how they’re reading, and what they’re loving. Examples of these include: “Page Turners (Books Kindle Readers Finish in 3 Days or Less)”; “If You Like…” a feature that showcases well-known bestsellers alongside lesser-known titles that would appeal to the same reader; and, “Highly Quotable” a feature that uses aggregated Kindle reading behavior to help customers find books that are especially memorable or quote-worthy."
    },
    {
      title: "How do I pay for items? What’s the checkout experience?",
      content: "After you discover products you love, you visit our checkout registers toward the front of the store. We accept a variety of payment methods, including Bookstore Pay via our mobile shopping app, Bookstore gift cards, Bookstore Cash, as well as Visa, MasterCard, American Express, and Discover."
    },
    {
      title: "Are there benefits to shopping at Bookstore Books if I’m a Prime member?",
      content: "Definitely! In store, Prime members pay the same low Prime price they get online for products that are shipped from and sold by Bookstore.com (not by other sellers on Bookstore.)"
    },
    {
      title: "What if I’m not a Prime member?",
      content: "Bookstore Books is for everyone. Prime members get the Prime price discussed above, and for customers who aren’t Prime members, Bookstore devices are the same price as from Bookstore.com; books and other items are sold at list price. Digital price tags alongside many of the products in store enable customers to see not only the price and Prime price, but also Prime member savings, the average star rating, and the number of reviews a product has received – the most important things that customers have told us they want to know. Eligible customers who aren’t already Prime members can sign up for a free 30-day trial in store and instantly receive Prime savings in store."
    },
    {
      title: "Who selects the books in the store?",
      content: "We have a team of curators that study the information behind what people are reading, how they are reading and what they are loving, to bring forward a highly-curated selection of books that customers will love. They use Bookstore.com customer ratings, reviews, pre-orders, sales, popularity on Goodreads, Kindle reading behavior and their own expertise to inform their selections. As an extension of Bookstore.com, we have incorporated information from the millions of readers from Bookstore.com into our stores to help Bookstore Books customers discover books that are loved by fellow readers across the country."
    },
    {
      title: "How do you select non-books products for the store?",
      content: "All of the books, devices, toys, games and other products in our stores are selected by our team of curators and are either rated 4 stars and above, or are a bestseller, or newly released. Devices from Bookstore’s Echo, Kindle, Fire Tablet, and Fire TV families are also displayed and available for customers to test drive. Using this curated approach, we’re able to fill our store with the hottest releases, latest devices and hard to find toys that we know our customers will love."
    }
  ]
    
}


export default class Frequentques extends Component {
  render() {
    return (
      <div>
        <Container>

          <div className="dealsForYouContent">
            <div>
              <h1 className="dealsForYouHeading">DEALS FOR YOU !!!</h1>
            </div>
            <Link to = {"/todaydealspage"}>
            <CardColumns>
              <Card>
                <Card.Img className="dealsForYouImage" variant="top" src={DealsForYouImage1} />
              </Card>
              <Card>
                <Card.Img className="dealsForYouImage"variant="top" src={DealsForYouImage2} />
              </Card>
              <Card>
                <Card.Img className="dealsForYouImage"variant="top" src={DealsForYouImage3}  />
              </Card>
            </CardColumns>
            <CardColumns>
              <Card>
                <Card.Img className="dealsForYouImage"variant="top" src={DealsForYouImage4} />
              </Card>
              <Card>
                <Card.Img className="dealsForYouImage"variant="top" src={DealsForYouImage5}  />
              </Card>
              <Card>
                <Card.Img className="dealsForYouImage"variant="top" src={DealsForYouImage6} />
                </Card>
            </CardColumns>
            </Link>
          </div>

          <div className="FAQcontent">
            <Faq data={data}/>
          </div>

          <div className="row">
              <div>
                <h2>Why sell on Book Store?</h2>
              </div>
          </div>

          <div className="row" style={{color: 'black'}}>
            <div className="col-md-4 pt-2 pb-5">
              <img className="sellImage" src={SellImage1} alt=""/>
              <h3>E-Commerce</h3>
              <div> With online selling, buying books has become so easy that books are now one of the top selling categories in e-commerce</div>
            </div>
            <div className="col-md-4 pt-2 pb-5">
              <img  className="sellImage" src={SellImage2}  alt=""/>
              <h3>Reach crores of customers</h3>
              <div>Sell to crores of engaged customer visiting Book.Store.in on desktop and through our mobile app.</div>
            </div>
            <div className="col-md-4 pt-2 pb-5">
              <img  className="sellImage" src={SellImage3} alt=""/>
              <h3>Receive timely payments</h3>
              <div >Book Store ensures your payments for your delivered orders are deposited directly in your bank account every 7 days.</div>
            </div>
          </div>

        </Container>

      </div>
    )
  }
}