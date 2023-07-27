import axios from 'axios'
import React, { useState } from 'react'
import { Button, Col, Container, Form, Row, Stack } from 'react-bootstrap'

function ControlBar({ isAuth, setReload }) {
    const [valor, setValor] = useState(0.0)
    const [showCateg, setShowCateg] = useState(false)
    const [categ, setCateg] = useState(0)

    const [despesas, setDespesas] = useState([
        'Alimentação', // (restaurantes, supermercado, delivery)', //
        'Moradia', // (aluguel, hipoteca, contas de serviços públicos)',
        'Transporte', // (gasolina, transporte público, manutenção do veículo)',
        'Saúde', // (seguro de saúde, medicamentos, consultas médicas)',
        'Lazer', // (cinema, viagens, hobbies)',
        'Vestuário', // (roupas, sapatos, acessórios)',
        'Educação', // (mensalidades escolares, cursos, livros)',
        'Contas de Serviços', // (internet, TV a cabo, telefone)',
        'Dívidas', // (empréstimos, cartões de crédito)',
        'Seguros', // (seguro de vida, seguro de carro)',
        'Presentes e Doações',
        'Impostos e Taxas',
        'Gastos com Animais de Estimação',
        'Cuidados Pessoais', // (salão de beleza, academia)',
        'Outros', // (outras despesas não cobertas por categorias anteriores)',
    ])

    const [receitas, setReceitas] = useState([
        'Salário e Remuneração',
        'Renda Extra (freelance, trabalhos temporários)',
        'Rendimentos de Investimentos (juros, dividendos)',
        'Aluguel de Propriedades',
        'Reembolsos',
        'Vendas de Bens (venda de itens usados, por exemplo)',
        'Pensões ou Benefícios Sociais',
        'Prêmios e Bonificações',
        'Receitas de Negócios Próprios (caso o usuário seja empreendedor)',
        'Outros Rendimentos (quaisquer outras fontes de renda não mencionadas)',
    ])

    function handleChange(e) {
        console.log(e.target.value)
        setValor(parseFloat(e.target.value))
    }

    function handleDespesa() {
        console.log(despesas[categ - 1])
        setValor((prev) => prev * -1)
        setShowCateg('DESPESA')
    }
    function handleReceita() {
        console.log(receitas[categ - 1000])
        setShowCateg('RECEITA')
    }

    function handleConfirma() {
        console.log(valor)
        axios
            .post(
                'http://localhost:5000/trans',
                { valor: valor, id_categoria: categ },
                { headers: { Authorization: `Bearer ${isAuth.accessToken}` } }
            )
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
        console.log(categ)
        setValor(0)
        setReload((prev) => !prev)
        setShowCateg(false)
    }

    return (
        <Stack className='controlBar p-3 mb-4 round main-shadow'>
            <Stack direction='horizontal' gap={2}>
                <h3 style={{ fontSize: '1.1rem' }} className='m-0'>
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
                </Button>
                <h3 className='ms-auto'>Saldo: R$ 4.125,00</h3>
            </Stack>
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
                                        ? despesas.map((d, i) => {
                                              return <option value={i}>{d}</option>
                                          })
                                        : receitas.map((d, i) => {
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
