const environment = process.env.NODE_ENV;

module.exports = {
  type: 'postgres',
    host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'bye-paper',
  synchronize: false,
  logging: true,
  entities: ['dist/domain/models/**/*.js'],
  synchronize: true,

  logging: true,
  logger: 'file',

  migrationsRun: environment === 'test', // I prefer to run manually in dev
  migrationsTableName: 'migrations',
  migrations: ['dist/infrastructure/database/migrations/*.js'],
  cli: {
    migrationsDir: 'src/infrastructure/database/migrations',
  },

};
