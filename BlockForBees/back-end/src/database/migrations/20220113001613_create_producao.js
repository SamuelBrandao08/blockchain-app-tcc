
exports.up = function(knex) {
    return knex.schema.createTable('producao', function (table) {
        table.increments().primary();

        table.double('peso', 2).notNullable();
        table.datetime('data_coleta').notNullable();
        table.string('localizacao').notNullable();
        table.string('especialidade').notNullable();
        table.integer('qtd_colmeias').notNullable();

        table.string('id_apicultor').notNullable();
        table.string('id_colmeias').notNullable();

        table.foreign('id_apicultor').references('id').inTable('apicultor');
        table.foreign('id_colmeias').references('id').inTable('colmeias');
  
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('producao');
};
