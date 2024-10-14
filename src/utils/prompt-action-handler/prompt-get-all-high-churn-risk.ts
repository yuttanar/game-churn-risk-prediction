import { LessThanOrEqual } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import colorLog from "../log/colorLog";
import { SCORE_HIGH_CHURN_RISK } from "../../config";

const promptGetAllHighChurnRisk = async () => {
  const usersHighChurnRisk = await AppDataSource.manager.find(User, {
    where: { score: LessThanOrEqual(SCORE_HIGH_CHURN_RISK) },
    order: { score: "ASC" },
    relations: ["activities"],
  });
  if (usersHighChurnRisk.length) {
    colorLog(`Found ${usersHighChurnRisk.length} user with high churn risk.`);
    for (let index = 0; index < usersHighChurnRisk.length; index++) {
      const user = usersHighChurnRisk[index];
      colorLog(
        `User ${user.name} high churn risk with score ${user.score}`,
        "\x1b[4;33;41m"
      );
      console.table(user.activities);
    }
  }
};

export default promptGetAllHighChurnRisk;
