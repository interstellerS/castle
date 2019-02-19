import * as request from 'request-promise-native';

export const BASE_URL: string = 'http://castles.poulpi.fr';

export function roomDataPromise(roomId: string): Promise<any> {
  const roomUrl = `${BASE_URL}/castles/1/rooms/${roomId}`;
  return new Promise<any>((resolve, reject) =>
    request.get(roomUrl, {json: true}, (err: string, data: any) => {
      if (err) {
        return reject(new TypeError(err + roomId));
      }
      const response = data.body;
      const roomJson = {
        id: response.id,
        rooms: response.rooms,
        chests: response.chests,
      };
      return resolve(roomJson);
    })
  );
}

export function chestDataPromise(chestId: string): Promise<any> {
  const roomUrl = `${BASE_URL}/castles/1/chests/${chestId}`;
  return new Promise<any>((resolve, reject) =>
    request.get(roomUrl,{json: true}, (err: string, data: any) => {
      if (err) {
        return reject(new TypeError(err + chestId));
      }
      const response = data.body;
      const chestJson = {
        id: response.id,
        status: response.status
      };
      return resolve(chestJson);
    })
  );
}