import React from 'react'
import { Container, Stack } from 'react-bootstrap'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(53, 162, 235, 0.3)',
                'rgba(53, 162, 235, 0.4)',
                'rgba(53, 162, 235, 0.5)',
                'rgba(53, 162, 235, 0.6)',
                'rgba(53, 162, 235, 0.7)',
                'rgba(53, 162, 235, 0.8)',
                'rgba(53, 162, 235, 0.9)',
            ],
            borderColor: 'rgba(255, 255, 255, 0.9)',
            borderWidth: 3,
        },
    ],
}

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'left',
        },
    },
}

function Categories() {
    return (
        <Container className='bg-white round main-shadow'>
            <Stack className='p-3'>
                <div className='transaction_month'>
                    <h3>Categorias</h3>
                </div>
                <div className='donut'>
                    <Doughnut data={data} options={options} />;
                </div>
            </Stack>
        </Container>
    )
}

export default Categories
