import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'livros'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('autor_id')      
            .unsigned() 
            .notNullable()
            .references('id')
            .inTable('autores')
            .onUpdate('CASCADE')      
            .onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
