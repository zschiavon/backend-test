import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Cliente from 'App/Models/Cliente'
import Livro from 'App/Models/Livro'
import Venda from 'App/Models/Venda'


export default class VendasController {

  public async store({ request, response }: HttpContextContract) {
    const vendaSchema = schema.create({
      quantidade: schema.number(),
      livro_id: schema.number(),
      cliente_id: schema.number()
    })

    const body = request.body()
    try {
      await request.validate({ schema: vendaSchema })

      const livro = await Livro.findByOrFail('id', body.livro_id)
      const cliente = await Cliente.findByOrFail('id', body.cliente_id)

      const total = livro.preco * body.quantidade

      await Venda.create({ livroId: livro.id, clienteId: cliente.id, quantidade: body.quantidade, precoUnitario: livro.preco, precoTotal: total })
      return response.status(201).json({ msg: "Venda efetuada com sucesso" })
    } catch (error) {
      return response.status(400).json({ msg: error.message })
    }


  }
}
