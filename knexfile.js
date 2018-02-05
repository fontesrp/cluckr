// Update with your config settings.

const sharedConfig = {
  client: 'postgresql',
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  },
  connection: {
    database: 'cluckr'
  }
};

module.exports = {

  development: {
    ...sharedConfig
  },

  staging: {
    ...sharedConfig
  },

  production: {
    ...sharedConfig
  }

};
