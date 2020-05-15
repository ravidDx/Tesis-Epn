import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'entrenamientos'
})
export class EntrenamientosPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
