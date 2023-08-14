import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Placeholder, Row, Spinner, Stack } from 'react-bootstrap'
import cat from '../data/categorias'
import { money } from '../util/money'
import AddModal from './AddModal'
import { FaMinus, FaPlus } from 'react-icons/fa'

function ControlBar({ isAuth, reload, setReload }) {
    const [valor, setValor] = useState(0.0)
    const [showCateg, setShowCateg] = useState(false)
    const [categ, setCateg] = useState(0)
    const [saldo, setSaldo] = useState(0)
    const [modalShow, setModalShow] = useState(false)
    const [categoria, setCategoria] = useState(0)

    const [loadingSaldo, setLoadingSaldo] = useState(true)

    const [tipo, setTipo] = useState('')

    useEffect(() => {
        setLoadingSaldo(true)
        if (isAuth.usuario) {
            axios
                .get('http://localhost:5000/usuario/saldo', {
                    headers: { Authorization: `Bearer ${isAuth.accessToken}` },
                })
                .then((data) => {
                    if (data.data) {
                        setSaldo(data.data)
                    }
                    setLoadingSaldo(false)
                })
        }
    }, [reload, modalShow])

    function handleChange(e) {
        // console.log(e.target.value)
        setValor(parseFloat(e.target.value))
    }

    function handleDespesa() {
        // console.log(cat.despesas[categ - 1])
        setValor((prev) => prev * -1)
        setShowCateg('DESPESA')
    }
    function handleReceita() {
        // console.log(cat.receitas[categ - 1000])
        setShowCateg('RECEITA')
    }

    function handleConfirma() {
        // console.log(valor)
        axios
            .post(
                'http://localhost:5000/trans',
                { valor: valor, id_categoria: categ },
                { headers: { Authorization: `Bearer ${isAuth.accessToken}` } }
            )
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
        // console.log(categ)
        setValor(0)
        setReload((prev) => prev + 1)
        setShowCateg(false)
    }

    return (
        <Stack className='controlBar p-3 pt-2 pb-2 mb-4 round main-shadow'>
            <Stack direction='horizontal' gap={2}>
                {/* <h3 style={{ fontSize: '1.1rem' }} className='m-0'>
                    R$
                </h3>
                <Form.Control
                    size='sm'
                    value={valor}
                    onChange={handleChange}
                    type='text'
                    className='transaction-input'
                ></Form.Control>
                <Button variant='success' size='sm' onClick={handleDespesa}>
                    Despesa
                </Button>
                <Button variant='success' size='sm' onClick={handleReceita}>
                    Receita
                </Button> */}
                <Button
                    variant='primary'
                    // size='sm'
                    onClick={() => {
                        setTipo('Receita')
                        setCategoria(1000)
                        setModalShow(true)
                    }}
                >
                    <FaPlus /> Adicionar receita
                </Button>
                <Button
                    variant='warning'
                    // style={{ color: 'white' }}
                    // size='sm'
                    onClick={() => {
                        setTipo('Despesa')
                        setCategoria(0)
                        setModalShow(true)
                    }}
                >
                    <FaMinus /> Adicionar despesa
                </Button>
                <h5 className='ms-auto m-0'>
                    Saldo: R${' '}
                    {loadingSaldo ? (
                        <Spinner
                            className='ms-auto m-0'
                            as='span'
                            animation='border'
                            size='sm'
                            role='status'
                            aria-hidden='true'
                        />
                    ) : (
                        money(saldo)
                    )}
                </h5>
            </Stack>

            <AddModal
                setReload={setReload}
                setSaldo={setSaldo}
                isAuth={isAuth}
                show={modalShow}
                categoria={categoria}
                setCategoria={setCategoria}
                tipo={tipo}
                onHide={() => setModalShow(false)}
            />

            {showCateg && (
                <Container>
                    <Row>
                        <Col md={5} className='mt-2'>
                            <Stack direction='horizontal' gap={2}>
                                <Form.Select
                                    onChange={(e) => {
                                        showCateg == 'DESPESA'
                                            ? setCateg(parseInt(e.target.value) + 1)
                                            : setCateg(parseInt(e.target.value) + 1000)
                                    }}
                                    size='sm'
                                    aria-label='Default select example'
                                >
                                    <option>Selecione a categoria</option>
                                    {showCateg == 'DESPESA'
                                        ? cat.despesas.map((d, i) => {
                                              return <option value={i}>{d}</option>
                                          })
                                        : cat.receitas.map((d, i) => {
                                              return <option value={i}>{d}</option>
                                          })}
                                </Form.Select>
                                <Button onClick={handleConfirma} size='sm'>
                                    Confirmar
                                </Button>
                            </Stack>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            )}
        </Stack>
    )
}

export default ControlBar
