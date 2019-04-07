import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(public authService: AuthService) { }

  canActivate() {
    return this.authService.isAuth();
  }

  canLoad() {
    return this.authService.isAuth()
    // A diferencia del canActivate, necesitamos obtener solo un valor y cancelar la suscripcion
    // con el pipe(take(1))) le decimos que coja el primer valor obtenido y que corte la conexion
    // sino se quedará pendiente y no resolvera.
    .pipe(
      take(1)
    );
  }
}
