import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getAsyncDetail} from "../../redux/actions";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import styles from "../ProductDetail/ProductDetail.module.css";
import {FaTruck, FaRegMoneyBillAlt, FaHeart} from "react-icons/fa";
import Button from "react-bootstrap/Button";
const ProductDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const product = useSelector((state) => state.products.productDetail);
  const [majorImage, setMajorImage] = useState("");

  const handleSelectImage = (e) => {
    setMajorImage(e.target.id);
  };

  useEffect(() => {
    document.body.scrollIntoView({
      behavior: "smooth",
    });
    const getDetail = async () => {
      const producto = await dispatch(getAsyncDetail(params));
      setMajorImage(producto.payload.image[0]);
    };
    getDetail();
  }, [dispatch]);
  return (
    <div className={styles.containMaster}>
      <Header></Header>
      <NavBar></NavBar>
      <div className={styles.container}>
        {product && (
          <div className={styles.containProductDetail}>
            <div className={styles.containImages}>
              <div className={styles.containSecondImgs}>
                {product.image &&
                  product.image.map((e) => {
                    return (
                      <img
                        onClick={(e) => handleSelectImage(e)}
                        className={styles.imgsSecondary}
                        id={e}
                        key={e}
                        src={e}
                        alt='imagenes de ropa'
                      />
                    );
                  })}
              </div>
              <img
                className={styles.imageProduct}
                src={majorImage}
                alt={product.name}
              />
            </div>
            <div className={styles.containDetail}>
              <ul className={styles.historyNav}>
                <ul>Inicio</ul>
                <ul>/</ul>
                <ul>{params.category}</ul>
                <ul>/</ul>
                <ul>{product.name}</ul>
              </ul>
              <h1 className={styles.nameProduct}>{product.name}</h1>
              <h1 className={styles.priceProduct}>${product.price}</h1>
              <div className={styles.containP}>
                <p className={styles.productParrf}>
                  <FaTruck className={styles.icon} />
                  Envíos a todo el país
                </p>
                <p className={styles.productParrf}>
                  <FaRegMoneyBillAlt className={styles.icon} />
                  <b>5% </b> de descuento pagando en efectivo
                </p>
              </div>
              <h2 className={styles.nameSize}>Talles</h2>
              <div className={styles.containTalles}>
                {product.size
                  ? product.size.map((e) => {
                      return (
                        <p key={e} className={styles.size}>
                          {e}
                        </p>
                      );
                    })
                  : ""}
              </div>
              <h2 className={styles.nameSize}>Colores</h2>
              <div className={styles.containColores}>
                {product.color
                  ? product.color.map((e) => {
                      return (
                        <button
                          key={e}
                          style={{background: e}}
                          className={styles.color}
                        ></button>
                      );
                    })
                  : ""}
              </div>{" "}
              {product.description && (
                <div>
                  {" "}
                  <h2 className={styles.nameSize}>Descripcion del producto:</h2>
                  <p className={styles.productDescription}>
                    {product.description}
                  </p>
                </div>
              )}
              <Button className={styles.favoriteButton} variant='light'>
                <FaHeart />
              </Button>{" "}
            </div>{" "}
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ProductDetail;
