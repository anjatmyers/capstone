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
import {Modal, Button} from 'react-bootstrap'
import { DiJsBadge, DiPython, DiDatabase, DiHtml5 } from "react-icons/di";
import {useDispatch, useSelector} from 'react-redux';
import {getURL, folderStatus} from './actions/index';
import {setLanguage} from './actions/index'


import {Link} from 'react-router-dom'
import Picker from './components/Picker';


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
        <ListItem button key={"dfkjad"} onClick={()=>dispatch(setLanguage("javaScript"))} value="javaScript">
            <ListItemIcon><DiJsBadge /></ListItemIcon>
            <ListItemText primary={"JavaScript"}></ListItemText>
          </ListItem>

          <ListItem button key={"dfkjad"} onClick={()=>dispatch(setLanguage("python"))}value="python">
            <ListItemIcon><DiPython /></ListItemIcon>
            <ListItemText primary={"Python"}></ListItemText>
          </ListItem>

          <ListItem button key={"dfkjad"} onClick={()=>dispatch(setLanguage("html"))}value="html">
            <ListItemIcon><DiHtml5 /></ListItemIcon>
            <ListItemText primary={"HTML/CSS"}></ListItemText>
          </ListItem>

          <ListItem button key={"dfkjad"} onClick={()=>dispatch(setLanguage("sql"))}value="sql">
            <ListItemIcon><DiDatabase /></ListItemIcon>
            <ListItemText primary={"SQL"}></ListItemText>
          </ListItem>

        </List>
        <Divider />
        <List>
          <ListItem button key={"dfkjad"}>
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
        <Typography paragraph>
          Note Taking Goes Here
        </Typography>
        <Typography paragraph>
          Resources Can go here
        </Typography>
        {
          hasFolders === false
          ?
          <button type="button" onClick={handleShow}>
            Open Modal
          </button>
          :
          <h4>Your folders are set up!</h4> 
        }

        <Modal show={show} className="modal-info">
          <Modal.Dialog className="p-0 m-0">
            <Modal.Header closeButton onClick={handleClose}>
              <Modal.Title className="row d-flex justify-content-center">
                <div className="modal-title text-center"></div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row d-flex justify-content-center m-2">
                Have you downloaded your folders yet?
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleDownload}>Download</Button>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
        
        

        <button onClick={handleDocs}>Get Google Docs</button>
        <p><Link to="/feature">Go to page 2</Link></p>
        <br></br>
        <p><Link to="/signout">Sign Out</Link></p>

        {/* <Picker /> */}

      </main>
    </div>
  );
}
