import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Cliente from 'App/Models/Cliente'
import Endereco from 'App/Models/Endereco'
import Telefone from 'App/Models/Telefone'

export default class extends BaseSeeder {
  public async run () {
    const clientes = await Cliente.createMany([
      { 
        nome: 'calos,',
        cpf: '11111111112',        
      },
      { 
        nome: 'roberto',
        cpf: '22222111111',        
      },
      {
        nome: 'claudia',
        cpf: '11111199991',
        
      }
    ])
    await Telefone.createMany([
      {
        clienteId: clientes[0].id,
        numero: '999999999' 
      },
      {
        clienteId: clientes[1].id,
        numero: '111111111' 
      },
      {
        clienteId: clientes[2].id,
        numero: '222222222' 
      },
    ])
    await Endereco.createMany([
      {
        cep: "96010010",
        numero: "15",
        clienteId: clientes[0].id
      },
      {
        cep: "96010020",
        numero: "122",
        clienteId: clientes[1].id
      },
      {
        cep: "96020580",
        numero: "1441",
        clienteId: clientes[2].id
      },

    ])

  }
}
