import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from './estadistica/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngresoEgreso'
})
export class OrdenIngresoEgresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): any {
    return items.sort( (a, b) => {
      if (a.tipo === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
