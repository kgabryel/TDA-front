export abstract class PathUtils {
  public static concatPath(...parts: string[]): string {
    return '/' + parts.join('/');
  }
}
