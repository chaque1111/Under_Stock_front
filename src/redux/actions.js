import axios from "axios";
import Swal from "sweetalert2";
axios.defaults.baseURL = "http://localhost:8080/";
import {
  filterProducts,
  getAllColors,
  getAllProducts,
  getAllSizes,
  searchProduct,
} from "./reducer";

export function getAsyncProduct(category) {
  return async (dispatch) => {
    try {
      let res;
      if (!category) {
        res = await axios.get("/productos");
      } else {
        res = await axios.get("/" + category);
      }

      dispatch(getAllProducts(res.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function searchAsyncProduct(obj) {
  return async (dispatch) => {
    try {
      console.log(obj);
      if (!obj.category) {
        const res = await axios.get("/productos/search/" + obj.name);
        if (res.data === "No se encontró el producto") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${res.data} que estás buscando`,
          });
        } else {
          dispatch(searchProduct(res.data));
        }
      } else {
        const res = await axios.get(`/${obj.category}/search/${obj.name}`);
        if (res.data === "No se encontró el producto") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `No se encontraron los/as ${obj.category} que estás buscando`,
          });
        } else {
          dispatch(searchProduct(res.data));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAsyncFilters(obj) {
  return async (dispatch) => {
    try {
      if (!obj.category) {
        const res = await axios.get("/productos/filters");
        dispatch(getAllColors(res.data.colors));
      } else {
        const res = await axios.get(`/${obj.category}/filters`);
        dispatch(getAllColors(res.data.colors));
        dispatch(getAllSizes(res.data.sizes));
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterAsync(obj) {
  return async (dispatch) => {
    try {
      if (!obj.category) {
        const res = await axios.put(`/productos/filter`, {color: obj.color});
        dispatch(filterProducts(res.data));
      } else {
        const res = await axios.put(`/${obj.category}/filter`, {
          color: obj.color,
          size: obj.size,
        });
        if (
          res.data === "No se encontró un producto con esas características"
        ) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${res.data}`,
          });
        } else {
          dispatch(filterProducts(res.data));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
}
