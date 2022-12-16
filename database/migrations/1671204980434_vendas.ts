import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'vendas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('cliente_id')
      .unsigned() 
      .notNullable()
      .references('id')
      .inTable('clientes')
      .onUpdate('CASCADE')      
      .onDelete('CASCADE')
      table.integer('livro_id')
      .unsigned() 
      .notNullable()
      .references('id')
      .inTable('livros')
      .onUpdate('CASCADE')      
      .onDelete('CASCADE')
      table.integer('quantidade').notNullable()
      table.decimal('preco_unitario', 10, 2) .notNullable()           
      table.decimal('preco_total', 10, 2).notNullable() 
      table.timestamp('created_at', { useTz: true })      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
