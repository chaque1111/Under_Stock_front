import React, {useEffect} from "react";
import underLogo from "../../assets/underStock.svg";
import styles from "../Header/Header.module.css";
import Button from "react-bootstrap/Button";
import {FaUser} from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import {useAuth0} from "@auth0/auth0-react";

import {useDispatch, useSelector} from "react-redux";
import {asyncLogIn} from "../../redux/actions";

const Header = () => {
  const dispatch = useDispatch();
  const userRedux = useSelector((state) => state.products.user);
  const {isLoading, isAuthenticated, error, user, loginWithRedirect, logout} =
    useAuth0();

  const handleSigIn = () => {
    loginWithRedirect();
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated && !Object.keys(userRedux).length) {
      let userJson = {
        name: user.name,
        email: user.email,
        image: user.picture,
        updated_at: user.updated_at,
      };
      dispatch(asyncLogIn(userJson));
    }
  }, [isLoading, dispatch, userRedux]);
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.containLogo}>
          <img className={styles.underLogo} src={underLogo} alt='not found' />
        </div>{" "}
        <div className={styles.containTitle}>
          <h1 className={styles.title}>
            LAS MARCAS QUE MÁS TE GUSTAN A PRECIOS INCREÍBLES EN UNDER STOCK
          </h1>
          <h1 className={styles.subTitle}>Prendas de otoño/invierno/verano</h1>
        </div>
        <div className={styles.containOpts}>
          {!isAuthenticated ? (
            <div className={styles.containOpt}>
              <Button
                onClick={() => handleSigIn()}
                className={styles.sigIn}
                variant='danger'
              >
                Iniciar sesión
              </Button>{" "}
              <Button
                onClick={() => logout()}
                className={styles.sigIn}
                variant='danger'
              >
                Registrarse
              </Button>{" "}
            </div>
          ) : (
            <div className={styles.containButtonProfile}>
              <img
                className={styles.userPicture}
                src={user.picture}
                alt='user Image'
              />
              <h3 className={styles.profileH3}>{user.name}</h3>
            </div>
          )}
        </div>
      </div>{" "}
      <div className={styles.containTitleMobile}>
        <h1 className={styles.title}>
          LAS MARCAS QUE MÁS TE GUSTAN A PRECIOS INCREÍBLES EN UNDER STOCK
        </h1>
        <h1 className={styles.subTitle}>Prendas de otoño/invierno/verano</h1>
      </div>
    </div>
  );
};
export default Header;
{
  /* <div className={styles.containDropdown}>
          <Dropdown className={styles.dropDown}>
            <Dropdown.Toggle
              className={styles.dropDownToggle}
              variant='Secondary'
              id='dropdown-basic'
            >
              <FaUser className={styles.iconUser} />
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.DropdownMenu}>
              <Dropdown.Item className={styles.DropdownItem} href='#/action-1'>
                Iniciar Sesión
              </Dropdown.Item>
              <Dropdown.Item className={styles.DropdownItem} href='#/action-2'>
                Registrarse
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
  /* <div className={styles.containRedsLink}>
          <a
            className={styles.link}
            href='https://www.instagram.com/under.okk/?hl=es'
            target='_blank'
            rel='noopener noreferrer'
          >
            <BsInstagram className={styles.icon} />
          </a>
          <BsWhatsapp className={styles.icon} />
          <MdOutlineEmail className={styles.iconEmail} />
          <a
            className={styles.link}
            href='https://www.google.com.ar/maps/place/Hip%C3%B3lito+Yrigoyen+1994,+W3400ATN+Corrientes/@-27.4697939,-58.8282077,17z/data=!3m1!4b1!4m6!3m5!1s0x94456b5e31bcb8e1:0xdd24cdd581c5cd81!8m2!3d-27.4697939!4d-58.8256328!16s%2Fg%2F11cs7nvvwq'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaMapMarkerAlt className={styles.icon} />
          </a>
        </div> */
}
