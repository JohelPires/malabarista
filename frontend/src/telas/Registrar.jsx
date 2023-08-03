import axios from 'axios'
import React, { useState } from 'react'
import { Button, Col, Container, FloatingLabel, Form, Row, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function Registrar({ setIsAuth }) {
    const [novousuario, setNovousuario] = useState({})
    const navigate = useNavigate()

    function handleRegistrar() {
        axios
            .post('http://localhost:5000/usuario/registrar', novousuario)
            .then((data) => {
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
                        <h3>Registrar</h3>
                    </div>
                    <FloatingLabel controlId='floatingInput' label='Seu nome' className='mb-3 mt-4'>
                        <Form.Control
                            size='sm'
                            type='text'
                            placeholder='Nome'
                            onChange={(e) => setNovousuario({ ...novousuario, nome: e.target.value })}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId='floatingInput' label='E-mail' className='mb-3 mt-4'>
                        <Form.Control
                            size='sm'
                            type='email'
                            placeholder='nome@exemplo.com'
                            onChange={(e) => setNovousuario({ ...novousuario, email: e.target.value })}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId='floatingPassword' label='Senha'>
                        <Form.Control
                            size='sm'
                            type='password'
                            placeholder='senha'
                            onChange={(e) => setNovousuario({ ...novousuario, senha: e.target.value })}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId='floatingPassword' label='Confirmar Senha'>
                        <Form.Control size='sm' type='password' placeholder='senha' />
                    </FloatingLabel>
                    <Stack gap={2}>
                        <Button className='mt-4' onClick={handleRegistrar}>
                            Registrar
                        </Button>
                        <Link to={'/login'}>Já é usuário? Faça login</Link>
                    </Stack>
                </Col>
            </Row>
        </Container>
    )
}

export default Registrar
