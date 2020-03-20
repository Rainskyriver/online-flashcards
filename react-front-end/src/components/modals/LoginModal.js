import React, { useState } from "react";
import Modal from "react-modal";
import Cookies from "universal-cookie";
import { Button, TextField, makeStyles } from "@material-ui/core";

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

const cookies = new Cookies();

export default function LoginModal(props) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const handleLogin = e => {
    e.preventDefault();
    cookies.set("LoggedIn", "Hello", { path: "/" });
    closeModal();
  };

  const classes = useStyles();

  return (
    <>
      {props.render(openModal)}
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
            <TextField label="Password" type="password" />
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
          <form
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            style={{ display: "flex" }}
          >
            <Button type="submit">Login</Button>
          </form>
        </div>
      </Modal>
    </>
  );
}
