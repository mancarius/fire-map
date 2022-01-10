import { FireData } from "@/types/FireData";
import fetchApi from "@/utils/fetchApi";
import MockFiresApi from "@/utils/MockFiresApi";

class FiresApiService {
  private _api: string;
  private _data: FireData[] = [];

  constructor(api: string) {
    this._api = api;
  }

  /**
   *
   * @returns
   */
  async load(): Promise<void> {
    const useMock = process.env.VUE_APP_API_SOURCE === "local";

    if (!this._isValidHttpUrl(this._api)) {
      throw new URIError(this._api + "is not in a valid url");
    }

    this._data = await (useMock ? MockFiresApi() : fetchApi(this._api));

    return;
  }

  /**
   *
   *
   * @readonly
   * @type {FireData[]}
   * @memberof FiresApiService
   */
  get data(): FireData[] {
    return this._data;
  }

  /**
   *
   * @param start
   * @param end
   * @returns
   */
  filterByDateRange(start: Date, end: Date): FireData[] {
    start.setHours(0, 0, 0);
    end.setHours(23, 59, 59);

    return this._data.filter((fire: FireData) => {
      const fireDate = new Date(fire.date);
      return fireDate >= start && fireDate <= end;
    });
  }

  /**
   *
   * @param string
   * @returns
   */
  private _isValidHttpUrl(string: string): boolean {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }
}

export default FiresApiService;
