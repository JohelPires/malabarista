import React, { useEffect, useState } from 'react'
import { Container, Stack } from 'react-bootstrap'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { despesas } from '../data/categorias'
import meses from '../data/meses'

ChartJS.register(ArcElement, Tooltip, Legend)

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'left',
        },
    },
}

function Categories({ dadosMes, mesAtual }) {
    const [dadosCategoria, setDadosCategoria] = useState([])
    const [labelsCategoria, setLabelsCategoria] = useState([])
    useEffect(() => {
        const despesasMes = dadosMes.filter((item) => item.valor < 0)

        // Create an object to store the sums for each category
        const somaPorCategoria = {}

        console.log(despesasMes)

        // Iterate through the array and calculate the sums for each category
        despesasMes.forEach((object) => {
            const categoryId = object.id_categoria - 1
            const value = object.valor

            // If the category already exists in the somaPorCategoria object, add the value to the existing sum
            if (somaPorCategoria.hasOwnProperty(categoryId)) {
                somaPorCategoria[categoryId] += value * -1
            } else {
                // If the category does not exist in the somaPorCategoria object, initialize it with the value
                somaPorCategoria[categoryId] = value * -1
            }
        })

        console.log('soma por categoria: ', somaPorCategoria)
        setDadosCategoria(Object.values(somaPorCategoria))
        const keys = Object.keys(somaPorCategoria)
        keys.map((key, i) => {
            keys[i] = despesas[key]
        })
        console.log(keys)
        setLabelsCategoria(keys)
    }, [dadosMes])

    const data = {
        labels: labelsCategoria,
        datasets: [
            {
                label: 'Despesas',
                data: dadosCategoria,
                backgroundColor: [
                    'rgb(4, 191, 191)',
                    'rgb(52, 152, 219)',
                    'rgb(121, 154, 224)',
                    'rgb(54, 95, 183)',
                    'rgb(173, 213, 247)',
                    'rgb(14, 234, 255)',
                    'rgb(0, 48, 90)',
                    'rgb(41, 98, 255)',
                    'rgb(53, 71, 140)',
                    'rgb(0, 146, 178)',
                    'rgb(28, 63, 253)',
                    'rgb(2, 8, 115)',
                    'rgb(0, 75, 141)',
                    'rgb(4, 102, 140)',
                    'rgb(2, 136, 209)',
                ],
                borderColor: 'rgba(255, 255, 255, 0.9)',
                borderWidth: 2,
            },
        ],
    }
    return (
        <Container className='bg-white round main-shadow'>
            <Stack className='p-3'>
                <div className='transaction_month'>
                    <h3>Despesas por categoria - {meses[mesAtual - 1]}</h3>
                </div>
                <div className='donut'>
                    {dadosMes.length > 0 ? <Doughnut data={data} options={options} /> : 'Sem dados.'}
                </div>
            </Stack>
        </Container>
    )
}

export default Categories
