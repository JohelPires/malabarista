import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Container, Spinner, Stack } from 'react-bootstrap'
import testData from '../data/testData'
import TransItem from './TransItem'
import axios from 'axios'
import meses from '../data/meses'

function Transactions({ isAuth, reload, setReload, setData, setDadosMes, dadosMes, mesAtual, setMesAtual }) {
    // const [data, setData] = useState(testData.transactions)
    // const [mesAtual, setMesAtual] = useState(new Date().getMonth() + 1)
    const [mes, setMes] = useState('')
    const [loading, setLoading] = useState(true)
    const [msg, setMsg] = useState('')

    useEffect(() => {
        setMes(meses[mesAtual - 1])
    }, [mesAtual])

    useEffect(() => {
        setLoading(true)
        axios
            .get('http://localhost:5000/trans', { headers: { Authorization: `Bearer ${isAuth.accessToken}` } })
            .then((data) => {
                // setMes(meses[parseInt(data.data[data.data.length - 1].createdAt.slice(5, 7)) - 1])
                data.data.map((item) => {
                    console.log(item.data, item.createdAt)
                })
                setDadosMes(
                    data.data.filter((item) => {
                        const date = item.data || item.createdAt
                        return parseInt(date.slice(5, 7)) === mesAtual
                    })
                )
                setData(data.data)
                setLoading(false)
                setMsg('Não houve transações registradas neste mês.')
            })
            .catch((err) => {
                setMsg('Houve um erro.')
                console.log(err)
            })
    }, [reload, mesAtual])

    return (
        <Container className='bg-white round main-shadow'>
            <Stack className='p-3'>
                <Stack direction='horizontal' className='transaction_month'>
                    <h3>{mes}</h3>
                    <ButtonGroup className='ms-auto mb-2'>
                        <Button
                            variant='outline-dark'
                            size='sm'
                            onClick={() => {
                                setLoading(true)
                                setMesAtual((prev) => prev - 1)
                            }}
                        >
                            {'<'}
                        </Button>
                        <Button
                            variant='outline-dark'
                            size='sm'
                            onClick={() => {
                                setLoading(true)
                                setMesAtual((prev) => prev + 1)
                            }}
                        >
                            {'>'}
                        </Button>
                    </ButtonGroup>
                </Stack>

                {loading ? (
                    <Spinner animation='border' variant='primary' />
                ) : dadosMes.length > 0 ? (
                    dadosMes.map((item) => {
                        return <TransItem key={item.id} isAuth={isAuth} setReload={setReload} item={item} />
                    })
                ) : (
                    <p>{msg}</p>
                )}
            </Stack>
        </Container>
    )
}

export default Transactions
