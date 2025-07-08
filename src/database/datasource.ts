import { CONFIGURATION } from 'src/libs';
import { DataSourceOptions, DataSource } from 'typeorm';
import {
  User,
  Feedback,
  MentorshipRequest,
  MentorshipSession,
} from './entities';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: CONFIGURATION.DATABASE.HOST,
  port: CONFIGURATION.DATABASE.PORT,
  username: CONFIGURATION.DATABASE.USERNAME,
  password: CONFIGURATION.DATABASE.PASSWORD,
  database: CONFIGURATION.DATABASE.NAME,
  entities: [User, MentorshipSession, MentorshipRequest, Feedback],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
  synchronize: true,
};

export const dataSource: DataSource = new DataSource(dataSourceOptions);
