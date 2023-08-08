import React, { useEffect, useState } from 'react'
import { Alert, Button, Dropdown, DropdownButton, Form, InputGroup, Modal, Stack } from 'react-bootstrap'
import { despesas, receitas } from '../data/categorias'
import axios from 'axios'

function UpdateModal(props) {
    const [tipo, setTipo] = useState(props.item.id_categoria < 1000 ? 'Despesa' : 'Receita')
    const [erro, setErro] = useState(false)

    const [valor, setValor] = useState(0)
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10))
    const [descricao, setDescricao] = useState('')

    const [novaTransacao, setNovaTransacao] = useState({
        valor: props.item.valor,
        data: props.item.data,
        descricao: props.item.descricao,
        id_categoria: props.item.id_categoria,
    })

    function handleCategoria(e) {
        tipo === 'Receita'
            ? setNovaTransacao({ ...novaTransacao, id_categoria: parseInt(e.target.value) + 1000 })
            : setNovaTransacao({ ...novaTransacao, id_categoria: parseInt(e.target.value) })
    }

    function handleAdd() {
        console.log(tipo)

        console.log(novaTransacao)

        axios
            .put(`http://localhost:5000/trans/${props.item.id}`, novaTransacao, {
                headers: { Authorization: `Bearer ${props.isAuth.accessToken}` },
            })
            .then((data) => {
                console.log('Transação Atualizada.')
                // setCategoria(props.tipo === 'Receita' ? 1000 : 0)

                // axios.get(`http://localhost:5000/usuario/${props.isAuth.usuario.id}`).then((data) => {
                //     props.setSaldo(data.data.saldo)
                // })
                props.setReload((prev) => prev + 1)
                props.onHide()
            })
            .catch((err) => {
                console.log(err.response.data.errors[0].type)
                if (err.response.data.errors[0].type === 'notNull Violation') {
                    setErro(true)
                }
            })
    }

    function handleDelete() {
        if (window.confirm('Tem certeza que quer deletar essa transação?')) {
            axios
                .delete(`http://localhost:5000/trans/${props.item.id}`, {
                    headers: { Authorization: `Bearer ${props.isAuth.accessToken}` },
                })
                .then((data) => {
                    console.log(data)
                    props.setReload((prev) => prev + 1)
                    props.onHide()
                })
                .catch((err) => console.log(err))
        }
    }

    return (
        <Modal {...props} size='md' aria-labelledby='contained-modal-title-vcenter' centered>
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>Editar {tipo}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: '#F0F0F0' }}>
                {novaTransacao.valor === 0 && <span style={{ color: 'red' }}>Digite um valor diferente de zero</span>}
                {erro && <span style={{ color: 'red' }}>Digite um valor</span>}
                <Stack direction='horizontal' gap={1}>
                    <InputGroup className='mb-3'>
                        <InputGroup.Text id='basic-addon1'>R$</InputGroup.Text>
                        <Form.Control
                            required
                            onChange={(e) =>
                                setNovaTransacao({
                                    ...novaTransacao,
                                    valor:
                                        tipo === 'Despesa'
                                            ? parseFloat(e.target.value) * -1
                                            : parseFloat(e.target.value),
                                })
                            }
                            value={novaTransacao.valor < 0 ? novaTransacao.valor * -1 : novaTransacao.valor}
                            type='number'
                            aria-label='Username'
                            aria-describedby='basic-addon1'
                        />
                    </InputGroup>
                    <InputGroup className='mb-3'>
                        <InputGroup.Text id='basic-addon1'>Data</InputGroup.Text>
                        <Form.Control
                            type='date'
                            defaultValue={novaTransacao.data}
                            onChange={(e) => setNovaTransacao({ ...novaTransacao, data: e.target.value })}
                        />
                    </InputGroup>
                </Stack>
                <InputGroup className='mb-3'>
                    <InputGroup.Text id='basic-addon1'>Categoria</InputGroup.Text>
                    <Form.Select
                        onChange={handleCategoria}
                        defaultValue={
                            tipo === 'Despesa' ? novaTransacao.id_categoria : novaTransacao.id_categoria - 1000
                        }
                        aria-label='Default select example'
                    >
                        {tipo === 'Receita'
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
                        value={novaTransacao.descricao}
                        onChange={(e) => setNovaTransacao({ ...novaTransacao, descricao: e.target.value })}
                        as='textarea'
                        rows={3}
                        placeholder='Descrição (opcional)'
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={handleDelete}>
                    Excluir esta transação
                </Button>
                <Button variant='secondary' onClick={() => props.setShow(false)}>
                    Cancelar
                </Button>
                <Button onClick={handleAdd}>Atualizar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdateModal
