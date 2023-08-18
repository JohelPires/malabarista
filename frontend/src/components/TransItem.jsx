import React, { useState } from 'react'
import { Stack } from 'react-bootstrap'
import cat from '../data/categorias'
import { money } from '../util/money'
import UpdateModal from './UpdateModal'

function TransItem({ item, isAuth, setReload }) {
    const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
    // const receita = { height: '14px', width: '7px', backgroundColor: 'green' }
    const receita = {
        width: '0',
        height: '0',
        borderLeft: '7px solid transparent',
        borderRight: '7px solid transparent',
        borderBottom: '7px solid #49ABED',
    }
    const despesa = {
        width: '0',
        height: '0',
        borderLeft: '7px solid transparent',
        borderRight: '7px solid transparent',
        borderTop: '7px solid #E2B13D',
    }

    // const despesa = { height: '14px', width: '7px', backgroundColor: 'orange' }
    const [updateShow, setUpdateShow] = useState(false)

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
    function fit(text, len) {
        if (!text) {
            text = ''
        }
        if (text.length >= len) {
            return `${text.slice(0, len)}...`
        } else {
            return text
        }
    }

    return (
        <>
            <Stack
                role='button'
                onClick={() => {
                    console.log(`editar item ${item.id}`)
                    setUpdateShow(true)
                }}
                className='mb-0 cursor'
                direction='horizontal'
                gap={2}
            >
                <div className='m-0' style={item.id_categoria < 1000 ? despesa : receita}></div>
                <h6 style={{ fontWeight: 'bold' }} className='m-0'>
                    R${money(showItemValue(item.valor))}
                </h6>
                <h6 style={{ fontWeight: 'bold', fontSize: '14px' }} className='m-0 ms-auto'>
                    {categoria(item.id_categoria)}
                </h6>
            </Stack>
            <Stack
                role='button'
                onClick={() => {
                    console.log(`editar item ${item.id}`)
                    setUpdateShow(true)
                }}
                className='mb-3 cursor'
                direction='horizontal'
                gap={2}
            >
                <div style={{ width: '14px' }}></div>
                <div>{fit(item.descricao, 20)}</div>
                <h6 style={{ fontSize: '14px' }} className='m-0 ms-auto'>
                    {dias[item.dayofweek]}, dia {item.d}
                </h6>
            </Stack>

            <UpdateModal
                key={item.id}
                isAuth={isAuth}
                item={item}
                setReload={setReload}
                setShow={setUpdateShow}
                show={updateShow}
                onHide={() => setUpdateShow(false)}
            />
        </>
    )
}

export default TransItem
