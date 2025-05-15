import { Environment, ParaMobile } from "@getpara/react-native-wallet";

export const para = new ParaMobile(Environment.BETA, "api_key", undefined, {
  disableWorkers: true,
});
