import React from 'react'
import { Button, Container, Stack } from 'react-bootstrap'

function Navbar() {
    return (
        <Container className='pt-3 pb-3'>
            <Stack gap={3} direction='horizontal'>
                <h2>Malabaris</h2>
                <h6 className='ms-auto'>Início</h6>
                <h6>Outra tela</h6>
                {/* <div className='vr'></div> */}
                <Button size='sm' variant='success'>
                    Login
                </Button>
            </Stack>
        </Container>
    )
}

export default Navbar
