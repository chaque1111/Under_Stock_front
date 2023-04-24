import React, {useEffect, useState} from "react";
import styles from "../CreateProduct/CreateProduct.module.css";
import {
  asyncValidate,
  createProduct,
  getAllColorsByCreate,
} from "../../redux/actions.js";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const colorsByDb = useSelector((state) => state.products.colors);
  const [images, setImages] = useState([]);
  const [colors, setColors] = useState([]);
  const [color, setColor] = useState("");
  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState("");

  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [imagenPrev, setImagePrev] = useState("");

  const validate = (form) => {
    let error = {};

    return error;
  };

  const handleChangue = async (e) => {
    if (e.target.name === "name" && e.target.value !== "") {
      const res = await dispatch(
        asyncValidate({category: form.category, name: e.target.value})
      );
      if (res === "El nombre no está disponible intenta con otro") {
        setError({
          ...error,
          [e.target.name]: "El nombre no está disponible intenta con otro",
        });
      } else {
        setError({
          ...error,
          [e.target.name]: false,
        });
      }
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
      setError(validate({...form, [e.target.name]: e.target.value}));
    }
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "UnderStock");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dw83apcj7/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImages([...images, file.url]);
    setForm({
      ...form,
      image: [...images, file.url],
    });
    setLoading(false);
  };
  const handleDeleteImage = (el) => {
    el.preventDefault(el);
    const imagesFilter = images.filter((e) => e !== el.target.value);
    setImages(imagesFilter);
    setForm({
      ...form,
      image: imagesFilter,
    });
    setImagePrev("");
  };
  const handleChangueColor = (e) => {
    e.preventDefault(e);
    setColor(e.target.value);
  };
  const handleSelectColor = (e) => {
    e.preventDefault(e);
    if (!colors.includes(color) && color !== "") {
      setColors([...colors, color]);
      setForm({
        ...form,
        color: [...colors, color],
      });
    }
  };
  const handleDeleteColor = (e) => {
    e.preventDefault(e);
    const filterColors = colors.filter((el) => el !== e.target.value);
    setColors(filterColors);
    setForm({
      ...form,
      color: filterColors,
    });
  };

  const handleChangueSize = (e) => {
    setSize(e.target.value);
  };
  const handleAddSize = (e) => {
    e.preventDefault(e);
    const size = document.getElementById("talle").value;
    const sizeCopy = sizes;
    if (!sizeCopy.includes(size) && size !== "") {
      sizeCopy.push(size);
      setSizes(sizeCopy);
      setForm({
        ...form,
        size: sizes,
      });
      setSize("");
    }
  };
  const handleDeleteSize = (e) => {
    e.preventDefault(e);
    const filterSizes = sizes.filter((el) => el !== e.target.value);
    setSizes(filterSizes);
    setForm({
      ...form,
      size: sizes,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault(e);
    dispatch(createProduct(form));
  };
  useEffect(() => {
    dispatch(getAllColorsByCreate());
  }, []);
  return (
    <div className={styles.container}>
      <h1>Crear Producto</h1>

      <Form className={styles.Form}>
        <FormGroup>
          <Label className={styles.Label} for='category'>
            Categoría del producto
          </Label>
          <Input
            name='category'
            onChange={(e) => handleChangue(e)}
            id='category'
            type='select'
          >
            <option hidden>Selecciona la categoría</option>
            <option value='remeras'>Remeras</option>{" "}
            <option value='buzos'>Buzos</option>{" "}
            <option value='pantalones'>Pantalones</option>{" "}
            <option value='zapatillas'>Zapatillas</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label className={styles.Label} for='name'>
            Nombre del producto
          </Label>
          {!form.category ? (
            <>
              <Input
                disabled
                name='name'
                onChange={(e) => handleChangue(e)}
                type='text'
                id='name'
                invalid
              />
              <FormFeedback valid={false}>
                Primero elige una categoría para comprobar si el nombre del
                producto está disponible
              </FormFeedback>
            </>
          ) : (
            <>
              {!error.name ? (
                <>
                  <Input
                    name='name'
                    onChange={(e) => handleChangue(e)}
                    type='text'
                    id='name'
                    valid
                  />
                  <FormFeedback valid={true}>
                    Sweet! that name is available
                  </FormFeedback>
                </>
              ) : (
                <>
                  <Input
                    name='name'
                    onChange={(e) => handleChangue(e)}
                    type='text'
                    id='name'
                    invalid
                  />
                  <FormFeedback valid={false}>{error.name}</FormFeedback>
                </>
              )}
            </>
          )}
        </FormGroup>
        <FormGroup>
          {!loading && images.length < 4 ? (
            <>
              {" "}
              <Label className={styles.Label} for='image'>
                Imagenes del producto
              </Label>
              <Input onChange={(e) => uploadImage(e)} id='image' type='file' />
              <FormFeedback>Oh noes! that name is already taken</FormFeedback>
              <FormText>
                Solo se pueden incluir 5 imagenes a cada producto.
              </FormText>
            </>
          ) : (
            <>
              <Label className={styles.Label} for='image'>
                Imagenes del producto
              </Label>
              <Input
                disabled
                onChange={(e) => uploadImage(e)}
                id='image'
                type='file'
              />
              <FormFeedback>Oh noes! that name is already taken</FormFeedback>
              <FormText>
                Solo se pueden incluir 5 imagenes a cada producto.
              </FormText>
            </>
          )}
        </FormGroup>
        <div className={styles.containButtonImages}>
          {images.length
            ? images.map((e) => {
                return (
                  <div key={e}>
                    <img
                      className={styles.buttonImage}
                      value={e}
                      onClick={() => setImagePrev(e)}
                      src={e}
                      alt='imagen del producto'
                    />
                    <button value={e} onClick={(e) => handleDeleteImage(e)}>
                      x
                    </button>
                  </div>
                );
              })
            : ""}
          {imagenPrev !== "" ? (
            <div>
              <img
                className={styles.imagenPrev}
                src={imagenPrev}
                alt='imagen del producto'
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <FormGroup style={{display: "flex", gap: "40px"}}>
          {colorsByDb.length ? (
            <div className={styles.containColorsDb}>
              <Label className={styles.Label}>
                Elige colores de otros productos
              </Label>
              <div className={styles.containColorsButtons}>
                {colorsByDb.map((e) => {
                  return (
                    <button
                      key={e}
                      onClick={(e) => handleChangueColor(e)}
                      style={{background: e, height: "20px", width: "20px"}}
                      value={e}
                    ></button>
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )}
          <div style={{display: "flex", flexDirection: "column"}}>
            <Label className={styles.Label} for='color'>
              Color personalizado
            </Label>
            <Input
              style={{width: "70px"}}
              onChange={(e) => handleChangueColor(e)}
              id='color'
              type='color'
            ></Input>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Label className={styles.Label}>Agregar color?</Label>
            <button
              onClick={(e) => {
                e.preventDefault(e);
              }}
              style={{background: color, height: "30px", width: "30px"}}
            ></button>
            <button
              style={{
                width: "73px",
                borderRadius: "4px",
                background: "black",
                fontWeight: "600",
                color: "white",
              }}
              onClick={(e) => handleSelectColor(e)}
            >
              Agregar
            </button>
          </div>
        </FormGroup>{" "}
        {colors.length ? (
          <div>
            <Label className={styles.Label}>Colores que agregaste</Label>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                gap: "8px",
                marginBottom: "20px",
              }}
            >
              {colors.length
                ? colors.map((e) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                        }}
                        key={e}
                      >
                        <button
                          disabled
                          style={{background: e, height: "30px", width: "30px"}}
                        ></button>
                        <button
                          style={{
                            background: "#c71a1a",
                            color: "#fff",
                            width: "30px",
                            fontWeight: "400",
                          }}
                          onClick={(e) => handleDeleteColor(e)}
                          value={e}
                        >
                          x
                        </button>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        ) : (
          ""
        )}
        <FormGroup>
          <Label for='talle' className={styles.Label}>
            Talles
          </Label>
          <Input
            onChange={(e) => handleChangueSize(e)}
            id='talle'
            type='select'
          >
            <option value={""} hidden>
              Elige un talle para agregarlo
            </option>
            <option value='S'>S</option>
            <option value='M'>M</option>
            <option value='L'>L</option>
            <option value='XL'>XL</option>
          </Input>{" "}
          {size.length ? (
            <div style={{display: "flex", flexDirection: "column"}}>
              <Label className={styles.Label}>Agregar talle?</Label>
              <button
                onClick={(e) => {
                  e.preventDefault(e);
                }}
                style={{
                  width: "70px",
                  borderRadius: "4px",
                  background: "black",
                  fontWeight: "600",
                  color: "white",
                  marginBottom: "2px",
                }}
              >
                {size}
              </button>
              <button
                style={{
                  width: "73px",
                  borderRadius: "4px",
                  background: "black",
                  fontWeight: "600",
                  color: "white",
                }}
                onClick={(e) => handleAddSize(e)}
              >
                Agregar
              </button>
            </div>
          ) : (
            ""
          )}
        </FormGroup>
        {sizes.length ? (
          <div>
            <Label className={styles.Label}>Talles que elegiste</Label>
            <div style={{display: "flex", flexDirection: "row", gap: "7px"}}>
              {sizes.map((e) => {
                return (
                  <div
                    style={{display: "flex", alignContent: "center"}}
                    key={e}
                  >
                    <button
                      style={{
                        width: "40px",
                        borderRadius: "4px",
                        background: "black",
                        fontWeight: "600",
                        color: "white",
                        marginBottom: "2px",
                      }}
                      onClick={(e) => {
                        e.preventDefault(e);
                      }}
                    >
                      {e}
                    </button>
                    <button
                      style={{
                        background: "#c71a1a",
                        color: "#fff",
                        height: "29px",
                        width: "29px",
                        fontWeight: "400",
                      }}
                      onClick={(e) => handleDeleteSize(e)}
                      value={e}
                    >
                      x
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}{" "}
        <FormGroup>
          <Label className={styles.Label} for='price'>
            Precio
          </Label>
          <Input
            onChange={(e) => handleChangue(e)}
            name='price'
            type='text'
            id='price'
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label className={styles.Label} for='brand'>
            Marca
          </Label>
          <Input
            onChange={(e) => handleChangue(e)}
            name='brand'
            type='text'
            id='brand'
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label className={styles.Label} for='description'>
            Descripción del producto
          </Label>
          <Input
            onChange={(e) => handleChangue(e)}
            name='description'
            type='text'
            id='description'
          ></Input>
        </FormGroup>
        {form.name &&
        form.category &&
        form.brand &&
        form.price &&
        form.color &&
        form.size ? (
          <button onClick={(e) => handleSubmit(e)}>Crear producto</button>
        ) : (
          <button disabled>Crear producto</button>
        )}
      </Form>
    </div>
  );
};

export default CreateProduct;
