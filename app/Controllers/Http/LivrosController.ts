import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Autores from 'App/Models/Autor'
import Livro from 'App/Models/Livro'

export default class LivrosController {
  public async index({ response }: HttpContextContract) {
    try {
           
      const livros = await Database.query().select('l.id', 'l.titulo', 'l.preco', 'l.ano', 'l.editora', 'a.nome')
        .from('livros as l')
        .where('ativo', true)
        .innerJoin('livro_autores as la', 'la.livro_id', '=', 'l.id')
        .innerJoin('autores as a', 'la.autor_id', '=', 'a.id')
      
      
        
      if(livros.length == 0){
        return response.status(400).json({msg: 'Não há livros cadastrados'})
      }
      response.status(200).json(livros)
    } catch (error) {
      response.status(400).json({ msg: error.message })

    }
  }

  public async store({ request, response }: HttpContextContract) {
    const livroSchema = schema.create({
      titulo: schema.string({ trim: true }, [
        rules.maxLength(100),
        rules.minLength(1)
      ]),
      isbn: schema.string({ trim: true }, [
        rules.regex(/\d/g),
        rules.maxLength(13),
        rules.minLength(13)

      ]),
      editora: schema.string({ trim: true }, [
        rules.maxLength(60),
        rules.minLength(1)
      ]),
      preco: schema.number(),
      ano: schema.number(),
      autor: schema.string({ trim: true }, [
        rules.maxLength(60),
        rules.minLength(2)
      ])
    })
    
    const body = request.body()

    try {
      await request.validate({ schema: livroSchema })
      let autor = await Autores.findBy('nome', body.autor)
      
      if(!autor){        
        autor = await Autores.create({ nome: body.autor })
      }
      

      const livro = await Livro.create({
        titulo: body.titulo,
        isbn: body.isbn,
        editora: body.editora,
        preco: body.preco,
        ano: body.ano       
      })
      await Database.table('livro_autores').insert({autor_id: autor.id, livro_id: livro.id})
      return response.status(201).json({ msg: 'Livro inserido com sucesso!' })

    } catch (error) {

      return response.status(400).json({ msg: error.message })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const livro = await Database.query().select('l.id', 'l.titulo', 'l.preco', 'l.ano', 'l.editora','a.nome')
      .from('livros as l')
      .where('l.id', params.id)
      .where('ativo', true)
      .innerJoin('livro_autores as la', 'la.livro_id', '=', 'l.id')
      .innerJoin('autores as a', 'la.autor_id', '=', 'a.id')

      console.log();
      
      if (livro.length == 0) {
        return response.status(400).json({ msg: 'Livro não encontrado.' })
      }

      return response.status(200).json(livro)
    } catch (error) {
      response.status(400).json({ msg: error.message })

    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const atualizaClienteSchema = schema.create({
      titulo: schema.string.optional({ trim: true }, [
        rules.maxLength(100),
        rules.minLength(4)
      ]),
      isbn: schema.string.optional({ trim: true }, [
        rules.regex(/\d/g),
        rules.maxLength(13),
        rules.minLength(12)
      ]),
      preco: schema.number.optional(),
      editora: schema.string.optional({ trim: true }, [
        rules.maxLength(60),
        rules.minLength(4)
      ]),
      ano: schema.number.optional(),
      autor: schema.string.optional({trim: true})

    })


    const body = request.body()

    try {
      await request.validate({ schema: atualizaClienteSchema })
      const livro = await Livro.findByOrFail('id', params.id)
      
      let autor

      if(body.autor_nome){
        autor = await Autores.findBy('nome', body.autor)
      }

      if (!autor) {
        autor = await Autores.create({nome: body.autor})
      }

      await Database.from('livro_autores').select('*').where('livro_id', params.id).update({autor_id: autor.id})
      
      
      body.titulo ? livro.titulo = body.titulo : livro.titulo = livro.titulo
      
      body.preco ? livro.preco = body.preco : livro.preco = livro.preco
      
      body.ano ? livro.ano = body.ano : livro.ano = livro.ano
      
      body.isbn ? livro.isbn = body.isbn : livro.isbn = livro.isbn
      
      body.editora ? livro.editora = body.editora : livro.editora = livro.editora  

      await livro.save()
      await autor.save()

      return response.status(200).json({ msg: 'Dados atualizados com sucesso' })
    } catch (error) {
      return response.status(200).json({ msg: error.message })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const livro = await Livro.findByOrFail('id', params.id)

      livro.ativo = false

      await livro.save()

      return response.status(200).json({ msg: "Status do livro alterado com sucesso" })
    } catch (error) {
      return response.status(400).json({ msg: error.message })
    }
  }
}