import { Activity } from "../../entity/Activity";

const calculateChurnRiskTopUp = async (activity: Activity): Promise<number> => {
  const scoreChange = Math.round(activity.amount / 2);
  return scoreChange;
};

export default calculateChurnRiskTopUp;
