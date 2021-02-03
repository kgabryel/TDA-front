import {Injectable} from '@angular/core';

export interface Result {
  width: string;
  height: string;
}

export interface Sizes {
  minWidth: number;
  minHeight: number;
  singleWidth: number;
  singleHeight: number;
}

@Injectable()
export class ResizerService {

  constructor() {
  }

  public calculateSizes(sizes: Sizes, windowWidth: number, windowHeight: number): Result {
    let result: Result = {
      width: '',
      height: ''
    }
    windowWidth -= 20;
    if (windowWidth <= sizes.minWidth) {
      result.width = '100%';
    } else {
      let count = Math.ceil(windowWidth / sizes.minWidth);
      let width = windowWidth / count;
      if (width < sizes.singleWidth) {
        count -= 1;
      }
      result.width = 100 / count + '%';
    }


    windowHeight = ResizerService.calculateHeight(windowHeight);
    if (windowHeight <= sizes.minHeight) {
      result.height = sizes.singleHeight + 'px';
    } else {
      let count = Math.ceil(windowHeight / sizes.minHeight);
      let height = windowHeight / count - 20;
      if (height < sizes.minHeight) {
        count -= 1;
      }
      result.height = windowHeight / count - 20 + 'px';
    }
    return result;
  }

  private static calculateHeight(windowHeight: number): number {
    if (windowHeight < 599) {
      windowHeight -= 112;
    } else {
      windowHeight -= 64;
    }
    return windowHeight - 20;
  }

}
