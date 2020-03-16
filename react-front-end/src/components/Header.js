import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
export default function Header(props) {
  const [inputvalue, setValue] = useState('')
  const [tags, setTags] = useState({})
  const handleChange = (event) => {
    setValue(event.target.value);
  }
  useEffect(() => {
    axios.get('/api/tags').then((res) => {
      setTags(res);
    }).catch((err) => {
      console.log(err)
    })
    console.log(tags);
  }, [])
  return (
    <nav className="header">
          <Link to="/">Home</Link>
          <div>
            <div>

            </div>
            <InputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search'}}
              onChange = {handleChange}
              value = {inputvalue}
              />
          </div>
          
          <Link to='/login'>Login</Link> |
          <Link to='/login'> Sign Up</Link>
    </nav>
  )
}