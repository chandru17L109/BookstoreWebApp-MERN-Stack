import Carousel from "./Carousel";
import {Container} from 'react-bootstrap';
import './AuthorDetails.css';
import Author1 from '../../../../images/Author1.jpg'
import Author2 from '../../../../images/Author2.jpg'
import Author3 from '../../../../images/Author3.jpg'
import Author4 from '../../../../images/Author4.jpg'
import Author5 from '../../../../images/Author5.jpg'
import Author6 from '../../../../images/Author6.jpg'
const Author = () => {
    return (
        <Container>
        <div className="cardAuthorContainer">
            <h1 className="heading">FAMOUS AUTHORS</h1>
        <div className="cards3">
            <Carousel
                show={4}>
                
                <div className="gallery">
                    <div style={{padding: 8}}>
                        <img className="authorImage" src={Author1} alt="placeholder" />
                        
                    </div>
                </div>
                <div className="gallery">
                    <div style={{padding: 8}}>
                        <img className="authorImage" src={Author2} alt="placeholder" />
                    </div>
                </div>
                <div className="gallery">
                    <div style={{padding: 8}}>
                        <img className="authorImage" src={Author3} alt="author"/>
                    </div>
                </div>
                <div className="gallery">
                    <div style={{padding: 8}}>
                        <img className="authorImage" src={Author4} alt="placeholder" />
                    </div>
                </div>
                <div className="gallery">
                    <div style={{padding: 8}}>
                        <img className="authorImage" src={Author5} alt="placeholder"/>
                    </div>
                </div>
                <div className="gallery">
                    <div style={{padding: 8}}>
                        <img className="authorImage" src={Author6} alt="placeholder" />
                    </div>
                </div>
            </Carousel>
        </div>
        </div>
        </Container>
    )
}

export default Author;