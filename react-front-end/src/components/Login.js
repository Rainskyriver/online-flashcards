import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core'
import Modal from 'react-modal';
import axios from 'axios'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const customStyles = {
  content : {
    top                   : '25%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    overlay:{zIndex       : '10'},
    borderRadius          : '10px',
  }
};

export default function Login(props) {
  const [modalIsOpen, setIsOpen] = useState(false)
  const openModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }
  const handleLogin = (e) => {
    e.preventDefault();
    cookies.set('LoggedIn', 'Hello', { path: '/'})
    closeModal();
  }
  const handleLogout = () => {
    cookies.remove('LoggedIn', { path: '/' });
  }
  if (cookies.get('LoggedIn')) {
    return (
      <div>
        <form action="/" method="GET">
          <Button type="submit" variant={'contained'} onClick={handleLogout}>Logout</Button>
        </form>
      </div>
    )
  } else {
    return (
      <div style={{zIndex: 5}}>

        <Button variant={'contained'} onClick={openModal} >Login</Button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
        >
          <h2>Please Login</h2>
            <Button onClick={closeModal}>X</Button>
            <form onSubmit={handleLogin} action="/login" method="POST">
              <TextField
              label="Username" 
              />
              <TextField
              label="Password"
              />
              <Button type="submit">Login</Button>
            </form>
        </Modal>
      </div>
    )

  }
}