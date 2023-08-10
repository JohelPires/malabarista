const Transacao = require('../database/models/transacao')

const csvFilePath = './NU_58983358_01JUN2023_30JUN2023.csv'
const csv = require('csvtojson')
csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        // console.log(jsonObj)
        const bulkData = []
        jsonObj.map((item) => {
            const valor = parseFloat(item.Valor)
            const newItem = {
                valor: valor,
                data: `${item.Data.slice(6)}-${item.Data.slice(3, 5)}-${item.Data.slice(0, 2)}`,
                descricao: item['Descrição'],
                id_usuario: 1,
                id_categoria: valor < 0 ? 0 : 1000,
            }
            Transacao.create(newItem)
                .then((result) => {
                    console.log(result)
                })
                .catch((err) => {
                    console.log(err)
                })

            // console.log(newItem)
        })
        // console.log(bulkData)
        // Transacao.bulkCreate(bulkData)
        //     .then((result = console.log(result)))
        //     .catch((err) => console.log(err))
    })
