exports.up = function ( knex, Promise ) {
  return knex.schema.createTable( 'votes', ( t ) => {
    t.integer( 'recipe_id' ).notNullable().references( 'id' )
      .inTable( 'recipes' );
    t.integer( 'user_id', 1000 ).notNullable().references( 'id' ).inTable( 'users' );
    t.integer( 'vote_flag' ).notNullable();
    t.timestamp( 'created_at' ).defaultTo( knex.fn.now() );
    t.primary( ['recipe_id', 'user_id'] );
  } );
};

exports.down = function ( knex, Promise ) {
  return knex.schema.dropTableIfExists( 'votes' );
};
