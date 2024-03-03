exports.up = function(knex) {
return knex.schema.createTable("movies", table=>{
    table.increments("movie_id").primary();
    table.string("title");
    table.integer("runtime_in_minutes");
    table.string("rating");
    table.string("description", 1000);
    table.string("image_url");
})
};


exports.down = function(knex) {
  return knex.schema.dropTable("movies");
};