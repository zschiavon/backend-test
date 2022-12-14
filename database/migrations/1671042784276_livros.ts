import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'livros'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('isbn').notNullable().unique()
      table.string('titulo', 100 ).notNullable()      
      table.integer('editora', 60).notNullable()
      table.decimal('preco', 10, 2)
      table.smallint('ano') 
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
