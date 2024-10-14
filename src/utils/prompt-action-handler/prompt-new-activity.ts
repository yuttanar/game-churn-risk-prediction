import { AppDataSource } from "../../data-source";
import { Activity } from "../../entity/Activity";
import { User } from "../../entity/User";
import { EActivityAction } from "../../enum/activity-action.enum";
import calculateChurnRisk from "../calculate-churn-risk";
import colorLog from "../log/colorLog";
import userHighChurnRisk from "../notify/user-high-churn-risk";
import incrementUserScore from "../sql-query/user/increment-user-score";

const readlineSync = require("readline-sync");

const promptNewActivity = async () => {
  const users = await AppDataSource.manager.find(User);
  const usersName = users.map((user) => user.name);
  const userSelectedIndex = readlineSync.keyInSelect(
    usersName,
    "Select user for this action",
    { cancel: false }
  );
  const userSelected = users[userSelectedIndex];
  const actionList = Object.keys(EActivityAction);
  const actionIndex = readlineSync.keyInSelect(
    actionList,
    "What do you want to do",
    { cancel: false }
  );
  const actionSelected = EActivityAction[actionList[actionIndex]];
  const activity = new Activity();
  activity.action = actionSelected;
  activity.user = userSelected;

  if (actionSelected === EActivityAction.TOPUP) {
    const topupAmount = readlineSync.questionInt(
      "How much do you want to top up?"
    );
    activity.amount = topupAmount;
  } else if (actionSelected === EActivityAction.ITEM_PURCHASE) {
    const purchaseAmount = readlineSync.questionInt(
      "How much do you want to purchase?"
    );
    activity.amount = purchaseAmount;
  } else if (actionSelected === EActivityAction.PLAY_GAME) {
    const duration = readlineSync.questionInt(
      "How much time do you spend playing game in milliseconds?"
    );
    activity.durationInMS = duration;
  }

  await AppDataSource.manager.save(activity);
  colorLog("Saved a new activity with id: " + activity.id);

  const scoreChange = await calculateChurnRisk(activity);
  await incrementUserScore(activity.user.id, scoreChange);

  const user = await AppDataSource.manager.findOne(User, {
    where: { id: activity.user.id },
  });
  const isHighChurnRisk = userHighChurnRisk(user.score);
  if (isHighChurnRisk) {
    colorLog(
      `User ${user.name} high churn risk with score ${user.score}`,
      "\x1b[4;33;41m"
    );
    const userActivities = await AppDataSource.manager.find(Activity, {
      where: { user: { id: user.id } },
    });
    console.table(userActivities);
  }
};

export default promptNewActivity;
