import './App.css';
import { Navbar, Container } from 'react-bootstrap';
import Contacts from './components/Contacts';

function App() {
  return (
    <div className="App">
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home">Contact Book</Navbar.Brand>
            </Container>
        </Navbar>
        <div>
            <Contacts/>
        </div>
    </div>
  );
}

export default App;
