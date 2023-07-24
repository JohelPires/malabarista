import React, { useState } from 'react'
import { Container, Stack } from 'react-bootstrap'
import testData from '../data/testData'
import TransItem from './TransItem'

function Transactions() {
    const [data, setData] = useState(testData.transactions)

    console.log(data[0])

    return (
        <Container className='bg-white round main-shadow'>
            <Stack className='p-3'>
                <div className='transaction_month'>
                    <h3>Julho</h3>
                </div>

                {data.map((item) => {
                    return <TransItem item={item} />
                })}
            </Stack>
        </Container>
    )
}

export default Transactions
