import {BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";

import "./App.css";
import Products from "./components/Products/Products";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Profile from "./components/Profile/Profile";
import ProSideBarr from "./components/SideBar/SideBar";
import {useSelector} from "react-redux";
import CreateProduct from "./components/CreateProduct/CreateProduct";

function App() {
  const user = useSelector((state) => state.products.user);
  return (
    <BrowserRouter>
      {user.admin ? <ProSideBarr /> : ""}
      <Routes>
        <Route exact path='/' element={<LandingPage />}></Route>
        <Route exact path={"/productos"} element={<Products />}></Route>
        <Route
          exact
          path={"/productos/:category"}
          element={<Products />}
        ></Route>
        <Route
          exact
          path='/productos/:category/:id'
          element={<ProductDetail />}
        ></Route>
        <Route exact path='/create' element={<CreateProduct />}></Route>
        <Route exact path='/perfil' element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
