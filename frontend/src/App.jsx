import './App.css'
import Navbar from './components/Navbar'
import ControlBar from './components/ControlBar'
import { Col, Container, Row } from 'react-bootstrap'
import Transactions from './components/Transactions'
import BarStats from './components/BarStats'
import Categories from './components/Categories'

function App() {
    return (
        <div className='App'>
            <Container fluid='sm'>
                <Row>
                    <Col>
                        <Navbar />
                        <ControlBar />
                    </Col>
                </Row>
                <Row>
                    <Col md={5}>
                        <Transactions />
                    </Col>
                    <Col md={7}>
                        <BarStats />
                        <Categories />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default App
