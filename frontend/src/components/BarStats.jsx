import React from 'react'
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

const data = {
    labels,
    datasets: [
        {
            label: 'Despesas',
            data: [100, 300, 500, 300, 900, 350, 600],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Receitas',
            data: [100, 300, 500, 300, 900, 350, 600],
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

function BarStats() {
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
