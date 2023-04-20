import React from "react";
import {useEffect} from "react";
import styles from "../Paginate/Paginate.module.css";

const Paginado = ({
  setCurrentPage,
  products,
  currentPage,
  productsPerPage,
}) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(products / productsPerPage); i++) {
    pages.push(i);
  }

  const previous = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const next = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const handleChangue = async (e) => {
      if (e.target.name === "buttonCurrent") {
        document.body.scrollIntoView({
          behavior: "smooth",
        });
      }
    };
    document.addEventListener("click", handleChangue);
  }, []);

  return (
    <div>
      {pages && (
        <div className={styles.container}>
          {currentPage === 1 ? (
            <button name='buttonCurrent' className={styles.setCurrent} disabled>
              {"Anterior"}
            </button>
          ) : (
            <button
              name='buttonCurrent'
              className={styles.setCurrent}
              onClick={previous}
            >
              {"Anterior"}
            </button>
          )}

          <h1 className={styles.currentText}>
            {currentPage} de {pages.length}
          </h1>
          {currentPage < pages.length ? (
            <button
              name='buttonCurrent'
              className={styles.setCurrent}
              onClick={next}
            >
              {"Siguiente"}
            </button>
          ) : (
            <button name='buttonCurrent' className={styles.setCurrent} disabled>
              {"Siguiente"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Paginado;
