import { Activity } from "../../entity/Activity";
import { EActivityAction } from "../../enum/activity-action.enum";
import calculateChurnRiskLogin from "./login";
import calculateChurnRiskMissionComplete from "./mission-complete";
import calculateChurnRiskPlayGame from "./play-game";
import calculateChurnRiskPurchase from "./purchase";
import calculateChurnRiskTopUp from "./topup";

const calculateChurnRisk = async (activity: Activity): Promise<number> => {
  let scoreChange = 0;
  if (activity.action === EActivityAction.LOGIN) {
    scoreChange = await calculateChurnRiskLogin(activity);
  } else if (activity.action === EActivityAction.TOPUP) {
    scoreChange = await calculateChurnRiskTopUp(activity);
  } else if (activity.action === EActivityAction.ITEM_PURCHASE) {
    scoreChange = await calculateChurnRiskPurchase(activity);
  } else if (activity.action === EActivityAction.MISSION_COMPLETE) {
    scoreChange = await calculateChurnRiskMissionComplete(activity);
  } else if (activity.action === EActivityAction.PLAY_GAME) {
    scoreChange = await calculateChurnRiskPlayGame(activity);
  }
  return scoreChange;
};

export default calculateChurnRisk;
