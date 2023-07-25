import React, { useState } from 'react'
import { Button, Container, Form, Stack } from 'react-bootstrap'

function ControlBar() {
    const [valor, setValor] = useState(0.0)

    function handleChange(e) {
        console.log(e.target.value)
        setValor(e.target.value)
    }

    return (
        <Container className='controlBar p-3 mb-4 round main-shadow'>
            <Stack direction='horizontal' gap={3}>
                <Button variant='success' size='sm'>
                    Receita
                </Button>
                <h3>R$</h3>
                <Form.Control
                    size='sm'
                    value={valor}
                    onChange={handleChange}
                    type='text'
                    style={{ width: '100px' }}
                ></Form.Control>
                <Button variant='success' size='sm'>
                    Despesa
                </Button>
                <h3 className='ms-auto'>Saldo: R$ 4.125,00</h3>
            </Stack>
        </Container>
    )
}

export default ControlBar
