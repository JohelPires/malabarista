import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, FloatingLabel, Form, Row, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function Login({ isAuth, setIsAuth }) {
    const [logged, setLogged] = useState(false)
    const [user, setUser] = useState({
        email: '',
        senha: '',
    })
    const [erro, setErro] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const AuthLocal = JSON.parse(window.localStorage.getItem('Auth'))
        console.log('LocalStorage Auth: ', AuthLocal)
        if (AuthLocal) {
            setIsAuth(AuthLocal)
            navigate('/')
        }
    }, [])

    function handleLogin() {
        axios
            .post('http://localhost:5000/usuario/login', user)
            .then((data) => {
                if (logged) {
                    window.localStorage.setItem('Auth', JSON.stringify(data.data))
                    console.log('saved to localstorage')
                }
                setIsAuth(data.data)
                navigate('/')
            })
            .catch((err) => console.log(err))
    }

    return (
        <Container>
            <Row className='p-3'>
                <Col md={7}></Col>
                <Col className='bg-white round main-shadow p-4'>
                    <div className='transaction_month'>
                        <h3>Fazer Login</h3>
                    </div>
                    <FloatingLabel controlId='floatingInput' label='E-mail' className='mb-3 mt-4'>
                        <Form.Control
                            value={user.email}
                            onChange={(e) =>
                                setUser((prev) => {
                                    return { ...prev, email: e.target.value }
                                })
                            }
                            size='sm'
                            type='email'
                            placeholder='nome@exemplo.com'
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId='floatingPassword' label='Senha'>
                        <Form.Control
                            value={user.senha}
                            onChange={(e) =>
                                setUser((prev) => {
                                    return { ...prev, senha: e.target.value }
                                })
                            }
                            size='sm'
                            type='password'
                            placeholder='senha'
                        />
                    </FloatingLabel>
                    <Stack gap={2}>
                        <Form.Check
                            className='mt-4'
                            onChange={(e) => setLogged((prev) => !prev)}
                            type='checkbox'
                            id='logado'
                            label='Mantenha-me logado.'
                        />
                        <Button onClick={handleLogin}>Entrar</Button>
                        <Link to={'/registrar'}>Novo usuário? Registrar</Link>
                    </Stack>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
