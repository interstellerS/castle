import * as queuer from './CastleCallQueue';
import * as caches from './CastleCache';
import * as constants from './Promises';
import { Chest } from './Chest';


export class Room {
  private id: string;
  private rooms: Room[];
  private chests: Chest[];

  constructor(id: string) {
    this.id = id;
    this.rooms = [];
    this.chests = [];
  }

  public calculateChests(): number {
    // TODO implement
    return 0;
  }

  public addRoom(room: Room): void {
    this.rooms.push(room);
  }

  public addChest(chest: Chest): void {
    this.chests.push(chest);
  }

  public async fetchData() {
    caches.roomCache.set(this.id, this);
    const RoomPromise = constants.roomDataPromise.bind(null, this.id);
    queuer.addPromise(RoomPromise);
  }
}
