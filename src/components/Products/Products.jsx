import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, redirect, useParams} from "react-router-dom";
import {getAsyncProduct} from "../../redux/actions";
import Card from "../Cards/Card";
import Filters from "../Filters/Filters";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import Paginado from "../Paginate/Paginate";
import styles from "../Products/Products.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import {cleanProducts} from "../../redux/reducer";

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

  const scroll = () => {
    document.body.scrollIntoView({
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (!params) {
      window.location.reload(true);
    }
    scroll();
    if (!category.category) {
      dispatch(getAsyncProduct());
    } else {
      dispatch(getAsyncProduct(category.category));
    }
    return () => {
      dispatch(cleanProducts());
    };
  }, [dispatch]);
  return (
    <div className={styles.container}>
      <Header></Header>
      <NavBar></NavBar>
      {productSlice.length ? (
        <div className={styles.containBody}>
          <div className={styles.containFilters}>
            <Filters scroll={scroll} setCurrentPage={setCurrentPage}></Filters>
          </div>

          <div className={styles.containInfo}>
            {Array.isArray(productSlice) && productSlice.length ? (
              <div className={styles.containSearchBar}>
                <SearchBar setCurrentPage={setCurrentPage} />
              </div>
            ) : (
              ""
            )}

            <div className={styles.containCards}>
              {Array.isArray(productSlice)
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
                : Swal.fire({
                    icon: "warning",
                    title: "No hay productos aquí...",
                    text: `Aún no hay productos en ésta sección, ve a otra!`,
                    showConfirmButton: true,
                  }).then((response) => {
                    if (response.isConfirmed) {
                      window.location.href = "/";
                    }
                  })}
            </div>
            {Array.isArray(productSlice) && productSlice.length ? (
              <Paginado
                setCurrentPage={setCurrentPage}
                products={products.length}
                currentPage={currentPage}
                productsPerPage={productsPerPage}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div className={styles.containLoader}>
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </div>
      )}

      <Footer></Footer>
    </div>
  );
}
