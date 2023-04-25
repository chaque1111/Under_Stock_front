import Carousel from "react-bootstrap/Carousel";
import carouselImage from "../../assets/ImagenCarrousel2.jpg";
import carouselImage2 from "../../assets/ImagenCarrousel3.jpg";
import carouselImage3 from "../../assets/ImagenCarrousel5.jpg";
const CarouselLanding = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className='d-block w-100' src={carouselImage} alt='First slide' />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className='d-block w-100'
          src={carouselImage2}
          alt='Second slide'
        />
      </Carousel.Item>
      <Carousel.Item>
        <img className='d-block w-100' src={carouselImage3} alt='Third slide' />
      </Carousel.Item>
    </Carousel>
  );
};
export default CarouselLanding;
