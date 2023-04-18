import {BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";

import "./App.css";
import Products from "./components/Products/Products";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<LandingPage />}></Route>
        <Route exact path={"/productos"} element={<Products />}></Route>
        <Route
          exact
          path={"/productos/:category"}
          element={<Products />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
