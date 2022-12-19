import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Livro from './Livro'
import Cliente from './Cliente'

export default class Venda extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({})
  public precoUnitario: number
  
  @column({})
  public clienteId: number
  
  @column({})
  public livroId: number

  @column({})
  public precoTotal: number

  @column()
  public quantidade: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @hasOne(() => Livro)
  public livro: HasOne<typeof Livro>
  
  @hasOne(() => Cliente)
  public cliente: HasOne<typeof Cliente>
}
