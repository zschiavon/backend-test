import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Cliente from 'App/Models/Cliente'
import Endereco from 'App/Models/Endereco'
import Telefone from 'App/Models/Telefone'
import { DateTime } from 'luxon'



export default class ClientesController {
  public async index({ response }: HttpContextContract) {
    try {
      const clientes = await Cliente.query().select('id', 'nome')
        .preload('endereco', enderecoQuery => enderecoQuery.select('logradouro', 'numero'))
        .preload('telefone', telefoneQuery => telefoneQuery.select('numero')).orderBy('id', 'asc')
      if(clientes.length == 0){
        return response.status(400).json({msg: "Não há clientes"})
      }
        
      response.status(200).json(clientes)
    } catch (error) {
      response.status(400).json({
        msg: error.message
      })
    }


  }

  public async store({ request, response }: HttpContextContract) {
    const novoClienteSchema = schema.create({
      nome: schema.string({ trim: true }, [
        rules.minLength(4),
        rules.maxLength(60)
      ]),
      cpf: schema.string({ trim: true }, [
        rules.regex(/\d/g),
        rules.maxLength(11),
        rules.minLength(11)
      ]),
      cep: schema.string({ trim: true }, [
        rules.regex(/\d/g),
        rules.maxLength(8),
        rules.minLength(8)
      ]),
      numero: schema.string({ trim: true }, [
        rules.maxLength(5),
        rules.minLength(1)
      ]),
      telefone: schema.string({ trim: true }, [
        rules.maxLength(11),
        rules.minLength(8)
      ])

    })
    
    
    const body = request.body()
    const trx = await Database.beginGlobalTransaction()

    try {
      await request.validate({ schema: novoClienteSchema })

      const novoCliente = await Cliente.create({ nome: body.nome, cpf: body.cpf }, trx)
      await Endereco.create({ cep: body.cep, numero: body.numero, clienteId: novoCliente.id }, trx)
      await Telefone.create({ numero: body.telefone, clienteId: novoCliente.id }, trx)
      await trx.commit()

      return response.status(201).json({ msg: `Cliente criado com sucesso!.` })

    } catch (error) {
      await trx.rollback()
      return response.status(400).json({ msg: error.message })

    }


  }

  public async show({ params, response }: HttpContextContract) {   
    try {
      const inicioDoMes = DateTime.fromISO(`${params.ano}-${params.mes}`).toSQL()
      const fimDoMes = DateTime.fromISO(`${params.ano}-${params.mes}-31`).toSQL()          
           
      const cliente = await Cliente.query().where('id', params.id).select('id', 'nome')
        .preload('endereco', enderecoQuery => enderecoQuery.select('logradouro', 'numero'))
        .preload('telefone', telefoneQuery => telefoneQuery.select('numero'))
        .preload('venda', vendaQuery =>{
          params.ano? vendaQuery.where('created_at', '<=', fimDoMes).andWhere('created_at', '>=', inicioDoMes).orderBy('created_at', 'desc') 
          : vendaQuery.select('*').orderBy('created_at', 'desc')
        })

      if (cliente.length == 0) {
        return response.status(400).json({ msg: 'Não encontrado' })
      }

      return response.status(200).json(cliente)
    } catch (error) {
      return response.status(400).json({ msg: error.message })

    }
  }
  

  public async update({ params, request, response }: HttpContextContract) {
    const atualizaClienteSchema = schema.create({
      nome: schema.string.optional({ trim: true }, [
        rules.minLength(4),
        rules.maxLength(60)
      ]),
      cpf: schema.string.optional({ trim: true }, [
        rules.regex(/\d/g),
        rules.maxLength(11),
        rules.minLength(11)
      ]),
      cep: schema.string.optional({ trim: true }, [
        rules.regex(/\d/g),
        rules.maxLength(8),
        rules.minLength(8)
      ]),
      numero: schema.string.optional({ trim: true }, [
        rules.maxLength(5),
        rules.minLength(1)
      ]),
      telefone: schema.string.optional({ trim: true }, [
        rules.maxLength(11),
        rules.minLength(8)
      ])

    })

    
    const body = request.body()

    try {
      await request.validate({ schema: atualizaClienteSchema })
      const cliente = await Cliente.findByOrFail('id', params.id)
      const endereco = await Endereco.findByOrFail('cliente_id', cliente.id)
      const telefone = await Telefone.findByOrFail('cliente_id', cliente.id)

      body.nome ? cliente.nome = body.nome : cliente.nome = cliente.nome

      body.cpf ? cliente.cpf = body.cpf : cliente.cpf = cliente.cpf

      body.cep ? endereco.cep = body.cep : endereco.cep = endereco.cep

      body.numero ? endereco.numero = body.numero : endereco.numero = endereco.numero

      body.numeroTelefone ? telefone.numero = body.numeroTelefone : telefone.numero = telefone.numero

      await cliente.save()
      await endereco.save()
      await telefone.save()

      return response.status(200).json({ msg: 'Dados atualizados com sucesso' })
    } catch (error) {

      return response.status(200).json({ msg: error.message })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const cliente = await Cliente.findByOrFail('id', params.id)

      await cliente.delete()

      return response.status(200).json({ msg: "Cliente deletado com sucesso" })
    } catch (error) {
      return response.status(400).json({ msg: error.message })
    }
  }
}
