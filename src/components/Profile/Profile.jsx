import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Button from "react-bootstrap/Button";
import styles from "../Profile/Profile.module.css";
import {useAuth0} from "@auth0/auth0-react";
import {cleanUser} from "../../redux/reducer";
import {asyncDeleteAccount} from "../../redux/actions";
import Swal from "sweetalert2";
import {ImArrowLeft} from "react-icons/im";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
const Profile = () => {
  const {logout} = useAuth0();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.products.user);

  const handleLogout = () => {
    logout();
    dispatch(cleanUser());
  };

  const handleDeleteAccount = async () => {
    Swal.fire({
      title: "Estás seguro?",
      text: "Eliminaras tu cuenta en Under Stock para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar mi cuenta",
      cancelButtonText: "no uwu",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(asyncDeleteAccount(user.id));
        handleLogout();
      }
    });
  };

  useEffect(() => {
    if (!user.name) {
      window.location.href = "/";
    }
  }, [user]);

  return (
    <div>
      <Header></Header>
      {user.name ? (
        <div className={styles.container}>
          <button
            onClick={() => {
              history.back();
            }}
            className={styles.buttonBack}
          >
            <ImArrowLeft />
          </button>
          <div className={styles.containProfileInfo}>
            <img
              className={styles.image}
              src={user.image}
              alt='foto de perfil del usuario'
            />
            <div className={styles.containText}>
              <div className={styles.containP}>
                <h1 className={styles.titleSection}>Usuario:</h1>
                <h1 className={styles.titleInfo}>{user.name}</h1>
              </div>
              <div className={styles.containP}>
                <h1 className={styles.titleSection}>Correo:</h1>{" "}
                <h1 className={styles.titleInfo}>{user.id}</h1>
              </div>
              <div className={styles.containP}>
                <h1 className={styles.titleSection}>Último inicio:</h1>
                <h1 className={styles.titleInfo}>
                  {user.updated_at.slice(0, 10).split("-").reverse().join("-")}
                </h1>
              </div>
            </div>
            <div className={styles.containButtons}>
              <Button
                onClick={() => handleLogout()}
                className={styles.buttonSesion}
                variant='primary'
              >
                Cerrar sesión
              </Button>{" "}
              <Button
                onClick={() => handleDeleteAccount()}
                className={styles.buttonSesion}
                variant='danger'
              >
                Borrar cuenta
              </Button>{" "}
            </div>{" "}
          </div>
        </div>
      ) : (
        <div className={styles.container}></div>
      )}
      <Footer></Footer>
    </div>
  );
};
export default Profile;
