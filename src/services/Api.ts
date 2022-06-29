class ApiService {
  private IMDB_KEY = 'k_0ed0gkf7';
  public IS_BUSY: boolean = false;

  public URLs = {
    top250: 'https://imdb-api.com/en/API/Top250Movies/',
  };

  public set setIsBusy(nextState: boolean) {
    this.IS_BUSY = nextState;
  }

  public request = async <D extends unknown>(
    url: string,
  ): Promise<D | undefined> => {
    this.setIsBusy = true;

    try {
      const reqUrl = `${url}${this.IMDB_KEY}`;
      const res = await fetch(reqUrl);
      const text = await res.text();
      const parsed = text ? JSON.parse(text) : undefined;

      return parsed;
    } catch (err) {
      console.error(err);
    } finally {
      this.setIsBusy = false;
    }
  };
}

const Api = new ApiService();

export {Api};
