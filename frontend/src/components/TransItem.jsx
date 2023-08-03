import React, { useState } from 'react'
import { Stack } from 'react-bootstrap'
import cat from '../data/categorias'
import { money } from '../util/money'
import UpdateModal from './UpdateModal'

function TransItem({ item, isAuth, setReload }) {
    const receita = { height: '14px', width: '7px', backgroundColor: 'green' }
    const despesa = { height: '14px', width: '7px', backgroundColor: 'orange' }
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

    return (
        <>
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
                <div className='m-0' style={item.id_categoria < 1000 ? despesa : receita}></div>
                <h6 style={{ fontWeight: 'bold' }} className='m-0'>
                    R${money(showItemValue(item.valor))}
                </h6>
                <h6 style={{ fontWeight: 'bold' }} className='m-0 ms-auto'>
                    {categoria(item.id_categoria)}
                </h6>
            </Stack>
            <UpdateModal
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
