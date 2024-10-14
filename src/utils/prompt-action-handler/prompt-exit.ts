import colorLog from "../log/colorLog";

const readlineSync = require("readline-sync");

const promptExit = () => {
  if (readlineSync.keyInYN("Do you want to exit?")) {
    colorLog("Have a good day.");
    process.exit(0);
  }
};

export default promptExit;
