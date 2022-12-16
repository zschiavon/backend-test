import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Cliente from 'App/Models/Cliente'
import Endereco from 'App/Models/Endereco'
import Telefone from 'App/Models/Telefone'



export default class ClientesController {
  public async index({response}: HttpContextContract) {
    try {
      const clientes = await Cliente.query().select('id', 'nome')
      .preload('endereco', enderecoQuery =>enderecoQuery.select('logradouro', 'numero'))
      .preload('telefone', telefoneQuery =>telefoneQuery.select('numero')).orderBy('id', 'asc')
      response.status(200).json(clientes)
    } catch (error) {
      response.status(400).json({
        msg: error.message
      })
    }
    

  }

  public async store({request, response}: HttpContextContract) {
    const novoClienteSchema = schema.create({
      nome: schema.string({trim: true}, [
        rules.minLength(4),
        rules.maxLength(60)
      ]),
      cpf: schema.string({trim: true}, [
        rules.regex(/\d/g),
        rules.maxLength(11),
        rules.minLength(11)        
      ]),
      cep: schema.string({trim: true}, [
        rules.regex(/\d/g),
        rules.maxLength(9),
        rules.minLength(9)
      ]),
      numero: schema.string({trim: true},[
        rules.maxLength(5),
        rules.minLength(1)
      ])
      
    })
    
    
    const nome = request.input('nome')  
    const cpf = request.input('cpf')  
    const cep = request.input('cep')  
    const numero = request.input('numero')  
    const numeroTelefone = request.input('telefone') 
    
    const trx = await Database.beginGlobalTransaction()
    try {   
      await request.validate({schema: novoClienteSchema})

      const novoCliente = await Cliente.create({nome, cpf}, trx)      
      await Endereco.create({cep: cep, numero: numero, clienteId: novoCliente.id}, trx)      
      await Telefone.create({numero: numeroTelefone, clienteId: novoCliente.id}, trx)      
      await trx.commit()
      
      return response.status(201).json({msg: `Cliente criado com sucesso!.`})

    } catch (error) {
      await trx.rollback()
      return response.status(400).json({msg: error.message})

    }
   

  }

  public async show({params, response}: HttpContextContract) { 
    try {
      const cliente = await Cliente.query().where('id', params.id).select('id', 'nome')
      .preload('endereco', enderecoQuery => enderecoQuery.select('logradouro', 'numero'))
      .preload('telefone', telefoneQuery => telefoneQuery.select('numero'))
      .preload('venda').orderBy('created_at', 'desc')

      if(cliente.length == 0){
        return response.status(400).json({msg: 'Não encontrado'})
      }
      
      return response.status(200).json(cliente)
    } catch (error) {      
      return response.status(400).json({msg: error.message})
      
    }
  }

  public async update({params, request, response}: HttpContextContract) {
        const atualizaClienteSchema = schema.create({
      nome: schema.string.optional({trim: true}, [        
        rules.minLength(4),
        rules.maxLength(60)
      ]),      
      cpf: schema.string.optional({trim: true}, [
        rules.regex(/\d/g),
        rules.maxLength(11),
        rules.minLength(11)        
      ]),
      cep: schema.string.optional({trim: true}, [
        rules.regex(/\d/g),
        rules.maxLength(8),
        rules.minLength(8)
      ]),
      numero: schema.string.optional({trim: true},[
        rules.maxLength(5),
        rules.minLength(1)
      ]),
      telefone: schema.string.optional({trim: true},[
        rules.maxLength(11),
        rules.minLength(9)
      ])
      
    })
    
    
    const nome = request.input('nome')  
    const cpf = request.input('cpf')  
    const cep = request.input('cep')  
    const numero = request.input('numero')  
    const numeroTelefone = request.input('telefone') 
    
    try { 
      await request.validate({schema: atualizaClienteSchema})
      const cliente = await Cliente.findByOrFail('id', params.id)
      const endereco = await Endereco.findByOrFail('cliente_id', cliente.id )
      const telefone = await Telefone.findByOrFail('cliente_id', cliente.id )

      nome? cliente.nome = nome : cliente.nome = cliente.nome
      cpf? cliente.cpf = cpf : cliente.cpf = cliente.cpf
      cep? endereco.cep = cep : endereco.cep = endereco.cep
      numero? endereco.numero = numero : endereco.numero = endereco.numero
      numeroTelefone? telefone.numero = numeroTelefone : telefone.numero = telefone.numero
      
      await cliente.save()   
      await endereco.save()   
      await telefone.save()

      return response.status(200).json({msg: 'Dados atualizados com sucesso'})      
    } catch (error) {
      return response.status(200).json({msg: error.message})
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    try {
     const cliente = await Cliente.findByOrFail('id', params.id)

      await cliente.delete()

      return response.status(200).json({msg: "Cliente deletado com sucesso"})
    } catch (error) {
      return response.status(400).json({msg: error.message})
    }
  }
}
