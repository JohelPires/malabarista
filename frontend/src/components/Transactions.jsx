import React, { useEffect, useState } from 'react'
import { Container, Stack } from 'react-bootstrap'
import testData from '../data/testData'
import TransItem from './TransItem'
import axios from 'axios'

function Transactions({ isAuth, reload }) {
    // const [data, setData] = useState(testData.transactions)
    const mesAtual = new Date().getMonth() + 1
    const [data, setData] = useState([])
    const [dadosMes, setDadosMes] = useState([])

    const meses = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ]

    const [mes, setMes] = useState(meses[mesAtual - 1])

    useEffect(() => {
        axios
            .get('http://localhost:5000/trans', { headers: { Authorization: `Bearer ${isAuth.accessToken}` } })
            .then((data) => {
                // setMes(meses[parseInt(data.data[data.data.length - 1].createdAt.slice(5, 7)) - 1])
                setDadosMes(data.data.filter((item) => parseInt(item.createdAt.slice(5, 7)) === mesAtual))
                setData(data.data)
            })
            .catch((err) => console.log(err))
    }, [reload])

    return (
        <Container className='bg-white round main-shadow'>
            <Stack className='p-3'>
                <div className='transaction_month'>
                    <h3>{mes}</h3>
                </div>

                {dadosMes.map((item) => {
                    return <TransItem item={item} />
                })}
            </Stack>
        </Container>
    )
}

export default Transactions
