import React from 'react';
import { Container, Table, Form, Button, FormControl, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from "react";
import EditModal from './EditModal';



const Contacts = () => {

    const [show, setShow] = useState(false);
    const [contacts, setContacts] = useState([])
    const [contactsToShow, setContactsToShow] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [selectedContact, setSelectedContact] = useState({})
    const [searchText, setSearchText] = useState('')
    const [selectedValue, setSelectedValue] = useState("name")

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const onUpdate = (contact) => {
        setSelectedContact(contact)
        handleShow()
    }

    useEffect(() => {
        setContacts(JSON.parse(localStorage.getItem("contacts")))
    }, [localStorage.getItem("contacts")])
    
    const handleSearch = (e) => {
        setSearchText(e.target.value)
    }

    const handleSelectChange = (e) => {
        const value = e.target.value
        console.log(value)
        setSelectedValue(value)
    }

    useEffect(() => {
        let results = [...contacts]
        if(selectedValue === 'idReverse'){
            setContactsToShow(results.reverse())
        } 
        if(selectedValue === 'name'){
            results = results.sort((a,b)=>a.name.localeCompare(b.name))
        }
            return setContactsToShow(results)
    }, [selectedValue, contacts])

    const fetchContacts = async () =>{
        try {
            const response = await fetch('https://demo.sibers.com/users')
            const data = await response.json()
            localStorage.setItem("contacts", JSON.stringify(data))
            setContacts(JSON.parse(localStorage.getItem("contacts")))
        }catch (error) {
            console.log(error)
            }
        }

    useEffect(() => {
            fetchContacts()
        }, [])

    useEffect(() => {
            const results = contacts.filter(contact => 
                (contact.name).toUpperCase().includes(searchText.toUpperCase()) ||(contact.email).toUpperCase().includes(searchText.toUpperCase()) || (contact.phone).toUpperCase().includes(searchText.toUpperCase()) ||  (contact.username).toUpperCase().includes(searchText.toUpperCase()) )
            setSearchResults(results)
        }, [searchText])

    return (
        <>
        <Container className="my-5">
            <Row className='d-flex justify-content-between align-items-center'>
                <Col xs="auto">
                    <Form className="d-flex">
                        <FormControl
                        type="Search"
                        placeholder="Search..."
                        className="my-2"
                        aria-label="Search"
                        value={searchText}
                        onChange={(e) => handleSearch(e)}
                        />
                    </Form>
                </Col>
                <Col xs='auto'>
                    <Form.Select aria-label="Default select example"
                        onChange={ handleSelectChange} value={selectedValue}
                    >
                        <option value={"name"}>Sort by name</option>
                        <option value="id">id</option>
                        <option value="idReverse">id (reverse)</option>
                    </Form.Select>
                </Col>
          </Row>

            
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {contactsToShow && 
                        (searchText ? searchResults : contactsToShow).map(contact => {
                       return (
                            <tr key={contact.id}>
                                <td>{contact.id + 1}</td>
                                <td>{contact.name}</td>
                                <td>{contact.username}</td>
                                <td>{contact.email}</td>
                                <td>{contact.phone}</td>
                                <td>
                                    <Button
                                        onClick={()=>onUpdate(contact)}
                                    >Update</Button>
                                </td>
                            </tr>
                    )          
                    })
                    }
                </tbody>
            </Table>
         </Container>


         {/* Modal for Edit */}

         <EditModal 
            show={show} 
            handleClose={handleClose}
            selectedContact={selectedContact}
            contacts={contacts}
         />
         </>
    );
};

export default Contacts;