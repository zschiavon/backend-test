import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Usuario from 'App/Models/Usuario'

export default class extends BaseSeeder {
  public async run () {
    await Usuario.createMany([
      { 
        nome: 'virk,',
        email: 'virk@adonisjs.com',
        senha: 'secret',
      },
      {
        nome: 'romain',
        email: 'romain@adonisjs.com',
        senha: 'supersecret'
      }
    ])
  }
}
