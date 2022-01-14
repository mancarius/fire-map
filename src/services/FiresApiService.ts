import { FireData } from "@/types/FireData";
import fetchApi from "@/utils/fetchApi";
import MockFiresApi from "@/utils/MockFiresApi";

/**
 *
 *
 * @class FiresApiService
 */
class FiresApiService {
  private _api: string;
  private _data: FireData[] = [];

  constructor(api: string) {
    this._api = api;
  }

  /**
   * Gets remote data and initialize the service
   *
   * @return {*}  {Promise<void>}
   * @memberof FiresApiService
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
   * Returns the entire fires list
   *
   * @readonly
   * @type {FireData[]}
   * @memberof FiresApiService
   */
  get data(): FireData[] {
    return this._data;
  }

  /**
   * Return fires in the passed range
   *
   * @param {Date} start Starting date
   * @param {Date} [end=new Date()] End date. If not present, uses the current date
   * @return {FireData[]}
   * @memberof FiresApiService
   */
  filterByDateRange(start: Date, end: Date = new Date()): FireData[] {
    start.setHours(0, 0, 0);
    end.setHours(23, 59, 59);

    return this._data.filter((fire: FireData) => {
      const fireDate = new Date(fire.date);
      return fireDate >= start && fireDate <= end;
    });
  }

  /**
   * Validate url
   *
   * @private
   * @param {string} string
   * @return {*}  {boolean}
   * @memberof FiresApiService
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
