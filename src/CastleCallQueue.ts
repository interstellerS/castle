import PQueue = require('p-queue');
import delay = require('delay');
import * as caches from './CastleCache';
import { Room } from './Room';
import { Chest } from './Chest';
import { CastleUtils } from './CastleUtils';
import * as promises from './Promises';

const queue = new PQueue({concurrency: 100});

export function addPromise(promise: any) {
  queue.add(promise).then((data: any) => {
    const isChestData = !! data.status;
    if(isChestData){
      const chestFromCache: Chest | undefined = caches.chestCache.get(data.id);
      if(chestFromCache){
        chestFromCache.setStatus(data.status);
      }
      return true;
    }
    const parent: Room | undefined =  caches.roomCache.get(data.id);
    for (const room of data.rooms) {
      const roomId = CastleUtils.extractId(room);
      const nextRoom: Room = new Room(roomId);
      if(parent){
        parent.addRoom(nextRoom);
      }
      nextRoom.fetchData();
    }
    for (const chest of data.chests) {
      const chestId = CastleUtils.extractId(chest);
      const chestObj: Chest = new Chest(chestId);
      if(parent){
        caches.chestCache.set(chestId, chestObj);
        parent.addChest(chestObj);
      }
      const chestPromise = promises.chestDataPromise.bind(null, chestId);
      addPromise(chestPromise);
    }
  });
}

export function start() {
  delay(400).then(() => {
    queue.onIdle().then(() => {
      console.log('All servers API Called , Begin computing chests very soon ...');
    });
  });
}

export function getQueuePending() {
  return queue.pending;
}

export function getQueueSize() {
  return queue.size;
}