import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import axios from 'axios'
import Cliente from './Cliente'

export default class Endereco extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public clienteId: number

  @column()
  public cep: string

  @column()
  public bairro: string

  @column()
  public logradouro: string

  @column()
  public numero: string

  @column()
  public complemento: string

  @column()
  public cidade: string

  @column()
  public estado: string  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Cliente)
  public cliente: BelongsTo<typeof Cliente>

  @beforeCreate()
  public static async viaCepApi(endereco: Endereco) {
    const response = await axios.get(`https://viacep.com.br/ws/${endereco.cep}/json/`)     
    
    endereco.$attributes.cep = response.data.cep
    endereco.$attributes.logradouro = response.data.logradouro,                   
    endereco.$attributes.bairro = response.data.bairro
    endereco.$attributes.cidade = response.data.localidade
    endereco.$attributes.estado = response.data.uf
    
    endereco.$attributes.complemento? endereco.$attributes.complemento = endereco.$attributes.complemento : '' 
  
    
  }
  
}
