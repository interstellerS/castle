import * as request from 'request-promise-native';

export const BASE_URL: string = 'http://castles.poulpi.fr';

export function roomPromise(roomId: string) {
  const roomUrl = `${BASE_URL}/castles/1/rooms/${roomId}`;
  return new Promise((resolve, reject) =>
    request.get(roomUrl, (err: string, data: any) => {
      if (err) {
        return reject(new TypeError(err));
      }
      const response = JSON.parse(data.body);
      const roomJson = {
        id: response.id,
        rooms: response.rooms,
        chests: response.chests,
      };
      return resolve(roomJson);
    })
  );
}
