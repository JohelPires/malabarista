import React from 'react'
import { Container, Stack } from 'react-bootstrap'

function BarStats() {
    return (
        <Container className='bg-white round main-shadow'>
            <Stack className='p-3'>
                <div className='transaction_month'>
                    <h3>Relatório anual</h3>
                </div>
            </Stack>
        </Container>
    )
}

export default BarStats
