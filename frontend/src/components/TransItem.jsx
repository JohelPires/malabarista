import React from 'react'
import { Stack } from 'react-bootstrap'

function TransItem({ item }) {
    return (
        <Stack direction='horizontal' gap={2}>
            <div style={{ height: '15px', width: '10px', backgroundColor: 'green' }}></div>
            <div>{item.value}</div>
            <div className='ms-auto'>{item.category}</div>
        </Stack>
    )
}

export default TransItem
