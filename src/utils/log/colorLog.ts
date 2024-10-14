const colorLog = (message: string, style = "\x1b[1;32;49m") => {
  console.log();
  console.log(style, message, "\x1b[0m");
  console.log();
};

export default colorLog;
