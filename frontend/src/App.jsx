import './App.css'
import Navbar from './components/Navbar'
import ControlBar from './components/ControlBar'
import { Col, Container, Row } from 'react-bootstrap'
import Transactions from './components/Transactions'
import BarStats from './components/BarStats'
import Categories from './components/Categories'
import Main from './telas/Main'
import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './telas/Login'
import Registrar from './telas/Registrar'

function App() {
    const [isAuth, setIsAuth] = useState('')
    const [reload, setReload] = useState(0)
    return (
        <div className='App'>
            <Container fluid='sm'>
                <Row>
                    <Col>
                        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
                        {isAuth && <ControlBar isAuth={isAuth} reload={reload} setReload={setReload} />}
                    </Col>
                </Row>
                <Routes>
                    <Route
                        path='/'
                        element={
                            isAuth ? (
                                <Main isAuth={isAuth} setReload={setReload} reload={reload} />
                            ) : (
                                <Navigate to={'/login'} />
                            )
                        }
                    />
                    <Route path='login' element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />} />
                    <Route path='registrar' element={<Registrar isAuth={isAuth} setIsAuth={setIsAuth} />} />
                </Routes>
            </Container>
        </div>
    )
}

export default App
