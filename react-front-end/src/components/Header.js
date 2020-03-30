import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from './Login';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import { fade, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  root: {
    color: "#fff",
    flexGrow: 1,
    "& .MuiTextField-root": {
      width: 200,
      color: "#fff"
    },
    "& .MuiFormLabel-root": {
      color: "#fff"
    },
    "& .MuiInputBase-root": {
      color: "#fff"
    },
    "& .MuiIconButton-root": {
      color: "#fff"
    },
    "& .MuiSvgIcon-root": {
      color: "#fff",
      padding: "10px",
    }
  },
  input: {
    color: "#fff"
  },
  link: {
    "text-decoration": "none",
    marginRight: 15,
    marginLeft: 15,
    color: "#fff",
    "&:hover": {
      "text-decoration": "underline"
    }
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }

  }
}));
export default function Header(props) {
  const classes = useStyles();
  const [inputvalue, setValue] = useState("");
  const [tags, setTags] = useState([]);
  const handleChange = (event, values) => {
    setValue(values)
  };
  const handleType = (e) => {
    setValue(e.target.value)
  }
  useEffect(() => {
    //Get Tags
    axios.get("/api/tags").then(res => {setTags(res.data.tags);}).catch(err => {console.log(err);});
  }, []); 
  return (
    <nav className={classes.header}>
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
          <Link className={classes.link} to="/">
            <div style={{width: '50px', padding: '2px'}}>
              <img  href="/"  style={{height: 'auto'}} src="https://vectr.com/rainskyriver/i5jtSIazk.svg?width=640&height=640&select=i5jtSIazkpage0"/>
            </div>
          </Link>
            <Link className={classes.link} to="/">
              Home
            </Link>
            <Typography className={classes.title} variant="h6" noWrap>
            </Typography>
            <form action={`/search/${inputvalue}`} method="GET">
              <Autocomplete
                options={tags.map(tag => tag.name)}
                onChange={handleChange}
                renderInput={params => (
                  <div>
                    <Button type="submit"><SearchIcon /></Button>
                    <TextField
                    {...params}
                    label="Search..."
                    onChange={handleType}
                    value={inputvalue}
                    className={classes.inputRoot}
                    />
                  </div>
                  )}
              />
            </form>
            <Login/>
          </Toolbar>
        </AppBar>
      </div>
    </nav>
  );
}
