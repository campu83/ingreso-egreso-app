import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './estadistica/ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';

import Swal from 'sweetalert2';

import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  forma: FormGroup;
  tipo = 'ingreso';

  loadingSubs: Subscription = new Subscription();
  cargando: boolean;

  constructor( public ingresoEgresoService: IngresoEgresoService, private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading);

    this.forma = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(0, Validators.min(0))
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  crearIngresoEgreso() {
    this.store.dispatch(new ActivarLoadingAction());
      console.log( this.forma.value);
      console.log( this.tipo);
      // Estamos generando un nuevo objeto y añadiendo el ultimo para tenerlo todo
      const ingresoEgreso = new IngresoEgreso({...this.forma.value, tipo: this.tipo});
      this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then( () => {
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire({
          title: 'Creado',
          text: ingresoEgreso.descripcion,
          type: 'success',
          confirmButtonText: 'OK'
        });
        this.forma.reset({ monto: 0 });

      }).catch( () => this.store.dispatch(new DesactivarLoadingAction()));

  }
}
