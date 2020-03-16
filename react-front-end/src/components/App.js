import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
import '../styles/App.css';
import FlashCard from './FlashCard';
import Header from './Header';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!'
    }
  }

  fetchData = () => {
    axios.get('/api/users')
    .then((response) => {

      // handle success
      console.log(response.data)

      this.setState({
        message: `Hello ${response.data.users[0].name}`
      });
    }) 
  }

  render() {
    return (
      <Router>
      <div className="App">
      <Header/>


        <h1>{ this.state.message }</h1>
        <button onClick={this.fetchData} >
          Fetch Data
        </button>   
        
        <FlashCard />

      </div>
      </Router>
    );
  }
}

export default App;
