import React, { useEffect, useState } from 'react'
import { Container, Stack } from 'react-bootstrap'
import testData from '../data/testData'
import TransItem from './TransItem'
import axios from 'axios'

function Transactions({ isAuth, reload }) {
    // const [data, setData] = useState(testData.transactions)
    const [data, setData] = useState([])
    const [mes, setMes] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:5000/trans', { headers: { Authorization: `Bearer ${isAuth.accessToken}` } })
            .then((data) => {
                console.log(data.data[10])
                setData(data.data)
            })
            .catch((err) => console.log(err))
    }, [reload])

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
