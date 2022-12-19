import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'livro_autores'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
     table.integer('livro_id')
     .notNullable()
     .unsigned()
     .references('id')
     .inTable('livros')
     .onDelete('CASCADE')
     .onUpdate('CASCADE')

     table.integer('autor_id')
     .notNullable()
     .unsigned()
     .references('id')
     .inTable('autores')
     .onDelete('CASCADE')
     .onUpdate('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
