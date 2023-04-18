import React from "react";
import styles from "../NavBar/NavBar.module.css";
import {FaHome, FaHeart} from "react-icons/fa";
import {FaBox} from "react-icons/fa";
import {Link} from "react-router-dom";
const NavBar = () => {
  return (
    <div className={styles.container}>
      <Link style={{textDecoration: "none"}} to={"/"}>
        <h1 className={styles.Link}>
          <FaHome className={styles.icon} />
          INICIO
        </h1>
      </Link>
      <Link style={{textDecoration: "none"}} to={"/productos"}>
        <h1 className={styles.Link}>
          <FaBox className={styles.iconBox} />
          PRODUCTOS
        </h1>{" "}
      </Link>
      <Link style={{textDecoration: "none"}} to={"/favoritos"}>
        <h1 className={styles.Link}>
          <FaHeart className={styles.iconHeart} />
          FAVORITOS
        </h1>
      </Link>
    </div>
  );
};

export default NavBar;
