import { Activity } from "../../entity/Activity";
import dayjs = require("dayjs");

const calculateChurnRiskLogin = async (activity: Activity): Promise<number> => {
  let scoreChange = 0;
  const lastLoginDate = dayjs(activity.user.updatedAt);
  const differenceDay = lastLoginDate.diff(dayjs(activity.createdAt), "d");

  if (differenceDay < 1) {
    scoreChange += 1;
  } else if (differenceDay >= 7 && differenceDay < 28) {
    scoreChange -= Math.round(differenceDay / 2);
  } else {
    scoreChange -= 20;
  }

  return scoreChange;
};

export default calculateChurnRiskLogin;
