import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Transactions from '../components/Transactions'
import BarStats from '../components/BarStats'
import Categories from '../components/Categories'

function Main({ isAuth, reload }) {
    const [data, setData] = useState([])
    return (
        <Row>
            <Col md={5}>
                <Transactions setData={setData} isAuth={isAuth} reload={reload} />
            </Col>
            <Col md={7}>
                <BarStats dados={data} />
                <Categories />
            </Col>
        </Row>
    )
}

export default Main
