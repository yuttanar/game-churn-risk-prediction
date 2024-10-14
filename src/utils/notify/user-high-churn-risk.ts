import { SCORE_HIGH_CHURN_RISK } from "../../config";

const userHighChurnRisk = (score: number): boolean => {
  return score <= SCORE_HIGH_CHURN_RISK;
};

export default userHighChurnRisk;
