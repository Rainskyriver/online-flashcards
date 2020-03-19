import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "react-modal";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const customStyles = {
  content: {
    display: "flex",
    top: "25%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px"
  },
  overlay: {
    zIndex: 10
  }
};

export default function Login(props) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleLogin = () => {
    props.setLogin(true);
  };

  const handleLogout = () => {
    props.setLogin(false);
  };

  const classes = useStyles();

  console.log(props);

  return (
    <div style={{ zIndex: 10 }}>
      <Button variant={"contained"} onClick={openModal}>
        Login
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div>
          <h2>Please Login</h2>
          <div className={classes.root}>
            <TextField label="Username" />
            <TextField
              label="Password"
              type="password"
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <Button onClick={closeModal}>X</Button>
          <form action="/api/login" method="POST" style={{ display: "flex" }}>
            <Button type="submit">Login</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
