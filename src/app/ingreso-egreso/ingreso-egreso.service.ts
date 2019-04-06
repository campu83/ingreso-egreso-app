import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './estadistica/ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubscription: Subscription = new Subscription();
  ingresoEgresoItemsSubscription: Subscription = new Subscription();

  constructor( private afDB: AngularFirestore, public authService: AuthService, private store: Store<AppState>) { }

  initIngresoEgresoListener() {
    this.ingresoEgresoListenerSubscription = this.store.select('auth')
    .pipe(filter(auth => auth.user != null)) // El pipe filtra para que no devuelva un valor nulo
    .subscribe( auth => {
      // console.log(auth.user.uid);
      this.ingresoEgresoItems(auth.user.uid);
    });
  }

  private ingresoEgresoItems( uid: string ) {
    this.ingresoEgresoItemsSubscription = this.afDB.collection(`${ uid }/ingresos-egresos/items`)
      .snapshotChanges() // Nos manda la información del firebase de todos los cambios que sucedan en tiempo real.
      .pipe(
        map( docData => {
          return docData.map( doc => {
              return {
                uid: doc.payload.doc.id,
                ...doc.payload.doc.data()  // con el operador spreed copiamos todo el contenido aqui.
              };
          });
        })
      )
      .subscribe( (coleccion: any[]) => {
        this.store.dispatch(new SetItemsAction(coleccion));
      });
  }

  cancelarSubscriptions() {
    this.ingresoEgresoListenerSubscription.unsubscribe();
    this.ingresoEgresoItemsSubscription.unsubscribe();
    this.store.dispatch(new UnsetItemsAction());
  }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso) {
    const user = this.authService.getUsuario();

    return this.afDB.doc(`${ user.uid }/ingresos-egresos`)
      .collection('items').add({...ingresoEgreso});
  }

  borrarIngresoEgreso(uid: string) {
    const user = this.authService.getUsuario();

    return this.afDB.doc(`${ user.uid }/ingresos-egresos/items/${uid}`)
      .delete();
  }

}
