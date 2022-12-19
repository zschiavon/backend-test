import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Usuario from 'App/Models/Usuario'
import Hash from '@ioc:Adonis/Core/Hash'




export default class UsuariosController {

  public async login({ auth, request, response }: HttpContextContract) {
    const dadosSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.email()
      ]),
      password: schema.string({ trim: true })
    })


    const body = request.body()
    try {
      await request.validate({schema: dadosSchema})    
      const user = await Usuario
        .query()
        .where('email', body.email)
        .firstOrFail()

      if (!(await Hash.verify(user.senha, body.password))) {
        return response.unauthorized('Email ou senha Incorretos')
      }

      const token = await auth.use('api').generate(user, {
        expiresIn: '5min'
      })
      return response.status(200).json({
        token: token
        
      })

    } catch (error) {

      return response.status(400).json({ msg: error.message })
    }

  }

  public async store({ request, response }: HttpContextContract) {
    const novoUsuarioSchema = schema.create({
      nome: schema.string({ trim: true }),
      email: schema.string({ trim: true }, [
        rules.maxLength(60),
        rules.email()
      ]),
      senha: schema.string([
        rules.minLength(4)
      ])
    })

    try {
      await request.validate({ schema: novoUsuarioSchema })
      const body = request.body()
      await Usuario.create(body)

      return response.status(201).json({ msg: 'Usuário inserido com sucesso!' })

    } catch (error) {

      response.badRequest(error.message)
    }
  }


}
