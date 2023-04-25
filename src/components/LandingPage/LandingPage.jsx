import React from "react";
import styles from "../LandingPage/LandingPage.module.css";
import remera from "../../assets/remera.jpg";
import buzos from "../../assets/buzos.jpg";
import calzado from "../../assets/zapatillas.jpg";
import pantalones from "../../assets/pantalones.jpg";
import map from "../../assets/Captura.jpg";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import {Link} from "react-router-dom";
import Carousel from "../Carousel/Carousel";

const LandingPage = () => {
  return (
    <div className={styles.containerMaster}>
      <Header></Header>
      <NavBar></NavBar>
      <Carousel></Carousel>
      <div className={styles.container}>
        {" "}
        <div className={styles.containLinks}>
          <Link to={"/productos/remeras"}>
            <img className={styles.remeraImage} src={remera} alt='not found' />
          </Link>
          <Link to={"/productos/buzos"}>
            <img className={styles.buzoImage} src={buzos} alt='not found' />{" "}
          </Link>
          <Link to={"/productos/pantalones"}>
            <img
              className={styles.calzadoImage}
              src={pantalones}
              alt='not found'
            />
          </Link>
          <Link to={"/productos/zapatillas"}>
            <img
              className={styles.calzadoImage}
              src={calzado}
              alt='not found'
            />
          </Link>
        </div>
      </div>{" "}
      <div className={styles.containInfoTienda}>
        <div className={styles.containUbication}>
          <h1 className={styles.titleMap}>¿Donde encontrarnos?</h1>
          <a
            className={styles.link}
            href='https://www.google.com.ar/maps/place/Hip%C3%B3lito+Yrigoyen+1994,+W3400ATN+Corrientes/@-27.4697939,-58.8282077,17z/data=!3m1!4b1!4m6!3m5!1s0x94456b5e31bcb8e1:0xdd24cdd581c5cd81!8m2!3d-27.4697939!4d-58.8256328!16s%2Fg%2F11cs7nvvwq'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img className={styles.imgMap} src={map} alt='not found' />
          </a>{" "}
          <a
            className={styles.link}
            href='https://www.google.com.ar/maps/place/Hip%C3%B3lito+Yrigoyen+1994,+W3400ATN+Corrientes/@-27.4697939,-58.8282077,17z/data=!3m1!4b1!4m6!3m5!1s0x94456b5e31bcb8e1:0xdd24cdd581c5cd81!8m2!3d-27.4697939!4d-58.8256328!16s%2Fg%2F11cs7nvvwq'
            target='_blank'
            rel='noopener noreferrer'
          >
            <p className={styles.mapLink}>
              Puedes encontrarnos en Hipólito Yrigoyen 1994, Ciudad de
              Corrientes{" "}
            </p>
          </a>
        </div>
        <div className={styles.containUnderDescription}>
          <h1 className={styles.titleMap}>¿Qué es Under Stock?</h1>

          <p className={styles.descriptionUnder}>
            Somos una tienda de Argentina Situada en la Ciudad de Corrientes.
            Que vino a revolucionar la industria de la moda mediante nuestra
            gran variedad de productos , En Under Stock vas a encontrar
            productos únicos y 100% originales.
          </p>
        </div>{" "}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default LandingPage;
