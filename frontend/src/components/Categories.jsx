import React, { useEffect, useState } from 'react'
import { Container, Stack } from 'react-bootstrap'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'left',
        },
    },
}

function Categories({ dadosMes }) {
    const [dadosCategoria, setDadosCategoria] = useState([])
    const [labelsCategoria, setLabelsCategoria] = useState([])
    useEffect(() => {
        const despesasMes = dadosMes.filter((item) => item.valor < 0)

        // Create an object to store the sums for each category
        const somaPorCategoria = {}

        // Iterate through the array and calculate the sums for each category
        despesasMes.forEach((object) => {
            const categoryId = object.id_categoria
            const value = object.valor

            // If the category already exists in the somaPorCategoria object, add the value to the existing sum
            if (somaPorCategoria.hasOwnProperty(categoryId)) {
                somaPorCategoria[categoryId] += value
            } else {
                // If the category does not exist in the somaPorCategoria object, initialize it with the value
                somaPorCategoria[categoryId] = value
            }
        })

        console.log(somaPorCategoria)
        setDadosCategoria(Object.values(somaPorCategoria))
        setLabelsCategoria(Object.keys(somaPorCategoria))
    }, [dadosMes])

    const data = {
        labels: labelsCategoria,
        datasets: [
            {
                label: '# of Votes',
                data: dadosCategoria,
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
    return (
        <Container className='bg-white round main-shadow'>
            <Stack className='p-3'>
                <div className='transaction_month'>
                    <h3>Categorias</h3>
                </div>
                <div className='donut'>
                    {dadosMes.length > 0 ? <Doughnut data={data} options={options} /> : 'Sem dados.'}
                </div>
            </Stack>
        </Container>
    )
}

export default Categories
