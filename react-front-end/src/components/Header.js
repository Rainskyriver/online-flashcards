import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { fade, makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    '& .MuiTextField-root': {
      width: 200,
      color: '#fff'
    },
    '& .MuiFormLabel-root': {
      color: '#fff'
    },
    '& .MuiInputBase-root': {
      color: '#fff'
    },
    '& .MuiIconButton-root': {
      color: '#fff',
    },
  },
  input: {
    color: '#fff'
  },
  link: {
    'text-decoration': 'none',
    marginRight: 15,
    marginLeft: 15,
    color: '#fff',
    '&:hover': {
      'text-decoration': 'underline',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));
export default function Header(props) {
  const classes = useStyles();
  const [inputvalue, setValue] = useState('');
  const [tags, setTags] = useState([]);
  const handleChange = (event) => {
    setValue(event.target.value);
  }
  const submitSearch = () => {
  }
  const keyEnter = (event) => {
    if (event.key === 'Enter') {
      this.submitSearch()
    }
  }
  useEffect(() => {
    axios.get('/api/tags').then((res) => {
      setTags(res.data.tags);
    }).catch((err) => {
      console.log(err)
    })
  }, [])
  return (
    <nav className="header">
          <div className={classes.root}>
            <AppBar>
              <Toolbar>
                <Link className={classes.link} to="/">Home</Link>
                <Typography className={classes.title} variant="h6" noWrap>
                  Ofc
                </Typography>
                  <form action={`/search?${inputvalue}`} method="POST">
                    <Autocomplete
                      options={tags.map(tag => tag.name)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          id="outlined-search"
                          label={<SearchIcon color={classes.root.primary}/>}
                          onChange = {handleChange}
                          value = {inputvalue}
                          className = {classes.inputRoot}
                        />
                      )}
                    />
                  </form>
                 <Link className={classes.link} to='/login'>Login</Link>
              </Toolbar>
            </AppBar>
          </div>
          
    </nav>
  )
}