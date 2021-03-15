import React from 'react'
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap'
import HomeIcon from '@material-ui/icons/Home';
import ComputerIcon from '@material-ui/icons/Computer';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DashboardIcon from '@material-ui/icons/Dashboard';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme)=>({
linkStyle: {
textDecoration: "none",
cursor: "pointer",
"&:hover":{
fontSize: 16,
color: "#5a779d",
}
}

}))


const ClassResources = () => {
    
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className="col mx-0 mx-lg-5 w-100 justify-content-center">
        <Card className="w-100 shadow" style={{ width: '18rem' }}>
        <Card.Img variant="top" src="../../images/digitalcrafts.png" style={{backgroundColor: "#00ACA4", margin: "0px"}}/>
        <Card.Body>
            <Card.Title style={{ fontSize: '30px'}}>Class Resources</Card.Title>
            <Card.Text>
            <span style={{ fontSize: '20px'}}>Cohort: November 2020 - March 2021 </span><br/><br/>
            <span style={{ fontSize: '16px'}}> Demo Day: March 15th, 2021</span>
            </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush" style={{ fontSize: '15px'}}>

//             <ListGroupItem ><Link onClick={()=>window.open("https://zoom.us/j/294114284#success", "_blank")}><ComputerIcon/></Link> &nbsp; Zoom Classroom</ListGroupItem>
//             <ListGroupItem ><Link onClick={()=>window.open("https://learn.digitalcrafts.com/", "_blank")}><EventNoteIcon/></Link> &nbsp; Class Learning Portal</ListGroupItem>
//             <ListGroupItem ><Link onClick={()=>window.open("https://docs.google.com/spreadsheets/d/1ixIVjWZ9ZKtCe5o47Q86ixsMFS1jQ7mD-v2uGqQ38W8/edit#gid=0", "_blank")}><RecordVoiceOverIcon/></Link> &nbsp; Class Recordings</ListGroupItem>
//             <ListGroupItem ><Link onClick={()=>window.open("https://docs.google.com/spreadsheets/d/1wVQt15pC-civo-gUJQ-u1t2k80LYvamUHDUxeAXTifI/edit#gid=515178626", "_blank")}><ContactSupportIcon/></Link> &nbsp;TA Office Hours</ListGroupItem>
//             <ListGroupItem ><Link onClick={()=>window.open("https://trello.com/en/login", "_blank")}><DashboardIcon /></Link>  &nbsp; Trello Board </ListGroupItem>

            <ListGroupItem ><Link className={classes.linkStyle} style={{textDecoration: "none"}} onClick={()=>window.open("https://zoom.us/j/294114284#success", "_blank")}><ComputerIcon/>&nbsp; Zoom Classroom</Link> </ListGroupItem>
            {/* https://zoom.us/j/294114284#success */}
            <ListGroupItem ><Link className={classes.linkStyle} style={{textDecoration: "none"}} onClick={()=>window.open("https://learn.digitalcrafts.com/", "_blank")}><EventNoteIcon/> &nbsp; Class Learning Portal</Link> </ListGroupItem>
            {/* <ListGroupItem >Slack Channel </ListGroupItem> */}
            {/* https://slack.com/ */}
            <ListGroupItem ><Link className={classes.linkStyle} style={{textDecoration: "none"}} onClick={()=>window.open("https://docs.google.com/spreadsheets/d/1ixIVjWZ9ZKtCe5o47Q86ixsMFS1jQ7mD-v2uGqQ38W8/edit#gid=0", "_blank")}><RecordVoiceOverIcon/> &nbsp; Class Recordings</Link> </ListGroupItem>
           
            <ListGroupItem ><Link className={classes.linkStyle} style={{textDecoration: "none"}} onClick={()=>window.open("https://docs.google.com/spreadsheets/d/1wVQt15pC-civo-gUJQ-u1t2k80LYvamUHDUxeAXTifI/edit#gid=515178626", "_blank")}><ContactSupportIcon/> &nbsp;TA Office Hours</Link> </ListGroupItem>
            
            <ListGroupItem ><Link className={classes.linkStyle} style={{textDecoration: "none"}} onClick={()=>window.open("https://trello.com/en/login", "_blank")}><DashboardIcon /> &nbsp; Trello Board</Link> </ListGroupItem>
            

        </ListGroup>
        <Card.Body >
            <Card.Link className={classes.linkStyle} style={{textDecoration: "none"}} onClick={()=>window.open("https://github.com", "_blank")}><GitHubIcon/> &nbsp; Github</Card.Link>
            <Card.Link className={classes.linkStyle}  style={{textDecoration: "none"}} onClick={()=>window.open("https://linkedin.com", "_blank")}><LinkedInIcon/> &nbsp; LinkedIn</Card.Link>
        </Card.Body>
        </Card>
        </div>
    )
}

export default ClassResources





