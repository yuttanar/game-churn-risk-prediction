import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import colorLog from "../log/colorLog";

const readlineSync = require("readline-sync");

const promptNewUser = async () => {
  const name = readlineSync.question("May I have your name?");
  const user = new User();
  user.name = name;
  await AppDataSource.manager.save(user);
  colorLog("Saved a new user with id: " + user.id);
};

export default promptNewUser;
