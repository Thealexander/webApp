import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from '../services/seguridad.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SeguridadGuard {
  constructor(
    private seguridadService: SeguridadService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.seguridadService.onSesion()) {
      return true;
    } else {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
  }
}

// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// import { SeguridadService } from '../services/seguridad.service';
// import { Injectable } from '@angular/core';
// //TODO: necesito reajustar este codigo seccion "seguridad en componentes angular"
// @Injectable()
// export class seguridadRouter implements CanActivate {
//   constructor(
//     private seguridadService: SeguridadService,
//     private router: Router
//   ) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     if (this.seguridadService.onSesion()) {
//       return true;
//     } else {
//       this.router.navigate(['/login'], {
//         queryParams: { returnUrl: state.url } // Guarda la URL actual
//       });
//       return false; // No permite la navegación
//     }
//   }
// }
