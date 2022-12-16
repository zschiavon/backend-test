import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Livro from './Livro'

export default class Autor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Livro)
  public livros: HasMany<typeof Livro>
}
