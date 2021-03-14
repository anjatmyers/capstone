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
import Box from "@material-ui/core/Box"
import SvgIcon from '@material-ui/core/SvgIcon';

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
    backgroundColor: "#f4f8fb"
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
  ListStyle:{
    padding: theme.spacing(3),
    fontSize: 50,
  },
  listItemText:{
    fontSize: 20,
    padding: theme.spacing(1),
  },
  MuiSvgIcon:{
    fontSize: "large"
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
        <List className={classes.ListStyle}>
        <ListItem button key={"1"} onClick={()=>dispatch(setLanguage("javaScript"))} value="javaScript">
            <ListItemIcon><SvgIcon viewBox="0 0 128 128" classes={{primary:classes.MuiSvgIcon}}><path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185h-125.184z"></path><path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zm-46.885-37.793h-11.709l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"></path></SvgIcon></ListItemIcon>
            <ListItemText classes={{primary:classes.listItemText}} primary={"JavaScript"}></ListItemText>
          </ListItem>

          <ListItem button key={"2"} onClick={()=>dispatch(setLanguage("python"))}value="python">
            <ListItemIcon><DiPython /></ListItemIcon>
            <ListItemText classes={{primary:classes.listItemText}} primary={"Python"}></ListItemText>
          </ListItem>

          <ListItem button key={"3"} onClick={()=>dispatch(setLanguage("html"))}value="html">
            <ListItemIcon><DiHtml5 /></ListItemIcon>
            <ListItemText classes={{primary:classes.listItemText}} primary={"HTML/CSS"}></ListItemText>
          </ListItem>

          <ListItem button key={"4"} onClick={()=>dispatch(setLanguage("sql"))}value="sql">
            <ListItemIcon><DiDatabase /></ListItemIcon>
            <ListItemText classes={{primary:classes.listItemText}} primary={"SQL"}></ListItemText>
          </ListItem>

          <ListItem button key={"5"} onClick={()=>dispatch(setLanguage("shell"))}value="shell">
            <ListItemIcon><DiTerminal /></ListItemIcon>
            <ListItemText classes={{primary:classes.listItemText}} primary={"Shell"}></ListItemText>
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


        
           <div className="d-flex align-items-end ">
          <h2 className="mb-0 mr-2 mt-5">Code Editor</h2>

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
