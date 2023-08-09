import React from 'react'
import { Button, ButtonGroup, Container, Dropdown, DropdownButton, NavDropdown, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Navbar({ isAuth, setIsAuth }) {
    const navigate = useNavigate()

    function logOut() {
        setIsAuth('')
        window.localStorage.clear()
        navigate('/')
    }

    return (
        <Container className='pt-3 pb-3'>
            <Stack gap={3} direction='horizontal'>
                <h2>Malabaris</h2>
                {isAuth ? (
                    <>
                        <h6 className='ms-auto'>Início</h6>
                        <DropdownButton as={ButtonGroup} size='sm' variant='success' title={isAuth.usuario.nome}>
                            <Dropdown.Item eventKey='1'>Preferências</Dropdown.Item>
                            <Dropdown.Item eventKey='2'>Another action</Dropdown.Item>
                            <Dropdown.Item eventKey='3' active>
                                Active Item
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={logOut} eventKey='4'>
                                Sair
                            </Dropdown.Item>
                        </DropdownButton>
                        <h6>Outra tela</h6>

                        <Button onClick={logOut} size='sm' variant='success'>
                            Sair
                        </Button>
                    </>
                ) : (
                    <ButtonGroup className='ms-auto'>
                        <Button variant='outline-light' size='sm' onClick={() => navigate('/login')}>
                            Login
                        </Button>
                        <Button variant='outline-light' size='sm' onClick={() => navigate('/registrar')}>
                            Registrar
                        </Button>
                    </ButtonGroup>
                )}
            </Stack>
        </Container>
    )
}

export default Navbar
