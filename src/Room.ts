import * as queuer from './CastleCallQueue';
import * as caches from './CastleCache';
import * as constants from './Constants';

import { CastleUtils } from './CastleUtils';

export class Room {
  private id: string;
  private isVisited: boolean;
  private rooms: Room[];

  constructor(url: string) {
    this.id = CastleUtils.extractId(url);
    this.isVisited = false;
    this.rooms = [];
    caches.roomCache.set(this.id, this);
  }

  public setIsVisited(isVisited: boolean): any {
    this.isVisited = isVisited;
  }

  public calculateChests(): number {
    // TODO implement
    return 0;
  }

  public addRoom(room: Room): void {
    this.rooms.push(room);
  }

  public fetchData() {
    const RoomPromise = constants.roomPromise.bind(null, this.id);
    if (!this.isVisited) {
      queuer.addPromise(RoomPromise);
    }
  }
}
