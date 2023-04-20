import React from "react";
import styles from "../Cards/Card.module.css";
const Card = ({id, image, name, color, price, size}) => {
  return (
    <div key={id} className={styles.container}>
      <img className={styles.imageProduct} src={image[0]} alt='Ropa' />
      <h1 className={styles.nameProduct}>{name}</h1>
      <h2 className={styles.priceProduct}>$ {price}</h2>
      <div className={styles.containColors}>
        {/* <h3 classNamee={styles.colorsTitle}>Colores</h3> */}
        {color.length &&
          color.map((e) => {
            return (
              <button
                key={id + Math.random(0, 1000)}
                className={styles.colorButton}
                style={{
                  background: `${e}`,
                  height: "15px",
                  borderRadius: "100%",
                }}
              ></button>
            );
          })}
      </div>
      <div className={styles.containSizes}>
        {/* <h3 className={styles.sizesTitle}>Talles</h3> */}
        {size.length
          ? size.map((e) => {
              return (
                <p key={id + Math.random(0, 1000)} className={styles.size}>
                  {e}
                </p>
              );
            })
          : ""}
      </div>
    </div>
  );
};
export default Card;
