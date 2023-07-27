import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Transactions from '../components/Transactions'
import BarStats from '../components/BarStats'
import Categories from '../components/Categories'

function Main({ isAuth, reload }) {
    return (
        <Row>
            <Col md={5}>
                <Transactions isAuth={isAuth} reload={reload} />
            </Col>
            <Col md={7}>
                <BarStats />
                <Categories />
            </Col>
        </Row>
    )
}

export default Main
