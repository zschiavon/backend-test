import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Autores from 'App/Models/Autor'
import Livro from 'App/Models/Livro'

export default class extends BaseSeeder {
  public async run () {
   const livros = await Livro.createMany([
      {
        titulo: "Livro Top",
        isbn : "1111111112111",
        editora: "Paradiso",
        preco : 70.99,
        ano: 2005,       

      },
      {
        titulo: "Livro Bacana",
        isbn : "4444444112111",
        editora: "Cultura",
        preco : 30.99,
        ano: 2011,       

      },
      {
        titulo: "Livro Massa",
        isbn : "9999991112111",
        editora: "Brasil",
        preco : 20.99,
        ano: 2021,       

      },
      {
        titulo: "Livro da Irmandade",
        isbn : "9999991112112",
        editora: "Brasil",
        preco : 20.99,
        ano: 2000,       

      },
    ])

   const autores = await Autores.createMany([
    {
      nome: "Marcelo Palmeira"
    },
    {
      nome: "Claudio Bezerra"
    },
    {
      nome: "Liam Gallagher"
    },
   ])

   await Database.table('livro_autores').insert({autor_id: autores[0].id, livro_id: livros[0].id})
   await Database.table('livro_autores').insert({autor_id: autores[0].id, livro_id: livros[1].id})
   await Database.table('livro_autores').insert({autor_id: autores[1].id, livro_id: livros[2].id})
   await Database.table('livro_autores').insert({autor_id: autores[2].id, livro_id: livros[3].id})
  }
}
