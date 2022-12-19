import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Autores from './Autor'

export default class Livro extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public isbn: string

 
  @column()
  public titulo: string

  @column()
  public editora: string

  @column()
  public preco: number

  @column()
  public ano: number

  @column()
  public ativo: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Autores,{
    pivotTable: 'livro_autores',
    pivotForeignKey: 'autor_id'
  })
  public autores: ManyToMany<typeof Autores>
  
  
}
