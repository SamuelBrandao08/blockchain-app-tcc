
exports.up = function(knex) {
  return knex.schema.createTable('apicultor', function (table) {
      table.string('id').primary();

      table.string('nome').notNullable();
      table.string('email').unique().notNullable();
      table.string('contato');
      table.string('cidade').notNullable();
      table.string('uf', 2).notNullable();

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('Apicultor');
};
