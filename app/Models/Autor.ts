import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Livro from './Livro'

export default class Autores extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string 
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Livro,{
    pivotTable: 'livro_autores',
    pivotForeignKey: 'livro_id'
  })
  public livros: ManyToMany<typeof Livro>
}
