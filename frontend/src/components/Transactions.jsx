import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Container, Spinner, Stack, ToggleButton } from 'react-bootstrap'
import testData from '../data/testData'
import TransItem from './TransItem'
import axios from 'axios'
import meses from '../data/meses'
import { FaAngleDown, FaAngleLeft, FaAngleUp, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

function Transactions({ isAuth, reload, setReload, setData, setDadosMes, dadosMes, mesAtual, setMesAtual }) {
    // const [data, setData] = useState(testData.transactions)
    // const [mesAtual, setMesAtual] = useState(new Date().getMonth() + 1)
    const [mes, setMes] = useState('')
    const [ano, setAno] = useState(new Date().getFullYear())
    const [loading, setLoading] = useState(true)
    const [msg, setMsg] = useState('')
    const [receitas, setReceitas] = useState(true)
    const [despesas, setDespesas] = useState(true)

    useEffect(() => {
        setMes(meses[mesAtual - 1])
    }, [mesAtual])

    useEffect(() => {
        setLoading(true)
        axios
            .get('http://localhost:5000/trans', { headers: { Authorization: `Bearer ${isAuth.accessToken}` } })
            .then((data) => {
                // setMes(meses[parseInt(data.data[data.data.length - 1].createdAt.slice(5, 7)) - 1])

                const newData = data.data.map((item) => {
                    // const timestamp = new Date(item.createdAt)
                    const timestamp = new Date(item.createdAt)
                    const dayofweek = new Date(item.data).getDay()
                    const t = timestamp.getTime()

                    const date = item.data || item.createdAt

                    return {
                        ...item,
                        m: parseInt(date.slice(5, 7)),
                        y: parseInt(date.slice(0, 4)),
                        d: parseInt(date.slice(8)),
                        dayofweek,
                        timestamp,
                    }
                })

                let filteredData = newData.filter((item) => item.m === mesAtual).filter((item) => item.y === ano)
                if (!receitas) {
                    filteredData = filteredData.filter((item) => item.id_categoria >= 1000)
                }
                if (!despesas) {
                    filteredData = filteredData.filter((item) => item.id_categoria < 1000)
                }
                const sortedData = [...filteredData].sort((a, b) => b.t - a.t).sort((a, b) => b.d - a.d)

                setDadosMes(sortedData)
                // setDadosMes(
                //     data.data.filter((item) => {
                //         const date = item.data || item.createdAt
                //         return parseInt(date.slice(5, 7)) === mesAtual
                //     })
                // )

                // const sortedItems = [...dadosMes].sort((a, b) => a.data - b.data)
                // setDadosMes(sortedItems)
                setData(data.data)
                setLoading(false)
                setMsg('Não houve transações registradas neste mês.')
            })
            .catch((err) => {
                setMsg('Houve um erro.')
                console.log(err)
            })
    }, [reload, mesAtual])

    function stepMes(step) {
        // step 1: próximo mes
        // step -1: mes anterior

        setLoading(true)
        let proxMes = mesAtual + step
        if (proxMes > 12) {
            proxMes = 1
            setAno((prev) => prev + 1)
        } else if (proxMes < 1) {
            proxMes = 12
            setAno((prev) => prev - 1)
        }
        setMesAtual(proxMes)
    }

    return (
        <Container className='bg-white round main-shadow'>
            <Stack className='p-3'>
                <Stack direction='horizontal' className='transaction_month'>
                    <h3>
                        {mes}, {ano}
                    </h3>
                    <ButtonGroup className='ms-auto mb-2'>
                        <Button
                            variant='outline-dark'
                            size='sm'
                            onClick={() => stepMes(-1)}
                            // onClick={() => {
                            //     setLoading(true)
                            //     setMesAtual((prev) => prev - 1)
                            // }}
                        >
                            <FaChevronLeft />
                        </Button>
                        <Button
                            variant='outline-dark'
                            size='sm'
                            onClick={() => stepMes(1)}
                            // onClick={() => {
                            //     setLoading(true)
                            //     setMesAtual((prev) => prev + 1)
                            // }}
                        >
                            <FaChevronRight />
                        </Button>
                    </ButtonGroup>
                    <div className='m-2'></div>
                    <ButtonGroup className='mb-2'>
                        <ToggleButton
                            id='toggle-receitas'
                            type='checkbox'
                            variant='outline'
                            size='sm'
                            checked={receitas}
                            value='1'
                            onChange={(e) => {
                                setReceitas(e.currentTarget.checked)
                                setReload((prev) => prev + 1)
                            }}
                        >
                            <FaAngleUp />
                        </ToggleButton>
                        <ToggleButton
                            id='toggle-despesas'
                            type='checkbox'
                            variant='outline'
                            size='sm'
                            checked={despesas}
                            value='2'
                            onChange={(e) => {
                                setDespesas(e.currentTarget.checked)
                                console.log(despesas)
                                setReload((prev) => prev + 1)
                            }}
                        >
                            <FaAngleDown />
                        </ToggleButton>
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
