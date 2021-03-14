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
import ClassResources from './components/ClassResources';
import AssessmentCard from './components/AssesmentCard';
import Assessment from './components/Assesment';


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
    backgroundColor: "#f4f8fb"
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
    backgroundColor: "#f4f8fb"
    
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
// const handleDocs = () => {
//     dispatch(getURL());
//   }

  const getFiles = () => {
    
    const files = async () => {

      let userID = localStorage.getItem('id')
      
      let response = await axios.post('http://localhost:3001/files', {userID}, {
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
        style={{backgroundColor: "#5a779d", color: 'white'}}
      >

        <Toolbar className={classes.toolbar} >
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
          

        <div className="container-fluid d-flex align-items-between justify-content-between">

          <Typography variant="h6" noWrap style={{fontFamily: 'Merriweather, serif', fontSize: '30px'}}>
            Bootcamp Survival Guide
          </Typography>

          <div className="d-flex flex-column justify-content-end">
          <Button size="small"  variant="contained" className={classes.signOut}><Link to="/signout">Log Out</Link></Button>
          </div>
          {/* end button div */}
          
          </div>
          {/* end name and logout button container div */}
        
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
            <ListItemText primary={"Job Board"}></ListItemText>
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


        {/* start of main content div */}
        <div className="container-fluid d-flex row "> 

        <div className="col-lg-8 col-md-12">


           <div className="d-flex align-items-end ">

          <h2 className="mb-0 mr-2">Code Editor</h2>
          <h6 className="">save code snippets from class:</h6>
         </div >
         <MasterEditor/>

        </div>
        
        {/* end of code editor */}

        
        <div className="col-lg-4 mt-2 mt-lg-4 ">
          <div className="row justify-content-center mx-2 mx-lg-3"><Resources /></div>
          <div className="row justify-content-center text-center"><ClassResources /></div>
          <div className="row justify-content-center text-center">< AssessmentCard/></div>
        
          </div> 
          {/* end Resources Div */}
          </div>
          {/* end main container div */}
        

        
      </main>
      {/* End of main content window */}
    </div>
  );
      }
