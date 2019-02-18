import * as request from 'request-promise-native';
import * as caches from './CastleCache';

export class Chest {
  private id: string;
  private url: string;
  private status: string;
  private isVisited: boolean;

  constructor(url: string) {
    this.url = url;
    this.id = '';
    this.status = '';
    this.isVisited = false;
  }

  public isEmpty(): boolean {
    return this.status.includes('This chest is empty');
  }

  public visited(): boolean {
    return this.isVisited;
  }

  public getUrl(): string {
    return this.url;
  }

  public fetchData() {
    return new Promise((resolve, reject) =>
      request.get(this.url, (err: string, data: any) => {
        if (err) {
          return reject(err);
        }
        const response = JSON.parse(data.body);
        this.isVisited = true;
        if (response.id) {
          this.id = response.id;
        }
        if (response.status) {
          this.status = response.status;
        }
        caches.chestCache.set(this.id, this);
        return resolve(response);
      })
    );
  }
}
