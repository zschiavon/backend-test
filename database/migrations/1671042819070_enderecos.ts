import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'enderecos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('cliente_id') 
            .unsigned() 
            .notNullable()
            .references('id')
            .inTable('usuarios')
            .onUpdate('CASCADE')      
            .onDelete('CASCADE')      
      table.string('cep', 11).notNullable()
      table.string('bairro', 60).notNullable()
      table.string('logradouro', 100).notNullable()
      table.string('numero', 5).notNullable()
      table.string('complemento', 12)
      table.string('cidade', 40).notNullable()
      table.string('estado', 40).notNullable()  
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
