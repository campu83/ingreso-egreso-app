import * as fromIngresoEgreso from './ingreso-egreso.actions';
import { IngresoEgreso } from './estadistica/ingreso-egreso.model';

export interface IngresoEgresoState {
    items: IngresoEgreso[];
}

const estadoInicial: IngresoEgresoState = {
    items: []
};

export function ingresoEgresoReducer( state = estadoInicial, action: fromIngresoEgreso.acciones): IngresoEgresoState {

    switch ( action.type ) {

        case fromIngresoEgreso.SET_ITEMS:
            return { // Esto lo hacemos para barrer el array y los elementos.
                items: [...action.items.map( item => {
                        return {
                            ...item
                        };
                    })
                ]
            };

        case fromIngresoEgreso.UNSET_ITEMS:
            return {
                items: []
            };

        default:
        return state;
    }
}
