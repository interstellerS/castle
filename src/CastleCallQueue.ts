import BlueBirdQueue = require('bluebird-queue');
import * as caches from './CastleCache';
import { Room } from './Room';

const queue = new BlueBirdQueue({
  concurrency: 20, // nombre d'apele de l'api back simultanées
});

export function addPromise(promise: any) {
  queue.add(promise);
}

export function start() {
  queue
    .start()
    .then((results: any) => {
      for (const value of results) {
        if (value != null && value !== undefined && value.rooms) {
          const room: Room | undefined = caches.roomCache.get(value.id);
          if (room != null && room !== undefined) {
            room.setIsVisited(true);
          }
          for (const anotherRoom of value.rooms) {
            const nextRoom: Room = new Room(anotherRoom);
            nextRoom.fetchData();
            if (room != null) {
              room.addRoom(nextRoom);
            }
          }
        }
      }
    })
    .catch((error: any) => {
      console.error(error);
    });
}
