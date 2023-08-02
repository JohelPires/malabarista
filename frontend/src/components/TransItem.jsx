import React from 'react'
import { Stack } from 'react-bootstrap'
import cat from '../data/categorias'
import { money } from '../util/money'

function TransItem({ item }) {
    const receita = { height: '14px', width: '7px', backgroundColor: 'green' }
    const despesa = { height: '14px', width: '7px', backgroundColor: 'orange' }

    function showItemValue(value) {
        if (value > 0) {
            return value
        } else {
            return value * -1
        }
    }

    function categoria(idcat) {
        if (idcat < 1000) {
            return cat.despesas[idcat]
        } else {
            return cat.receitas[idcat - 1000]
        }
    }

    return (
        <Stack className='mb-3' direction='horizontal' gap={2}>
            <div className='m-0' style={item.id_categoria < 1000 ? despesa : receita}></div>
            <h6 style={{ fontWeight: 'bold' }} className='m-0'>
                R${money(showItemValue(item.valor))}
            </h6>
            <h6 style={{ fontWeight: 'bold' }} className='m-0 ms-auto'>
                {categoria(item.id_categoria)}
            </h6>
        </Stack>
    )
}

export default TransItem
