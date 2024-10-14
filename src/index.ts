import { AppDataSource } from "./data-source";
import { EPromptAction } from "./enum/prompt-action.enum";
import colorLog from "./utils/log/colorLog";
import promptExit from "./utils/prompt-action-handler/prompt-exit";
import promptGetAllHighChurnRisk from "./utils/prompt-action-handler/prompt-get-all-high-churn-risk";
import promptNewActivity from "./utils/prompt-action-handler/prompt-new-activity";
import promptNewUser from "./utils/prompt-action-handler/prompt-new-user";
const readlineSync = require("readline-sync");

console.clear();
colorLog("Welcome to Game Activity manager.");
AppDataSource.initialize()
  .then(async () => {
    while (true) {
      const promptActionList = Object.keys(EPromptAction);
      const promptAction = readlineSync.keyInSelect(
        promptActionList,
        "what do you want to do?",
        { cancel: false }
      );

      if (promptAction === EPromptAction.EXIT) {
        promptExit();
      } else if (promptAction === EPromptAction.NEW_USER) {
        await promptNewUser();
      } else if (promptAction === EPromptAction.NEW_ACTIVITY) {
        await promptNewActivity();
      } else if (promptAction === EPromptAction.GET_ALL_HIGH_CHURN_RISK) {
        await promptGetAllHighChurnRisk();
      }
    }
  })
  .catch((error) => console.log(error));
