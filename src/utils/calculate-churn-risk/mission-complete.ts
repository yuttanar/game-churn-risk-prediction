import { Activity } from "../../entity/Activity";

const calculateChurnRiskMissionComplete = async (
  activity: Activity
): Promise<number> => {
  const scoreChange = 2;
  return scoreChange;
};

export default calculateChurnRiskMissionComplete;
