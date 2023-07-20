import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'postgres', // Change this to the correct database type if you are not using PostgreSQL
  host: 'localhost',
  port: 5434, // Update this to the correct port (5434 in your case)
  username: 'postgres',
  password: 'postgres',
  database: 'orchestrator',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default config;
