import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {
  filterAsync,
  getAsyncFilters,
  getAsyncProduct,
} from "../../redux/actions";
import {deleteFilters} from "../../redux/reducer";
import styles from "../Filters/Filters.module.css";
import {FaFilter, FaWindowClose} from "react-icons/fa";

import {BiRefresh} from "react-icons/bi";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
const Filters = ({setCurrentPage}) => {
  const dispatch = useDispatch();
  const params = useParams();
  const colors = useSelector((state) => state.products.colors);
  const sizes = useSelector((state) => state.products.sizes);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [colorButton, setColorButton] = useState("");
  const [sizeButton, setSizeButton] = useState("");
  const handleSelectColor = (e) => {
    setColor(e.target.value);
    setColorButton(e.target.value);
  };
  const handleSelectSize = (e) => {
    setSize(e.target.value);
    setSizeButton(e.target.value);
  };

  const handleRefresh = () => {
    setColor("");
    setSize("");
    setColorButton("");
    setSizeButton("");
    if (params) {
      dispatch(getAsyncProduct(params.category));
    } else {
      dispatch(getAsyncProduct());
    }
  };
  const handleFilter = () => {
    if (color || size) {
      if (!params) {
        dispatch(filterAsync({color: color}));
        setColor("");
        setSize("");
        setColorButton("");
        setSizeButton("");
        setCurrentPage(1);
      } else {
        dispatch(
          filterAsync({category: params.category, color: color, size: size})
        );
        setColor("");
        setSize("");
        setColorButton("");
        setSizeButton("");
        setCurrentPage(1);
      }
    } else {
      Swal.fire({
        title: "Elige una opcion!",
        text: "Elige un color o una talla para poder filtrar",
        icon: "warning",

        confirmButtonColor: "#3085d6",

        confirmButtonText: "Ok, entiendo",
      });
    }
  };
  useEffect(() => {
    dispatch(getAsyncFilters({category: params.category}));

    return () => {
      dispatch(deleteFilters());
    };
  }, [dispatch]);
  return (
    <div className={styles.container}>
      {colors.length ? (
        <div className={styles.containTitleFilter}>
          <h1 className={styles.TitleFilter}>Filtrar por</h1>
          <h2 className={styles.nameFilter}>Color</h2>{" "}
          <div className={styles.containColors}>
            {colors.length ? (
              <div className={styles.containButtonsColor}>
                {colors.map((e) => {
                  return (
                    <button
                      id={e}
                      onClick={(e) => handleSelectColor(e)}
                      value={e}
                      className={styles.buttonColor}
                      key={e}
                      style={{background: `${e}`}}
                    ></button>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
          {colorButton.length ? (
            <div className={styles.containDeleteFilter}>
              <button
                className={styles.colorDelete}
                style={{background: colorButton}}
              ></button>

              <FaWindowClose
                onClick={() => {
                  setColorButton(""), setColor("");
                }}
                className={styles.deleteFilter}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      {sizes.length ? (
        <div className={styles.containTitleFilter}>
          <h2 className={styles.nameFilter}>Talles</h2>{" "}
          <div className={styles.containSizes}>
            {sizes.length ? (
              <div className={styles.containSizeButtons}>
                {sizes.map((e) => {
                  return (
                    <button
                      id={e}
                      value={e}
                      onClick={(e) => handleSelectSize(e)}
                      key={e}
                      className={styles.buttonSize}
                    >
                      {e}
                    </button>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>{" "}
          {sizeButton.length ? (
            <div className={styles.containDeleteFilter}>
              <button className={styles.buttonSize}>{sizeButton}</button>
              <FaWindowClose
                onClick={() => {
                  setSizeButton(""), setSize("");
                }}
                className={styles.deleteFilter}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      {colors.length ? (
        <div className={styles.containOpts}>
          <Button className={styles.buttonRefresh} variant='light'>
            <BiRefresh
              onClick={() => handleRefresh()}
              className={styles.reloadIcon}
            />
          </Button>{" "}
          <Button
            onClick={() => handleFilter()}
            className={styles.filterButton}
            variant='light'
          >
            <FaFilter />
          </Button>{" "}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Filters;
