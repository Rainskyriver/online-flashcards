import React from "react";
import { Button } from "@material-ui/core";
import Cookies from "universal-cookie";

import LoginModal from "./modals/LoginModal";
const cookies = new Cookies();

export default function Login(props) {
  const handleLogout = () => {
    cookies.remove("LoggedIn", { path: "/" });
  };

  if (cookies.get("LoggedIn")) {
    return (
      <div style={{ display: "flex" }}>
        <a
          style={{ padding: "10px", color: "#FFF", textDecoration: "none" }}
          href="/users/3"
        >
          Userpage
        </a>
        <form action="/" method="GET">
          <Button type="submit" variant={"contained"} onClick={handleLogout}>
            Logout
          </Button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <LoginModal
          render={openModal => (
            <Button
              className="login-button"
              variant={"contained"}
              onClick={openModal}
            >
              Login
            </Button>
          )}
        />
      </div>
    );
  }
}
