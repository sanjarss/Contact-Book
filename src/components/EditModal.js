import React from 'react';
import Modal from 'react-bootstrap/Modal'
import { useState, useEffect } from "react";
import { Button, Row, Col } from 'react-bootstrap';


const EditModal = ({show, handleClose, selectedContact, contacts}) => {

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const handleSubmit = () => {
        const updatedContact = {
            id: selectedContact.id,
            name,
            username,
            email,
            phone
        }

        const selectedContactIndex = contacts.findIndex(c => c.id === selectedContact.id)
        const beforeSelectedIndex = contacts.filter((c, index) => index < selectedContactIndex)
        const afterSelectedIndex = contacts.filter((c, index) => index > selectedContactIndex)
        
        const updatedContactsArray = [...beforeSelectedIndex, updatedContact, ...afterSelectedIndex]
        localStorage.setItem("contacts", JSON.stringify(updatedContactsArray))
         handleClose()
    }

    useEffect(() => {
       if(selectedContact){
           setName(selectedContact.name || '')
           setUsername(selectedContact.username || '')
           setEmail(selectedContact.email || '')
           setPhone(selectedContact.phone || '')
       }
    }, [selectedContact])


    return (
    <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Contact: <span style={{color: "red"}}>{name}</span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col xs='6'>
                    <label className='d-block'>First Name</label>
                    <input type='text'
                        style={{width: "85%"}}
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </Col>

                <Col xs='6'>
                    <label className='d-block'>User Name</label>
                    <input type='text'
                        style={{width: "85%"}}
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                </Col>

                <Col xs='6' className='my-2'>
                    <label className='d-block'>Email</label>
                    <input style={{width: "85%"}}
                         type='text'
                         value={email}
                         onChange={(e)=>setEmail(e.target.value)}
                    />
                </Col>

                <Col xs='6' className='my-2'>
                    <label className='d-block'>Phone</label>
                    <input type='text'
                        style={{width: "85%"}}
                        value={phone}
                        onChange={(e)=>setPhone(e.target.value)}
                    />
                </Col>
            </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
    </Modal>
    );
};

export default EditModal;