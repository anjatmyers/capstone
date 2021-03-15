import React from 'react';
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap'
import Assessment from './Assesment'
import axios from 'axios'
import {useSelector} from 'react-redux'

const AssesmentCard = () => {

    let language = useSelector((state => state.auth.language))


    return (
        <div className="mt-3">
            <Card  style={{ width: '18rem' }}>
            <Card.Header>Current Status on: {language}</Card.Header>
            <Card.Body>
            <Card.Title>Info Card Title</Card.Title>
            <Card.Text>
                Some quick example text to build on the card title and make up the bulk
                of the card's content.
            </Card.Text>
            </Card.Body>
        </Card>
        </div>
    )
}

export default AssesmentCard



