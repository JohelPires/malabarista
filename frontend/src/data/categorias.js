const despesas = [
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
]

const receitas = [
    'Salário e Remuneração',
    'Renda Extra', // (freelance, trabalhos temporários)',
    'Rendimentos de Investimentos', // (juros, dividendos)',
    'Aluguel de Propriedades',
    'Reembolsos',
    'Vendas de Bens', // (venda de itens usados, por exemplo)',
    'Pensões ou Benefícios Sociais',
    'Prêmios e Bonificações',
    'Receitas de Negócios Próprios', // (caso o usuário seja empreendedor)',
    'Outros Rendimentos', // (quaisquer outras fontes de renda não mencionadas)',
]

module.exports = { receitas, despesas }
