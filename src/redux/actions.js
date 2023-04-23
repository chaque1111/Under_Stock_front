import axios from "axios";
import Swal from "sweetalert2";
axios.defaults.baseURL = "https://understock-db.onrender.com/";
import {
  filterProducts,
  getAllColors,
  getAllProducts,
  getAllSizes,
  getProductDetail,
  logIn,
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
export function getAsyncDetail(obj) {
  return async (dispatch) => {
    try {
      if (obj.category === "producto") {
        const detail = await axios.get("/productos/detail/" + obj.id);

        return dispatch(getProductDetail(detail.data));
      } else {
        const detail = await axios.get(`/${obj.category}/detail/${obj.id}`);

        return dispatch(getProductDetail(detail.data));
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: `Id del producto no encontrado, vuelve al inicio!`,
      });
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

export function asyncLogIn(user) {
  return async (dispatch) => {
    try {
      const res = await axios.post("/usuarios/create", user);
      if (res.status == 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Cuenta creada correctamente!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (res.status == 201) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Hola otra vez ${res.data.name}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }

      dispatch(logIn(res.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function asyncDeleteAccount(email) {
  return async (dispatch) => {
    try {
      const res = await axios.delete("/usuarios/delete/" + email);
      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${res.data}`,
        showConfirmButton: true,
        timer: 5000,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
