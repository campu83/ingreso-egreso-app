import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuardService } from './auth/auth-guard.service';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { dashboardRoutes } from './dashboard/dashboard.routes';
// import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [

    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    // lazyload: Cuando llegues a esta ruta carga este modulo
    {
        path: '',
        loadChildren: './ingreso-egreso/ingreso-egreso.module#IngresoEgresoModule',
        canLoad: [ AuthGuardService ]  // Es igual que el canActivate, pero con este evitamos hasta que sea cargado
    },
    // {
    //     path: '',
    //     component: DashboardComponent,
    //     children: dashboardRoutes,
    //     canActivate: [ AuthGuardService ]},
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
