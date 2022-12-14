import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'telefones'

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
      table.string('numero', 11).notNullable()      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
