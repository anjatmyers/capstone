import React from 'react'
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap'

// digital crafts teal = #00ACA4

const ClassResources = () => {
    return (
        <div className="col mx-1 mx-lg-5 w-100  justify-content-center">
        <Card className="w-100" style={{ width: '18rem' }}>
        <Card.Img variant="top" src="../../images/digitalcrafts.png" style={{backgroundColor: "#00ACA4", margin: "0px"}}/>
        <Card.Body>
            <Card.Title>Class Resources</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroupItem>Cras justo odio</ListGroupItem>
            <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
            <ListGroupItem>Vestibulum at eros</ListGroupItem>
        </ListGroup>
        <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
        </Card>
        </div>
    )
}

export default ClassResources





