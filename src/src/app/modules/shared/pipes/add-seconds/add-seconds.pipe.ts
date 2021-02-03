import {Pipe, PipeTransform} from '@angular/core';
import {addSeconds} from "date-fns";

@Pipe({
  name: 'addSeconds'
})
export class AddSecondsPipe implements PipeTransform {

  transform(value: Date, ...args: number[]): Date {
    return addSeconds(value, args[0]);
  }

}
