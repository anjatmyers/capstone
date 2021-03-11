import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MasterEditor from "./components/MasterEditor"
import Grid from "@material-ui/core/Grid"
import { DiJsBadge, DiPython, DiDatabase, DiHtml5, DiTerminal } from "react-icons/di";
import {useDispatch} from 'react-redux';

import {getURL} from './actions/index'
import {setLanguage} from './actions/index'

import {Link} from 'react-router-dom'
import axios from 'axios';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));



export default function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

// function for google docs button
  const handleDocs = () => {
    dispatch(getURL());
  }
  const getFiles = () => {
    
    const files = async () => {
      
      let response = await axios.post('http://localhost:3001/files', {}, {
        headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem('token'),
        }})

        console.log(response.data)
    }
    files();
    
  }

  const handleClick = (language) => {
    console.log(language);
    dispatch(setLanguage(language))
  }
  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Bootcamp Survival Guide
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List >
        <ListItem button key={"1"} onClick={()=>dispatch(setLanguage("javaScript"))} value="javaScript">
            <ListItemIcon><DiJsBadge /></ListItemIcon>
            <ListItemText primary={"JavaScript"}></ListItemText>
          </ListItem>

          <ListItem button key={"2"} onClick={()=>dispatch(setLanguage("python"))}value="python">
            <ListItemIcon><DiPython /></ListItemIcon>
            <ListItemText primary={"Python"}></ListItemText>
          </ListItem>

          <ListItem button key={"3"} onClick={()=>dispatch(setLanguage("html"))}value="html">
            <ListItemIcon><DiHtml5 /></ListItemIcon>
            <ListItemText primary={"HTML/CSS"}></ListItemText>
          </ListItem>

          <ListItem button key={"4"} onClick={()=>dispatch(setLanguage("sql"))}value="sql">
            <ListItemIcon><DiDatabase /></ListItemIcon>
            <ListItemText primary={"SQL"}></ListItemText>
          </ListItem>

          <ListItem button key={"5"} onClick={()=>dispatch(setLanguage("Shell"))}value="sql">
            <ListItemIcon><DiTerminal /></ListItemIcon>
            <ListItemText primary={"Shell"}></ListItemText>
          </ListItem>

        </List>
        <Divider />
        <List>
          <ListItem button key={"5"}>
            <ListItemIcon><DiJsBadge /></ListItemIcon>
            <ListItemText primary={"Second List"}></ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        
        <div classname="mainWindow">

          <MasterEditor className="mainWindow"/>

        </div>
        
        

        <button onClick={handleDocs}>Get Google Docs</button>
        <button onClick={getFiles}>Get Files</button>
        <p><Link to="/feature">Go to page 2</Link></p>
        <br></br>
        <p><Link to="/signout">Sign Out</Link></p>

      </main>
    </div>
  );
}
