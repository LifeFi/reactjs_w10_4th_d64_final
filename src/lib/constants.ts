export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
export const PASSWORD_REGEX_ERROR =
  "Passwords must contain at least one UPPERCASE, lowercase, number and special characters #?!@$%^&*-";

export const CL_RED = "\x1b[31m";
export const CL_GREEN = "\x1b[32m";
export const CL_YELLOW = "\x1b[33m";
export const CL_BLUE = "\x1b[34m";
export const CL_MAGNETA = "\x1b[35m";
export const CL_CYAN = "\x1b[36m";
export const CL_WHITE = "\x1b[37m";
export const CL_BGYELLOW = "\x1b[1;35;43m";
export const CL_BGRED = "\x1b[1;41m";
export const CL_BGGREEN = "\x1b[1;42m";
export const CL_BGBLUE = "\x1b[1;44m";
export const CL_RESET = "\x1b[0m";

export const WHERE_FILE = __filename.split("/").slice(-3).join("/");
