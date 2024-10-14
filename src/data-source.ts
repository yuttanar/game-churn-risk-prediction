import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Activity } from "./entity/Activity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [User, Activity],
  migrations: [],
  subscribers: [],
});
