
exports.up = function(knex) {
  return knex.schema.createTable('colmeias', function (table) {
    table.increments().primary();

    table.string('localizacao');
    table.double('peso');
    table.double('temperatura', 1);
    table.string('umidade');

    table.string('id_apicultor').notNullable();

    table.foreign('id_apicultor').references('id').inTable('apicultor');
  
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('colmeias');
};
