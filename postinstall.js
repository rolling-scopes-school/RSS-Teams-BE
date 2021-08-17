const fs = require('fs');
require('dotenv').config();

const ormConfig = {
  type: 'postgres',
  url: null,
  entityPrefix: 'rss_',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['src/migration/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
  },
  ssl: { rejectUnauthorized: false },
};

const url = process.env.DATABASE_URL;
const entityPrefix = process.env.DATABASE_PREFIX;

if (Boolean(entityPrefix)) {
  ormConfig.entityPrefix = entityPrefix;
}

ormConfig.url = url;

fs.writeFileSync('ormconfig.json', JSON.stringify(ormConfig));
