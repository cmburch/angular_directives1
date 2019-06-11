import { Router } from '@angular/router';
 import { AuthService } from './auth.service';
 import { CanActivate, RouterStateSnapshot } from '@angular/router';
 import { Injectable } from '@angular/core';
 import 'rxjs/add/operator/map';

  @Injectable()
 export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
      return this.auth.user$.map(user => {
// tslint:disable-next-line: curly
        if (user) return true;
    // else the user is not logged in return to login with query param of attempted route
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
      });
  }

  }
