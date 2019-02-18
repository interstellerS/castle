import { Room } from './Room';

import * as caches from './CastleCache';
import * as queuer from './CastleCallQueue';

const urlOrigin = 'http://castles.poulpi.fr/castles/1/rooms/entry';
const entryRoom = new Room(urlOrigin);

entryRoom.fetchData();
queuer.start();

setInterval(() => {
  console.log('Room cache size ==>  ' + caches.roomCache.size);
  console.log('Chest cache size ==>  ' + caches.chestCache.size);
}, 1000);
