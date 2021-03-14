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
import Grid from "@material-ui/core/Grid"
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from "@material-ui/core/Button"
// import {Modal, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux';
import {getURL, folderStatus} from './actions/index';

import MasterEditor from "./components/MasterEditor"
import { DiJsBadge, DiPython, DiDatabase, DiHtml5, DiTerminal } from "react-icons/di";
import {setLanguage} from './actions/index'

import {Link} from 'react-router-dom'

import axios from 'axios';

import DeleteFile from './components/pickerComponents/DeleteFile';
import UpdateFile from './components/pickerComponents/UpdateFile';

import Resources from "./components/Resources"


const drawerWidth = 280;


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
    marginTop: theme.spacing(3),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  signOut: {
    fontWeight: "bold",
    marginLeft: "auto",
  },
  navContent:{
    display: "flex",
    justifyContent: "center",
    width: "100%",
    
  },
  toolbar: {
    minHeight: 95,
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  ListItemText:{
    padding: theme.spacing(3),
    fontSize: 20,
  }
}));



export default function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const hasFolders = useSelector(state => state.auth.folderStatus);
  // dispatch(folderStatus(false))
  console.log(hasFolders)

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
        let fileResponse = response.data.files
        console.log(fileResponse)
        // fileResponse.forEach((file) => {
        //   console.log(`${file.id}: ${file.name}`)
        // })
    }
    files();
    
  }

  const handleClick = (language) => {
    console.log(language);
    dispatch(setLanguage(language))
  }

  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDownload = () => {
    dispatch(folderStatus(true))
  }
  
  

  return (
    <div className={classes.root}>
      <CssBaseline />

    {/* Start of the top Navbar */}
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >

        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />

          </IconButton>
          <div className={classes.navContent}>
          <Typography variant="h6" noWrap>
            Bootcamp Survival Guide
          </Typography>

        <Button size="large" variant="contained" className={classes.signOut}><Link to="/signout">Log Out</Link></Button>
        </div>
        </Toolbar>




      </AppBar>
      {/* End of top Navbar */}

      {/* Start of Drawer */}
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

          <ListItem button key={"5"} onClick={()=>dispatch(setLanguage("shell"))}value="shell">
            <ListItemIcon><DiTerminal /></ListItemIcon>
            <ListItemText primary={"Shell"}></ListItemText>
          </ListItem>

        </List>
        <Divider />
        <List>
          <ListItem button component={Link} to="/feature" key={"6"}>
            <ListItemIcon> <DiJsBadge /></ListItemIcon> 
            <ListItemText primary={"Second List"}></ListItemText>
          </ListItem>
        </List>
      </Drawer>

      {/* Start of main content window */}
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        <Grid
  container
  direction="column"
  justify="flex-start"
  alignItems="flex-start"
>  

    <div className="mt-3 m-2">
    
    <h2>Code Editor</h2>
        <h5 className="mb-3">Save important code snippets from class:</h5>
         </div >

        <Grid item>
          <MasterEditor/>
          </Grid>
        

        <Grid item>
          <Resources />
          </Grid>

       
        


        <div className="buttonDiv d-flex">
        <button className='btn btn-success m-2 mr-3' onClick={handleDocs}>Allow Access to Google Drive</button>
        {/* <button onClick={getFiles}>Get Files</button> */}
        {/* <button onClick={()=>saveFile}>Save to Google Drive</button> */}
        
        <div>
        <UpdateFile />
        </div>


        <div>
        <DeleteFile />
        </div>
        
        
        </div>
        

        <h5 className="mt-4"><Link to="/feature">Resources</Link></h5>
        <br></br>

        </Grid>


      </main>
      {/* End of main content window */}
    </div>
  );
}
