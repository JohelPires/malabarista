import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Container, Stack } from 'react-bootstrap'
import testData from '../data/testData'
import TransItem from './TransItem'
import axios from 'axios'
import meses from '../data/meses'

function Transactions({ isAuth, reload }) {
    // const [data, setData] = useState(testData.transactions)
    const [mesAtual, setMesAtual] = useState(new Date().getMonth() + 1)
    const [data, setData] = useState([])
    const [dadosMes, setDadosMes] = useState([])
    const [mes, setMes] = useState('')

    useEffect(() => {
        setMes(meses[mesAtual - 1])
    }, [mesAtual])

    useEffect(() => {
        axios
            .get('http://localhost:5000/trans', { headers: { Authorization: `Bearer ${isAuth.accessToken}` } })
            .then((data) => {
                // setMes(meses[parseInt(data.data[data.data.length - 1].createdAt.slice(5, 7)) - 1])
                setDadosMes(data.data.filter((item) => parseInt(item.createdAt.slice(5, 7)) === mesAtual))
                setData(data.data)
            })
            .catch((err) => console.log(err))
    }, [reload, mesAtual])

    return (
        <Container className='bg-white round main-shadow'>
            <Stack className='p-3'>
                <Stack direction='horizontal' className='transaction_month'>
                    <h3>{mes}</h3>
                    <ButtonGroup className='ms-auto mb-2'>
                        <Button variant='outline-dark' size='sm' onClick={() => setMesAtual((prev) => prev - 1)}>
                            {'<'}
                        </Button>
                        <Button variant='outline-dark' size='sm' onClick={() => setMesAtual((prev) => prev + 1)}>
                            {'>'}
                        </Button>
                    </ButtonGroup>
                </Stack>

                {dadosMes.length > 0
                    ? dadosMes.map((item) => {
                          return <TransItem item={item} />
                      })
                    : 'Não houve transações registradas neste mês.'}
            </Stack>
        </Container>
    )
}

export default Transactions
