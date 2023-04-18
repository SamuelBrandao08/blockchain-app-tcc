
exports.up = function(knex) {
  return knex.schema.createTable('mel', function (table) {  
    table.increments().primary();

    table.string('especialidade').notNullable();
    table.double('peso', 2).notNullable();
    table.string('fabricacao').notNullable();
    table.string('validade').notNullable();
    table.string('localizacao').notNullable();

    table.string('id_producao').notNullable();

    table.foreign('id_producao').references('id').inTable('producao');

  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('mel');
};
