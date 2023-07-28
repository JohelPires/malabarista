import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Transactions from '../components/Transactions'
import BarStats from '../components/BarStats'
import Categories from '../components/Categories'

function Main({ isAuth, reload }) {
    const [data, setData] = useState([])
    const [dadosMes, setDadosMes] = useState([])
    return (
        <Row>
            <Col md={5}>
                <Transactions
                    setData={setData}
                    dadosMes={dadosMes}
                    setDadosMes={setDadosMes}
                    isAuth={isAuth}
                    reload={reload}
                />
            </Col>
            <Col md={7}>
                <BarStats dados={data} />
                <Categories dados={data} dadosMes={dadosMes} />
            </Col>
        </Row>
    )
}

export default Main
