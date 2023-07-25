import React from 'react'
import { Button, Container, Stack } from 'react-bootstrap'
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
                <h6 className='ms-auto'>Início</h6>
                <h6>Outra tela</h6>
                {/* <div className='vr'></div> */}
                <Button onClick={logOut} size='sm' variant='success'>
                    Sair
                </Button>
            </Stack>
        </Container>
    )
}

export default Navbar
