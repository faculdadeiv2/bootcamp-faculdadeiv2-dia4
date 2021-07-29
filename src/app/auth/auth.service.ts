import { Injectable } from '@angular/core';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;

  constructor(
    private _fireAuth: AngularFireAuth,
    private _fireStore: AngularFirestore,
    private router: Router,
  ) {
    this.user$ = this._fireAuth.authState
    .pipe(switchMap(user => {
      if(user) {
        return this._fireStore.doc(`usuarios/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }));
  }

  async entrarComGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this._fireAuth.signInWithPopup(provider);

    this.atualizaInformacoesDoUsuario(credential.user);
  }

  async sair() {
    await this._fireAuth.signOut();
    return this.router.navigate(['/']);
  }

  private atualizaInformacoesDoUsuario({ uid, email, displayName, photoURL }: any) {
    const referenciaUsuario = this._fireStore.doc(`usuarios/${uid}`);

    const usuario = {
      uid,
      email,
      displayName,
      photoURL
    };

    return referenciaUsuario.set(usuario);
  }

}
