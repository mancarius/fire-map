import { FireData } from "@/types/FireData";

const fetchApi = async (api: string): Promise<FireData[]> => {
  const result = await fetch(api);
  return await result.json();
};

export default fetchApi;
