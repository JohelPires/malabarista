import React, { useEffect, useState } from 'react'
import { Container, Stack } from 'react-bootstrap'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import meses from '../data/meses'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        // title: {
        //     display: true,
        //     text: 'Chart.js Bar Chart',
        // },
    },
}

const labels = meses

function BarStats({ dados }) {
    const [mesesReceita, setMesesReceita] = useState([])
    const [mesesDespesa, setMesesDespesa] = useState([])

    useEffect(() => {
        let dadosMes
        const anoReceita = []
        const anoDespesa = []
        for (let i = 0; i < 12; i++) {
            dadosMes = dados.filter((item) => parseInt(item.createdAt.slice(5, 7)) === i + 1)
            let somaReceita = 0
            let somaDespesa = 0

            dadosMes.map((item) => {
                if (item.valor > 0) {
                    somaReceita += item.valor
                } else {
                    somaDespesa += item.valor * -1
                }
            })
            anoReceita.push(somaReceita)
            anoDespesa.push(somaDespesa)
            // console.log(anoReceita, anoDespesa)
        }

        setMesesReceita(anoReceita)
        setMesesDespesa(anoDespesa)
    }, [dados])

    const data = {
        labels,
        datasets: [
            {
                label: 'Despesas',
                data: mesesDespesa,
                backgroundColor: '#F2CB70',
            },
            {
                label: 'Receitas',
                data: mesesReceita,
                backgroundColor: [
                    'rgba(53, 162, 235, 0.3)',
                    'rgba(53, 162, 235, 0.4)',
                    'rgba(53, 162, 235, 0.5)',
                    'rgba(53, 162, 235, 0.6)',
                    'rgba(53, 162, 235, 0.7)',
                    'rgba(53, 162, 235, 0.8)',
                    'rgba(53, 162, 235, 0.9)',
                ],
            },
        ],
    }
    return (
        <Container className='bg-white round main-shadow'>
            <Stack className='p-3'>
                <div className='transaction_month'>
                    <h3>Relatório anual</h3>
                </div>
                <Bar options={options} data={data} />
            </Stack>
        </Container>
    )
}

export default BarStats
