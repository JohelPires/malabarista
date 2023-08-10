import React, { useEffect, useState } from 'react'
import { Alert, Button, Dropdown, DropdownButton, Form, InputGroup, Modal, Stack } from 'react-bootstrap'
import { despesas, receitas } from '../data/categorias'
import axios from 'axios'
import { useForm } from 'react-hook-form'

function AddModal(props) {
    const [validated, setValidated] = useState(false)

    const [valor, setValor] = useState(0)
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10))
    const [descricao, setDescricao] = useState('')

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    // const onSubmit = (data) => console.log(data)

    // useEffect(() => {
    //     setCategoria(props.tipo === 'Receita' ? 1000 : 0)
    // }, [])

    function handleCategoria(e) {
        props.tipo === 'Receita'
            ? props.setCategoria(parseInt(e.target.value) + 1000)
            : props.setCategoria(parseInt(e.target.value))
    }

    const validateNonZero = (value) => {
        if (value != 0) {
            return true
        } else {
            return 'Número deve ser diferente de zero'
        }
    }

    function onSubmit(data) {
        // e.preventDefault()
        console.log(data)
        // if (props.tipo === 'Despesa') {
        //     // console.log(props.tipo)
        //     const negValor = valor * -1
        //     setValor(negValor)
        //     // console.log(valor * -1)
        // }

        const transaction = {
            valor: props.tipo === 'Despesa' ? parseFloat(data.valor) * -1 : parseFloat(data.valor),
            data: date,
            id_categoria: props.categoria,
            descricao: descricao,
        }

        // console.log(transaction)

        axios
            .post('http://localhost:5000/trans', transaction, {
                headers: { Authorization: `Bearer ${props.isAuth.accessToken}` },
            })
            .then((data) => {
                console.log('Transação adicionada.')
                // setCategoria(props.tipo === 'Receita' ? 1000 : 0)
                setDate(new Date().toISOString().substring(0, 10))
                setDescricao('')
                data.valor = 0
                axios.get(`http://localhost:5000/usuario/${props.isAuth.usuario.id}`).then((data) => {
                    props.setSaldo(data.data.saldo)
                })
                props.setReload((prev) => prev + 1)
                props.onHide()
            })
            .catch((err) => console.log(err))
    }
    return (
        <Modal {...props} size='md' aria-labelledby='contained-modal-title-vcenter' centered>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>Adicionar {props.tipo}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F0F0F0' }}>
                    {errors.valor && <span style={{ color: 'red' }}>Digite um valor diferente de zero</span>}
                    <Stack direction='horizontal' gap={1}>
                        <InputGroup className='mb-3'>
                            <InputGroup.Text id='basic-addon1'>R$</InputGroup.Text>
                            <Form.Control
                                //value={valor}
                                // onChange={(e) => setValor(parseFloat(e.target.value))}
                                defaultValue={0}
                                placeholder='Valor'
                                type='number'
                                step={0.01}
                                aria-label='Username'
                                aria-describedby='basic-addon1'
                                {...register('valor', { required: true, validate: validateNonZero })}
                            />
                        </InputGroup>
                        <InputGroup className='mb-3'>
                            <InputGroup.Text id='basic-addon1'>Data</InputGroup.Text>
                            <Form.Control type='date' defaultValue={date} onChange={(e) => setDate(e.target.value)} />
                        </InputGroup>
                    </Stack>
                    <InputGroup className='mb-3'>
                        <InputGroup.Text id='basic-addon1'>Categoria</InputGroup.Text>
                        <Form.Select
                            onChange={handleCategoria}
                            // defaultValue={categoria}
                            aria-label='Default select example'
                        >
                            {props.tipo === 'Receita'
                                ? receitas.map((c, i) => {
                                      return <option value={i}>{c}</option>
                                  })
                                : despesas.map((c, i) => {
                                      return <option value={i}>{c}</option>
                                  })}
                        </Form.Select>
                    </InputGroup>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                        {/* <Form.Label>Example textarea</Form.Label> */}
                        <Form.Control
                            value={descricao || ''}
                            onChange={(e) => setDescricao(e.target.value)}
                            as='textarea'
                            rows={3}
                            placeholder='Descrição (opcional)'
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} variant='secondary'>
                        Cancelar
                    </Button>
                    <Button type='submit'>Adicionar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddModal
