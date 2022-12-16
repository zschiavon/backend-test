import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Endereco from './Endereco'
import Telefone from './Telefone'
import Venda from './Venda'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public cpf: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Endereco)
  public endereco: HasOne<typeof Endereco>

  @hasOne(() => Telefone)
  public telefone: HasOne<typeof Telefone>

  @hasMany(() => Venda)
  public venda: HasMany<typeof Venda>
  
}
