import React, { useState } from 'react'
import { Button, Col, Container, Form, Row, Stack } from 'react-bootstrap'

function ControlBar() {
    const [valor, setValor] = useState(0.0)
    const [categ, setCateg] = useState(false)

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
        setValor(e.target.value)
    }

    function handleDespesa() {
        setCateg(true)
    }

    function handleConfirma() {
        console.log(categ)
        setCateg(false)
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
                <Button variant='success' size='sm'>
                    Receita
                </Button>
                <h3 className='ms-auto'>Saldo: R$ 4.125,00</h3>
            </Stack>
            {categ && (
                <Container>
                    <Row>
                        <Col md={5} className='mt-2'>
                            <Stack direction='horizontal' gap={2}>
                                <Form.Select
                                    onChange={(e) => setCateg(e.target.value)}
                                    size='sm'
                                    aria-label='Default select example'
                                >
                                    <option>Selecione a categoria</option>
                                    {despesas.map((d, i) => {
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
