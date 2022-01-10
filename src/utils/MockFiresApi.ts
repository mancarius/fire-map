import { FireData } from "@/types/FireData";
import * as data from "@/assets/fires.json";

const MockFiresApi = async (): Promise<FireData[]> => {
  return new Promise((resolve) => {
    resolve(Reflect.get(data, "default"));
  });
};

export default MockFiresApi;
