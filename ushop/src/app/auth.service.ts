import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
    // console.log('called auth constructor');
  }

  login() {
    // returnUrl gets the query params of the last route you tried to access
    // if there are params go to that route else go home
    // note: if there are query params that means user tried to get into unautorized route else navigate to home page
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
  // this is the user from the database
  // get appUser$(): Observable<AppUser> {
  //   return this.user$
  //     .switchMap(user => this.userService.get(user.uid));
  // }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => (user) ? this.userService.get(user.uid) : of<AppUser>(null)
      );
  }
}
