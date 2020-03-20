
import React, { useState } from 'react';
import { Button, TextField, makeStyles } from '@material-ui/core'
import Modal from 'react-modal';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
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
  const handleLogin = (e) => {
    e.preventDefault();
    cookies.set('LoggedIn', 'Hello', { path: '/'})
    closeModal();
  }
  const handleLogout = () => {
    cookies.remove('LoggedIn', { path: '/' });
  }
  const classes = useStyles();
  
    if (cookies.get('LoggedIn')) {
    return (
      <div style={{ display: 'flex'}}>
      <a style={{ padding: '10px', color: '#FFF', textDecoration: 'none'}} href='/users/3'>Userpage</a>
        <form action="/" method="GET">
          <Button type="submit" variant={'contained'} onClick={handleLogout}>Logout</Button>
        </form>
      </div>
    )
  } else {

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
          <form onSubmit={handleLogin} action="/login" method="POST" style={{ display: "flex" }}>
            <Button type="submit">Login</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
  }
}

