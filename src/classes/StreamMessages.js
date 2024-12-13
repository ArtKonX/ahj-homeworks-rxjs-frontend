import { ajax } from "rxjs/ajax";
import { map, catchError, of, interval, mergeMap } from "rxjs";

export default class StreamMessages {
  constructor(url) {
    this._url = url;
  }

  get url() {
    return this._url;
  }

  updateStreamMessages() {
    return interval(30000).pipe(
      mergeMap(() => {
        return ajax.getJSON(this.url).pipe(
          map((messResponse) => messResponse.messages),
          catchError((err) => {
            console.error(err);
            return of([]);
          }),
        );
      }),
    );
  }
}
