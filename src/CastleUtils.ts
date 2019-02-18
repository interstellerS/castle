export class CastleUtils {
  public static extractId(url: string) {
    return url.substr(url.lastIndexOf('/') + 1);
  }
}
