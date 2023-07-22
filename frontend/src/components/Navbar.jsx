import React from 'react'
import { Container, Stack } from 'react-bootstrap'

function Navbar() {
    return (
        <Container>
            <Stack gap={2} direction='horizontal'>
                <h2>Malabaris</h2>
                <p className='ms-auto'>Início</p>
                <p>Outra tela</p>
                <div>Login</div>
            </Stack>
        </Container>
    )
}

export default Navbar
