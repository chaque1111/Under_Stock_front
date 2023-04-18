import React from "react";
import styles from "../Footer/Footer.module.css";
import {
  FaPhone,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaTshirt,
  FaTruck,
  FaMapMarkerAlt,
} from "react-icons/fa";
import {GiPadlock} from "react-icons/gi";
import {MdVerifiedUser} from "react-icons/md";
import {IoIosArrowForward} from "react-icons/io";
import {MdOutlineEmail} from "react-icons/md";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containSection1}>
        <h1 className={styles.titleSection}>Soporte</h1>
        <h3 className={styles.sectionDescription}>
          <IoIosArrowForward /> Preguntas frecuentes
        </h3>
        <h3 className={styles.sectionDescription}>
          <IoIosArrowForward /> Política de privacidad
        </h3>
        <h3 className={styles.sectionDescription}>
          <IoIosArrowForward /> Política de devoluciones
        </h3>
        <h3 className={styles.sectionDescription}>
          <MdOutlineEmail /> blackmesa@gmail.com
        </h3>
        <h3 className={styles.sectionDescription}>
          <FaPhone /> 11 6631-8575
        </h3>
        <h3 className={styles.sectionDescription}></h3>
        <h3 className={styles.sectionDescription}></h3>
      </div>
      <div className={styles.containSection}>
        <h1 className={styles.titleSection}>¿Por qué Under Stock?</h1>

        <h3 className={styles.sectionDescription}>
          <FaTshirt /> Variedad de productos exclusivos
        </h3>
        <h3 className={styles.sectionDescription}>
          <FaTruck /> Envios a todo el país
        </h3>
        <h3 className={styles.sectionDescription}>
          <GiPadlock /> Sitio Seguro
        </h3>
        <h3 className={styles.sectionDescription}>
          <MdVerifiedUser /> Productos de calidad
        </h3>
        <a
          className={styles.link}
          href='https://www.google.com.ar/maps/place/Hip%C3%B3lito+Yrigoyen+1994,+W3400ATN+Corrientes/@-27.4697939,-58.8282077,17z/data=!3m1!4b1!4m6!3m5!1s0x94456b5e31bcb8e1:0xdd24cdd581c5cd81!8m2!3d-27.4697939!4d-58.8256328!16s%2Fg%2F11cs7nvvwq'
          target='_blank'
          rel='noopener noreferrer'
        >
          <h3 className={styles.sectionDescription}>
            <FaMapMarkerAlt /> Encuentra nuestra tienda
          </h3>
        </a>
        <h3 className={styles.sectionDescription}></h3>
        <h3 className={styles.sectionDescription}></h3>
      </div>
      <div className={styles.containSection}>
        <h1 className={styles.titleSection}>Métodos de pago</h1>

        <div className={styles.containCreditsCards}>
          <img
            className={styles.ImagePay}
            src='https://dk0k1i3js6c49.cloudfront.net/iconos-pago/mercadopago.png'
            alt='not found'
          />
          <img
            className={styles.ImagePay}
            src='https://dk0k1i3js6c49.cloudfront.net/iconos-pago/visa.png'
            alt='not found'
          />
          <img
            className={styles.ImagePay}
            src='https://dk0k1i3js6c49.cloudfront.net/iconos-pago/mastercard.png '
            alt='not found'
          />
        </div>
      </div>
      <div className={styles.containSection}>
        <h1 className={styles.titleSectionRedes}>REDES SOCIALES</h1>

        <div className={styles.containIconsRedes}>
          <a
            className={styles.link}
            href='https://www.instagram.com/under.okk/?hl=es'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaInstagram className={styles.icon} />
          </a>
          <FaTiktok className={styles.icon} />
          <FaFacebook className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
