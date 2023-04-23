import React from "react";
import underLogo from "../../assets/underStock.svg";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";

import {FaUserTie, FaBox, FaUserFriends, FaEdit} from "react-icons/fa";
import {Link} from "react-router-dom";

export default function ProSideBarr() {
  const {collapseSidebar} = useProSidebar();
  return (
    <div
      style={{
        zIndex: "10000",
        position: "fixed",
        height: "50vh",
        top: "200px",
      }}
    >
      <Sidebar style={{backgroundColor: "#fff", borderRadius: "3px"}}>
        <div
          style={{
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            style={{borderStyle: "none", background: "none", outline: "none"}}
          >
            <img
              onClick={() => collapseSidebar()}
              style={{height: "65px"}}
              src={underLogo}
              alt=''
            />
          </button>
        </div>
        {/* <button onClick={() => collapseSidebar()}>Collapse</button> */}
        <Menu>
          <MenuItem
            style={{
              color: "#1E90FF",
              fontWeight: "800",
              display: "flex",
            }}
          >
            <FaUserFriends
              style={{
                fontSize: "23px",
                marginBottom: "5px",
                marginLeft: "7px",
                marginRight: "7px",
              }}
            />
            Usuarios
          </MenuItem>
          <MenuItem
            style={{
              color: "#1E90FF",
              fontWeight: "800",
              display: "flex",
            }}
          >
            <FaUserTie
              style={{
                fontSize: "20px",
                marginBottom: "5px",
                marginLeft: "9px",
                marginRight: "7px",
              }}
            />
            Otorgar permisos
          </MenuItem>
          <Link to={"/create"}>
            {" "}
            <MenuItem
              style={{
                color: "#1E90FF",
                fontWeight: "800",
                display: "flex",
              }}
            >
              <FaBox
                style={{
                  fontSize: "20px",
                  marginBottom: "5px",
                  marginLeft: "7px",
                  marginRight: "7px",
                }}
              />
              Crear producto
            </MenuItem>{" "}
          </Link>
          <MenuItem
            style={{
              color: "#1E90FF",
              fontWeight: "800",
              display: "flex",
              marginBottom: "20px",
            }}
          >
            <FaEdit
              style={{
                fontSize: "25px",
                marginBottom: "5px",
                marginLeft: "9px",
                marginRight: "7px",
              }}
            />
            Editar producto
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
