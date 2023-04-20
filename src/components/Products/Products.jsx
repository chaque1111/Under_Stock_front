import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {getAsyncProduct} from "../../redux/actions";
import Card from "../Cards/Card";
import Filters from "../Filters/Filters";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import Paginado from "../Paginate/Paginate";
import styles from "../Products/Products.module.css";
import SearchBar from "../SearchBar/SearchBar";

export default function Products() {
  const dispatch = useDispatch();
  const category = useParams();
  const products = useSelector((state) => state.products.products);
  const [productsPerPage, SetProductsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const indexLastProduct = currentPage * productsPerPage;
  const indexFirstProduct = indexLastProduct - productsPerPage;
  const productSlice = products.slice(indexFirstProduct, indexLastProduct);
  const params = useParams();
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
        <div className={styles.containFilters}>
          <Filters setCurrentPage={setCurrentPage}></Filters>
        </div>

        <div className={styles.containInfo}>
          <div className={styles.containSearchBar}>
            <SearchBar setCurrentPage={setCurrentPage} />
          </div>
          <div className={styles.containCards}>
            {productSlice.length
              ? productSlice.map((e) => {
                  return (
                    <Link
                      key={e.id}
                      className={styles.Link}
                      to={`/${document.location.pathname.split("/")[1]}${
                        params.category ? "/" + params.category : "/producto"
                      }/${e.id}`}
                    >
                      <Card
                        id={e.id}
                        image={e.image}
                        name={e.name}
                        price={e.price}
                        color={e.color}
                        size={e.size}
                      ></Card>{" "}
                    </Link>
                  );
                })
              : ""}
          </div>
          <Paginado
            setCurrentPage={setCurrentPage}
            products={products.length}
            currentPage={currentPage}
            productsPerPage={productsPerPage}
          />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
