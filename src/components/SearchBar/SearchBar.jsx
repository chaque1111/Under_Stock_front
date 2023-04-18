import React, {useEffect} from "react";
import {FaSearch} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {searchAsyncProduct} from "../../redux/actions";
import styles from "../SearchBar/SearchBar.module.css";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const handleSearch = () => {
    const inputValue = document.getElementById("inputName").value;
    if (inputValue) {
      dispatch(
        searchAsyncProduct({name: inputValue, category: params.category})
      );
    }
  };
  const handleKeyDown = (key) => {
    const inputValue = document.getElementById("inputName").value;

    if (key.key == "Enter" && inputValue) {
      dispatch(handleSearch());
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.container}>
      <input
        id='inputName'
        className={styles.input}
        type='text'
        placeholder='Buscar...'
      />
      <button onClick={() => handleSearch()} className={styles.buttonSearch}>
        <FaSearch className={styles.searchIcon} />
      </button>
    </div>
  );
};

export default SearchBar;
