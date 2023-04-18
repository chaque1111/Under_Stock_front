import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getAsyncProduct} from "../../redux/actions";
import Card from "../Cards/Card";
import Filters from "../Filters/Filters";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import styles from "../Products/Products.module.css";
import SearchBar from "../SearchBar/SearchBar";

export default function Products() {
  const dispatch = useDispatch();
  const category = useParams();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    if (!category.category) {
      dispatch(getAsyncProduct());
    } else {
      dispatch(getAsyncProduct(category.category));
    }
  }, [dispatch]);
  return (
    <div className={styles.container}>
      <Header></Header>
      <NavBar></NavBar>
      <div className={styles.containBody}>
        <Filters></Filters>

        <div className={styles.containInfo}>
          <div className={styles.containSearchBar}>
            <SearchBar />
          </div>
          <div className={styles.containCards}>
            {products.length
              ? products.map((e) => {
                  return (
                    <Card
                      id={e.id}
                      key={e.id}
                      image={e.image}
                      name={e.name}
                      price={e.price}
                      color={e.color}
                      size={e.size}
                    ></Card>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
