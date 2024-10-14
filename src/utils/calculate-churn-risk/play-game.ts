import { Activity } from "../../entity/Activity";

const calculateChurnRiskPlayGame = async (
  activity: Activity
): Promise<number> => {
  let scoreChange = 0;
  const { durationInMS } = activity;
  const durationInMinute = durationInMS / (60 * 1000);
  if (durationInMinute < 3) {
    scoreChange -= 5;
  } else if (durationInMinute >= 3 && durationInMinute < 10) {
    scoreChange -= 3;
  } else if (durationInMinute >= 10 && durationInMinute < 15) {
    scoreChange += 1;
  } else {
    scoreChange += 3;
  }
  return scoreChange;
};

export default calculateChurnRiskPlayGame;
