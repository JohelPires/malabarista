import React, { useState } from 'react'
import { Button, Container, Form, Stack } from 'react-bootstrap'

function ControlBar() {
    const [valor, setValor] = useState(0.0)

    function handleChange(e) {
        console.log(e.target.value)
        setValor(e.target.value)
    }

    return (
        <Stack className='controlBar p-3 mb-4 round main-shadow'>
            <Stack direction='horizontal' gap={2}>
                <h3 style={{ fontSize: '1.1rem' }} className='m-0'>
                    R$
                </h3>
                <Form.Control
                    size='sm'
                    value={valor}
                    onChange={handleChange}
                    type='text'
                    className='transaction-input'
                ></Form.Control>
                <Button variant='success' size='sm'>
                    Despesa
                </Button>
                <Button variant='success' size='sm'>
                    Receita
                </Button>
                <h3 className='ms-auto'>Saldo: R$ 4.125,00</h3>
            </Stack>
            <Stack direction='horizontal' gap={2}>
                <Form.Select size='sm' aria-label='Default select example'>
                    <option>Categoria</option>
                    <option value='1'>One</option>
                    <option value='2'>Two</option>
                    <option value='3'>Three</option>
                </Form.Select>
                <Button size='sm'>Confirmar</Button>
            </Stack>
        </Stack>
    )
}

export default ControlBar
