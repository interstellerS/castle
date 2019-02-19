import { Room } from './Room';

import { CastleUtils } from './CastleUtils';

import * as caches from './CastleCache';
import * as queuer from './CastleCallQueue';

const urlOrigin = 'http://castles.poulpi.fr/castles/1/rooms/entry';
const roomId = CastleUtils.extractId(urlOrigin);
const entryRoom = new Room(roomId);

entryRoom.fetchData();
queuer.start();

setInterval(() => {
  console.log(`Room fetched [${caches.roomCache.size}], Chest fetched [${caches.chestCache.size}], Pending[${queuer.getQueuePending()}], Size[${queuer.getQueueSize()}]`);
  // console.log('Chest cache size ==>  ' + caches.chestCache.size);
}, 1000);
