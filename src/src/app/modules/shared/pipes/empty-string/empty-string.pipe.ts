import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'emptyString'
})
export class EmptyStringPipe implements PipeTransform {

  transform(value: string | null, ...args: unknown[]): boolean {
    if (value === null) {
      return true;
    }
    return value.trim().length === 0;
  }

}
